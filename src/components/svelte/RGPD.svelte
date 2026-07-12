<script lang="ts">
    import { rgpdAff } from "./store.svelte";
    let {
        situation = "",
        check = $bindable(false),
    }: { situation?: string; check: boolean } = $props();
    const onclick = () => {
        rgpdAff.rgpdAff = true
    }
    $inspect(rgpdAff.rgpdAff)
</script>

<p class="text-center mt-3">
    En cochent cette case vous certifié avoir lu et accépté notre<br /><a
        href="#RGPDPage"
        class="text-cyan-600 underline"
        {onclick}
        >Réglement général sur la protection des données(RGPD)</a
    >
</p>
<label class="flex justify-between mt-2" for=""
    >Oui je certifis avoir lu et j'accepte la RGPD<input
        type="checkbox"
        name="RGPD"
        bind:checked={check}
    /></label
>
