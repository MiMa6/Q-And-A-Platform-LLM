import { sql } from "../database/database.js";

const findAll = async (id) => {
  return await sql`
    SELECT * 
    FROM answers
    WHERE question_id = ${id};

  `;
};
export { findAll };
