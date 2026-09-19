"use client"

import * as React from "react"
import { Loader2, Send } from "lucide-react"
import { toast } from "sonner"

import { sendMessage } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const MAX = 1000

export function SendMessageForm({
  username,
  accepting,
}: {
  username: string
  accepting: boolean
}) {
  const [body, setBody] = React.useState("")
  const [sent, setSent] = React.useState(false)
  const [pending, startTransition] = React.useTransition()

  if (!accepting) {
    return (
      <div className="rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        This person isn&apos;t accepting new messages right now.
      </div>
    )
  }

  if (sent) {
    return (
      <div className="rounded-md border border-border bg-muted/40 p-5">
        <h3 className="text-sm text-foreground">Message sent.</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          It was delivered anonymously — no identity attached.
        </p>
        <button
          type="button"
          className="mt-3 text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          onClick={() => {
            setSent(false)
            setBody("")
          }}
        >
          send another →
        </button>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = body.trim()
    if (!text) {
      toast.error("Write something first.")
      return
    }
    startTransition(async () => {
      const res = await sendMessage(username, text)
      if (res.ok) {
        setSent(true)
      } else {
        toast.error(res.error ?? "Something went wrong.")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX))}
          placeholder="Type your anonymous message..."
          className="min-h-28 bg-transparent text-sm"
          aria-label="Anonymous message"
        />
        <span className="pointer-events-none absolute bottom-2.5 right-3 text-xs tabular-nums text-muted-foreground">
          {body.length}/{MAX}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Your identity is never shared. Be kind.
        </p>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send anonymously
        </Button>
      </div>
    </form>
  )
}
