<script lang="ts">
    import type { entrerCV } from "./type";
    import PDFbtn from "./PDFbtn.svelte";

    let { activeRight }:{ activeRight: entrerCV | null } = $props();
</script>

{#if activeRight}
  <div
    class="p-4 shadow-[inset_0px_0px_25px_-3px_rgba(255,207,152,0.3)] bg-sky-950/10 w-full h-full rounded-2xl text-white"
  >
    <div class="flex items-center justify-between">
      <div class="mb-4">
        <h3 class="text-lg">{activeRight.date}</h3>
        <h2 class="text-2xl font-semibold lg:text-xl">{activeRight.titre}</h2>
        {#if activeRight.niveau > 0}
          <p class="text-lg">(niveau bac + {activeRight.niveau})</p>
        {/if}
        <p>
          {activeRight.centre.nom}
        </p>
        <div class="flex items-center space-x-1.5 mt-2">
          <p>Fiche programme :</p>
          <PDFbtn link={activeRight.pdf} />     
        </div>
      </div>
      <div>
        <div class="mr-6 scale-130 lg:w-28 lg:h-28 flex justify-center items-center">
          <img src={activeRight.centre.image} alt={activeRight.centre.nom} />
        </div>
      </div>
    </div>
    <div class="flex">
      <div>
        <div>
          <h2 class="text-2xl font-semibold lg:text-xl">
            {activeRight.stage.nom}
          </h2>
          {activeRight.duréeStage}
        </div>
        <div>
          {#each activeRight.taskStage as elem}
            <p>- {elem}</p>
          {/each}
        </div>
      </div>
      <div class="w-72 h-52 flex justify-center items-center">
        {#if activeRight.stage.image}
          <img src={activeRight.stage.image} alt={activeRight.stage.nom} />
        {:else}
          <p>{activeRight.stage.nom}</p>
        {/if}
      </div>
    </div>
    <div>
      
    </div>
  </div>
{/if}