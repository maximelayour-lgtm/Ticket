"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { submitTicket, type SubmitState } from "@/app/actions/tickets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Send } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full gap-2">
      <Send className="h-4 w-4" />
      {pending ? "Envoi en cours..." : "Soumettre le problème"}
    </Button>
  )
}

export function BugForm() {
  const [state, formAction] = useActionState<SubmitState, FormData>(submitTicket, {})

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input id="email" name="email" type="email" placeholder="vous@entreprise.com" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="customerNumber">Numéro client</Label>
          <Input id="customerNumber" name="customerNumber" placeholder="Ex. CLI-00421" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Objet du problème</Label>
        <Input id="title" name="title" placeholder="Résumé court du problème" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description détaillée</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Décrivez le problème rencontré, les étapes pour le reproduire, le comportement attendu..."
          rows={6}
          required
        />
      </div>

      {state?.error ? (
        <p className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  )
}
