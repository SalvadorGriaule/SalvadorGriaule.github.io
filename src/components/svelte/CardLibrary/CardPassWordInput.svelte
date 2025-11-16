<script lang="ts">
  import PassWordInput from "@svelte/PassWordInput.svelte";
  let boolPW = $state(false);
  let disabled = $derived(!boolPW)
  
</script>

<div class="flex flex-col items-center justify-center w-full h-[50vh]">
  <div class="bg-white p-2 rounded-2xl drop-shadow-2xl w-full lg:w-3/4">
    <PassWordInput bind:boolPW />
    <div class="w-full flex justify-center mt-2">
      <button {disabled} class="p-2 rounded-2xl bg-green-600 text-white disabled:bg-gray-600">Envoyer</button>
    </div>
  </div>
</div>
