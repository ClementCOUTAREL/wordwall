<script lang="ts">
    import { enhance } from "$app/forms";
    import { LoginMode } from "$lib/types/auth.js";
    export let form
    let mode : LoginMode = LoginMode.login
    $: loading = false
    $:username = ""
    $:password = ""
</script>

<div style="margin: auto; width: 50%">
    
{#if loading} <p>Loading ....</p> {/if}

<h2>{mode === LoginMode.login ? "Sign in" : "Create your account" }</h2>

<form action={mode === LoginMode.login ? "?/login" : "?/register"} method="POST" use:enhance={() => {
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

    <input  type="submit" value={mode === LoginMode.login ? "Login" : "Register"}>   

</form>
</div>

<a href="/register">No account ? Register here</a>

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