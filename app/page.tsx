import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { BugForm } from "@/components/bug-form"
import { TicketLookup } from "@/components/ticket-lookup"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-svh">
      <SiteHeader
        right={
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/admin/login">
              <ShieldCheck className="h-4 w-4" />
              Espace administrateur
            </Link>
          </Button>
        }
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Signalez un problème, suivez sa résolution
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Décrivez le problème que vous rencontrez. Notre équipe le prend en charge et vous
            pouvez suivre l&apos;avancement de sa résolution à tout moment grâce à votre référence
            de ticket.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Soumettre un problème</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous. Vous recevrez une référence de suivi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BugForm />
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Déjà un ticket ?</CardTitle>
              <CardDescription>
                Saisissez votre référence pour consulter le suivi et échanger avec notre équipe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TicketLookup />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
