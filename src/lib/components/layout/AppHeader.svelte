<script>
    export let username
</script>

<header>
    <a href="/">
        <h1>My wordwall</h1>
    </a>
    <nav>
        <ul>
            <li>
                {#if username == "" || username== null} 
                    <a href="/auth/login">Login</a>
                {:else} 
                <div>
                    <p>{username}</p>
                    <form method="POST" action="/auth/logout?/logout">
                        <input type="submit" value="Logout">
                    </form>
                </div>
                {/if}
            </li>
        </ul>
    </nav>
</header>

<style>
    header {
        background-color: aqua;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
    }

    header ul li {
        list-style-type: none;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        text-decoration: underline;
    }
</style>