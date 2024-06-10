<script>
  import { onMount } from "svelte";
  import { userUuid } from "../../stores/stores.js";
  import { questions } from "../../stores/questionStore.js";
  import { questionVotes } from "../../stores/questionVotesStore.js";

  export let courseId;
  let newQuestionText = "";

  let course = [];

  let isLoading = false;

  const getCourse = async () => {
    const data = {
      courseID: courseId,
    };

    const response = await fetch("/api/qa/course", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    course = jsonData.data[0];
    console.log(course);
  };

  const getAllQuestions = async () => {
    const data = {
      courseID: courseId,
    };

    const response = await fetch("/api/qa/questions", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();

    // Sort questions based on most recent post_time or vote_time
    const combinedData = jsonData.map((question) => {
      const vote = $questionVotes.find(
        (vote) => vote.question_id === question.id
      );

      const recentTime = vote
        ? Math.max(new Date(question.post_time), new Date(vote.vote_time))
        : new Date(question.post_time);
      return { ...question, recent_time: recentTime };
    });

    // Sort combinedData by recent_time
    combinedData.sort(
      (a, b) => new Date(b.recent_time) - new Date(a.recent_time)
    );
    questions.set(combinedData);

    console.log("Questions");
    console.log($questions);
  };

  const delQuestion = async (questionID) => {
    const data = {
      questionID: questionID,
    };

    const responseQuestion = await fetch("/api/qa/question/del", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await responseQuestion;
    console.log(jsonData);
    getAllQuestionData();
  };

  const postNewQuestion = async () => {
    isLoading = true;

    const data = {
      courseID: courseId,
      userUuid: $userUuid,
      question_text: newQuestionText,
    };

    const responseNewQuestion = await fetch("/api/qa/question/new", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await responseNewQuestion;
    console.log(jsonData);

    createLlmAnswers(data);
    getAllQuestionData();
  };

  const createLlmAnswers = async (data) => {
    const dataLlm = {
      question: newQuestionText,
    };
    const llm_answers = [];

    for (let i = 0; i < 3; i++) {
      const response = await fetch("/api/llm", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLlm),
      });

      const jsonData = await response.json();
      const llmAnswer = jsonData[0].generated_text;
      llm_answers.push(llmAnswer);
    }

    console.log(llm_answers);

    const filteredAnswers = llm_answers.filter((answer) => {
      return !answer.toLowerCase().startsWith(newQuestionText);
    });

    console.log(filteredAnswers);

    const questionData = {
      ...data,
      llmAnswer1: llm_answers[0],
      llmAnswer2: llm_answers[1],
      llmAnswer3: llm_answers[2],
    };

    updateQuestionLlmAnswer(questionData);
  };

  const updateQuestionLlmAnswer = async (data) => {
    const response = await fetch("/api/qa/question/llm", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response;
    console.log("updateQuestionLlmAnswer response");
    console.log(jsonData);
    isLoading = false;
  };

  const getAllQuestionData = async () => {
    // Get all question votes
    const data = {
      courseID: courseId,
    };

    const response = await fetch("/api/qa/questions/votes", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    questionVotes.set(jsonData);

    console.log("Question votes");
    console.log($questionVotes);

    await getAllQuestions();
  };

  const postQuestionvote = async (voteType, questionID) => {
    const data = {
      questionID: questionID,
      courseID: courseId,
      userUuid: $userUuid,
      voteType: voteType,
    };

    const response = await fetch("/api/qa/vote/question", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
    getAllQuestionData();
  };

  function getLatestVoteTime(questionId) {
    const votes = $questionVotes.filter(
      (vote) => vote.question_id === questionId
    );
    if (votes.length === 0) {
      return null;
    }
    const latestVote = votes.reduce((latest, current) => {
      return new Date(current.vote_time) > new Date(latest.vote_time)
        ? current
        : latest;
    });
    return convertToHelsinkiTime(latestVote.vote_time);
  }

  function convertToHelsinkiTime(utcTimestamp) {
    const date = new Date(utcTimestamp);

    // Create an Intl.DateTimeFormat object for Helsinki time
    const options = {
      timeZone: "Europe/Helsinki",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const formattedDate = formatter.format(date);

    // Format the date string to "Year-Month-Day Hour:Minutes"
    const [day, month, year, hour, minute] = formattedDate.match(/\d+/g);
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  onMount(getCourse);
  onMount(getAllQuestionData);
</script>

<main class="font-sans text-base font-normal text-gray-700 bg-surface-400">
  <!-- content -->
  <div class="flex flex-col w-full gap-8 overflow-hidden">
    <div class="flex flex-wrap w-full flex-col gap-8 md:p-10">
      <div class="bg-neutral-10 p-6 md:p-8 border border-gray-200">
        <div
          class="flex flex-wrap flex-row gap-6 mb-12 !items-center !justify-center rounded-xl"
        >
          <!-- Course -->
          <div class="rounded-xl">
            <h1 class="text-lg text-center text-gray-600 px-8 py-2">
              {course.title}
            </h1>
            <p class="text-sm text-slate-400 max-w-3xl px-6 py-4">
              {course.course_description}
            </p>
          </div>
          <!-- Course end -->

          <!-- Create Question -->

          <div class="flex w-full max-w-3xl px-6">
            <button
              class=" rounded-xl bg-primary-100 mr-4 bg-primary-100 hover:bg-primary-200"
              on:click={() => postNewQuestion()}
            >
              <div class="flex flex-col w-full">
                <p class="text-sm text-gray-600">Create new question</p>
                <span class="material-symbols-outlined"> add </span>
              </div>
            </button>
            <div class="flex flex-col w-full">
              <div
                class="rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-100"
              >
                <input
                  type="text"
                  bind:value={newQuestionText}
                  name="question_text"
                  id="questionTextInput"
                  autocomplete="question_text"
                  placeholder="   Write question..."
                  class="text-sm text-center block border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                />
              </div>
              {#if isLoading}
                <div
                  class="!inline-flex !items-center rounded-xl mt-4 px-2 mx-2 text-gray-900"
                >
                  <h1 class="text-lg text-center text-gray-600 pb-2">
                    LLM answers loading...
                  </h1>
                  <span class="material-symbols-outlined"> Downloading </span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Create Question End-->

          <div class="flex flex-col w-full max-w-3xl">
            <!-- Questions -->
            <section class="p-5">
              <div class="mb-5 flex items-center justify-center">
                <h1 class="text-lg text-center text-gray-600 pb-2">
                  Questions
                </h1>
              </div>

              <!-- List questions-->
              <div>
                {#each $questions as question}
                  <div class="space-y-2 py-2">
                    <div class="flex !items-center">
                      <!-- vote questions-->
                      <div
                        class="!inline-flex !items-center rounded-xl mt-4 px-2 mx-2 font-semibold text-gray-900"
                      >
                        <p class="text-kg text-gray-600">
                          {$questionVotes.filter(
                            (obj) =>
                              obj.course_id === parseInt(courseId) &&
                              obj.question_id === question.id
                          ).length}
                        </p>
                      </div>
                      <button
                        class="!inline-flex !items-center rounded-xl px-4 pt-2 mr-4 bg-primary-100 0 hover:bg-primary-200"
                        on:click={() => postQuestionvote("upvote", question.id)}
                      >
                        <div class="flex flex-col w-full">
                          <p class="text-sm text-gray-600">Vote</p>
                          <span class="material-symbols-outlined">
                            arrow_drop_up
                          </span>
                        </div>
                      </button>
                      <!-- vote questions end-->

                      <!-- Question info -->
                      <a
                        href="/questions/{question.id}"
                        class="flex space-x-4 rounded-xl p-4 hover:bg-primary-200"
                      >
                        <div>
                          <p class="font-semibold text-gray-600 mb-2">
                            {question.question_text}
                          </p>
                          <p class="text-gray-600 text-xs">
                            Post time: {convertToHelsinkiTime(
                              question.post_time
                            )}
                          </p>
                          {#if $questionVotes.some((vote) => vote.question_id === question.id)}
                            <p class="text-gray-600 text-xs">
                              Latest vote time: {convertToHelsinkiTime(
                                getLatestVoteTime(question.id)
                              )}
                            </p>
                          {/if}
                        </div>
                      </a>
                      <!-- Question info end -->
                      <!-- delete questions-->
                      {#if question.user_uuid === $userUuid}
                        <button
                          class="!inline-flex !items-center rounded-xl px-4 pt-2 ml-4 bg-error-300 hover:bg-error-400"
                          on:click={() => delQuestion(question.id)}
                        >
                          <div class="flex flex-col w-full">
                            <p class="text-sm text-gray-600">Delete</p>
                            <span class="material-symbols-outlined">
                              delete
                            </span>
                          </div>
                        </button>
                      {/if}
                      <!-- delete questions end -->
                    </div>
                  </div>
                {/each}
              </div>
              <!-- List questions end-->
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    width: fit-content;
  }
</style>
