<script>
    import ActivityCategoryItem from '$lib/components/activity/ActivityCategoryItem.svelte'
    export let data
</script>

<h2>Admin dashboard</h2>

<div>
    <h3>Activity categories</h3>
    <button type="button"><a href="/admin/activity_category/new" >Create new activity </a></button>

    {#each data.activityCategories as activity }
        <ActivityCategoryItem {activity} />
    {/each}
</div>