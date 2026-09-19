import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { AuthForm } from "@/components/auth-form"
import { Brand } from "@/components/brand"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = { title: "Sign in — Candid" }

export default async function SignInPage() {
  const { data: session } = await auth.getSession()
  if (session?.user) redirect("/dashboard")

  return (
    <div className="flex min-h-screen flex-col items-center px-5">
      <header className="flex h-16 w-full max-w-md items-center">
        <Brand />
      </header>
      <main className="flex w-full max-w-md flex-1 items-center py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">Sign in</CardTitle>
            <p className="text-sm text-muted-foreground">Open your anonymous inbox.</p>
          </CardHeader>
          <CardContent>
            <AuthForm mode="sign-in" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
