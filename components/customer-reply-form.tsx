"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { addClientMessage, type SubmitState } from "@/app/actions/tickets"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="gap-2">
      <Send className="h-4 w-4" />
      {pending ? "Envoi…" : "Envoyer le message"}
    </Button>
  )
}

export function CustomerReplyForm({ reference }: { reference: string }) {
  const [state, formAction] = useActionState<SubmitState, FormData>(addClientMessage, {})
  const formRef = useRef<HTMLFormElement>(null)
  const prevState = useRef(state)

  useEffect(() => {
    if (state === prevState.current) return
    prevState.current = state
    if (state.error) {
      toast.error(state.error)
    } else {
      toast.success("Message envoyé")
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="reference" value={reference} />
      <Textarea
        name="body"
        placeholder="Ajouter un complément d'information…"
        rows={3}
        required
      />
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
