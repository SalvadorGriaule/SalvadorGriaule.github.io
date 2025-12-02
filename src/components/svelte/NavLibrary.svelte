<script lang="ts">
  import LogoLib from "./LogoLib.svelte";
  import anime from "animejs";
  import { currentTags } from "@assets/ts/nano";

  const fw = ["all", "svelte", "vuejs", "react", "ts"];
  let widthNav = $state(0);
  let navDiv: null | HTMLDivElement = $state(null);

  const onclick = (tags: "svelte" | "react" | "vuejs"| "ts" | "all") => {
    currentTags.set(tags);
    if (navDiv) {
      anime({
        targets: navDiv,
        translateX: fw.findIndex((elem) => elem == currentTags.get()) * (widthNav/fw.length - 2),
        easing: "easeInOutQuint",
        duration: 500,
      });
    }
  };
</script>

<section class="w-full flex justify-center">
  <div
    class="bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 p-2 backdrop-blur-md"
    >
    <div
    class="relative flex bg-linear-to-br from-neutral-900/70 to-neutral-950/30 rounded-md p-1"
    bind:clientWidth={widthNav}
    >
      <div
        bind:this={navDiv}
        class="absolute top-0 left-0 m-1 w-12 h-12 rounded-md bg-linear-to-br from-neutral-400/50 to-neutral-600/50 md:w-24 md:h-24"
      ></div>
      <button
        onclick={() => onclick("all")}
        class="flex w-12 h-12 flex-col justify-center items-center md:w-24 md:h-24"
      >
        <div class="flex space-x-1 mb-1">
          <LogoLib name="svelte" mode="no-link" classL="w-[0.65em] md:w-[1.15em] " />
          <LogoLib name="vuejs" mode="no-link" classL="w-[0.75em] md:w-[1.5em]" />
        </div>
        <LogoLib name="react" mode="no-link" classL="w-[0.75em] md:w-[1.5em]" />
      </button>
      {#each fw.slice(1) as elem}
        <button onclick={() => onclick(elem)}>
          <LogoLib name={elem} mode="no-link" classL="w-8 mx-2 md:mx-6 md:w-12"/>
        </button>
      {/each}
    </div>
  </div>
</section>
