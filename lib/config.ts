export const isAuthConfigured = Boolean(
  process.env.DATABASE_URL && process.env.NEON_AUTH_BASE_URL,
)

export const isDbConfigured = Boolean(process.env.DATABASE_URL)
