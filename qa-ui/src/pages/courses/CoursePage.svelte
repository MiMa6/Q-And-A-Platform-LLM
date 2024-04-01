<script>
  import { onMount } from "svelte";
  import { userUuid } from "../../stores/stores.js";
  import { questions } from "../../stores/questionStore.js";

  export let courseId;

  let course = [];

  const getCourse = async () => {
    const data = {
      courseID: courseId,
    };

    const response = await fetch("/api/course", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    course = jsonData.data[0];
    console.log("$course");
    console.log(course);
  };

  const getQuestions = async () => {
    const data = {
      courseID: courseId,
    };

    const response = await fetch("/api/questions", {
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

  const getQuestionVotes = async () => {
    const response = await fetch("/api/questions/votes", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    questionVotes.set(jsonData);
    console.log($questions);
  };

  const postQuestionvote = async (voteType, questionID) => {
    const data = {
      questionID: questionID,
      userUuid: $userUuid,
      voteType: voteType,
    };

    const response = await fetch("/api/vote/question", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
  };
  onMount(getCourse);
  onMount(getQuestions);
</script>

<main
  class="font-sans text-base font-normal text-gray-700 dark:text-gray-200 bg-surface-400 dark:bg-surfacedark-200"
>
  <!-- content -->
  <div class="flex flex-col w-full gap-8 overflow-hidden">
    <div
      class="flex flex-wrap w-full flex-col gap-8 md:p-10 bg-surface-400 dark:bg-surfacedark-100 rounded-2xl"
    >
      <div
        class="bg-neutral-10 dark:bg-neutral-900 p-6 md:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl"
      >
        <div class="flex flex-wrap flex-row gap-6 mb-12">
          <!-- Course -->
          <div>
            <h1 class="text-lg font-semibold text-center text-gray-600 pb-2">
              {course.title}
            </h1>
            <p class="text-sm text-slate-400">
              {course.course_description}
            </p>
          </div>

          <!-- Questions -->
          <section class="p-5">
            <div class="mb-5 flex items-center justify-between">
              <h4 class="font-medium text-slate-500">Questions</h4>
              <div
                class="rounded-md bg-pink-400/70 px-2 font-semibold text-gray-900"
              >
                {$questions.length}
              </div>
            </div>

            <!-- List questions-->
            <div>
              {#each $questions as question}
                <div class="space-y-2 py-2">
                  <div class="flex">
                    <button
                      class="relative !inline-flex !items-center justify-center px-2 mx-2 rounded-xl hover:bg-primary-100"
                      on:click={() => postQuestionvote("upvote", question.id)}
                    >
                      <span class="material-symbols-outlined">
                        arrow_drop_up
                      </span>
                    </button>
                    <div
                      class=" relative !inline-flex !items-center rounded-xl bg-pink-400/70 mt-4 px-2 mx-2 font-semibold text-gray-900"
                    >
                      {$questions.length}
                    </div>
                    <button
                      class="material-symbols-outlined relative !inline-flex !items-center justify-center px-2 mx-2 rounded-xl hover:bg-primary-100"
                      on:click={() => postQuestionvote("downvote", question.id)}
                    >
                      <span class="material-symbols-outlined">
                        arrow_drop_down
                      </span>
                    </button>
                    <a
                      href="/questions/{question.id}"
                      class="flex space-x-4 rounded-xl bg-white p-4 shadow-sm hover:bg-primary-100"
                    >
                      <div>
                        <p class="font-semibold text-gray-600">
                          {question.question_text}
                        </p>
                      </div>
                    </a>
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
</main>
