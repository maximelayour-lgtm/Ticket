"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { loginAdmin, type AdminState } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, LogIn } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full gap-2">
      <LogIn className="h-4 w-4" />
      {pending ? "Connexion…" : "Se connecter"}
    </Button>
  )
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState<AdminState, FormData>(loginAdmin, {})

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Identifiant</Label>
        <Input id="username" name="username" placeholder="admin" autoComplete="username" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••"
          autoComplete="current-password"
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
