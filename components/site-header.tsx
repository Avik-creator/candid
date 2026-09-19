import Link from "next/link"

import { getCurrentUser } from "@/lib/auth"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"

export async function SiteHeader() {
  const user = await getCurrentUser()

  return (
    <header className="flex items-center justify-between py-4">
      <Brand />
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {user ? (
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            dashboard →
          </Link>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="hidden transition-colors hover:text-foreground sm:inline"
            >
              log in
            </Link>
            <Link href="/sign-up" className="transition-colors hover:text-foreground">
              get your link →
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}
