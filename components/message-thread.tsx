import type { TicketMessage } from "@/lib/db/schema"
import { cn } from "@/lib/utils"

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(d))
}

export function MessageThread({ messages }: { messages: TicketMessage[] }) {
  if (messages.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Aucun message pour le moment.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {messages.map((m) => {
        const isAdmin = m.author === "admin"
        return (
          <li
            key={m.id}
            className={cn("flex flex-col gap-1", isAdmin ? "items-end" : "items-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg border px-4 py-3 text-sm leading-relaxed",
                isAdmin
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-muted text-foreground",
              )}
            >
              <p className="whitespace-pre-wrap">{m.body}</p>
            </div>
            <span className="px-1 text-xs text-muted-foreground">
              {isAdmin ? "Support" : "Vous"} · {formatDate(m.createdAt)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
