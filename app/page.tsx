import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/landing/hero"
import { Features, Faq, HowItWorks } from "@/components/landing/sections"
import { CtaSection, SiteFooter } from "@/components/landing/cta-footer"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const user = await getCurrentUser()
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-16">
      <SiteHeader />
      <main className="pt-6">
        <Hero />
        <HowItWorks />
        <Features />
        <Faq />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
