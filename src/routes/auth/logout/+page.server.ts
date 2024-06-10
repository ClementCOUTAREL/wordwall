import { lucia } from "$lib/server/db";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    logout: async(event) => {
        const userId = event.cookies.get("user_id")
        const sessionId = event.cookies.get("auth_session")
        if(!userId || !sessionId) return fail(401)

        await lucia.invalidateSession(sessionId)
        const sessionCookie = lucia.createBlankSessionCookie()
        event.cookies.set(sessionCookie.name,sessionCookie.value, {
            path:'.',
            ...sessionCookie.attributes
        })

        event.cookies.delete("user_id", {path:"."})
        event.cookies.delete("user", {path:"."})

        redirect(303, '/auth/login')
    }
}