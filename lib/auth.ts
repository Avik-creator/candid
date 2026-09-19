import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});

export type CurrentUser = {
  id: string;
  displayName: string | null;
  email: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const { data: session } = await auth.getSession();
  if (!session?.user) return null;

  return {
    id: session.user.id,
    displayName: session.user.name ?? null,
    email: session.user.email ?? null,
  };
}
