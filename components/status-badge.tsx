import { Badge } from "@/components/ui/badge"
import { STATUS_LABELS, type TicketStatus } from "@/lib/tickets"
import { cn } from "@/lib/utils"

const STYLES: Record<TicketStatus, string> = {
  a_traiter: "bg-muted text-muted-foreground border-border",
  en_cours: "bg-accent text-accent-foreground border-transparent",
  termine: "bg-chart-2/15 text-chart-2 border-transparent",
}

export function StatusBadge({ status }: { status: string }) {
  const key = (status in STATUS_LABELS ? status : "a_traiter") as TicketStatus
  return (
    <Badge variant="outline" className={cn("font-medium", STYLES[key])}>
      {STATUS_LABELS[key]}
    </Badge>
  )
}
