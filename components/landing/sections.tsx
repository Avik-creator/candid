const STEPS = [
  {
    title: "Claim your link",
    body: "Pick a username and get a clean, shareable profile at /u/you.",
  },
  {
    title: "Share it anywhere",
    body: "Drop it in your bio, stories, or a group chat. Anyone can write to you, no account required.",
  },
  {
    title: "Read & reply",
    body: "Answer your favorites and publish them to your public wall, or keep them to yourself.",
  },
]

const FEATURES: [string, string][] = [
  [
    "Truly anonymous",
    "Senders never sign in. No names, no tracking, no identity attached to a message.",
  ],
  [
    "A calm inbox",
    "Filter unread, favorites, and answered. No infinite feed, no pressure.",
  ],
  [
    "You're in control",
    "Pause messages any time with one toggle. Delete anything instantly.",
  ],
  [
    "Custom prompts",
    "Set the question people see — ask for advice, feedback, or hot takes.",
  ],
  [
    "Public wall",
    "Publish answered messages to a shareable page that stays readable.",
  ],
  [
    "Own your data",
    "Everything is private by default. You decide what, if anything, goes public.",
  ],
]

const FAQS: [string, string][] = [
  [
    "Is it really anonymous?",
    "Yes. People sending you messages don't create an account and no identity is attached to what they send.",
  ],
  [
    "Can I stop receiving messages?",
    "Any time. Flip the 'accepting messages' toggle off and your form politely closes.",
  ],
  [
    "Do I have to publish messages?",
    "No. Everything is private by default. You choose which answered messages appear on your public wall.",
  ],
  [
    "How much does it cost?",
    "It's free. Claim your link and start collecting messages in seconds.",
  ],
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  )
}

function Divider() {
  return <hr className="my-12 border-border" />
}

export function HowItWorks() {
  return (
    <section id="how">
      <Divider />
      <SectionLabel>How it works</SectionLabel>
      <ol className="space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4 text-sm">
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="text-foreground">{step.title}.</span>{" "}
              <span className="text-muted-foreground">{step.body}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Features() {
  return (
    <section id="features">
      <Divider />
      <SectionLabel>What you get</SectionLabel>
      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[10rem_1fr]">
        {FEATURES.map(([term, desc]) => (
          <div key={term} className="contents">
            <dt className="text-sm text-foreground">{term}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              {desc}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq">
      <Divider />
      <SectionLabel>FAQ</SectionLabel>
      <div className="space-y-6">
        {FAQS.map(([q, a]) => (
          <div key={q} className="text-sm">
            <p className="text-foreground">{q}</p>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
