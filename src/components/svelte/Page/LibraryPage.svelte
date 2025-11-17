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

  const filterTag = () => {
    let result: Map<number, LibInfo> = new Map();
    for (let [k, v] of lib) {
      if(v.logo.includes(stateTags)) result.set(k,v)
    }
    
    return result
  };

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
        {#each lib as [k, elem]}
          <CardLibrary
            titre={elem.titre}
            logo={elem.logo}
            id={k}
            media={elem.media}
          />
        {/each}
      {:else}
        {#each filterTag() as [k,elem]}
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
