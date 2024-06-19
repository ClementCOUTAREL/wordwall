<script lang="ts">
    export let data 
</script>

<h2>New activity</h2>

{#each data.activities as activity }
    <div>
        <p>{activity.name}</p>
        <button><a href="/activity/new/edit?activityId={activity.id}&userId={data.userId}&username={data.username}">Créer</a></button>
    </div>
{/each}