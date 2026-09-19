import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"
import { isAuthConfigured, isDbConfigured } from "@/lib/config"
import { getProfileByUserId } from "@/lib/queries"
import { Brand } from "@/components/brand"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/dashboard/profile-form"

export const metadata = { title: "Claim your link — Candid" }

export default async function OnboardingPage() {
  if (!isAuthConfigured || !isDbConfigured) redirect("/dashboard")

  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  const existing = await getProfileByUserId(user.id)
  if (existing) redirect("/dashboard")

  const suggested = (user.displayName || user.email?.split("@")[0] || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 20)

  return (
    <div className="flex min-h-screen flex-col items-center px-5">
      <header className="flex h-16 w-full max-w-lg items-center">
        <Brand />
      </header>
      <main className="flex w-full max-w-lg flex-1 items-center py-8">
        <Card className="w-full">
          <CardHeader className="gap-2">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Welcome to candid
            </span>
            <CardTitle className="text-base">Claim your link</CardTitle>
            <p className="text-sm text-muted-foreground">
              Pick a username and set up your public profile. You can change this
              any time.
            </p>
          </CardHeader>
          <CardContent>
            <ProfileForm
              mode="onboarding"
              initial={{
                username: suggested,
                displayName: user.displayName ?? "",
                bio: "",
                prompt: "send me anonymous messages!",
                accepting: true,
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
