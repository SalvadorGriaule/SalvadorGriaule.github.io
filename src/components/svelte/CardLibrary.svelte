<script lang="ts">
  import LogoLib from "./LogoLib.svelte";

  let {
    titre,
    logo,
    currentSelect = $bindable(null),
    id,
    children,
  }: {
    titre: string;
    logo: "svelte" | "vuejs";
    currentSelect: number | null;
    id:number;
    children: any;
  } = $props();

  const clickLib = (num: number) => {
    currentSelect == num ? (currentSelect = null) : (currentSelect = num);
  };
</script>

<button
  onclick={() => {
    clickLib(id);
  }}
  class="p-2 w-96 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
>
  <div class="flex justify-between items-center">
    <h3 class="text-2xl font-semibold">{titre}</h3>
    <div class="w-18">
      <LogoLib
        name={logo}
        mode="no-link"
        classL={"h-[1.75em] px-1"}
      />
    </div>
  </div>
  <div
    class="flex justify-center my-2 bg-linear-to-br from-neutral-900/70 to-neutral-950/30 rounded-md p-2"
  >
   {@render children()}
  </div>
</button>
