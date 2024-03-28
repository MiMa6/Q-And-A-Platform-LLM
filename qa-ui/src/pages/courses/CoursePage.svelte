<script>
  import { onMount } from "svelte";
  import { courses } from "../../stores/courseStore.js";
  import { questions } from "../../stores/questionStore.js";

  export let courseId;

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

            <!-- List courses-->
            <div>
              {#each $questions as question}
                <div class="space-y-2">
                  <a
                    href="/"
                    class="flex space-x-4 rounded-xl bg-white p-3 shadow-sm hover:bg-primary-100"
                  >
                    <div>
                      <p class="font-semibold text-gray-600">
                        {question.question_text}
                      </p>
                    </div>
                  </a>
                </div>
              {/each}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
