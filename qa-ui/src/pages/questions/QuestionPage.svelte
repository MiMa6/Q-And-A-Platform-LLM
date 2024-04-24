<script>
  import { onMount } from "svelte";
  import { userUuid } from "../../stores/stores.js";
  import { answers } from "../../stores/answerStore.js";

  export let questionID;

  let question = [];

  const getQuestionById = async () => {
    const data = {
      questionID: questionID,
    };
    console.log("Question page data questionID: " + data.questionID);
    const response = await fetch("/api/qa/question", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    question = jsonData.data[0];
    console.log("$question");
    console.log(question);
  };

  const getAnswers = async () => {
    const data = {
      questionID: questionID,
    };

    const response = await fetch("/api/qa/answers", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    answers.set(jsonData);
    console.log($answers);
  };

  onMount(getQuestionById);
  onMount(getAnswers);
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
          <!-- Question -->
          <div>
            <h1 class="text-lg font-semibold text-center text-gray-600 pb-2">
              {question.question_text}
            </h1>
          </div>

          <!-- Answers -->
          <section class="p-5">
            <div class="mb-5 flex items-center justify-between">
              <h4 class="font-medium text-slate-500">LLM Generated Answers</h4>
            </div>

            <!-- List Answers-->

            <div>
              {#each $answers as answer}
                <div class="space-y-2 py-2">
                  <div class="flex">
                    <div
                      class="flex space-x-4 rounded-xl bg-white p-4 shadow-sm"
                    >
                      <div>
                        <p class="font-semibold text-gray-600">
                          {answer.answer_text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
            <!-- List Answers End-->

            <div class="mb-5 flex items-center justify-between">
              <h4 class="font-medium text-slate-500 mt-8">User Answers</h4>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
