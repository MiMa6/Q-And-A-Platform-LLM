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

<body
  class="font-sans text-base font-normal text-gray-700 dark:text-gray-200 bg-surface-400 dark:bg-surfacedark-200"
>
  <header>
    <div
      class="w-full p-10 md:auto top-4 bg-surface-400 dark:bg-surfacedark-200 md:bg-transparent md:dark:bg-transparent flex flex-col items-center justify-between md"
    >
      <!-- title -->
      <h2 class="text-3xl">Q&A Platform</h2>
      <!-- sub title -->
      <h2 class="text-xl">Modern Web Development| Front-end | Back-end</h2>
    </div>
  </header>

  <main class="flex flex-row gap-8 md:pl-24 px-2 md:pr-0 pt-20 md:pt-0">
    <!-- navigation rail -->
    <div
      class="w-full md:w-24 fixed left-0 md:top-0 bottom-0 right-0 md:h-screen flex items-center flex-row md:flex-col gap-8 py-4 bg-surface-400 dark:bg-surfacedark-200 z-50"
    >
      <!-- list menu -->
      <div
        class="w-full md:w-auto justify-center flex flex-row md:flex-col items-center md:gap-4"
      >
        <a
          href="/"
          class="group min-h-[56px] w-1/4 md:w-auto flex flex-col items-center justify-center px-0 gap-1"
        >
          <div
            class="relative w-14 h-8 hover-icon group-hover:bg-secondary-100 dark:group-hover:bg-secondary-700 group-hover:bg-opacity-80 dark:group-hover:bg-opacity-80 flex items-center justify-center rounded-2xl"
          >
            <span class="material-symbols-outlined">home</span>
          </div>
          <p
            class="text-xs text-neutral-900 dark:text-neutral-100 tracking-[.0416em] leading-tight"
          >
            Home
          </p>
        </a>
      </div>

      <!-- Theme buttons -->
      <!-- light dark -->
      <div class="hidden md:flex flex-col items-center gap-3 mt-auto">
        <div
          class="relative"
          aria-label="Brightness"
          data-microtip-position="top"
          role="tooltip"
        >
          <!-- light & dark -->
          <button
            data-type="theme"
            id="lightdark"
            class="material-symbols-outlined relative !inline-flex !items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-surface-300 focus:bg-surface-400 dark:text-primary-200 dark:hover:bg-surfacedark-300 dark:focus:bg-surfacedark-400"
          >
            <span class="material-symbols-outlined dark-hidden">light_mode</span
            >
            <span class="material-symbols-outlined dark-block">dark_mode</span>
          </button>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="flex flex-col w-full gap- md:gap- overflow-hidden">
      <div
        class="flex flex-wrap w-full flex-col gap-8 md:p-10 bg-surface-400 dark:bg-surfacedark-100 rounded-2xl"
      >
        <div
          class="bg-neutral-10 dark:bg-neutral-900 p-6 md:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl"
        >
          <div class="flex flex-wrap flex-row gap-6 mb-12">
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
            <section class="p-5">
              <div class="mb-5 flex items-center justify-between">
                <h4 class="font-medium text-slate-500">Courses</h4>
                <div
                  class="rounded-md bg-pink-400/70 px-2 font-semibold text-gray-900"
                >
                  {$courses.length}
                </div>
              </div>

              <!-- Example-->
              <div>
                {#each $courses as course}
                  <div class="space-y-2">
                    <div
                      class="flex space-x-4 rounded-xl bg-white p-3 shadow-sm"
                    >
                      <div>
                        <h4 class="font-semibold text-gray-600">
                          {course.title}
                        </h4>
                        <p class="text-sm text-slate-400">
                          {course.course_description}
                        </p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                {/each}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</body>
