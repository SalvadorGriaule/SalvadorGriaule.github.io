<script lang="ts">
  // import from lib
  import { OverlayScrollbars } from "overlayscrollbars";
  // import componants
  import HeaderNav from "./HeaderNav.svelte";
  import SliderPerpetuel from "./SliderPerpetuel.svelte";
  import CardProject from "./CardProject.svelte";
  import HomeLib from "./HomeLib.svelte";
  import Footer from "./Footer.svelte";

  // import type
  import { projet } from "@assets/ts/nano.ts";
  import { onMount } from "svelte";

  const nom = "MORALES";
  const prenom = "QUENTIN";
  const techLogo = [
    "vite",
    "svelte",
    "vuejs",
    "fastapi",
    "ts",
    "tailwindcss",
    "django",
    "julia",
  ];

  // variable projet
  
  let y = $state<number>(0);
  let bodySvelte = $state<HTMLDivElement | null>(null);
  let height = $state<number>(0)

  onMount(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: { theme: "" },
    });
  });
</script>

<svelte:window bind:scrollY={y} />
<div bind:this={bodySvelte} class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="flex flex-col items-center">
    <section>
      <div
        class="flex flex-col items-center justify-center my-10 sm:space-x-6 sm:flex-row"
      >
        <div class="flex space-x-[3px]">
          {#each prenom as letter}
            <p
              class="text-7xl font-bold text-[#00809d] duration-100 lg:text-8xl xl:text-9xl block inset"
            >
              {letter}
            </p>
          {/each}
        </div>
        <div class="flex space-x-[3px]">
          {#each nom as letter}
            <p
              class="text-7xl font-bold text-[#00809d] duration-100 lg:text-8xl xl:text-9xl block inset"
            >
              {letter}
            </p>
          {/each}
        </div>
      </div>
    </section>
    <div class="relative z-10">
      <SliderPerpetuel tabSrc={techLogo} />
    </div>
    <div class="relative h-[1305px] w-full z-50"
      style:height={height/2 + "px"}
    >
      <div
        bind:clientHeight={height}
        class="absolute z-20 w-full flex flex-col items-center justify-center"
        style="transform: translateY({-1.1 * y}px)"
      > 
        {#each projet as p}
          <CardProject 
            titre={p.titre}
            description={p.descritption}
            lien={p.lien}
            devices={p.device}
            techUse={p.techUse}
            desktopSrc={p.desktopSrc ? p.desktopSrc : undefined}
            phoneSrc={p.phoneSrc ? p.phoneSrc : undefined}
            dateUpdate={p.date}
          />
        {/each}
        <!-- <CardProject titre="Sneakers"/> -->
      </div>
    </div>
    <HomeLib />
  </main>
</div>

<style>
  .block {
    text-shadow:
      0 1px 0 #00566a,
      0 2px 0 #00566a,
      0 3px 0 #00566a,
      0 4px 0 #00566a,
      0 5px 0 #00566a,
      0 6px 1px rgba(0, 0, 0, 0.1),
      0 0 5px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.3),
      0 3px 5px rgba(0, 0, 0, 0.2),
      0 5px 10px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.2),
      0 20px 20px rgba(0, 0, 0, 0.15);
  }
  .inset:hover {
    text-shadow: #00404e 2px 2px 0;
  }
</style>
