"use client"

import * as React from "react"
import { Check, Copy, ExternalLink, Share2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { APP_DOMAIN } from "@/lib/config"

export function CopyLink({ username }: { username: string }) {
  const [copied, setCopied] = React.useState(false)

  const path = `/u/${username}`
  const display = `${APP_DOMAIN}${path}`

  async function copy() {
    const url = `${window.location.origin}${path}`
    try {
      if (navigator.share) {
        await navigator.share({ title: "Send me a message on Candid", url })
        return
      }
    } catch {
      /* user cancelled share — fall through to copy */
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success("Link copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1.5 pl-3">
      <Share2 className="size-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
        {display}
      </span>
      <Button variant="ghost" size="icon" asChild aria-label="Open profile">
        <a href={path} target="_blank" rel="noreferrer">
          <ExternalLink className="size-4" />
        </a>
      </Button>
      <Button size="sm" onClick={copy}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  )
}
