<script>
	import { onMount } from 'svelte';

    export let data

</script>

<h2>New activity</h2>

{#each data.activities as activity }
    <div>
        <p>{activity.name}</p>
    </div>
{/each}