import "server-only"
import { cookies } from "next/headers"

// Authentification administrateur simple basée sur un cookie.
// Identifiants fixes demandés : identifiant "admin" / mot de passe "admin".
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin"
const ADMIN_COOKIE = "admin_session"
const ADMIN_COOKIE_VALUE = "ok"

export function checkAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return store.get(ADMIN_COOKIE)?.value === ADMIN_COOKIE_VALUE
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies()
  store.set(ADMIN_COOKIE, ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 heures
  })
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
}
