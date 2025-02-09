<script lang="ts">
  import Laptop from "flowbite-svelte/Laptop.svelte";
  import onglet from "./assets/onglet.svg";
  import Onglet from "./assets/componants/Onglet.svelte";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "./assets/vite.svg";
  import DefaultMockup from "flowbite-svelte/DefaultMockup.svelte";

  let svgOnglet: SVGElement | HTMLImageElement;
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <header
    class="flex justify-between p-2 bg-linear-to-br from-neutral-300/30 to-neutral-400/30"
  >
    <h1>Morales Quentin</h1>
    <nav>
      <ul>
        <li>blog</li>
      </ul>
    </nav>
  </header>
  <main class="flex flex-col items-center">
    <h1 class="text-7xl my-10">Morales Quentin</h1>
    <div
      class="card w-11/12 p-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md mx-2 backdrop-blur-md"
    >
      <h2 class="text-4xl mb-4">SoMuchWater</h2>
      <ul class="hidden md:flex">
        <li>
          <Onglet />
        </li>
      </ul>
      <div class="bg-slate-900 rounded-r-xl rounded-bl-xl">
        <div
          class="flex justify-center relative w-full h-[420px] xl:h-[460px]"
        >
          <div
            class="z-20 mr-[70%] mt-[1.5%] absolute min-w-[180px] w-1/6 xl:w-2/13"
          >
            <DefaultMockup
              slot="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800"
              div="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-full w-full"
              top="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[10%] rounded-l-lg"
              leftTop="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[27%] rounded-l-lg"
              leftBot="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[45%] rounded-l-lg"
              right="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[45%] rounded-r-lg"
            >
              <img src="/img/SoMuchWaterPhone.png" alt="" />
            </DefaultMockup>
          </div>
          <div class="z-10 absolute self-center w-4/5">
            <Laptop
              bot="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm  h-[21px] max-w-full"
              inner="rounded-lg overflow-hidden h-full bg-white dark:bg-gray-800"
              div="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-full max-w-7/8"
            >
              <img src="/img/SoMuchWaterDesktop.png" alt="" />
            </Laptop>
          </div>
        </div>
      </div>
      <h3 class="text-3xl">Description</h3>
    </div>
  </main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
</div>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
