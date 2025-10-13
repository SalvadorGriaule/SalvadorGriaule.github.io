<script lang="ts">
  import HeaderNav from "../HeaderNav.svelte";
  import LogoLib from "../LogoLib.svelte";

  const lib = [{ titre: "Carousel en cercle", logo: ["svelte"] }];
  let selectLib: number | null = $state(null);
  const clickLib = (num: number) => {
    selectLib = num;
  };
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="mx-20 mt-10 flex flex-col">
    <section class="w-full flex justify-center">
      <div
        class="flex space-x-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <LogoLib name="svelte" mode="no-link" />
        <LogoLib name="vuejs" mode="no-link" />
      </div>
    </section>
    <section class="flex">
      <div
        onclick={() => {
          clickLib(0);
        }}
        class="p-2 w-72 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <h3 class="text-2xl font-semibold">{lib[0].titre}</h3>
        <div class="w-20">
          <LogoLib name={lib[0].logo[0]} mode="no-link" />
        </div>
      </div>
    </section>
    {#if selectLib != null}
      <section>
        <h3 class="text-2xl font-semibold">{lib[selectLib].titre}</h3>
        <div class="w-20">
          <LogoLib name={lib[selectLib].logo[0]} mode="no-link" />
        </div>
      </section>
    {/if}
  </main>
</div>
