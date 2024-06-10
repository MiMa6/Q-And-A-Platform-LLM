import * as answerService from "./services/answerService.js";
import * as courseService from "./services/courseService.js";
import * as questionService from "./services/questionService.js";

import { serve } from "./deps.js";
import { sql } from "./database/database.js";

const handleGetRoot = async (request) => {
  return new Response(`Hello from programmin API server`);
};

const handlePostSpecificCourse = async (request) => {
  const requestData = await request.json();
  const courseID = requestData.courseID;
  console.log("courseID", courseID);

  const courseResponse = await courseService.find(courseID);

  return courseResponse;
};

const handleGetCourses = async (request) => {
  const courses = await courseService.findAll();

  return new Response(JSON.stringify(courses), {
    headers: { "content-type": "application/json" },
  });
};

const handleGetCourseIds = async (request) => {
  //const headers = new Headers();
  //headers.set("Access-Control-Allow-Origin", allowedOrigin);
  //headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Adjust as needed
  //headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Adjust as needed
  //headers.set("content-type", "application/json"); // Adjust as needed

  const courseIds = await courseService.findAllIds();
  console.log(courseIds);

  return new Response(JSON.stringify(courseIds), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostSpecificQuestion = async (request) => {
  const requestData = await request.json();
  const questionID = requestData.questionID;
  console.log("questionID", questionID);

  const questionResponse = await questionService.findQuesitonID(questionID);

  return questionResponse;
};

const handlePostNewQuestion = async (request) => {
  const requestData = await request.json();

  const questionData = {
    courseID: requestData.courseID,
    userUuid: requestData.userUuid,
    question_text: requestData.question_text,
  };

  console.log(questionData);

  const questionResponse = await questionService.addNewQuesiton(questionData);
  return questionResponse;
};

const handlePostNewAnswer = async (request) => {
  const requestData = await request.json();

  const answerData = {
    questionID: requestData.questionID,
    userUuid: requestData.userUuid,
    answer_text: requestData.answer_text,
  };

  console.log(answerData);

  const answerResponse = await answerService.addNewAnswer(answerData);
  return answerResponse;
};

const handlePostDeleteQuestion = async (request) => {
  const requestData = await request.json();

  const questionData = {
    questionID: requestData.questionID
  };

  console.log(questionData);

  const questionResponse = await questionService.delQuestion(questionData);
  return questionResponse;
};


const handlePostDeleteAnswer = async (request) => {
  const requestData = await request.json();

  const answerData = {
    answerID: requestData.answerID
  };

  console.log(answerData);

  const answerResponse = await answerService.delAnswer(answerData);
  return answerResponse;
};

const handlePostQuestionLlmAnswer = async (request) => {
  const requestData = await request.json();

  const questionData = {
    courseID: requestData.courseID,
    userUuid: requestData.userUuid,
    question_text: requestData.question_text,
    llmAnswer1: requestData.llmAnswer1,
    llmAnswer2: requestData.llmAnswer2,
    llmAnswer3: requestData.llmAnswer3,
  };

  const questionResponse = await questionService.updateQuesitonLlm(
    questionData
  );

  console.log("questionResponse");
  console.log(questionResponse);
  return new Response(JSON.stringify(questionResponse), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostQuestions = async (request) => {
  const requestData = await request.json();
  const courseID = requestData.courseID;
  console.log(courseID);

  const questions = await questionService.findQuestionsPerCourseID(courseID);

  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostQuestionsVotes = async (request) => {
  const requestData = await request.json();
  const courseID = requestData.courseID;
  console.log(courseID);

  const questionVotes = await questionService.findQuestionVotesPerCourseID(
    courseID
  );

  return new Response(JSON.stringify(questionVotes), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostAnswersVotes = async (request) => {
  const requestData = await request.json();
  const questionID = requestData.questionID;
  console.log(questionID);

  const answerVotes = await answerService.findAnswerVotesPerQuestionID(
    questionID
  );

  return new Response(JSON.stringify(answerVotes), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostAnswers = async (request) => {
  const requestData = await request.json();
  const questionID = requestData.questionID;
  console.log(questionID);

  const answers = await answerService.findAll(questionID);

  return new Response(JSON.stringify(answers), {
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

const handlePostVoteQuestion = async (request) => {
  const data = await request.json();
  const response = await questionService.vote(data);

  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
  });
};

const handlePostVoteAnswer = async (request) => {
  const data = await request.json();
  const response = await answerService.vote(data);

  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
  });
};


const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/course" }),
    fn: handlePostSpecificCourse,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses" }),
    fn: handleGetCourses,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courseids" }),
    fn: handleGetCourseIds,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/question" }),
    fn: handlePostSpecificQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/question/new" }),
    fn: handlePostNewQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/question/del" }),
    fn: handlePostDeleteQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answer/del" }),
    fn: handlePostDeleteAnswer,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/question/llm" }),
    fn: handlePostQuestionLlmAnswer,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions" }),
    fn: handlePostQuestions,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions/votes" }),
    fn: handlePostQuestionsVotes,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answers/votes" }),
    fn: handlePostAnswersVotes,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answers" }),
    fn: handlePostAnswers,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answer/new" }),
    fn: handlePostNewAnswer,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/generate" }),
    fn: handlePostGenerateAnswer,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/vote/question" }),
    fn: handlePostVoteQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/vote/answer" }),
    fn: handlePostVoteAnswer,
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
