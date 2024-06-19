import { db } from '$lib/server/db.js'
import { activityCategoriesTable, activityTable } from '$lib/server/schema.js'
import {  redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export async function load({url}){
    const activityCategoryId = url.searchParams.get("activityId")
    const userId = url.searchParams.get("userId")
    const username = url.searchParams.get("username")

    const activityCategory = await db
        .select()
        .from(activityCategoriesTable)
        .where(eq(activityCategoriesTable.id, Number(activityCategoryId!)))
    
    return {
        activityCategoryId,
        userId,
        username,
        activityCategory: activityCategory[0].name
    }
}

export const actions = {
    default: async (event) => {
        try {
            const form = await event.request.formData()
        const activityCategoryId = form.get("activityCategoryId")
        const name = form.get("name")
        const authorId = form.get("userId")

        if(name && authorId && activityCategoryId) {
            await db.insert(activityTable).values({
                name: name,
                authorId: authorId,
                categoryId: activityCategoryId
            })
        }

        return redirect(300,"/dashboard")

        } catch (error) {
            console.log(error);
        }
    }
}