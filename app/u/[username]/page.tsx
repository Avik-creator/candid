import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getProfileByUsername, getPublishedMessages } from "@/lib/queries"
import type { Message, Profile } from "@/lib/types"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { SendMessageForm } from "@/components/send-message-form"

type Props = { params: Promise<{ username: string }> }

async function resolve(
  username: string
): Promise<{ profile: Profile; published: Message[] } | null> {
  const profile = await getProfileByUsername(username)
  if (!profile) return null
  const published = await getPublishedMessages(profile.user_id)
  return { profile, published }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const data = await resolve(username)
  if (!data) return { title: "Profile not found — Candid" }
  const name = data.profile.display_name || `@${data.profile.username}`
  const title = `Send ${name} an anonymous message`
  const description = data.profile.prompt || "Drop an anonymous message on Candid."

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Candid`,
      description,
      type: "profile",
      username: data.profile.username,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Candid`,
      description,
    },
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const data = await resolve(username)
  if (!data) notFound()

  const { profile, published } = data
  const name = profile.display_name || `@${profile.username}`

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Brand />
        <ThemeToggle />
      </header>

      <main className="pt-8">
        <section>
          <h1 className="text-base font-medium tracking-tight text-foreground">
            {name}
          </h1>
          <p className="text-sm text-muted-foreground">
            @{profile.username}
            {profile.accepting ? (
              <span className="ml-3 text-muted-foreground">
                <span className="mr-1.5 inline-block size-1.5 translate-y-[-1px] rounded-full bg-foreground/60 align-middle" />
                accepting messages
              </span>
            ) : null}
          </p>
          {profile.bio ? (
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
          ) : null}
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-sm text-foreground">{profile.prompt}</h2>
          <SendMessageForm
            username={profile.username}
            accepting={profile.accepting}
          />
        </section>

        {published.length > 0 ? (
          <section className="mt-12">
            <hr className="mb-8 border-border" />
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Answered publicly
            </h2>
            <div className="space-y-8">
              {published.map((m) => (
                <article key={m.id} className="text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground">Q. </span>
                    {m.body}
                  </p>
                  <p className="mt-2 border-l border-border pl-3 leading-relaxed text-foreground">
                    {m.reply}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>want your own anonymous inbox?</p>
          <Link
            href="/sign-up"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            create your candid link →
          </Link>
        </footer>
      </main>
    </div>
  )
}
