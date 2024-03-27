import * as coursesService from "./services/coursesService.js";
import * as questionService from "./services/questionService.js";

import { serve } from "./deps.js";
import { sql } from "./database/database.js";

const handleGetRoot = async (request) => {
  return new Response(`Hello from programmin API server`);
};

const handleGetCourses = async (request) => {
  const courses = await coursesService.findAll();

  return new Response(JSON.stringify(courses), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostQuestions = async (request) => {
  const requestData = await request.json();
  const courseID = requestData.courseID;
  console.log(courseID);

  const questions = await questionService.find(courseID);

  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostGenerateAnswer = async (request) => {
  const data = await request.json();

  const response = await fetch("http://llm-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses" }),
    fn: handleGetCourses,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions" }),
    fn: handlePostQuestions,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/generate" }),
    fn: handlePostGenerateAnswer,
  },
];

const handleRequest = async (request) => {
  console.log(request.method, request.url);

  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);

  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);

    return new Response(e.stack, { status: 500 });
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };

serve(handleRequest, portConfig);
