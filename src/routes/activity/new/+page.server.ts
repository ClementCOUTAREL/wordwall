import { db } from "$lib/server/db";
import { activityCategoriesTable } from "$lib/server/schema";

export async function load(){
    const activities = await db.select().from(activityCategoriesTable)

    return {
        activities:activities
    }
}