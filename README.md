<div align="center">

# ~/candid

**Anonymous messages, honestly.**

A sleek, privacy-focused anonymous messaging platform. Share your link, collect unfiltered thoughts, and publish the answers you love to your personal public wall.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Neon](https://img.shields.io/badge/Neon-Postgres-00E599?style=flat&logo=postgresql)](https://neon.tech/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat)](https://orm.drizzle.team/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Features

- **🔒 100% Anonymous Delivery** — Senders can drop thoughts, questions, or feedback with zero account creation or identity tracking.
- **⚡ Lakebase Postgres on Neon** — Serverless PostgreSQL with connection pooling (up to 100 connections) and instant autoscaling.
- **🔑 Neon Auth (Managed Better Auth)** — Secure authentication supporting both Email/Password and Google OAuth out of the box.
- **🛡️ Edge Proxy Middleware** — Next 16 middleware (`proxy.ts`) manages session exchange, route protection, and redirects logged-in users away from marketing pages.
- **💬 Inbox Management** — Filter by Unread, Favorites, and Answered. Mark all read, reply inline, and publish Q&As to your wall.
- **🖼️ Dynamic OpenGraph Cards** — Automated 1200×630 social sharing cards for both the root website and individual user profile pages (`/u/[username]`) powered by `@vercel/og` (`next/og`).
- **🌐 Dynamic Domain Handling** — Full environment-based domain resolution for shareable links, metadata, sitemaps, and robots directives.
- **🎨 Minimal Terminal Aesthetic** — Monospace typography, responsive dark/light theme switching via `next-themes`, and clean Shadcn UI components.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (Turbopack, App Router, React 19) |
| **Database** | [Neon Postgres](https://neon.tech/) (Serverless PostgreSQL) |
| **ORM & Migrations** | [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit |
| **Authentication** | [Neon Auth](https://neon.tech/docs/auth) (`@neondatabase/auth`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/) |
| **Icons & Notifications** | [Lucide Icons](https://lucide.dev/) & [Sonner](https://sonner.emilkowal.ski/) |

---

## 📂 Project Structure

```
├── app/
│   ├── actions.ts                  # Server actions (send, reply, favorite, publish, delete)
│   ├── api/auth/[...path]/route.ts # Catch-all Neon Auth proxy route
│   ├── dashboard/                  # Authenticated inbox & account settings
│   ├── onboarding/                 # Username reservation & initial profile setup
│   ├── sign-in/ & sign-up/         # Authentication entry points
│   ├── u/[username]/               # Public profile page & dynamic OG card
│   ├── icon.tsx & apple-icon.tsx   # Dynamic favicons & Apple Touch Icon
│   ├── opengraph-image.tsx         # Dynamic root OpenGraph image
│   ├── robots.ts & sitemap.ts      # Search engine SEO generators
│   └── page.tsx                    # Landing page with session redirection
├── components/
│   ├── dashboard/                  # Inbox, message card, copy link, and profile form
│   ├── landing/                    # Hero, feature sections, and CTA footer
│   ├── ui/                         # Shadcn UI primitives (button, input, dialog, etc.)
│   └── auth-form.tsx               # Unified credentials + Google OAuth form
├── lib/
│   ├── auth.ts & auth-client.ts    # Neon Auth server and browser clients
│   ├── config.ts                   # Centralized domain and readiness checks
│   ├── db.ts                       # Postgres connection pool (max: 100) & Drizzle client
│   ├── queries.ts                  # Database queries for profiles and messages
│   └── db/schema.ts                # Drizzle schema definition
├── proxy.ts                        # Next 16 Edge middleware
├── neon.ts                         # Neon project service configuration
└── drizzle.config.ts               # Drizzle migration and schema configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18+ or v20+)
- [pnpm](https://pnpm.io/) (v9 or v10)
- A [Neon](https://neon.tech/) account

### 1. Clone the repository

```bash
git clone https://github.com/Avik-creator/candid.git
cd candid
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file by copying the template:

```bash
cp .env.example .env.local
```

Fill in your Neon database and authentication credentials:

```env
# Neon Database
DATABASE_URL="postgresql://neondb_owner:password@ep-xyz-pooler.c-4.aws.neon.tech/neondb?sslmode=require"
NEON_BRANCH="production"

# Neon Auth (Managed Better Auth)
NEON_AUTH_BASE_URL="https://ep-xyz.neonauth.c-4.aws.neon.tech/neondb/auth"
NEON_AUTH_JWKS_URL="https://ep-xyz.neonauth.c-4.aws.neon.tech/neondb/auth/.well-known/jwks.json"
NEON_AUTH_COOKIE_SECRET="your-32-character-cookie-secret"

# App URLs
NEXT_PUBLIC_APP_DOMAIN="candid.avikmukherjee.com"
NEXT_PUBLIC_APP_URL="https://candid.avikmukherjee.com"
```

> **Tip:** Generate a secure cookie secret with `openssl rand -base64 32`.

### 4. Push Database Schema

Push the Drizzle schema to your Neon database:

```bash
pnpm drizzle-kit push
```

### 5. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Neon pooled PostgreSQL connection string | `postgresql://user:pass@ep-pooler.neon.tech/neondb?sslmode=require` |
| `NEON_BRANCH` | Neon project branch name | `production` |
| `NEON_AUTH_BASE_URL` | Managed Better Auth endpoint URL | `https://ep-xyz.neonauth.aws.neon.tech/neondb/auth` |
| `NEON_AUTH_JWKS_URL` | JWKS endpoint for token validation | `https://ep-xyz.neonauth.aws.neon.tech/neondb/auth/.well-known/jwks.json` |
| `NEON_AUTH_COOKIE_SECRET` | 32+ character random string for signing session cookies | Generated with `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_DOMAIN` | Public domain name without protocol | `candid.avikmukherjee.com` |
| `NEXT_PUBLIC_APP_URL` | Full public URL including protocol | `https://candid.avikmukherjee.com` |

---

## 📜 Scripts

| Command | Action |
|---|---|
| `pnpm dev` | Starts local Next.js dev server with Turbopack |
| `pnpm build` | Builds optimized production bundle |
| `pnpm start` | Runs the production server |
| `pnpm drizzle-kit push` | Applies schema updates directly to the Neon database |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
