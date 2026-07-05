<script lang="ts">
    import { checkAll } from "@assets/ts/inputCheck";

    let { checkTab, name }: { checkTab: boolean[]; name?: string } = $props();

    let btn: HTMLElement;
    let disabled = $state(false);
    let disaTamp = $state(false);

    $effect(() => {
        disabled = checkAll(checkTab);
        if (disaTamp != disabled) {
            disaTamp = disabled
        }
    });

    $inspect(disabled)
</script>

<input
    bind:this={btn}
    id="validButton"
    class="w-fit mx-auto p-1 rounded-md cursor-pointer bg-green-500 text-white disabled:text-black disabled:bg-slate-400 duration-150 disabled:cursor-default"
    {disabled}
    {name}
    type="submit"
    value="Envoyer"
/>
