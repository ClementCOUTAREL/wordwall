import { Config } from "drizzle-kit";
import dotenv from 'dotenv'

dotenv.config({
    path:'.env'
})

export default {
    schema: './src/lib/server/schema.ts',
    out: './drizzle',
    dialect:'postgresql',
    dbCredentials:{
        host : process.env.DATABASE_HOST!,
        user : process.env.DATABASE_USER!,
        password : process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!
    }
} satisfies Config