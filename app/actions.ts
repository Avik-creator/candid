"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/lib/auth"
import { isDbConfigured } from "@/lib/config"
import { sendNewMessageEmail } from "@/lib/email"
import * as q from "@/lib/queries"

type Result = { ok: boolean; error?: string }

const RESERVED = new Set([
  "dashboard",
  "handler",
  "settings",
  "onboarding",
  "api",
  "u",
  "admin",
  "login",
  "signup",
])

function normalizeUsername(raw: string) {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, "")
}

export async function sendMessage(
  username: string,
  body: string
): Promise<Result> {
  if (!isDbConfigured) {
    return {
      ok: false,
      error: "This inbox isn't connected to a database yet.",
    }
  }
  const text = body.trim()
  if (text.length < 1) return { ok: false, error: "Message can't be empty." }
  if (text.length > 1000)
    return { ok: false, error: "Message is too long (max 1000 characters)." }

  const profile = await q.getProfileByUsername(username)
  if (!profile) return { ok: false, error: "That profile doesn't exist." }
  if (!profile.accepting)
    return { ok: false, error: "This person isn't accepting messages right now." }

  await q.insertMessage(profile.user_id, text)
  revalidatePath(`/u/${username}`)
  revalidatePath("/dashboard")

  // Asynchronously dispatch notification email to inbox owner
  q.getUserAccountByUserId(profile.user_id)
    .then((account) => {
      if (account?.email) {
        sendNewMessageEmail({
          to: account.email,
          recipientName: profile.display_name || account.name || `@${username}`,
          messageBody: text,
          username: profile.username,
        }).catch((err) => console.error("[Email] Background send error:", err))
      }
    })
    .catch((err) => console.error("[Email] User lookup error:", err))

  return { ok: true }
}

export async function saveProfile(input: {
  username: string
  displayName: string
  bio: string
  prompt: string
  accepting: boolean
}): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "You must be signed in." }

  const username = normalizeUsername(input.username)
  if (username.length < 3)
    return { ok: false, error: "Username must be at least 3 characters." }
  if (username.length > 20)
    return { ok: false, error: "Username must be 20 characters or fewer." }
  if (RESERVED.has(username))
    return { ok: false, error: "That username is reserved." }

  if (await q.isUsernameTaken(username, user.id))
    return { ok: false, error: "That username is already taken." }

  await q.upsertProfile({
    userId: user.id,
    username,
    displayName: input.displayName.trim() || null,
    bio: input.bio.trim() || null,
    prompt: input.prompt.trim() || "send me anonymous messages!",
    accepting: input.accepting,
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/settings")
  revalidatePath(`/u/${username}`)
  return { ok: true }
}

async function requireOwner(messageId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  return user.id
}

export async function actionMarkRead(id: string): Promise<Result> {
  const userId = await requireOwner(id)
  await q.markRead(id, userId)
  revalidatePath("/dashboard")
  return { ok: true }
}

export async function actionMarkAllRead(): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }
  await q.markAllRead(user.id)
  revalidatePath("/dashboard")
  return { ok: true }
}

export async function actionToggleFavorite(
  id: string,
  value: boolean
): Promise<Result> {
  const userId = await requireOwner(id)
  await q.toggleFavorite(id, userId, value)
  revalidatePath("/dashboard")
  return { ok: true }
}

export async function actionTogglePublish(
  id: string,
  value: boolean
): Promise<Result> {
  const userId = await requireOwner(id)
  await q.togglePublish(id, userId, value)
  revalidatePath("/dashboard")
  return { ok: true }
}

export async function actionReply(
  id: string,
  reply: string
): Promise<Result> {
  const userId = await requireOwner(id)
  const trimmed = reply.trim()
  if (trimmed.length > 1000)
    return { ok: false, error: "Reply is too long." }
  await q.setReply(id, userId, trimmed || null)
  revalidatePath("/dashboard")
  return { ok: true }
}

export async function actionDelete(id: string): Promise<Result> {
  const userId = await requireOwner(id)
  await q.deleteMessage(id, userId)
  revalidatePath("/dashboard")
  return { ok: true }
}
