import { pgTable,text,timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable('user', {
    id:text('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull()
})

export const sessionTable = pgTable("session",{
    id:text('id').primaryKey(),
    userId: text("user_id").notNull().references(() => usersTable.id),
    expiresAt: timestamp('expires_at',{withTimezone:true,mode:"date"}).notNull()
})

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
