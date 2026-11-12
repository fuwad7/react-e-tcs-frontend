import { Home, Store, Users, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { label: 'Home', path: '/', icon: Home, end: true },
  { label: 'Collections', path: '/collections', icon: Wallet },
  { label: 'RSO', path: '/rso', icon: Users },
  { label: 'Retailers', path: '/retailers', icon: Store },
]

function MobileNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {items.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex min-w-0 flex-col items-center gap-1 px-3 py-1 transition ${
                isActive ? 'text-primary-700' : 'text-muted'
              }`
            }
          >
            <Icon size={21} />
            <span className="text-[11px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNavigation
