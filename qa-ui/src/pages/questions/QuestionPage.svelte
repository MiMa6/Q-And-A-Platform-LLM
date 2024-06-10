<script>
  import { onMount } from "svelte";
  import { userUuid } from "../../stores/stores.js";
  import { answers } from "../../stores/answerStore.js";
  import { answerVotes } from "../../stores/answerVotesStore.js";

  export let questionID;
  let newAnswerText = "";

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

    // Sort answers based on most recent post_time or vote_time
    const combinedData = jsonData.map((answer) => {
      const vote = $answerVotes.find((vote) => vote.answer_id === answer.id);

      const recentTime = vote
        ? Math.max(new Date(answer.post_time), new Date(vote.vote_time))
        : new Date(answer.post_time);
      return { ...answer, recent_time: recentTime };
    });

    // Sort combinedData by recent_time
    combinedData.sort(
      (a, b) => new Date(b.recent_time) - new Date(a.recent_time)
    );
    answers.set(combinedData);

    console.log("Answers");
    console.log($answers);
  };

  const delAnswer = async (answerID) => {
    const data = {
      answerID: answerID,
    };

    const responseAnswer = await fetch("/api/qa/answer/del", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await responseAnswer;
    console.log(jsonData);
    getAllAnswerData();
  };

  const postNewAnswer = async () => {
    const data = {
      questionID: questionID,
      userUuid: $userUuid,
      answer_text: newAnswerText,
    };

    const responseNewAnswer = await fetch("/api/qa/answer/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await responseNewAnswer;
    console.log(jsonData);
    getAllAnswerData();
  };

  const getAllAnswerData = async () => {
    // GEt all answer botes
    const data = {
      questionID: questionID,
    };

    const response = await fetch("/api/qa/answers/votes", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    answerVotes.set(jsonData);

    console.log("Answer votes");
    console.log($answerVotes);

    await getAnswers();
  };

  const postAnswervote = async (voteType, answerID) => {
    const data = {
      answerID: answerID,
      questionID: questionID,
      userUuid: $userUuid,
      voteType: voteType,
    };

    const response = await fetch("/api/qa/vote/answer", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
    getAllAnswerData();
  };

  function getLatestVoteTime(answerID) {
    const votes = $answerVotes.filter((vote) => vote.answer_id === answerID);
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

  onMount(getQuestionById);
  onMount(getAllAnswerData);
</script>

<main class="font-sans text-base font-normal text-gray-700 bg-surface-400">
  <!-- content -->
  <div class="flex flex-col w-full gap-8 overflow-hidden">
    <div class="flex flex-wrap w-full flex-col gap-8 md:p-10">
      <div class="bg-neutral-10 p-6 md:p-8 border border-gray-200">
        <div
          class="flex flex-wrap flex-row gap-6 mb-12 !items-center !justify-center rounded-xl"
        >
          <!-- Question -->
          <div class="rounded-xl">
            <h1 class="text-lg text-center text-gray-600 px-8 py-2">
              {question.question_text}
            </h1>
          </div>
          <!-- Question end -->

          <!-- Create Answer -->

          <div class="flex w-full max-w-3xl px-6">
            <button
              class=" rounded-xl bg-primary-100 mr-4 bg-primary-100 bg-primary-100 hover:bg-primary-200"
              on:click={() => postNewAnswer()}
            >
              <div class="flex flex-col w-full">
                <p class="text-sm text-gray-600">Create new Answer</p>
                <span class="material-symbols-outlined"> add </span>
              </div>
            </button>
            <div class="flex flex-col w-full">
              <div
                class="rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-100"
              >
                <input
                  type="text"
                  bind:value={newAnswerText}
                  name="answer_text"
                  id="answerTextInput"
                  autocomplete="answer_text"
                  placeholder="   Write answer..."
                  class="text-sm text-center block border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                />
              </div>
            </div>
          </div>

          <!-- Create Answer End-->

          <div class="flex flex-col w-full max-w-3xl">
            <!-- Answers -->

            <!-- LLM answer -->
            <div class="mb-5 flex items-center justify-center">
              <h1 class="text-lg text-center text-gray-600 pb-2">LLM answers</h1>
            </div>

            <div class="!inline-flex !items-center rounded-xl px-2 mx-2">
              <div>
                <p class="text-kg text-gray-600 mb-2">
                  Answer 1: {question.llmanswer1}
                </p>
                <p class="text-kg text-gray-600 mb-2">
                  Answer 2: {question.llmanswer2}
                </p>
                <p class="text-kg text-gray-600 mb-2">
                  Answer 3: {question.llmanswer3}
                </p>
              </div>
            </div>
            <!-- LLM answer end -->
            <section class="p-5">
              <div class="mb-5 flex items-center justify-center">
                <h1 class="text-lg text-center text-gray-600 pb-2">
                  User answers
                </h1>
              </div>

              <!-- List Answers-->

              <div>
                {#each $answers as answer}
                  <div class="space-y-2 py-2">
                    <div class="flex !items-center">
                      <!-- vote answer-->
                      <div
                        class="!inline-flex !items-center rounded-xl mt-4 px-2 mx-2 font-semibold text-gray-900"
                      >
                        <p class="text-kg text-gray-600">
                          {$answerVotes.filter(
                            (obj) =>
                              obj.question_id === parseInt(questionID) &&
                              obj.answer_id === answer.id
                          ).length}
                        </p>
                      </div>
                      <button
                        class="!inline-flex !items-center rounded-xl px-4 pt-2 mr-4 bg-primary-100 hover:bg-primary-200"
                        on:click={() => postAnswervote("upvote", answer.id)}
                      >
                        <div class="flex flex-col w-full">
                          <p class="text-sm text-gray-600">Vote</p>
                          <span class="material-symbols-outlined">
                            arrow_drop_up
                          </span>
                        </div>
                      </button>
                      <!-- vote answer end-->

                      <!-- Answer info -->
                      <div
                        class="!inline-flex !items-center rounded-xl mt-4 px-2 mx-2"
                      >
                        <div>
                          <p class="text-kg text-gray-600">
                            {answer.answer_text}
                          </p>
                          <p class="text-gray-600 text-xs">
                            Post time: {convertToHelsinkiTime(
                              answer.post_time
                            )}
                          </p>
                          {#if $answerVotes.some((vote) => vote.answer_id === answer.id)}
                            <p class="text-gray-600 text-xs">
                              Latest vote time: {convertToHelsinkiTime(
                                getLatestVoteTime(answer.id)
                              )}
                            </p>
                          {/if}
                        </div>
                      </div>
                      <!-- Answer info end-->

                      <!-- delete answer-->
                      {#if answer.user_uuid === $userUuid}
                        <button
                          class="!inline-flex !items-center rounded-xl px-4 pt-2 ml-4 bg-error-300 hover:bg-error-400"
                          on:click={() => delAnswer(answer.id)}
                        >
                          <div class="flex flex-col w-full">
                            <p class="text-sm text-gray-600">Delete</p>
                            <span class="material-symbols-outlined">
                              delete
                            </span>
                          </div>
                        </button>
                      {/if}
                      <!-- delete answer end -->
                    </div>
                  </div>
                {/each}
              </div>
              <!-- List Answers End-->
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
