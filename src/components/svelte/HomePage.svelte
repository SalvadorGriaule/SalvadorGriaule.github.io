<script lang="ts">
  // import componants
  import HeaderNav from "./HeaderNav.svelte";
  import SliderPerpetuel from "./SliderPerpetuel.svelte";
  import CardProject from "./CardProject.svelte";
  // import componants image
  import SMWPhone from "../../../public/img/SoMuchWaterPhone.png";
  import SMWLaptop from "../../../public/img/SoMuchWaterDesktop.png";

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
  const techSMW = ["vite","vuejs","fastapi","ts","tailwindcss","julia"]

  let y: number;
</script>

<svelte:window bind:scrollY={y} />
<div class="bg-linear-to-br from-slate-600 to-slate-900">
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
      class="relative z-20 w-full flex justify-center"
      style="transform: translateY({-1.1 * y}px)"
    >
      <CardProject titre="SoMuchWater" desktopSrc={SMWLaptop.src} phoneSrc={SMWPhone.src} description="ici" techUse={techSMW}/>
      <!-- <CardProject titre="Sneakers"/> -->
    </div>
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
