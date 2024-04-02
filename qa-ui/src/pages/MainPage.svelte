<script>
  import { onMount } from "svelte";
  import { courses } from "../stores/courseStore.js";

  const getCourses = async () => {
    const response = await fetch("/api/courses", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();
    courses.set(jsonData);
    console.log($courses);
  };

  onMount(getCourses);
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
        <div class="flex flex-wrap flex-row gap-6 my-2">
          <!-- Search-->
          <div class="pt-2 relative mx-auto text-gray-600">
            <input
              class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
              <span class="material-symbols-outlined">Search</span>
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </button>
          </div>

          <!-- Courses -->
          <section class="p-6">
            <div class="mb-4 flex items-center justify-between">
              <h4 class="font-medium text-slate-500">Courses</h4>
              <div
                class="rounded-md bg-pink-400/70 px-2 font-semibold text-gray-900"
              >
                {$courses.length}
              </div>
            </div>

            <!-- List courses-->
            <div>
              {#each $courses as course}
                <div class="space-y-2 py-2">
                  <a
                    href="/courses/{course.id}"
                    class="flex space-x-4 rounded-xl bg-white p-4 shadow-sm hover:bg-primary-100"
                  >
                    <div>
                      <h1 class="font-semibold  text-gray-600">
                        {course.title}
                      </h1>
                      <p class="text-sm text-slate-400 ">
                        {course.course_description}
                      </p>
                    </div>
                  </a>
                </div>
              {/each}
            </div>
            <!-- List courses End-->
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
