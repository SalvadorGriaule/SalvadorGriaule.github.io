<script lang="ts">
  // import componants
  import Onglet from "./Onglet.svelte";
  import { currentKey } from "./Onglet.svelte";
  import LogoLib from "./LogoLib.svelte";
  import SliderPerpetuel from "./SliderPerpetuel.svelte";
  // import svelte
  import { onMount } from "svelte";
  // import flowbit
  import Laptop from "flowbite-svelte/Laptop.svelte";
  import DefaultMockup from "flowbite-svelte/DefaultMockup.svelte";
  // import img
  import SMWPhone from "../../../public/img/SoMuchWaterPhone.png"
  import SMWLaptop from "../../../public/img/SoMuchWaterDesktop.png"

  let carousel: HTMLDivElement;

  let changingKey = (key: number, tabElem: HTMLCollection) => {
    if (currentKey.currentKey == 1) {
      tabElem[1].classList.remove("translate-x-180");
      tabElem[0].classList.add("-translate-x-180");
    } else {
      tabElem[1].classList.add("translate-x-180");
      tabElem[0].classList.remove("-translate-x-180");
    }
  };

  const nom = "MORALES"
  const prenom = "QUENTIN"
  const techLogo = ["vite","svelte","vuejs","fastapi","ts","tailwindcss","django","julia"]

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
    <section>
      <div class="flex flex-col items-center justify-center my-10 sm:space-x-6 sm:flex-row">
        <div class="flex space-x-[3px]">
          {#each nom as letter}
            <p class="text-7xl font-bold text-[#00809d] duration-100 lg:text-8xl xl:text-9xl block inset">{letter}</p>
          {/each}
        </div>
        <div class="flex space-x-[3px]">
          {#each prenom as letter}
            <p class="text-7xl font-bold text-[#00809d] duration-100 lg:text-8xl xl:text-9xl block inset">{letter}</p>
          {/each}
        </div>
      </div>
      <SliderPerpetuel tabSrc={techLogo}/>
    </section>
    <div
      class="card w-11/12 p-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md mx-2 backdrop-blur-md relative"
    >
      <h2 class="text-5xl duration-150 mb-4 md:-mb-6">SoMuchWater</h2>
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
              <img src={SMWPhone.src} alt="" />
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
              <img src={SMWLaptop.src} alt="" />
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
          <LogoLib name="vite" />
          <LogoLib name="vuejs" />
          <LogoLib name="fastapi" />
          <LogoLib name="tailwindcss" />
          <LogoLib name="ts" />
          <LogoLib name="julia"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .block{
    text-shadow: 0 1px 0 #00566a, 0 2px 0 #00566a, 0 3px 0 #00566a, 0 4px 0 #00566a, 0 5px 0 #00566a, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
  }
  .inset:hover{
    text-shadow: #00404e 2px 2px 0;
  }
</style>
