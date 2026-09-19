import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getCurrentUser } from "@/lib/auth"
import { isAuthConfigured, isDbConfigured } from "@/lib/config"
import { getProfileByUserId } from "@/lib/queries"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = { title: "Settings — Candid" }

export default async function SettingsPage() {
  if (!isAuthConfigured || !isDbConfigured) redirect("/dashboard")

  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  const profile = await getProfileByUserId(user.id)
  if (!profile) redirect("/onboarding")

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader
        name={profile.display_name || user.displayName || ""}
        email={user.email}
      />
      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to inbox
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Settings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your public profile and link.
            </p>
          </CardHeader>
          <CardContent>
            <ProfileForm
              mode="settings"
              initial={{
                username: profile.username,
                displayName: profile.display_name ?? "",
                bio: profile.bio ?? "",
                prompt: profile.prompt,
                accepting: profile.accepting,
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
