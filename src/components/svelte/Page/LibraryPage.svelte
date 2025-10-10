<script lang="ts">
  import HeaderNav from "../HeaderNav.svelte";
  import LogoLib from "../LogoLib.svelte";
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="mx-20 mt-10 flex flex-col">
    <section class="w-full flex justify-center">
      <div
        class="flex space-x-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <LogoLib name="svelte" />
        <LogoLib name="vuejs" />
      </div>
    </section>
    <section>
      <div
        class="p-2 w-72 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <h3 class="text-2xl font-semibold">Carousel en cercle</h3>
        <div class="w-20">
          <LogoLib name="svelte" />
        </div>
      </div>
    </section>
  </main>
</div>
