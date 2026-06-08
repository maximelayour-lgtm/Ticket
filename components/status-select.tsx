"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { updateTicketStatus } from "@/app/actions/admin"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STATUS_ORDER, STATUS_LABELS } from "@/lib/tickets"

export function StatusSelect({
  reference,
  status,
}: {
  reference: string
  status: string
}) {
  const [value, setValue] = useState(status)
  const [pending, startTransition] = useTransition()

  function handleChange(next: string) {
    const prev = value
    setValue(next)
    startTransition(async () => {
      const result = await updateTicketStatus(reference, next)
      if (result?.error) {
        setValue(prev)
        toast.error(result.error)
      } else {
        toast.success(`Statut mis à jour : ${STATUS_LABELS[next as keyof typeof STATUS_LABELS]}`)
      }
    })
  }

  return (
    <Select value={value} onValueChange={handleChange} disabled={pending}>
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_ORDER.map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
