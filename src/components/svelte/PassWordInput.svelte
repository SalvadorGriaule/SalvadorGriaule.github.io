<script lang="ts">
    import anime from "animejs";
    import CheckSvg from "@svelte/SvgComponants/CheckSvg.svelte";
    import { inputMinL, checkingAll, testList } from "@assets/ts/inputCheck";

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
        { fn: inputMinL, msg: "Plus de 8 caractére" },
        { fn: testList.numCheck, msg: "Au moins un nombre" },
        { fn: testList.oneUpper, msg: "Au moins une Majuscule" },
        { fn: testList.oneLower, msg: "Au moins une Minuscule" },
        {
            fn: testList.specChar,
            msg: "Au moins un caractere special <br /> (#|~!?,.§€$£%:*())",
        },
    ]);

    let passwordInput: string = $state("");
    let outCheck: boolean[] = $state(Array(allCheck.length).fill(false));
    let checking: string = $derived(checkingAll([...outCheck], passwordInput));
    let isFocus = $state(false);

    let widthCheckDiv = $state(0);
    let heightCheckDiv: 150 | 82 = $derived(widthCheckDiv < 470 ? 150 : 82);

    $effect(() => {
        let heightAni = isFocus ? `${heightCheckDiv}px` : "0px";
        anime({
            targets: divCheck,
            height: heightAni,
            duration: 250,
            easing: "easeInQuad",
        });
    });

    $effect(() => {
        greatPW = checking;
        boolPW = checking == "border-green-600";
        Password = passwordInput;
    });
</script>

<div class="w-full">
    <input
        bind:focused={isFocus}
        bind:value={passwordInput}
        type="password"
        name="Password"
        class="{checking} border-2 p-1 placeholder:text-center w-full"
        placeholder={!changeMode ? "Mot de passe" : "Nouveau mot de passe"}
        required
    />

    <div
        bind:this={divCheck}
        bind:clientWidth={widthCheckDiv}
        class="{widthCheckDiv < 470 && widthCheckDiv > 300
            ? 'justify-center'
            : 'justify-start'} h-0 flex overflow-hidden"
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
                    <p>{@html check.msg}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
