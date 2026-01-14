<script lang="ts">
  import type { entrerCV } from "./type";
  import PDFFile from "@assets/Pdf-file.svg"

  let { activeRight }: { activeRight: entrerCV | null } = $props();
</script>

{#if activeRight}
  <div
    class="p-4 shadow-[inset_0px_0px_25px_-3px_rgba(255,207,152,0.3)] bg-sky-950/10 w-full h-full rounded-2xl"
  >
    <div class="flex">
      <div class="mb-4">
        <h3 class="text-lg">{activeRight.date}</h3>
        <h2 class="lg:text-xl">{activeRight.titre}</h2>
        <p>
          {activeRight.centre.nom}
        </p>
        <div class="flex items-center space-x-1">
          <p>Fiche programme : </p>
          <a class="text-white font-semibold bg-red-600 p-1 rounded-4xl " href={activeRight.pdf}><div class="flex"><div class="w-8 p-1 bg-white rounded-full"><img src="{PDFFile.src}" alt=""></div><p class="mx-1 font-bold">PDF</p></div> </a>
        </div>
      </div>
      <div>
        <div class="w-28 h-28 flex justify-center items-center">
          <img src={activeRight.centre.image} alt={activeRight.centre.nom} />
        </div>
      </div>
    </div>
    <div class="flex">
      <div>
        <div>
          <h2 class="text-xl">
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
  </div>
{/if}
