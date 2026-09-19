import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"
import { getMessages, getProfileByUserId } from "@/lib/queries"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Inbox } from "@/components/dashboard/inbox"

export const metadata = { title: "Inbox — Candid" }

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  const profile = await getProfileByUserId(user.id)
  if (!profile) redirect("/onboarding")

  const messages = await getMessages(user.id)
  const displayName = profile.display_name || user.displayName || `@${profile.username}`

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader name={displayName} email={user.email} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <div className="mb-6">
          <h1 className="text-base font-medium tracking-tight">
            Welcome back, {displayName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what people have been sending you.
          </p>
        </div>
        <Inbox username={profile.username} initialMessages={messages} />
      </main>
    </div>
  )
}
