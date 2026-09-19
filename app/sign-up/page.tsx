import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { AuthForm } from "@/components/auth-form"
import { Brand } from "@/components/brand"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = { title: "Create account — Candid" }

export default async function SignUpPage() {
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
            <CardTitle className="text-base">Create your account</CardTitle>
            <p className="text-sm text-muted-foreground">Claim a link and start collecting honest messages.</p>
          </CardHeader>
          <CardContent>
            <AuthForm mode="sign-up" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
