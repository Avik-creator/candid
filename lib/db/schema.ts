import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"


export const profiles = pgTable(
  "profiles",
  {
    user_id: text("user_id").primaryKey(),
    username: text("username").notNull(),
    display_name: text("display_name"),
    bio: text("bio"),
    prompt: text("prompt").notNull().default("send me anonymous messages!"),
    accepting: boolean("accepting").notNull().default(true),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("profiles_username_lower_idx").on(table.username)],
)

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profile_user_id: text("profile_user_id").notNull(),
    body: text("body").notNull(),
    reply: text("reply"),
    is_read: boolean("is_read").notNull().default(false),
    is_published: boolean("is_published").notNull().default(false),
    is_favorite: boolean("is_favorite").notNull().default(false),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    replied_at: timestamp("replied_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [index("messages_owner_created_idx").on(table.profile_user_id, table.created_at)],
)

export type ProfileRow = typeof profiles.$inferSelect
export type MessageRow = typeof messages.$inferSelect
