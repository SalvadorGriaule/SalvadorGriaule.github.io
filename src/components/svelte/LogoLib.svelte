<script lang="ts">
    import djangoLogo from "../../assets/django.svg";
    import svelteLogo from "../../assets/svelte.svg";
    import viteLogo from "../../assets/vite.svg";
    import fastapiLogo from "../../assets/fastapi.svg";
    import vueLogo from "../../assets/vue.svg";
    import tailwindcssLogo from "../../assets/tailwind.svg";
    import tsLogo from "../../assets/typescript.svg";
    import juliaLogo from "../../assets/julia.svg";
    import jsLogo from "../../assets/javascript.svg";
    import laravelLogo from "../../assets/laravel.svg";
    import nuxtLogo from "../../assets/nuxt.svg";

    class Logo {
        name: string;
        link: string;
        svg: string;
        shadowColor: string;
        constructor(
            name: string,
            link: string,
            svg: string,
            shadowColor: string,
        ) {
            this.name = name;
            this.link = link;
            this.svg = svg;
            this.shadowColor = shadowColor;
        }
    }

    const logo: Logo[] = [
        new Logo("vite", "https://vite.dev", viteLogo.src, "#646cffaa"),
        new Logo("vuejs", "https://vuejs.org", vueLogo.src, "#41b883"),
        new Logo(
            "fastapi",
            "https://fastapi.tiangolo.com",
            fastapiLogo.src,
            "#009486",
        ),
        new Logo(
            "tailwindcss",
            "https://tailwindcss.com/",
            tailwindcssLogo.src,
            "#44a8b3",
        ),
        new Logo(
            "ts",
            "https://www.typescriptlang.org/",
            tsLogo.src,
            "#3178c6",
        ),
        new Logo("svelte", "https://svelte.dev/", svelteLogo.src, "#fb3c00"),
        new Logo(
            "django",
            "https://www.djangoproject.com/",
            djangoLogo.src,
            "#0f3e2e",
        ),
        new Logo("julia", "https://julialang.org/", juliaLogo.src, "#ffffff"),
        new Logo(
            "js",
            "https://developer.mozilla.org/fr/docs/Web/JavaScript",
            jsLogo.src,
            "#f7e018",
        ),
        new Logo("laravel", "https://laravel.com/", laravelLogo.src, "#f53003"),
        new Logo("nuxt", "https://nuxt.com/", nuxtLogo.src, "#00dc82"),
    ];

    const getByNameClass = (name: string, tabClass: Logo[]) => {
        if (tabClass[0].name == name) {
            return tabClass[0];
        } else {
            return getByNameClass(name, tabClass.slice(1));
        }
    };

    const {
        name,
        classL = "h-[6em] p-[1.5em]",
        mode = "link",
    }: { name: string; classL?: string; mode?: "link"|"no-link" } = $props();

    const chosenLogo: Logo = getByNameClass(name, logo);
</script>

{#if mode == "link"}
    <a href={chosenLogo.link} class=""
        ><img
            src={chosenLogo.svg}
            class="logo {classL}"
            style="--color: {chosenLogo.shadowColor}"
            alt=""
        /></a
    >
{:else}
    <div class="w-fit h-full flex justify-center items-center">
        <img
            src={chosenLogo.svg}
            class="logo {classL}"
            style="--color: {chosenLogo.shadowColor}"
            alt=""
        />
    </div>
{/if}

<style>
    .logo {
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em var(--color, #ddd));
    }
</style>
