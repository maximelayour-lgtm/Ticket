import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronRight, Inbox } from "lucide-react"
import { getAllTickets } from "@/app/actions/admin"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin-header"
import { StatusBadge } from "@/components/status-badge"
import { STATUS_ORDER, STATUS_LABELS, type TicketStatus } from "@/lib/tickets"
import { Card, CardContent } from "@/components/ui/card"

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(d),
  )
}

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login")

  const allTickets = await getAllTickets()

  const counts = STATUS_ORDER.reduce<Record<TicketStatus, number>>(
    (acc, s) => {
      acc[s] = allTickets.filter((t) => t.status === s).length
      return acc
    },
    { a_traiter: 0, en_cours: 0, termine: 0 },
  )

  return (
    <div className="min-h-screen bg-muted/40">
      <AdminHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">Tickets de support</h1>
          <p className="text-sm text-muted-foreground">
            {allTickets.length} ticket{allTickets.length > 1 ? "s" : ""} au total
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          {STATUS_ORDER.map((s) => (
            <Card key={s}>
              <CardContent className="flex flex-col gap-1 py-4">
                <span className="text-2xl font-semibold text-foreground">{counts[s]}</span>
                <span className="text-xs text-muted-foreground">{STATUS_LABELS[s]}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            {allTickets.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16 text-center text-muted-foreground">
                <Inbox className="h-8 w-8" />
                <p className="text-sm">Aucun ticket pour le moment.</p>
              </div>
            ) : (
              <ul className="divide-y">
                {allTickets.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/admin/ticket/${t.reference}`}
                      className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            {t.reference}
                          </span>
                          <StatusBadge status={t.status} />
                        </div>
                        <span className="truncate font-medium text-foreground">{t.title}</span>
                        <span className="truncate text-xs text-muted-foreground">
                          {t.email} · {t.customerNumber} · {formatDate(t.updatedAt)}
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
