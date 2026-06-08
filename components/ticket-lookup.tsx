"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function TicketLookup() {
  const router = useRouter()
  const [reference, setReference] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ref = reference.trim().toUpperCase()
    if (ref) router.push(`/ticket/${ref}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="lookup" className="text-sm font-medium text-foreground">
          Suivre un ticket existant
        </label>
        <Input
          id="lookup"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Référence (ex. ABCD-1234)"
        />
      </div>
      <Button type="submit" variant="secondary" className="gap-2">
        <Search className="h-4 w-4" />
        Suivre
      </Button>
    </form>
  )
}
