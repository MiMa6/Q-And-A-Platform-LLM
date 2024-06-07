<script>
  import { onMount } from "svelte";
  import { userUuid } from "../../stores/stores.js";
  import { questions } from "../../stores/questionStore.js";
  import { questionVotes } from "../../stores/questionVotesStore.js";

  export let courseId;
  let newQuestionText = "";

  let course = [];

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
    questions.set(jsonData);
    console.log($questions);
  };

  const postNewQuestion = async () => {
    const data = {
      courseID: courseId,
      userUuid: $userUuid,
      question_text: newQuestionText,
    };

    const responseNewQuesiton = await fetch("/api/qa/question/new", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await responseNewQuesiton;
    console.log(jsonData);

    createLlmAnswer(data);
    getAllQuestions();
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
    getAllQuestions();
  };

  const createLlmAnswer = async (data) => {
    const dataLlm = {
      question: newQuestionText,
    };

    console.log(JSON.stringify(dataLlm));
    const response = await fetch("/api/llm", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLlm),
    });

    const jsonData = await response.json();
    const llmAnswer = jsonData[0].generated_text;
    console.log(llmAnswer);
    //const responseLlmAnswer = await fetch("/api/qa/question/llm", {
    //  method: "Post",
    //  headers: {
    //    "Content-Type": "application/json",
    //  },
    //  body: JSON.stringify({...data, llmAnswer: llmAnswer}),
    //});
  };

  const getAllQuestionVotes = async () => {
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

    console.log($questionVotes);
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
    getAllQuestionVotes();
  };

  onMount(getCourse);
  onMount(getAllQuestions);
  onMount(getAllQuestionVotes);
</script>

<main
  class="font-sans text-base font-normal text-gray-700 dark:text-gray-200 bg-surface-400 dark:bg-surfacedark-200"
>
  <!-- content -->
  <div class="flex flex-col w-full gap-8 overflow-hidden">
    <div
      class="flex flex-wrap w-full flex-col gap-8 md:p-10 dark:bg-surfacedark-100"
    >
      <div
        class="bg-neutral-10 dark:bg-neutral-900 p-6 md:p-8 border border-gray-200 dark:border-gray-700"
      >
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
                      <a
                        href="/questions/{question.id}"
                        class="flex space-x-4 rounded-xl p-4 hover:bg-primary-200"
                      >
                        <div>
                          <p class="font-semibold text-gray-600">
                            {question.question_text}
                          </p>
                        </div>
                      </a>
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
                    </div>
                  </div>
                {/each}
              </div>
              <!-- List questions-->
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
