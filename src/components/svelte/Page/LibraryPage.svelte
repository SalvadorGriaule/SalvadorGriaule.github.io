<script lang="ts">
  import NavLibrary from "../NavLibrary.svelte";
  import CardLibrary from "../CardLibrary.svelte";
  // import module
  import { type LibInfo, type fwf } from "../type";
  import { currentSelect, currentTags } from "@assets/ts/nano";

  // import img

  let { lib }: { lib: Map<number, LibInfo> } = $props();
  let stateSelect: number | null = $state(null);
  let stateTags: fwf = $state("all");
  let widthPage = $state(0);

  const filterTag = () => {
    let result: Map<number, LibInfo> = new Map();
    for (let [k, v] of lib) {
      if (v.logo.includes(stateTags)) result.set(k, v);
    }

    return result;
  };

  currentSelect.listen((val) => {
    stateSelect = val;
  });
  currentTags.listen((val) => {
    stateTags = val;
  });
</script>

<svelte:window bind:innerWidth={widthPage} />

<main
  class="mt-4 flex flex-col md:mx-20 md:mt-10 relative"
>
  {#if stateSelect == null}
    <NavLibrary />
    <section class="flex flex-wrap">
      {#if stateTags == "all"}
        {#each lib as [k, elem]}
          <CardLibrary
            titre={elem.titre}
            logo={elem.logo}
            id={k}
            media={elem.media}
          />
        {/each}
      {:else}
        {#each filterTag() as [k, elem]}
          <CardLibrary
            titre={elem.titre}
            logo={elem.logo}
            id={k}
            media={elem.media}
          />
        {/each}
      {/if}
    </section>
  {/if}
</main>
