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
        class="relative w-14 h-8 hover-icon group-hover:bg-secondary-100 group-hover:bg-opacity-80 flex items-center justify-center rounded-2xl"
      >
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
      </div>
      <p
        class="text-xs text-neutral-900 tracking-[.0416em] leading-tight"
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
        class="relative w-14 h-8 hover-icon group-hover:bg-secondary-100  group-hover:bg-opacity-80  flex items-center justify-center rounded-2xl"
      >
        <span class="material-symbols-outlined">home</span>
      </div>
      <p
        class="text-xs text-neutral-900  tracking-[.0416em] leading-tight"
      >
        Home
      </p>
    </a>
  </div>
  <!-- Home button end -->
</div>
