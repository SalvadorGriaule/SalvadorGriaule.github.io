<script lang="ts">
    import anime from "animejs";
    import CheckSvg from "@svelte/SvgComponants/CheckSvg.svelte";
    import Eye from "./Eye.svelte";
    import { checkingAll, testList } from "@assets/ts/inputCheck";

    interface PassCheck {
        fn: Function;
        msg: string;
    }

    let {
        changeMode = false,
        boolPW = $bindable(false),
        greatPW = $bindable(""),
        Password = $bindable(""),
    }: {
        changeMode?: boolean;
        boolPW?: boolean;
        greatPW?: string;
        Password?: string;
    } = $props();

    let divCheck: HTMLDivElement;
    let allCheck: PassCheck[] = $state([
        { fn: testList.minL, msg: "Plus de 11 caractére" },
        { fn: testList.numCheck, msg: "Au moins un nombre" },
        { fn: testList.oneUpper, msg: "Au moins une Majuscule" },
        { fn: testList.oneLower, msg: "Au moins une Minuscule" },
        {
            fn: testList.specChar,
            msg: "Au moins un caractere special (#|~!?,.§€$£%:*())",
        },
    ]);

    let passwordInput: string = $state("");
    let outCheck: boolean[] = $state(Array(allCheck.length).fill(false));
    let checking: string = $derived(checkingAll([...outCheck], passwordInput));
    
    let widthCheckDiv = $state(0);
    let heightCheckDiv: 120 | 82 = $derived(widthCheckDiv < 470 ? 120 : 82);

    let ifVisible = $state(false);
    
    const onclick = () => {
        ifVisible = !ifVisible;
    };

    const onfocus = () => {
        anime({
            targets: divCheck,
            height: `${heightCheckDiv}px`,
            duration: 250,
            easing: "easeInQuad",
        });
    };

    const onfocusout = () => {
        anime({
            targets: divCheck,
            height: `0px`,
            duration: 250,
            easing: "easeInQuad",
        });
    };

    const oninput = (
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) => {
        passwordInput = e.currentTarget.value
    };

    $effect(() => {
        greatPW = checking;
        boolPW = checking == "border-green-600";
        Password = passwordInput;
    });
</script>

<div class="w-full">
    <div class="{checking} relative flex rounded-xl overflow-hidden border">
        <input
            {onfocusout}
            {onfocus}
            {oninput}
            id="pw"
            type={ifVisible ? "text" : "password"}
            name="Password"
            class="py-1.5 pl-2 w-full"
            placeholder={!changeMode ? "Mot de passe" : "Nouveau mot de passe"}
            required
        />
        <button
            {onclick}
            class="absolute justify-center items-center right-4 w-6 h-9"
        >
            <Eye etat={ifVisible} />
        </button>
    </div>

    <div
        bind:this={divCheck}
        bind:clientWidth={widthCheckDiv}
        class="justify-start' h-0 flex overflow-hidden"
    >
        <div
            class="flex flex-col flex-wrap ml-2 my-1"
            style:height={heightCheckDiv + "px"}
        >
            {#each allCheck as check, i}
                <div class="flex space-x-2">
                    <div class="w-4">
                        <CheckSvg
                            check={check.fn(passwordInput)}
                            bind:out={outCheck[i]}
                        />
                    </div>
                    <p
                        class={check.fn(passwordInput)
                            ? "text-green-600"
                            : "text-slate-600"}
                    >
                        {@html check.msg}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</div>
