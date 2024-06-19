import { db } from "$lib/server/db";
import { activityCategoriesTable, activityTable } from "$lib/server/schema";

export async function load(event){
    const activities = await db.select().from(activityCategoriesTable)
    const userId = await event.cookies.get("user_id")?.toString()

    return {
        activities,
        userId
    }
}