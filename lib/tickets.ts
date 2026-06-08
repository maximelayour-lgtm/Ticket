export type TicketStatus = "a_traiter" | "en_cours" | "termine"

export const STATUS_LABELS: Record<TicketStatus, string> = {
  a_traiter: "À traiter",
  en_cours: "En cours",
  termine: "Terminé",
}

export const STATUS_ORDER: TicketStatus[] = ["a_traiter", "en_cours", "termine"]

export function isValidStatus(value: string): value is TicketStatus {
  return value === "a_traiter" || value === "en_cours" || value === "termine"
}

// Génère une référence lisible du type ABCD-1234
export function generateReference(): string {
  const letters = Array.from({ length: 4 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  ).join("")
  const digits = String(Math.floor(1000 + Math.random() * 9000))
  return `${letters}-${digits}`
}
