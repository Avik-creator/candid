import "server-only"

import { and, desc, eq, ne, sql } from "drizzle-orm"

import { db, pool } from "@/lib/db"
import { messages, profiles } from "@/lib/db/schema"
import type { Message, Profile } from "@/lib/types"

export async function getUserAccountByUserId(
  userId: string
): Promise<{ email: string; name: string | null } | null> {
  const res = await pool.query<{ email: string; name: string | null }>(
    "SELECT email, name FROM neon_auth.user WHERE id = $1 LIMIT 1",
    [userId]
  )
  return res.rows[0] ?? null
}

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const [profile] = await db
    .select()
    .from(profiles)
    .where(sql`lower(${profiles.username}) = lower(${username})`)
    .limit(1)
  return profile ?? null
}

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, userId))
    .limit(1)
  return profile ?? null
}

export async function isUsernameTaken(username: string, exceptUserId?: string): Promise<boolean> {
  const conditions = [sql`lower(${profiles.username}) = lower(${username})`]
  if (exceptUserId) conditions.push(ne(profiles.user_id, exceptUserId))

  const rows = await db
    .select({ userId: profiles.user_id })
    .from(profiles)
    .where(and(...conditions))
    .limit(1)
  return rows.length > 0
}

export async function upsertProfile(input: {
  userId: string
  username: string
  displayName: string | null
  bio: string | null
  prompt: string
  accepting: boolean
}): Promise<Profile> {
  const [profile] = await db
    .insert(profiles)
    .values({
      user_id: input.userId,
      username: input.username,
      display_name: input.displayName,
      bio: input.bio,
      prompt: input.prompt,
      accepting: input.accepting,
    })
    .onConflictDoUpdate({
      target: profiles.user_id,
      set: {
        username: input.username,
        display_name: input.displayName,
        bio: input.bio,
        prompt: input.prompt,
        accepting: input.accepting,
      },
    })
    .returning()
  return profile
}

export async function insertMessage(profileUserId: string, body: string): Promise<void> {
  await db.insert(messages).values({ profile_user_id: profileUserId, body })
}

export async function getMessages(userId: string): Promise<Message[]> {
  return db
    .select()
    .from(messages)
    .where(eq(messages.profile_user_id, userId))
    .orderBy(desc(messages.created_at))
}

export async function getPublishedMessages(userId: string): Promise<Message[]> {
  return db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.profile_user_id, userId),
        eq(messages.is_published, true),
        sql`${messages.reply} is not null`,
      ),
    )
    .orderBy(sql`${messages.replied_at} desc nulls last`, desc(messages.created_at))
    .limit(50)
}

export async function markRead(messageId: string, userId: string) {
  await db
    .update(messages)
    .set({ is_read: true })
    .where(and(eq(messages.id, messageId), eq(messages.profile_user_id, userId)))
}

export async function markAllRead(userId: string) {
  await db
    .update(messages)
    .set({ is_read: true })
    .where(and(eq(messages.profile_user_id, userId), eq(messages.is_read, false)))
}

export async function toggleFavorite(messageId: string, userId: string, value: boolean) {
  await db
    .update(messages)
    .set({ is_favorite: value })
    .where(and(eq(messages.id, messageId), eq(messages.profile_user_id, userId)))
}

export async function togglePublish(messageId: string, userId: string, value: boolean) {
  await db
    .update(messages)
    .set({ is_published: value })
    .where(and(eq(messages.id, messageId), eq(messages.profile_user_id, userId)))
}

export async function setReply(messageId: string, userId: string, reply: string | null) {
  await db
    .update(messages)
    .set({
      reply,
      replied_at: reply ? new Date().toISOString() : null,
      is_read: true,
    })
    .where(and(eq(messages.id, messageId), eq(messages.profile_user_id, userId)))
}

export async function deleteMessage(messageId: string, userId: string) {
  await db
    .delete(messages)
    .where(and(eq(messages.id, messageId), eq(messages.profile_user_id, userId)))
}
