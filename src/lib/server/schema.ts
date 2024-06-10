import { date, integer, pgTable,serial,text,timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable('user', {
    id:text('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull()
})

export const sessionTable = pgTable("session",{
    id:text('id').primaryKey(),
    expiresAt: timestamp('expires_at',{withTimezone:true,mode:"date"}).notNull(),
    userId: text("user_id").notNull().references(() => usersTable.id),
})

export const activityCategoriesTable = pgTable("activity_categories",{
    id: serial('id').primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull()
})

export const activityFolderTable = pgTable("activity_folder",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    authorId: text("author_id").notNull().references(() => usersTable.id)
})

export const activityTable = pgTable("activity", {
    id: serial("id").primaryKey(),
    name:text("name").notNull().unique(),
    createdAt: date("created_at").notNull().defaultNow(),
    updatedAt: date("updated_at").notNull().defaultNow(),
    categoryId: integer('category_id').notNull().references(() => activityCategoriesTable.id),
    authorId: text("author_id").notNull().references(() => usersTable.id),
    folder_id: integer("activity_folder_id").references(() => activityFolderTable.id),
})


export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
