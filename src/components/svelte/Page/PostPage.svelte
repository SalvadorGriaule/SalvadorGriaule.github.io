<script lang="ts">
  import { onMount } from "svelte";
  import HeaderNav from "../HeaderNav.svelte";
  import PostList from "../PostList.svelte";
  const { post, content, listPost } = $props();

  let bodySvelte: null | HTMLDivElement = $state(null);
  let contentDiv: null | HTMLDivElement = $state(null);

  const date = new Date(post.frontmatter.date);

  const stylization = (
    targetElem: HTMLElement,
    tabRule: [string, string][]
  ) => {
    targetElem.style.setProperty(tabRule[0][0], tabRule[0][1]);

    if (tabRule.length > 1) return stylization(targetElem, tabRule.slice(1));
  };

  const stylizing = (
    targetElem: HTMLElement[],
    css: Record<string, string>
  ) => {
    if (targetElem[0]) stylization(targetElem[0], Object.entries(css));
    if (targetElem.length > 1) return stylizing(targetElem.slice(1), css);
  };

  onMount(() => {
    if (contentDiv) {
      const h3 = contentDiv.querySelectorAll("h3");
      const pImage = contentDiv.querySelectorAll("p:has(img)");

      const h3CSS = {
        "font-size": "2.15rem",
        "font-weight": "600",
      };
      stylizing(Array.from(h3), h3CSS);
    }
  });
</script>

<div bind:this={bodySvelte} class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="mx-20 mt-10 flex justify-between">
    <section>
      <h2 class="text-white text-5xl font-semibold p-2">
        {post.frontmatter.title}
      </h2>
      <h4 class="text-white ps-2">{date.toLocaleDateString()}</h4>
      <div bind:this={contentDiv} id="postContent" class="">
        {@html content}
      </div>
    </section>
    <aside>
      <PostList {listPost} />
    </aside>
  </main>
</div>

<style>
  #postContent {
    padding: 10px;
    color: white;
  }
</style>
