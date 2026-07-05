<script lang="ts">
    import FormEnabler from "@svelte/FormEnabler.svelte";
</script>

<div class="flex justify-center items-center w-full h-[50vh]">
    <div class="bg-white p-2 rounded-2xl drop-shadow-2xl w-full lg:w-3/4">
        <div class="flex flex-col space-y-1.5 items-center">
            <FormEnabler formEntry={new Set(["nom","prenom","email",'tel',"password"])}/>
        </div>
    </div>
</div>