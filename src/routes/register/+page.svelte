<script lang="ts">
    import { LoginMode } from "$lib/types/auth.js";
    import {enhance} from '$app/forms'
    export let form
    let mode : LoginMode = LoginMode.register

    $: loading = false
    $:username = ""
    $:password = ""
    $:confirmPassword = ""
</script>

<div style="margin: auto; width: 50%">
    {#if loading} <p>Loading ....</p> {/if}
    <form action="?/register" method="POST" use:enhance={() => {
        loading = true

        return async({update}) => {
            loading = false
            await update({reset:false})
        }
}}>

    <div class="form-group">
        <label for="username">Username</label>
        <input class={form?.errors?.username ? "invalid": ""} type="text" name="username" bind:value={username} />
        {#if form?.errors?.username} 
            <p>{form?.errors?.username}</p>
        {/if}
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input class={form?.errors?.password ? "invalid" : ""} type="text" name="password" bind:value={password}/>
        {#if form?.errors?.password } 
            <p>{form?.errors?.password}</p>
        {/if}
    </div>

    <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input class={form?.errors?.confirmPassword ? "invalid" : ""} type="text" name="confirmPassword" bind:value={confirmPassword}/>
        {#if form?.errors?.confirmPassword } 
            <p>{form?.errors?.confirmPassword }</p>
        {/if}
    </div>

    <input  type="submit" value="Login">   
</form>

</div>

<a href="/login">Already registered ? Sign in here</a>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .form-group input {
        width: 100%;
    }

    .invalid{
        border-color: red;
    }
</style>