import { sql } from "../database/database.js";

const findCourseID = async (id) => {
  return await sql`
    SELECT * 
    FROM questions
    WHERE course_id = ${id};

  `;
};

const findQuesitonID = async (id) => {
  const result = await sql`
    SELECT * 
    FROM questions
    WHERE id = ${id};
  `;

  if (result.length > 0) {
    console.log("question data")
    console.log(result)
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
  const userUuid = data.userUuid;
  const voteType = data.voteType;

  return await sql`
    INSERT INTO question_votes (question_id, user_uuid, vote)
    VALUES (${questionID}, ${userUuid}, ${voteType})
    RETURNING *;
  `;
};
export { findCourseID, findQuesitonID, vote };
