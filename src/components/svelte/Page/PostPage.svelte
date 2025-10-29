<script lang="ts">
  import HeaderNav from "../HeaderNav.svelte";
  import PostList from "../PostList.svelte";
  import DisplayMarkDown from "../DisplayMarkDown.svelte";
  const { post, content, listPost } = $props();
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="mx-20 mt-10 flex justify-between">
    <section>
      <DisplayMarkDown
        post={{
          content: content,
          date: post.frontmatter.date,
          titre: post.frontmatter.title,
        }}
      />
    </section>
    <aside>
      <PostList {listPost} />
    </aside>
  </main>
</div>
