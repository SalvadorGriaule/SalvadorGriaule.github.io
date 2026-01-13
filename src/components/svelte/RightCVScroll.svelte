<script lang="ts">
  import type { entrerCV } from "./type";

  let { activeRight }: { activeRight: entrerCV | null } = $props();
</script>

{#if activeRight}
  <div class="p-2 shadow-[inset_0px_0px_25px_-3px_rgba(255,207,152,0.3)]">
    <h3>{activeRight.date}</h3>
    <h2>{activeRight.titre}</h2>
    <div>
      {activeRight.centre.nom}
      <div class="w-24 h-24 flex justify-center items-center">
        <img src={activeRight.centre.image} alt={activeRight.centre.nom} />
      </div>
      <a href={activeRight.pdf}>pdf</a>
    </div>
    <div>
      {activeRight.stage.nom}
      <div class="w-24 h-24 flex justify-center items-center">
        {#if activeRight.stage.image}
          <img src={activeRight.stage.image} alt={activeRight.stage.nom} />
        {:else}
          <p>{activeRight.stage.nom}</p>
        {/if}
      </div>
      {activeRight.duréeStage}
      {#each activeRight.taskStage as elem}
        <p>{elem}</p>
      {/each}
    </div>
  </div>
{/if}
