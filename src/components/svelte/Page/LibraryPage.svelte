<script lang="ts">
  import NavLibrary from "../NavLibrary.svelte";
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
</script>

<main class="mx-20 mt-10 flex flex-col">
  {#if stateSelect == null}
    <NavLibrary />
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
