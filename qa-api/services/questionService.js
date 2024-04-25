import { sql } from "../database/database.js";

const findQuestionsPerCourseID = async (id) => {
  return await sql`
    SELECT * 
    FROM questions
    WHERE course_id = ${id}
    ORDER BY post_time DESC;
  `;
};

const findQuestionVotesPerCourseID = async (id) => {
  return await sql`
    SELECT * 
    FROM question_votes
    WHERE course_id = ${id}
  `;
};

const findAllQuestionVotes = async () => {
  return await sql`
    SELECT * 
    FROM question_votes
    WHERE question_id = ${id}
    ORDER BY vote_time DESC;
  `;
};

const findQuesitonID = async (id) => {
  const result = await sql`
    SELECT * 
    FROM questions
    WHERE id = ${id};
  `;

  if (result.length > 0) {
    console.log("question data");
    console.log(result);
    return new Response(
      JSON.stringify({
        status: 200,
        data: result,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        status: 400,
        data: `No question with ${id} found`,
      })
    );
  }
};

const vote = async (data) => {
  const questionID = data.questionID;
  const courseID = data.courseID;
  const userUuid = data.userUuid;
  const voteType = data.voteType;

  console.log(data)

  // Check if the user has already voted for this question
  const existingVote = await sql`
  SELECT * 
  FROM question_votes
  WHERE question_id = ${questionID}
  AND course_id = ${courseID}
  AND user_uuid = ${userUuid}
`;

  if (existingVote.length > 0) {
    return await sql`
      DELETE FROM question_votes
      WHERE question_id = ${questionID}
      AND course_id = ${courseID}
      AND user_uuid = ${userUuid}
      RETURNING *;
    `;
  }

  // If no vote
  return await sql`
    INSERT INTO question_votes (question_id, course_id, user_uuid, vote)
    VALUES (${questionID}, ${courseID}, ${userUuid}, ${voteType})
    RETURNING *;
  `;
};

const addNewQuesiton = async (data) => {
  const courseID = data.courseID;
  const userUuid = data.userUuid;
  const question_text = data.question_text;

  try {
    await sql`
    INSERT INTO questions (course_id, user_uuid, question_text)
    VALUES (${courseID}, ${userUuid}, ${question_text})
  `;
    console.log("New question added successfully:");
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error adding new question:", error.message);
    return new Response("err", { status: 400 });
  }
};

export {
  findQuestionsPerCourseID,
  findQuestionVotesPerCourseID,
  findQuesitonID,
  vote,
  addNewQuesiton,
};
