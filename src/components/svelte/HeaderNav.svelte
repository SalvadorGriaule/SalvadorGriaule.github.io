<script>
  let y
</script>
<svelte:window bind:scrollY={y}/>
<header
class="sticky top-0 z-50 backdrop-blur-sm flex justify-between p-2 bg-linear-to-br from-neutral-300/30 to-neutral-400/30"
>
<h1>Morales Quentin</h1>
<nav>
  <ul class="flex space-x-2">
    <li>{y}</li>
    <li>blog</li>
  </ul>
</nav>
</header>