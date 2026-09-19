import Link from "next/link"

export function CtaSection() {
  return (
    <section id="cta">
      <hr className="my-12 border-border" />
      <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Get started
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Claim your link and start collecting honest, anonymous messages. It
        takes about ten seconds.
      </p>
      <div className="mt-5">
        <Link
          href="/sign-up"
          className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          get your link →
        </Link>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} candid — built for honest conversations.</p>
      <div className="flex items-center gap-4">
        <Link href="/sign-in" className="transition-colors hover:text-foreground">
          log in
        </Link>
        <Link href="/sign-up" className="transition-colors hover:text-foreground">
          sign up
        </Link>
      </div>
    </footer>
  )
}
