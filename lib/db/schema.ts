import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core"

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  email: text("email").notNull(),
  customerNumber: text("customer_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("a_traiter"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const ticketMessages = pgTable("ticket_messages", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id").notNull(),
  author: text("author").notNull(), // "client" | "admin"
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Ticket = typeof tickets.$inferSelect
export type TicketMessage = typeof ticketMessages.$inferSelect
