<script lang="ts">
    import { type InputType } from "./type";
    import PassWordInput from "./PassWordInput.svelte";
    import InputChecking from "./InputChecking.svelte";
    import SendCheckBtn from "./SendCheckBtn.svelte";
    import RGPD from "./RGPD.svelte";

    type InputSet = InputType | "password" | "change_password";

    let {
        formEntry,
        nameSubmit = "",
    }: { formEntry: Set<InputSet>; nameSubmit?: string } = $props();

    let validationArr: boolean[] = $state(Array(formEntry.size).fill(false));
</script>

{#each formEntry as entry, i}
    {#if entry.includes("password")}
        <PassWordInput
            changeMode={entry.includes("change")}
            bind:boolPW={validationArr[i]}
        />
    {:else if entry == "RGPD"}
        <RGPD bind:check={validationArr[i]} />
    {:else}
        <InputChecking bind:check={validationArr[i]} name={entry} />
    {/if}
{/each}
<SendCheckBtn checkTab={validationArr} name={nameSubmit} />
