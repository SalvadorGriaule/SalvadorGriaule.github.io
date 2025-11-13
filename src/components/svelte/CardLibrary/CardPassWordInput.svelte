<script lang="ts">
  import PassWordInput from "@svelte/PassWordInput.svelte";
  let boolPW = $state(false);
  let btnForm: HTMLButtonElement | null = $state(null);
</script>

<div class="flex flex-col items-center">
  <div class="bg-white p-2 rounded-2xl drop-shadow-2xl">
    <PassWordInput bind:boolPW />
    <button bind:this={btnForm}>Envoyer</button>
  </div>
</div>
