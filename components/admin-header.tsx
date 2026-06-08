import { logoutAdmin } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { LogOut, LifeBuoy } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LifeBuoy className="h-4 w-4" />
          </span>
          Support · Administration
        </Link>
        <form action={logoutAdmin}>
          <Button type="submit" variant="ghost" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </form>
      </div>
    </header>
  )
}
