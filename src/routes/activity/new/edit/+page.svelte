<script>
	import { enhance } from '$app/forms';

    export let data

    $: name = ""
    $: username = data.username || ""
    $: activityCategory = data.activityCategory || ""
    $: activityCategoryId = data.activityCategoryId || ""
    $: userId = data.userId || ""
    
    $: questionId = [0]
    $: question = ""
    $: answer = ""

    const addQuestion = () => {
        questionId = [...questionId, questionId[questionId.length]+1]
    }

</script>

<h2>Your activity</h2>

<form method="POST" use:enhance>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" bind:value={name} required>
    </div>
    <div class="form-group">
        <label for="activityCategoryId">Category</label>
        <input type="hidden" name="activityCategoryId" id="activityCategoryId" bind:value={activityCategoryId} required>
    </div>
    <div class="form-group">
        <label for="userId">Category</label>
        <input type="hidden" name="userId" id="userId" bind:value={userId} required>
    </div>
    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" bind:value={username} required>
    </div>
    <div class="question">
        {#each questionId as id }
            <div class="question-group">
                <div class="form-group">
                    <label for="question{id}">Your question</label>
                    <input type="text" id="question{id}" name="question{id}" bind:value={question} required>
                </div>
                <div class="form-group">
                    <label for="answer{id}">Answer</label>
                    <input type="text" id="answer{id}" name="answer{id}" bind:value={answer} required>
                </div>
            </div>
        {/each}
        <button type="button" on:click={addQuestion}>Add a question</button>
    </div>

    <button type="submit">Create activity</button>
</form>
