import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
};

export default function () {
  const questionData = {
    courseID: 1,
    userUuid: 123,
    question_text: "Test Question?!?",
  };

  http.post(
    "http://localhost:7800/api/qa/question/delete",
    JSON.stringify(questionData)
  );
}
