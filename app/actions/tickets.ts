"use server"

import { db } from "@/lib/db"
import { tickets, ticketMessages } from "@/lib/db/schema"
import { generateReference } from "@/lib/tickets"
import { asc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type SubmitState = { error?: string }

// Soumission d'un nouveau bug par un client
export async function submitTicket(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  const email = String(formData.get("email") || "").trim()
  const customerNumber = String(formData.get("customerNumber") || "").trim()
  const title = String(formData.get("title") || "").trim()
  const description = String(formData.get("description") || "").trim()

  if (!email || !customerNumber || !title || !description) {
    return { error: "Tous les champs sont obligatoires." }
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return { error: "Veuillez saisir une adresse e-mail valide." }
  }

  const reference = generateReference()

  const [created] = await db
    .insert(tickets)
    .values({ reference, email, customerNumber, title, description })
    .returning()

  await db.insert(ticketMessages).values({
    ticketId: created.id,
    author: "client",
    body: description,
  })

  redirect(`/ticket/${created.reference}`)
}

// Récupère un ticket + ses messages à partir de sa référence
export async function getTicketByReference(reference: string) {
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

// Un client ajoute un message à son ticket
export async function addClientMessage(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  const reference = String(formData.get("reference") || "").trim()
  const body = String(formData.get("body") || "").trim()

  if (!reference) return { error: "Référence manquante." }
  if (!body) return { error: "Le message ne peut pas être vide." }

  const [ticket] = await db
    .select()
    .from(tickets)
    .where(eq(tickets.reference, reference))
    .limit(1)

  if (!ticket) return { error: "Ticket introuvable." }

  await db.insert(ticketMessages).values({
    ticketId: ticket.id,
    author: "client",
    body,
  })

  await db.update(tickets).set({ updatedAt: new Date() }).where(eq(tickets.id, ticket.id))

  revalidatePath(`/ticket/${reference}`)
  return {}
}
