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
    let checking = $derived(checkingAll([...outCheck], passwordInput));
    let outline: string = $derived.by(() => {
        switch (checking) {
            case "border-green-600 focus:outline-green-600":
                return "outline-green-600";
            case "border-red-600 focus:outline-red-600":
                return "outline-red-600";
        }
        return "outline-zinc-500";
    });

    let widthCheckDiv = $state(0);
    let heightCheckDiv: 120 | 82 = $derived(widthCheckDiv < 470 ? 120 : 82);

    let isVisible = $state(false);
    let isUnfold = $state(false);
    let wrapper: HTMLDivElement | null = $state(null);
    let activeElement: Element | null | undefined = $state(null);

    const folder = (sens: "fold" | "unfold") => {
        anime({
            targets: divCheck,
            height: sens == "unfold" ? `${heightCheckDiv}px` : `0px`,
            duration: 250,
            easing: "easeInQuad",
        });
        isUnfold = sens == "unfold";
    };

    const onclick = () => {
        isVisible = !isVisible;
        if (!isUnfold) folder("unfold");
    };

    const onfocus = () => {
        if (!isUnfold) folder("unfold");
    };

    const oninput = (
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) => {
        passwordInput = e.currentTarget.value;
    };

    $effect(() => {
        if (!wrapper?.contains(activeElement ?? null)) {
            folder("fold");
        }
    });

    $effect(() => {
        greatPW = checking;
        boolPW = checking == "border-green-600 focus:outline-green-600";
        Password = passwordInput;
    });
</script>

<svelte:document bind:activeElement />
<div class="w-full" bind:this={wrapper}>
    <div
        style:outline-width={isUnfold ? "1px" : ""}
        style:outline-style={isUnfold ? "solid" : ""}
        class="{checking} {outline} relative flex rounded-xl overflow-hidden border"
    >
        <input
            {onfocus}
            {oninput}
            type={isVisible ? "text" : "password"}
            name="Password"
            class="py-1.5 pl-2 w-full focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-0"
            placeholder={!changeMode ? "Mot de passe" : "Nouveau mot de passe"}
            required
        />
        <button
            {onclick}
            class="absolute justify-center items-center right-4 w-6 h-9"
        >
            <Eye etat={isVisible} />
        </button>
    </div>

    <div
        bind:this={divCheck}
        bind:clientWidth={widthCheckDiv}
        class="justify-start h-0 flex overflow-hidden"
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
                            ? "text-green-600 "
                            : "text-slate-600"}
                    >
                        {@html check.msg}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</div>
