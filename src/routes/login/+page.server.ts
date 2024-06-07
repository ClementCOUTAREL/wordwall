import { db, lucia } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { verify } from "@node-rs/argon2";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const actions: Actions = {
    login: async (event) => {
        let errors = {username: "",password : ""}
        const form = await event.request.formData()
        let username = form.get("username")
        let password = form.get("password")

        if(!username) errors.username = 'No username provided'
        if(username!.toString().length < 3) errors.username = "Username too short"
        if(username!.toString().length > 50) errors.username = "Username too long"

        if(!password) errors.password = "No password provided"
        if(password!.toString().length < 10) errors.password = "Password too short"
        if(password!.toString().length > 50) errors.password = "Password too long"

        
        const user = await db.select().from(usersTable).where(eq(usersTable.username,username!.toString()))
        if(user.length == 0) errors.username = 'No account registered with the username provided' 

        const validPassword = await verify(user[0].password, password!.toString(),{
            memoryCost: 19456,
            timeCost: 2,
            outputLen:32,
            parallelism: 1 
        })
        if(!validPassword) errors.password = "invalid password"

        if(errors.password || errors.username) return fail(400, {errors})

        const session = await lucia.createSession(user[0].id,{})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        event.cookies.set(sessionCookie.name,sessionCookie.value,{
            path:".",
            ...sessionCookie.attributes
        })

        event.cookies.set('user_id', user[0].id,{
            path:'.'
        })
        event.cookies.set('user', user[0].username,{
            path:'.'
        })

        redirect(302,"/")
    }
}