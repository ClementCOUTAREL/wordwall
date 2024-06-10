<script lang="ts">
    import AppFooter from "$lib/components/layout/AppFooter.svelte";
    import AppHeader from "$lib/components/layout/AppHeader.svelte";
    export let data

    $: username = data.username

</script>

<AppHeader {username} />

<main>
    <slot />
</main>

<AppFooter />

<style>
    main {
        min-height: 100vh;
        padding: 2rem;
    }
</style>