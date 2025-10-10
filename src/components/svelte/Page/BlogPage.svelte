<script lang="ts">
  import { OverlayScrollbars } from "overlayscrollbars";
  // import componants
  import HeaderNav from "../HeaderNav.svelte";
  import PostList from "../PostList.svelte";
  import DisplayMarkDown from "../DisplayMarkDown.svelte";
  import { onMount } from "svelte";

  let bodySvelte: null | HTMLDivElement = $state(null);

  const { posts, content } = $props();
  console.log(content);

  onMount(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: { theme: "" },
    });
  });
</script>

<div bind:this={bodySvelte} class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="mx-20 mt-10 flex justify-between">
    <section>
      {#each content as post}
        <DisplayMarkDown {post} />
      {/each}
    </section>
    <aside>
      <PostList listPost={posts} />
    </aside>
  </main>
</div>
