<script lang="ts">
    import type { ProjetInfo } from "./type";
    import { projet } from "@assets/ts/data/projetData";

    let {projetLink}:{projetLink:number} = $props()

    let linkPCV:ProjetInfo = projet[projetLink];
    $inspect(linkPCV)
</script>

<a class="h-full" href={"#" + linkPCV.titre.replaceAll(" ","_")}>
    <div class="flex p-2 rounded-2xl bg-sky-900/50 h-full">
        <div class="w-96">
            <img src={linkPCV.desktopSrc.img} alt={linkPCV.titre}>
        </div>
        <div class="flex w-full h-28 items-center justify-center">
            <h3 class="text-3xl font-semibold">{linkPCV.titre}</h3>
        </div>
    </div>
</a>