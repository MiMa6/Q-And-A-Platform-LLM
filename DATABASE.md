## Schema

1. courses
2. questions
3. question_bvotes
4. answers
5. answer_votes
___
### Courses Table
   - The `courses` table stores information about the available courses, including the `title`, `course_order`, and `course_description`.
   - The `id` column is set as the primary key for uniquely identify each course

### Questions Table
   - The `id` column is set as the primary key to uniquely identify each question.
   - The `questions` table stores the user-submitted questions, along with their `course_id`, `user_uuid`, `question_text`, and `post_time`.
   - The `llmanswer1`, `llmanswer2`, and `llmanswer3` columns are used to store llm generated answers. After creating new question three llm answers are also generated
   - The `course_id` column is a foreign key that references the `id` column in the `courses` table, allowing you to associate each question with a specific course.
   - The `user_uuid` column is used to store the unique identifier of the user who submitted the question, which can be useful for tracking user activity and analytics.

### Answers Table
   - The `answers` table stores the user-submitted answers to the questions, including the `question_id`, `user_uuid`, `answer_text`, and `post_time`.
   - The `id` column is set as the primary key to uniquely identify each answer.
   - The `question_id` column is a foreign key that references the `id` column in the `questions` table, allowing you to associate each answer with a specific question.
   - The `user_uuid` column is used to store the unique identifier of the user who submitted the answer

### Answer Votes Table
   - The `answer_votes` table stores the votes made by users on the answers.
   - The `id` column is set as the primary key to uniquely identify each vote.
   - The `question_id` column is a foreign key that references the `id` column in the `questions` table, allowing you to associate each vote with a specific question.
   - The `answer_id` column is a foreign key that references the `id` column in the `answers` table, allowing you to associate each vote with a specific answer.
   - The `user_uuid` column is used to store the unique identifier of the user who made the vote, which can be useful for tracking user activity and preventing duplicate votes.
   - The `vote` column is an enumeration type (`VOTE_TYPE`) that can have the values 'upvote' or 'downvote', representing the type of vote. ('downvotes' not implemented in app, instead max 1 upvote)
   - The `vote_time` column stores the timestamp of when the vote was made.

### Question Votes Table
   - The `question_votes` table stores the votes made by users on the questions.
   - The `id` column is set as the primary key to uniquely identify each vote.
   - The `course_id` column is a foreign key that references the `id` column in the `courses` table, allowing you to associate each vote with a specific course.
   - The `question_id` column is a foreign key that references the `id` column in the `questions` table, allowing you to associate each vote with a specific question.
   - The `user_uuid` column is used to store the unique identifier of the user who made the vote.
   - The `vote` column is an enumeration type (`VOTE_TYPE`) that can have the values 'upvote' or 'downvote', representing the type of vote. ('downvotes' not implemented in app, instead max 1 upvote)
   - The `vote_time` column stores the timestamp of when the vote was made.
___
### Indexes
1. `que_user_uuid_cour_id_idx`: This index is created on the `user_uuid` and `course_id` columns in the `questions` table. Reasoning -> it can help improve the performance of queries that filter or sort the questions based on the user and the course.
2. `ans_user_uuid_que_id_idx`: This index is created on the `user_uuid` and `question_id` columns in the `answers` table. Reasoning -> it can help improve the performance of queries that filter or sort the answers based on the user and the question.
___
### Database Denormalization Decisions
1. **Storing LLM Answers in the Questions Table**: The decision to store the LLM-generated answers (`llmanswer1`, `llmanswer2`, and `llmanswer3`) directly in the `questions` table is a form of denormalization. This approach can improve query performance and reduce the need for joins when retrieving questions along with their associated LLM answers. One downside is that, it might increase the storage requirements for the `questions` table.
___
