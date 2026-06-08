import Link from "next/link"
import { LifeBuoy } from "lucide-react"

export function SiteHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LifeBuoy className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            Centre de support
          </span>
        </Link>
        {right}
      </div>
    </header>
  )
}
