<script lang="ts">
    import FormEnabler from "@svelte/FormEnabler.svelte";
    import RGPDAff from "@svelte/RGPDAff.svelte";
    import type { EventHandler } from "svelte/elements";

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = (e) => {
        e.preventDefault();
    };
</script>

<div class="flex justify-center items-center w-full h-[50vh]">
    <div class="bg-white p-2 rounded-2xl drop-shadow-2xl w-3/4">
        <form
            {onsubmit}
            action=""
            method="post"
            class="flex flex-col space-y-1.5 items-center"
        >
            <FormEnabler
                formEntry={new Set([
                    "nom",
                    "prenom",
                    "email",
                    "tel",
                    "password",
                    "RGPD",
                ])}
            />
        </form>
    </div>
</div>
<RGPDAff />
