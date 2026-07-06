<script lang="ts">
    import { type InputType } from "./type";
    import { testList } from "@assets/ts/inputCheck";
    import { onMount } from "svelte";

    interface TypeOpt {
        name: InputType;
        type: string;
        fn: Function;
        placeholder?: string;
    }

    let typeOpt: TypeOpt[] = [
        { name: "nom", type: "text", fn: testList.name, placeholder: "Nom" },
        {
            name: "prenom",
            type: "text",
            fn: testList.name,
            placeholder: "Prenom",
        },
        {
            name: "tel",
            type: "text",
            fn: testList.tel,
            placeholder: "Téléphone",
        },
        {
            name: "email",
            type: "email",
            fn: testList.email,
            placeholder: "E-mail",
        },
    ];

    let {
        name,
        style = "",
        placeholder = "",
        defaultVal = "",
        searchMode = false,
        value = $bindable(),
        check = $bindable(),
        isFocus = $bindable(),
        disabled = false,
    }: {
        name: InputType;
        style?: string;
        check: boolean;
        value?: string;
        searchMode?: boolean;
        placeholder?: string;
        defaultVal?: string;
        isFocus?: boolean;
        disabled?: boolean;
    } = $props();

    let selectInput: TypeOpt | null = null;
    let inputHtml: HTMLInputElement;

    for (let i = 0; i < typeOpt.length; i++) {
        if (name == typeOpt[i].name) {
            selectInput = typeOpt[i];
            break;
        }
    }

    if (defaultVal) value = defaultVal;

    let styleCheck = $derived.by(() => {
        if (!value) return "border-zinc-500 focus:outline-zinc-500 focus-visible:outline-zinc-500";
        if (check) return "border-green-600 focus:outline-green-600 focus-visible:outline-green-600";
        return "border-red-600 focus:outline-red-600 focus-visible:outline-red-600";
    });

    const styleInput =
        style == "" ? "border rounded-xl py-1 pl-2 w-full h-9" : style;

    $effect(() => {
        check = selectInput?.fn(value);
    });

    onMount(() => {
        document.addEventListener("mouseup", () => {
            isFocus = document.activeElement == inputHtml;
        });
    });
</script>

{#if selectInput}
    <input
        bind:this={inputHtml}
        bind:value
        type={selectInput.type}
        {name}
        class="{styleCheck} {styleInput} focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-0"
        placeholder={!placeholder ? selectInput.placeholder : placeholder}
        autocomplete={searchMode ? "off" : "on"}
        {disabled}
    />
{/if}
