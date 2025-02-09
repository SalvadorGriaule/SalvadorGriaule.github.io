<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import { DeviceMockup } from "flowbite-svelte";
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <header
    class="flex justify-between p-2 bg-linear-to-br from-neutral-300/30 to-neutral-400/30"
  >
    <h1>Morales Quentin</h1>
    <nav>
      <ul>
        <li>blog</li>
      </ul>
    </nav>
  </header>
  <main class="flex flex-col items-center">
    <h1 class="text-7xl my-10">Morales Quentin</h1>
    <div
      class="card w-11/12 p-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md mx-2 backdrop-blur-md"
    >
      <h2 class="text-4xl">SoMuchWater</h2>
      <div class="flex items-end relative">
        <div class="z-20">
          <DeviceMockup>
            <img src="/img/SoMuchWaterPhone.png" alt="" />
          </DeviceMockup>
        </div>
        <div class="z-10">
          <DeviceMockup device="laptop">
            <img src="/img/SoMuchWaterDesktop.png" alt="" />
          </DeviceMockup>
        </div>
      </div>
    </div>
  </main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
</div>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
