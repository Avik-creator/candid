export const isAuthConfigured = Boolean(
  process.env.DATABASE_URL && process.env.NEON_AUTH_BASE_URL,
)

export const isDbConfigured = Boolean(process.env.DATABASE_URL)

export const getAppDomain = () => {
  if (process.env.NEXT_PUBLIC_APP_DOMAIN) {
    return process.env.NEXT_PUBLIC_APP_DOMAIN.replace(/^https?:\/\//, "").replace(/\/+$/, "")
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/^https?:\/\//, "").replace(/\/+$/, "")
  }
  if (typeof window !== "undefined") {
    return window.location.host
  }
  return "localhost:3000"
}

export const getAppUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "")
  }
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN
  if (domain) {
    const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/+$/, "")
    return cleanDomain.startsWith("localhost") || cleanDomain.startsWith("127.0.0.1")
      ? `http://${cleanDomain}`
      : `https://${cleanDomain}`
  }
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return "http://localhost:3000"
}

export const APP_DOMAIN = getAppDomain()
export const APP_URL = getAppUrl()
