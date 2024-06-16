import { sql } from "../database/database.js";

const findAnswersPerQuestionID = async (data) => {

  const questionID = data.questionID;
  const batch = data.batch;

  return await sql`
    SELECT * 
    FROM answers
    WHERE question_id = ${questionID}
    ORDER BY post_time DESC
    LIMIT ${batch * 20};
  `;
};

const findAnswerVotesPerQuestionID = async (id) => {
  return await sql`
    SELECT * 
    FROM answer_votes
    WHERE question_id = ${id}
  `;
};

const vote = async (data) => {
  const answerID = data.answerID;
  const questionID = data.questionID;
  const userUuid = data.userUuid;
  const voteType = data.voteType;

  console.log(data);

  // Check if the user has already voted for this question
  const existingVote = await sql`
  SELECT * 
  FROM answer_votes
  WHERE answer_id = ${answerID}
  AND question_id = ${questionID}
  AND user_uuid = ${userUuid}
`;

  if (existingVote.length > 0) {
    return await sql`
      DELETE FROM answer_votes
      WHERE answer_id = ${answerID}
      AND question_id = ${questionID}
      AND user_uuid = ${userUuid}
      RETURNING *;
    `;
  }

  // If no vote
  return await sql`
    INSERT INTO answer_votes (answer_id, question_id, user_uuid, vote)
    VALUES (${answerID}, ${questionID}, ${userUuid}, ${voteType})
    RETURNING *;
  `;
};

const delAnswer = async (data) => {
  const answerID = data.answerID;

  try {
    await sql`
    DELETE FROM answer_votes
    WHERE answer_id = ${answerID}
    `;

    await sql`
    DELETE FROM answers 
    WHERE id = ${answerID}
    `;

    return new Response(
      JSON.stringify({
        status: 200,
        data: "Answer deleted successfully",
      })
    );
  } catch (error) {
    console.error("Error deleting answer:", error.message);
    return new Response(
      JSON.stringify({
        status: 400,
        data: "Err",
      })
    );
  }
};

const addNewAnswer = async (data) => {
  const questionID = data.questionID;
  const userUuid = data.userUuid;
  const answer_text = data.answer_text;

  try {
    await sql`
    INSERT INTO answers (question_id, user_uuid, answer_text)
    VALUES (${questionID}, ${userUuid}, ${answer_text})
    `;

    const insertedRow = await sql`
    SELECT * FROM answers WHERE question_id = ${questionID} AND user_uuid = ${userUuid} AND answer_text = ${answer_text}
    `;

    console.log("New Answer added successfully:");
    return insertedRow;
  } catch (error) {
    console.error("Error adding new question:", error.message);
    return "err";
  }
};
export {
  findAnswersPerQuestionID,
  addNewAnswer,
  delAnswer,
  findAnswerVotesPerQuestionID,
  vote,
};
