"use client"

import * as React from "react"
import { CheckCheck } from "lucide-react"
import { toast } from "sonner"

import {
  actionDelete,
  actionMarkAllRead,
  actionReply,
  actionToggleFavorite,
  actionTogglePublish,
} from "@/app/actions"
import type { Message } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CopyLink } from "@/components/dashboard/copy-link"
import { MessageCard, type MessageActions } from "@/components/dashboard/message-card"

type Filter = "all" | "unread" | "favorites" | "answered"

export function Inbox({
  username,
  initialMessages,
}: {
  username: string
  initialMessages: Message[]
}) {
  const [messages, setMessages] = React.useState(initialMessages)
  const [tab, setTab] = React.useState<Filter>("all")

  const patch = React.useCallback(
    (id: string, changes: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...changes } : m))
      )
    },
    []
  )

  const actions = React.useMemo<MessageActions>(
    () => ({
      async read(id) {
        patch(id, { is_read: true })
      },
      async favorite(id, value) {
        patch(id, { is_favorite: value })
        await actionToggleFavorite(id, value)
      },
      async publish(id, value) {
        patch(id, { is_published: value })
        await actionTogglePublish(id, value)
        toast.success(value ? "Published to your wall" : "Removed from wall")
      },
      async reply(id, text) {
        patch(id, {
          reply: text || null,
          is_read: true,
          replied_at: text ? new Date().toISOString() : null,
        })
        await actionReply(id, text)
      },
      async remove(id) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        await actionDelete(id)
        toast.success("Message deleted")
      },
    }),
    [patch]
  )

  const unread = messages.filter((m) => !m.is_read)
  const favorites = messages.filter((m) => m.is_favorite)
  const answered = messages.filter((m) => m.reply)

  const lists: Record<Filter, Message[]> = {
    all: messages,
    unread,
    favorites,
    answered,
  }

  async function markAll() {
    setMessages((prev) => prev.map((m) => ({ ...m, is_read: true })))
    await actionMarkAllRead()
    toast.success("All caught up")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6 border-y border-border py-3 text-sm">
        <Stat label="total" value={messages.length} />
        <Stat label="unread" value={unread.length} />
        <Stat label="favorites" value={favorites.length} />
      </div>

      <CopyLink username={username} />

      <Tabs value={tab} onValueChange={(v) => setTab(v as Filter)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread{unread.length ? ` (${unread.length})` : ""}
            </TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="answered">Answered</TabsTrigger>
          </TabsList>
          {unread.length > 0 ? (
            <Button variant="ghost" size="sm" onClick={markAll}>
              <CheckCheck className="size-4" />
              Mark all read
            </Button>
          ) : null}
        </div>

        {(Object.keys(lists) as Filter[]).map((key) => (
          <TabsContent key={key} value={key}>
            <MessageList messages={lists[key]} actions={actions} filter={key} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function MessageList({
  messages,
  actions,
  filter,
}: {
  messages: Message[]
  actions: MessageActions
  filter: Filter
}) {
  if (messages.length === 0) {
    const copy: Record<Filter, string> = {
      all: "No messages yet. Share your link to start receiving them.",
      unread: "You're all caught up. Nice.",
      favorites: "Tap the heart on a message to save it here.",
      answered: "Messages you reply to will show up here.",
    }
    return (
      <div className="border border-dashed border-border py-14 text-center">
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          {copy[filter]}
        </p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => (
        <MessageCard key={m.id} message={m} actions={actions} />
      ))}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="tabular-nums text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}
