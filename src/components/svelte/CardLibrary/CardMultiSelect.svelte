<script lang="ts">
  import MultiSelect, { clear } from "@svelte/MultiSelect.svelte";
  import DB from "@assets/json/catg.json";
  import DBLuxe from "@assets/json/luxe.json";

  let switchTog = $state(false);
  let currentDB = $state(DB.data);
  let selected: string[] = $state([]);
  let enableSearch = $state(false);
  let enableAff = $state(false);

  const onclick = () => {
    switchTog = !switchTog;
    clear();
    currentDB = !switchTog ? DB.data : DBLuxe.data;
  };
</script>

<section class="flex justify-center items-center h-full">
  <div class="flex flex-col p-2 bg-gray-400 rounded-xl space-y-2 lg:space-y-2  lg:space-x-3 lg:flex-row">
    <div
      class="flex flex-col items-center p-3 border-4 border-black rounded-xl"
    >
      <div class="p-2 flex space-x-2 items-center">
        <div class="flex flex-col items-center">
          <p>Réalisateur selon pays</p>
          <p>parent non clickable</p>
        </div>
        <button
          {onclick}
          aria-label="switch"
          class="{switchTog
            ? 'bg-green-500'
            : 'bg-slate-500'} flex items-center p-2 h-6 w-20 rounded-xl duration-150"
        >
          <div
            class="bg-slate-200 rounded-full w-4 h-4 duration-150 {switchTog
              ? 'ml-[75%]'
              : 'ml-0'}"
          ></div>
        </button>
        <div class="flex flex-col items-center">
          <p>tags pour objet de luxe</p>
          <p>parent clickable</p>
        </div>
      </div>
      <div class="p-2 shadow-2xl rounded-xl w-96 bg-white">
        <MultiSelect
          dataForMS={currentDB}
          name={!switchTog ? "Réalisateur" : "Catégorie"}
          mainClick={!switchTog ? false : true}
          affSelected={enableAff}
          searchMode={enableSearch}
          bind:selected
        />
      </div>
    </div>
    <div class="p-2 border-4 border-black rounded-xl">
      <div>
        <div>
          <div class="flex space-x-2">
            <input
              bind:checked={enableSearch}
              type="checkbox"
              name="search"
              id=""
            />
            <p>Enable search</p>
          </div>
          <div class="flex space-x-2">
            <input
              bind:checked={enableAff}
              type="checkbox"
              name="affichage"
              id=""
            />
            <p>Enable affichage</p>
          </div>
        </div>
        <div class="border-2 border-black h-40 mt-2 rounded-lg">
          {#each selected as elem}
            <p>{elem}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
