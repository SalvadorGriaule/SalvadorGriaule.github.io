<script lang="ts">
  // import componants
  import Onglet from "./assets/componants/Onglet.svelte";
  import { currentKey } from "./assets/componants/Onglet.svelte";
  // import svelte
  import { onMount } from "svelte";
  // import flowbit
  import Laptop from "flowbite-svelte/Laptop.svelte";
  import DefaultMockup from "flowbite-svelte/DefaultMockup.svelte";
  // import svg
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "./assets/vite.svg";
  import fastapiLogo from "./assets/fastapi.svg";
  import vueLogo from "./assets/vue.svg"
  import tailwindcssLogo from "./assets/tailwind.svg";
  import tsLogo from "./assets/typescript.svg"

  let carousel: HTMLDivElement;
  let svgOnglet: SVGElement | HTMLImageElement;

  let changingKey = (key: number, tabElem: HTMLCollection) => {
    if (currentKey.currentKey == 1) {
      tabElem[1].classList.remove("translate-x-180");
      tabElem[0].classList.add("-translate-x-180");
    } else {
      tabElem[1].classList.add("translate-x-180");
      tabElem[0].classList.remove("-translate-x-180");
    }
  };

  onMount(() => {
    let elemCarousel = carousel.children;
    $effect(() => {
      changingKey(currentKey.currentKey, elemCarousel);
    });
  });
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <header
    class="sticky top-0 z-50 backdrop-blur-sm flex justify-between p-2 bg-linear-to-br from-neutral-300/30 to-neutral-400/30"
  >
    <h1>Morales Quentin</h1>
    <nav>
      <ul>
        <li>blog</li>
      </ul>
    </nav>
  </header>
  <main class="flex flex-col items-center">
    <h1 class="text-6xl my-10 duration-150 sm:text-7xl">Morales Quentin</h1>
    <div
      class="card w-11/12 p-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md mx-2 backdrop-blur-md relative"
    >
      <h2 class="text-4xl duration-150 mb-4 md:-mb-6">SoMuchWater</h2>
      <ul
        class="px-[14px] flex relative space-x-8 ease-out duration-150 translate-y-0 z-10 md:translate-y-10"
      >
        <Onglet key={0} titre="Smartphone" />
        <Onglet key={1} titre="Laptop" />
      </ul>
      <div
        class="bg-slate-900 relative rounded-r-xl rounded-bl-xl overflow-hidden z-20"
      >
        <div
          bind:this={carousel}
          class="flex justify-center relative w-full h-[420px] xl:h-[480px] 2xl:h-[650px] duration-150"
        >
          <div
            class="z-20 absolute min-w-[180px] w-1/6 self-center duration-150 md:mr-[70%] md:mt-[1.5%] md:translate-x-0 md:self-start xl:w-2/13 2xl:mt-[4.2%]"
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
          <div
            class="z-10 absolute self-center w-4/5 duration-150 translate-x-180 md:translate-x-0"
          >
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
      <div class="mt-3 flex flex-col lg:flex-row">
        <div class="p-2 lg:w-3/5">
          <h3 class="text-3xl">Description</h3>
        </div>
        <div class="p-2 lg:w-2/5 lg:border-l-2 border-black">
          <h3 class="text-3xl mb-2">Technologie utilisé</h3>
          <div class="flex flex-wrap space-x-2 space-y-2">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} class="logo" alt="Vite Logo" />
            </a>
            <a href="https://vuejs.org" target="_blank" rel="noreferrer">
              <img src={vueLogo} class="logo vuejs" alt="vuejs logo">
            </a>
            <a href="https://fastapi.tiangolo.com" target="_blank" rel="noreferrer">
              <img src={fastapiLogo} class="logo fastapi" alt="fastapi logo">
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
              <img src={tailwindcssLogo} class="logo tailwindcss" alt="logo tailwindcss">
            </a>
            <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
              <img src={tsLogo} class="logo ts" alt="typescript logo">
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
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
  .logo.fastapi:hover {
    filter: drop-shadow(0 0 2em #009486)
  }
  .logo.vuejs:hover {
    filter: drop-shadow(0 0 2em #41b883);
  }
  .logo.tailwindcss:hover {
    filter: drop-shadow(0 0 2em #44a8b3);
  }
  .logo.ts:hover {
    filter: drop-shadow(0 0 2em #3178c6);
  }
</style>
