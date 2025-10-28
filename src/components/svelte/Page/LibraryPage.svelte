<script lang="ts">
  import NavLibrary from "../NavLibrary.svelte";
  import CardLibrary from "../CardLibrary.svelte";
  // import module
  import { type LibInfo, type fwf } from "../type";
  import { currentSelect, currentTags } from "../../../assets/ts/nano";

  // import img
  

  let { lib }: { lib: LibInfo[] } = $props();
  let stateSelect: number | null = $state(null);
  let stateTags: fwf = $state("all");

  currentSelect.listen((val) => {
    stateSelect = val;
  });
  currentTags.listen((val) => {
    stateTags = val;
  });
</script>

<main class="mx-20 mt-10 flex flex-col">
  {#if stateSelect == null}
    <NavLibrary />
    <section class="flex">
      {#if stateTags == "all"}
        <CardLibrary titre={lib[0].titre} logo={lib[0].logo} id={0} media={lib[0].media} />
      {/if}
    </section>
  {/if}
</main>
