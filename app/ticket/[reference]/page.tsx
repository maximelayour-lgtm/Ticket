import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getTicketByReference } from "@/app/actions/tickets"
import { SiteHeader } from "@/components/site-header"
import { StatusBadge } from "@/components/status-badge"
import { MessageThread } from "@/components/message-thread"
import { CustomerReplyForm } from "@/components/customer-reply-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(d))
}

export default async function TicketPage({
  params,
}: {
  params: Promise<{ reference: string }>
}) {
  const { reference } = await params
  const data = await getTicketByReference(reference.toUpperCase())

  if (!data) notFound()

  const { ticket, messages } = data

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>

        <Card>
          <CardHeader className="gap-3 border-b">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-muted-foreground">
                  Ticket {ticket.reference}
                </span>
                <CardTitle className="text-balance text-xl">{ticket.title}</CardTitle>
              </div>
              <StatusBadge status={ticket.status} />
            </div>
            <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">E-mail :</dt>
                <dd className="text-foreground">{ticket.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">N° client :</dt>
                <dd className="text-foreground">{ticket.customerNumber}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Créé le :</dt>
                <dd className="text-foreground">{formatDate(ticket.createdAt)}</dd>
              </div>
            </dl>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-6">
            <section className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-foreground">Suivi de la conversation</h2>
              <MessageThread messages={messages} />
            </section>
            <section className="flex flex-col gap-2 border-t pt-6">
              <h2 className="text-sm font-semibold text-foreground">Compléter votre demande</h2>
              <CustomerReplyForm reference={ticket.reference} />
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
