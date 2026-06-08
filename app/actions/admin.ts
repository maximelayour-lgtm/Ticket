"use server"

import { db } from "@/lib/db"
import { tickets, ticketMessages } from "@/lib/db/schema"
import { isValidStatus } from "@/lib/tickets"
import {
  checkAdminCredentials,
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
} from "@/lib/admin-auth"
import { asc, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type AdminState = { error?: string }

// Connexion administrateur
export async function loginAdmin(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const username = String(formData.get("username") || "").trim()
  const password = String(formData.get("password") || "")

  if (!checkAdminCredentials(username, password)) {
    return { error: "Identifiant ou mot de passe incorrect." }
  }

  await setAdminSession()
  redirect("/admin")
}

export async function logoutAdmin(): Promise<void> {
  await clearAdminSession()
  redirect("/admin/login")
}

// Liste de tous les tickets (admin uniquement)
export async function getAllTickets() {
  if (!(await isAdminAuthenticated())) throw new Error("Non autorisé")
  return db.select().from(tickets).orderBy(desc(tickets.updatedAt))
}

// Détail d'un ticket (admin uniquement)
export async function getAdminTicket(reference: string) {
  if (!(await isAdminAuthenticated())) throw new Error("Non autorisé")

  const [ticket] = await db
    .select()
    .from(tickets)
    .where(eq(tickets.reference, reference))
    .limit(1)

  if (!ticket) return null

  const messages = await db
    .select()
    .from(ticketMessages)
    .where(eq(ticketMessages.ticketId, ticket.id))
    .orderBy(asc(ticketMessages.createdAt))

  return { ticket, messages }
}

// L'admin répond à un ticket
export async function addAdminReply(_prev: AdminState, formData: FormData): Promise<AdminState> {
  if (!(await isAdminAuthenticated())) return { error: "Non autorisé" }

  const reference = String(formData.get("reference") || "").trim()
  const body = String(formData.get("body") || "").trim()

  if (!body) return { error: "La réponse ne peut pas être vide." }

  const [ticket] = await db
    .select()
    .from(tickets)
    .where(eq(tickets.reference, reference))
    .limit(1)

  if (!ticket) return { error: "Ticket introuvable." }

  await db.insert(ticketMessages).values({
    ticketId: ticket.id,
    author: "admin",
    body,
  })

  await db.update(tickets).set({ updatedAt: new Date() }).where(eq(tickets.id, ticket.id))

  revalidatePath(`/admin/ticket/${reference}`)
  return {}
}

// L'admin change le statut d'un ticket
export async function updateTicketStatus(reference: string, status: string): Promise<AdminState> {
  if (!(await isAdminAuthenticated())) return { error: "Non autorisé" }
  if (!isValidStatus(status)) return { error: "Statut invalide." }

  await db
    .update(tickets)
    .set({ status, updatedAt: new Date() })
    .where(eq(tickets.reference, reference))

  revalidatePath(`/admin/ticket/${reference}`)
  revalidatePath("/admin")
  return {}
}
