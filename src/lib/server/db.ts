import { drizzle } from "drizzle-orm/postgres-js";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import postgres from "postgres";
import { sessionTable, usersTable } from "./schema";
import { Lucia } from "lucia";
import { dev } from "$app/environment";

const client = postgres("postgresql://clement:password@localhost:5432/wordwall")

export const db = drizzle(client)

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable,usersTable)

export const lucia = new Lucia(adapter,{
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username
        }
    }
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}

export {}