<script lang="ts">
  // import from lib
  import { OverlayScrollbars } from "overlayscrollbars";
  import { useIntersectionObserver } from "runed";
  // import componants
  import HeaderNav from "./HeaderNav.svelte";
  import SliderPerpetuel from "./SliderPerpetuel.svelte";
  import CardProject from "./CardProject.svelte";
  import HomeLib from "./HomeLib.svelte";
  import CVScroll from "./CVScroll.svelte";
  import Contact from "./Contact.svelte";
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

  let y = $state(0);
  let widthScreen = $state(0);
  let heightScreen = $state(0);
  let bodySvelte = $state<HTMLDivElement | null>(null);
  let divProjet = $state<HTMLElement | null>(null);
  let height = $state(0);

  let isIntersecting = $state(false);
  let slowParralax = 0
  let beginSlow = 0
  let factorSlow = $derived(widthScreen > 768 ? 0.1 : 0.8)
  let factorParallax = $derived.by(() => {
    if (!isIntersecting) {
      beginSlow = 0
      return -1.1;
    } else {
      if (beginSlow == 0) beginSlow = y
      slowParralax = factorSlow * ((y - beginSlow)/((bodySvelte.clientHeight - heightScreen) - beginSlow))
      return -1.1 + slowParralax
    }
  });
  let classIntererting = $derived(
    isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-50",
  );
  
  let heightScrollCV = $state(0);

  let thresholdResponsive = $derived(widthScreen > 768 ? 0.4 : 0.1);
  $effect(() => {
    useIntersectionObserver(
      () => divProjet,
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isIntersecting = entry.isIntersecting;
      },
      { threshold: [thresholdResponsive], rootMargin: "0px" },
    );
  });

  onMount(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: { theme: "" },
    });
  });
</script>

<svelte:window
  bind:scrollY={y}
  bind:innerWidth={widthScreen}
/>
<svelte:body bind:clientHeight={heightScreen}/>
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
    <div
      class="relative h-[1305px] w-full z-50"
      style:height={height / 2 + "px"}
    >
      <div
        bind:clientHeight={height}
        class="absolute z-20 w-full flex flex-col items-center justify-center"
        style="transform: translateY({factorParallax * y}px)"
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
            isVid={p.isVid}
          />
        {/each}
      </div>
    </div>
    <div
      class="pt-24 w-full {classIntererting} duration-700 lg:pt-8"
      bind:this={divProjet}
    >
      <HomeLib />
    </div>
    <div class="relative w-full h-[200rem]" bind:clientHeight={heightScrollCV}>
      <CVScroll heightParent={heightScrollCV} scrollY={y} />
    </div>
  </main>
  <Footer />
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
