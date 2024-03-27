import { sql } from "../database/database.js";

const find = async (id) => {
  return await sql`
    SELECT * 
    FROM questions
    WHERE course_id = ${id};
  `;
};

export { find };
