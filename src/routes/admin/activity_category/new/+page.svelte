<script>
	import { enhance } from '$app/forms';

    export let form 

    $: loading = false
    $: name = ""
    $: description = ""
</script>

<h2>Create a new Activity Category</h2>

<div class="form-container">
    <form method="POST" action="" use:enhance={() => {
        loading = true

        return async({update}) => {
            loading = false
            await update({reset:false})
        }
    }}>
        <div class="form-control">
            <label for="name">Name</label>
            <input type="text" name="name" bind:value={name}>
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <input type="text" name="description" bind:value={description}>
        </div>
        <input type="submit" value="Create">
    </form>

    {#if form?.errors}
        {#if form?.errors?.name}
            <p>{form.errors.name}</p>
        {/if}
        
        {#if form?.errors?.description}
            <p>{form.errors.description}</p>
        {/if}
    {/if}
</div>