import { db } from "$lib/server/db";
import { activityCategoriesTable } from "$lib/server/schema";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const actions : Actions = {
    default : async (event) => {
    const form = await event.request.formData()
    const name = form.get("name")
    const description = form.get("description")
    const errors = {name:"",description :""}
    
    if(!name || name == "") errors.name  = "Invalid name provided"
    if(!description || description == "") errors.description  = "Invalid description provided"
    
    const result = await db.select().from(activityCategoriesTable).where(eq(activityCategoriesTable.name,name!.toString()))
    
    if(result.length != 0 ) errors.name = "Name already used, please enter an other name"
    
    if(errors.name || errors.description) return fail(400, {errors})
        
    await db.insert(activityCategoriesTable).values({
        name: name!.toString(),
        description: description!.toString()
    })

    return redirect(303,'/admin/dashboard')
}
}