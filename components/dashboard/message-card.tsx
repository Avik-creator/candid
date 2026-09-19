"use client"

import * as React from "react"
import {
  Eye,
  EyeOff,
  Heart,
  Loader2,
  MessageSquareQuote,
  MoreHorizontal,
  Reply,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import type { Message } from "@/lib/types"
import { timeAgo } from "@/lib/time"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type MessageActions = {
  favorite: (id: string, value: boolean) => Promise<void>
  publish: (id: string, value: boolean) => Promise<void>
  reply: (id: string, text: string) => Promise<void>
  remove: (id: string) => Promise<void>
  read: (id: string) => Promise<void>
}

export function MessageCard({
  message,
  actions,
}: {
  message: Message
  actions: MessageActions
}) {
  const [pending, start] = React.useTransition()
  const [replyOpen, setReplyOpen] = React.useState(false)
  const [replyText, setReplyText] = React.useState(message.reply ?? "")

  function run(fn: () => Promise<void>) {
    start(async () => {
      try {
        await fn()
      } catch {
        toast.error("Something went wrong.")
      }
    })
  }

  return (
    <article
      className={cn(
        "group rounded-md border bg-card p-4 transition-colors",
        message.is_read ? "border-border" : "border-foreground/25"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {!message.is_read ? (
            <span className="size-1.5 rounded-full bg-foreground" aria-label="Unread" />
          ) : null}
          <span className="text-xs text-muted-foreground">
            {timeAgo(message.created_at)}
          </span>
          {message.is_published ? (
            <Badge variant="secondary" className="gap-1">
              <Eye className="size-3" /> Public
            </Badge>
          ) : null}
        </div>

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label={message.is_favorite ? "Unfavorite" : "Favorite"}
            onClick={() => run(() => actions.favorite(message.id, !message.is_favorite))}
          >
            <Heart
              className={cn(
                "size-4",
                message.is_favorite && "fill-primary text-primary"
              )}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More actions">
                {pending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <MoreHorizontal className="size-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onSelect={() => {
                  setReplyText(message.reply ?? "")
                  setReplyOpen(true)
                }}
              >
                <Reply className="size-4" />
                {message.reply ? "Edit reply" : "Reply"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => run(() => actions.publish(message.id, !message.is_published))}
                disabled={!message.reply}
              >
                {message.is_published ? (
                  <>
                    <EyeOff className="size-4" /> Unpublish
                  </>
                ) : (
                  <>
                    <Eye className="size-4" /> Publish to wall
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => run(() => actions.remove(message.id))}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground">
        {message.body}
      </p>

      {message.reply ? (
        <div className="mt-4 border-l border-border pl-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MessageSquareQuote className="size-3.5" />
            your reply
          </div>
          <p className="text-sm leading-relaxed text-foreground">{message.reply}</p>
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setReplyText(message.reply ?? "")
            setReplyOpen(true)
          }}
        >
          <Reply className="size-4" />
          {message.reply ? "Edit reply" : "Reply"}
        </Button>
        {message.reply ? (
          <Button
            variant={message.is_published ? "secondary" : "ghost"}
            size="sm"
            onClick={() => run(() => actions.publish(message.id, !message.is_published))}
          >
            {message.is_published ? (
              <>
                <EyeOff className="size-4" /> Unpublish
              </>
            ) : (
              <>
                <Eye className="size-4" /> Publish
              </>
            )}
          </Button>
        ) : null}
      </div>

      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to this message</DialogTitle>
          </DialogHeader>
          <div className="rounded-xl border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
            {message.body}
          </div>
          <Textarea
            autoFocus
            value={replyText}
            onChange={(e) => setReplyText(e.target.value.slice(0, 1000))}
            placeholder="Write a thoughtful reply..."
            className="min-h-28"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReplyOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={pending}
              onClick={() =>
                run(async () => {
                  await actions.reply(message.id, replyText.trim())
                  setReplyOpen(false)
                  toast.success("Reply saved")
                })
              }
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              Save reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  )
}
