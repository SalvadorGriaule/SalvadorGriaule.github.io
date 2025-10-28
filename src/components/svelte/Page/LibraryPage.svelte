<script lang="ts">
  import LogoLib from "../LogoLib.svelte";
  import CardLibrary from "../CardLibrary.svelte";
  // import module
  import { type LibInfo } from "../type";
  import { currentSelect } from "../../../assets/ts/nano";

  // import img
  import CarouselGif from "../../../../public/img/CircleCarCut.webm";

  let { lib }: { lib: LibInfo[] } = $props();
  let stateSelect: number | null = $state(null);
  currentSelect.listen((val) => {
    stateSelect = val;
  });
  //$inspect(currentSelect.get(),stateSelect)
</script>

<main class="mx-20 mt-10 flex flex-col">
  {#if stateSelect == null}
    <section class="w-full flex justify-center">
      <div
        class="flex space-x-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <LogoLib name="svelte" mode="no-link" />
        <LogoLib name="vuejs" mode="no-link" />
        <LogoLib name="react" mode="no-link" />
      </div>
    </section>
    <section class="flex">
      <CardLibrary titre={lib[0].titre} logo={["svelte", "react"]} id={0}>
        <video
          class="w-44"
          src={CarouselGif}
          autoplay
          loop
          muted
          disablepictureinpicture><track kind="captions" /></video
        >
      </CardLibrary>
    </section>
  {/if}
</main>
