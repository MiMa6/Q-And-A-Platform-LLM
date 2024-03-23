CREATE TABLE courses (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	course_order INTEGER NOT NULL,
	course_description TEXT NOT NULL
);

CREATE TABLE questions (
	id SERIAL PRIMARY KEY,
	course_id INTEGER REFERENCES courses(id),
	user_uuid TEXT NOT NULL,
	question_text TEXT NOT NULL,
	post_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answers (
	id SERIAL PRIMARY KEY,
	question_id INTEGER REFERENCES questions(id),
	user_uuid TEXT NOT NULL,
	answer_text TEXT NOT NULL,
	post_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE INDEX que_user_uuid_cour_id_idx ON 
  questions (user_uuid, course_id);

CREATE INDEX ans_user_uuid_que_id_idx ON 
  answers (user_uuid, question_id);