<script lang="ts">
    import { rgpdAff } from "./store.svelte";
    let {
        situation = "",
        check = $bindable(false),
    }: { situation?: string; check: boolean } = $props();
    const onclick = () => {
        rgpdAff.rgpdAff = true
    }
    
</script>

<p class="text-center mt-3">
    En cochent cette case vous certifier avoir lu et accepté notre<br /><a
        href="#RGPDPage"
        class="text-cyan-600 underline"
        {onclick}
        >Règlement général sur la protection des données (RGPD)</a
    >
</p>
<label class="flex justify-between mt-2" for=""
    >Oui je certifie avoir lu et j'accepte la RGPD<input
        type="checkbox"
        name="RGPD"
        bind:checked={check}
    /></label
>
