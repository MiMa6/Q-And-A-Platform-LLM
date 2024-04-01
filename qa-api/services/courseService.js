import { sql } from "../database/database.js";

const find = async (id) => {
  const result = await sql`
    SELECT * 
    FROM courses
    WHERE id = ${id};
  `;

  if (result.length > 0) {
    console.log("course data")
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
        data: `No course with ${id} found`,
      })
    );
  }
};

const findAll = async () => {
  return await sql`SELECT * FROM courses;`;
};

const findAllIds = async () => {
  return await sql`SELECT id FROM courses;`;
};

export { find, findAll, findAllIds };
