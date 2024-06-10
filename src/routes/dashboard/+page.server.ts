import { db } from "$lib/server/db";
import { activityFolderTable, activityTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export async function load(event){
    try{
        const userId = event.cookies.get("user_id")
        const activities = await db.select().from(activityTable).where(eq(activityTable.authorId,userId!))
        const folders = await db.select().from(activityFolderTable).where(eq(activityFolderTable.authorId,userId!))

    return {
        activities : activities,
        folders : folders
    }
    }catch(e){
        console.log(e)

    }
}