import { fail, redirect, type Actions } from "@sveltejs/kit"
import {hash} from '@node-rs/argon2'
import { generateIdFromEntropySize } from "lucia"
import { db } from "$lib/server/db"
import { usersTable } from "$lib/server/schema"
import { eq } from "drizzle-orm"
import { lucia } from "$lib/server/db"

export const actions : Actions =  {
    register: async (event) => {
        let errors = {username: "",password : "", confirmPassword:""}
        const form = await event.request.formData()
        let username = form.get("username") 
        let password = form.get("password")
        let confirmPassword = form.get("confirmPassword")

        if(!username || typeof username !== "string") errors.username = 'Invalid username'
        if(username!.toString().length < 3) errors.username = "Username too short"
        if(username!.toString().length > 50) errors.username = "Username too long"

        if(!password || typeof username !== "string") errors.password = "Invalid password"
        if(password!.toString().length < 10) errors.password = "Password too short"
        if(password!.toString().length > 50) errors.password = "Password too long"

        if(!confirmPassword || typeof username !== "string") errors.confirmPassword = "Invalid confirm Password"
        if(confirmPassword!.toString().length < 10) errors.confirmPassword = "Confirm Password too short"
        if(confirmPassword!.toString().length >50) errors.confirmPassword = "Confirm Password too long"
        if(confirmPassword != password) {
            errors.password = "Passwords must match"
            errors.confirmPassword = "Passwords must match"
        }

        const userId = generateIdFromEntropySize(10)
        const passwordHash = await hash(password!.toString(), {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        })

        const result = await db.select().from(usersTable).where(eq(usersTable.id,userId))
        if(result.length != 0) errors.username = "User already registered"

        if(errors.password || errors.username || errors.confirmPassword) return fail(400, {errors})
        
        await db.insert(usersTable).values({id: userId, username:username!.toString(),password:passwordHash})

        const session = await lucia.createSession(userId,{})
        const sessionCookie = lucia.createSessionCookie(session.id)
        event.cookies.set(sessionCookie.name,sessionCookie.value,{
            path:'.',
            ...sessionCookie.attributes
        })

        event.cookies.set('user_id', userId,{
            path:'/'
        })
        event.cookies.set('user', result[0].username,{
            path:'/'
        })

        redirect(303, '/dashboard')
    }
}