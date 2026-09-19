import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-4">
      <h1 className="text-base font-medium tracking-tight text-foreground">
        Anonymous messages, honestly.
      </h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          I wanted a quieter way to hear what people actually think. So this is
          it: one link you can share anywhere, and anyone can{" "}
          <span className="text-foreground underline decoration-border underline-offset-4">
            write to you without signing in
          </span>
          . No names, no tracking, no feed to doomscroll.
        </p>
        <p>
          Messages land in a calm inbox. You read them on your own time, answer
          the ones worth answering, and{" "}
          <span className="text-foreground underline decoration-border underline-offset-4">
            publish the good ones
          </span>{" "}
          to a public wall — or keep everything private. You are always in
          control.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link
          href="/sign-up"
          className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          get your link →
        </Link>
        <Link
          href="/u/alex"
          className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
        >
          see a live example
        </Link>
      </div>
    </section>
  )
}
