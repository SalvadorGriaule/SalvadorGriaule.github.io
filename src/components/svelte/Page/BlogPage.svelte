<script lang="ts">
  import { OverlayScrollbars } from "overlayscrollbars";
  // import componants
  import HeaderNav from "../HeaderNav.svelte";
  import { onMount } from "svelte";

  let bodySvelte: null | HTMLDivElement = $state(null);

  const { posts } = $props();

  onMount(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: { theme: "" },
    });    
  });
</script>

<div bind:this={bodySvelte} class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main>
    {#each posts as post}
        <div class="text-white text-2xl font-semibold px-2.5">
            {post.frontmatter.title}
        </div>
    {/each}
  </main>
</div>
