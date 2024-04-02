<script>
  function goBack() {
    window.history.back();
  }
</script>

<!-- navigation rail -->

<div
  class="w-full md:w-24 fixed left-0 md:top-0 bottom-0 right-0 md:h-screen flex items-center flex-row md:flex-col gap-8 py- z-50"
>
  <!-- list menu -->

  <!-- Back button -->
  <div
    class="w-full justify-center flex flex-row items-center pt-4 px-4 md:w-auto md:flex-col md:gap-4"
  >
    <button
      class="group min-h-[56px] w-1/4 md:w-auto flex flex-col items-center justify-center"
      on:click={goBack}
    >
      <div
        class="relative w-14 h-8 hover-icon group-hover:bg-secondary-100 dark:group-hover:bg-secondary-700 group-hover:bg-opacity-80 dark:group-hover:bg-opacity-80 flex items-center justify-center rounded-2xl"
      >
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
      </div>
      <p
        class="text-xs text-neutral-900 dark:text-neutral-100 tracking-[.0416em] leading-tight"
      >
        Back
      </p>
    </button>
  </div>
  <!-- Back button end -->

  <!-- Home button -->
  <div
    class="w-full justify-center flex flex-row items-center pt-4 px-4 md:w-auto md:flex-col md:gap-4"
  >
    <a
      href="/"
      class="group min-h-[56px] w-1/4 md:w-auto flex flex-col items-center justify-center"
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
  <!-- Home button end -->

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
        <span class="material-symbols-outlined dark-hidden">light_mode</span>
        <span class="material-symbols-outlined dark-block">dark_mode</span>
      </button>
    </div>
  </div>
</div>
