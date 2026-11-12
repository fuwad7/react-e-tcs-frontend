import { Bell, LogOut } from 'lucide-react'

function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Retailer TCS Management
        </p>
        <p className="hidden text-xs text-muted sm:block">
          National Board of Revenue, Bangladesh
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-muted transition hover:bg-background hover:text-primary-700"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-warning" />
        </button>

        <button
          type="button"
          aria-label="Logout"
          className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-danger"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Topbar
