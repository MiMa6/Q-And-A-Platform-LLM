import { sql } from "../database/database.js";

const find = async (id) => {
  return await sql`
    SELECT * 
    FROM questions
    WHERE course_id = ${id};
  `;
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
export { find, vote };
