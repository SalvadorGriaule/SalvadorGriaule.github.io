<script lang="ts">
  import LogoLib from "./LogoLib.svelte";
  import anime from "animejs";
  import { currentTags } from "../../assets/ts/nano";

  const fw = ["all", "svelte", "vuejs", "react"];
  let widthNav = $state(0);
  let navDiv: null | HTMLDivElement = $state(null);

  const onclick = (tags: "svelte" | "react" | "vuejs" | "all") => {
    currentTags.set(tags);
    if (navDiv) {
      anime({
        targets: navDiv,
        translateX: fw.findIndex((elem) => elem == currentTags.get()) * (widthNav/4 - 2),
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
        class="absolute top-0 left-0 m-1 w-24 h-24 rounded-md bg-linear-to-br from-neutral-400/50 to-neutral-600/50"
      ></div>
      <button
        onclick={() => onclick("all")}
        class="flex w-24 h-24 flex-col justify-center items-center"
      >
        <div class="flex space-x-1 mb-1">
          <LogoLib name="svelte" mode="no-link" classL="w-[1.15em] " />
          <LogoLib name="vuejs" mode="no-link" classL="w-[1.5em]" />
        </div>
        <LogoLib name="react" mode="no-link" classL="w-[1.5em]" />
      </button>
      {#each fw.slice(1) as elem}
        <button onclick={() => onclick(elem)}>
          <LogoLib name={elem} mode="no-link" classL="w-12 mx-6"/>
        </button>
      {/each}
    </div>
  </div>
</section>
