<script>
    export let data
</script>


<div class=container>
    <aside class="controls">
        <button type=button><a href="/activity/new">Créer une activité</a></button>
        <button type=button> <p>Créer un dossier</p></button>
        <form method="POST" action="">
            <input type="search" name="activity">
            <input type="submit" value="Search">
        </form>
        <div class="subcontrols">
            <div>
                <p>Trier par</p>
                <select>
                    <option value="date">Date</option>
                    <option value="Name">Name</option>
                    <option value="category">Category</option>
                </select>   
            </div>
        </div>
    </aside>
                    
    <div class="activities">
        <h2>Mes activités</h2>

        {#if data.folders}
            <div class="activities_folders">
                {#each data.folders as folder }
                    <p>{folder.name}</p>
                {/each}
            </div>
        {/if}

        {#if data.activities}
            <div class="activities_list">
                {#each data.activities as activity}
                    <p>{activity.name}</p>
                {/each}
            </div>
        {/if}
    </div>

</div>

<style>
    .container{
        display: flex;
        flex-direction: row;
        flex: 1 1 0
    }

    aside {
        width: 20%;
    }

    .activities{
        width: 80%;
    }
</style>