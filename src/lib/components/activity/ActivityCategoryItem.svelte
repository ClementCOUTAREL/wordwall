<script>
    export let activity
</script>

<div class="activity-card">
    <div class="body">
        <p>Name {activity.name}</p>
        <p>Description {activity.description}</p>
    </div>
    <div class="controls">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
    </div>
</div>