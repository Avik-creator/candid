"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { saveProfile } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { APP_DOMAIN } from "@/lib/config"

export function ProfileForm({
  initial,
  mode,
}: {
  initial: {
    username: string
    displayName: string
    bio: string
    prompt: string
    accepting: boolean
  }
  mode: "onboarding" | "settings"
}) {
  const router = useRouter()
  const [values, setValues] = React.useState(initial)
  const [pending, start] = React.useTransition()

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    start(async () => {
      const res = await saveProfile(values)
      if (res.ok) {
        toast.success(mode === "onboarding" ? "Your link is ready!" : "Profile saved")
        if (mode === "onboarding") router.push("/dashboard")
        else router.refresh()
      } else {
        toast.error(res.error ?? "Couldn't save profile.")
      }
    })
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <div className="flex items-center rounded-lg border border-input bg-background pl-3.5 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40">
          <span className="text-sm text-muted-foreground">{APP_DOMAIN}/u/</span>
          <Input
            id="username"
            value={values.username}
            onChange={(e) =>
              set(
                "username",
                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20)
              )
            }
            placeholder="yourname"
            className="border-0 bg-transparent pl-1 shadow-none focus-visible:ring-0"
            autoComplete="off"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Letters, numbers and underscores. 3–20 characters.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="displayName">Display name</Label>
        <Input
          id="displayName"
          value={values.displayName}
          onChange={(e) => set("displayName", e.target.value.slice(0, 50))}
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="prompt">Prompt</Label>
        <Input
          id="prompt"
          value={values.prompt}
          onChange={(e) => set("prompt", e.target.value.slice(0, 100))}
          placeholder="send me anonymous messages!"
        />
        <p className="text-xs text-muted-foreground">
          The question visitors see above the message box.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={values.bio}
          onChange={(e) => set("bio", e.target.value.slice(0, 160))}
          placeholder="A short line about you (optional)"
          className="min-h-20"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <div>
          <div className="text-sm font-medium">Accepting messages</div>
          <div className="text-xs text-muted-foreground">
            Turn off to pause your inbox.
          </div>
        </div>
        <Switch
          checked={values.accepting}
          onCheckedChange={(v) => set("accepting", v)}
        />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        {mode === "onboarding" ? "Create my link" : "Save changes"}
      </Button>
    </form>
  )
}
