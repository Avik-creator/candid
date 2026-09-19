import Link from "next/link"

import { cn } from "@/lib/utils"

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium tracking-tight text-foreground",
        className
      )}
    >
      <span className="text-muted-foreground">~/</span>
      <span>candid</span>
    </Link>
  )
}
