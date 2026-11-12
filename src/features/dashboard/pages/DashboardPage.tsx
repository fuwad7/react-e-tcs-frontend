import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  MapPin,
  Store,
  Users,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  {
    label: 'Total Retailers',
    value: '1,248',
    change: '+12 this month',
    icon: Store,
    iconClass: 'bg-primary-50 text-primary-700',
  },
  {
    label: 'Total Collection',
    value: '৳ 8,45,250',
    change: 'This month',
    icon: Wallet,
    iconClass: 'bg-info-soft text-info',
  },
  {
    label: 'Successful Payments',
    value: '186',
    change: 'This month',
    icon: CheckCircle2,
    iconClass: 'bg-success-soft text-success',
  },
  {
    label: 'Pending Payments',
    value: '12',
    change: 'Requires attention',
    icon: ClipboardList,
    iconClass: 'bg-warning-soft text-warning',
  },
]

const actions = [
  {
    id: 'collect-tcs',
    title: 'Collect TCS',
    description: 'Collect tax from a retailer',
    icon: Wallet,
    className: 'bg-primary-700 text-white',
    iconClass: 'bg-white/15',
    href: '/collect-tcs',
  },
  {
    id: 'challan',
    title: 'Challan History',
    description: 'View payment challans',
    icon: FileText,
    className: 'border border-border bg-white text-foreground',
    iconClass: 'bg-primary-50 text-primary-700',
    href: '/challan',
  },
  {
    id: 'rso',
    title: 'RSO Management',
    description: 'Manage RSO information',
    icon: Users,
    className: 'border border-border bg-white text-foreground',
    iconClass: 'bg-info-soft text-info',
    href: '/rso',
  },
  {
    id: 'retailers',
    title: 'Retailers',
    description: 'View and manage retailers',
    icon: Store,
    className: 'border border-border bg-white text-foreground',
    iconClass: 'bg-warning-soft text-warning',
    href: '/retailers',
  },
]

const collections = [
  {
    name: 'Rahman Traders',
    tin: '123456789012',
    date: '11 Nov 2026',
    amount: '৳ 2,500',
    status: 'Deposited',
  },
  {
    name: 'M/S Karim Enterprise',
    tin: '987654321098',
    date: '10 Nov 2026',
    amount: '৳ 1,800',
    status: 'Deposited',
  },
  {
    name: 'New Market Store',
    tin: '456789123012',
    date: '10 Nov 2026',
    amount: '৳ 3,200',
    status: 'Pending',
  },
]

function DashboardPage() {
  return (
    <div className="space-y-7">
      {/* Dashboard welcome banner */}
      <section className="rounded-card bg-gradient-to-r from-primary-700 to-primary-500 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-white/75">
              Tuesday, 11 November 2026
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Welcome back, Officer!
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin size={15} />
              Dhaka Zone · RSO: 10245
            </p>
          </div>

        </div>
      </section>

      {/* Statistics */}
      <section aria-label="Dashboard statistics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <article
                key={stat.label}
                className="rounded-card border border-border/70 bg-surface p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.iconClass}`}>
                    <Icon size={21} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted">{stat.change}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
          <p className="mt-1 text-sm text-muted">
            Common tasks and management shortcuts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.id}
                to={action.href}
                className={`group flex items-center gap-4 rounded-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${action.className}`}
              >
                <div className={`rounded-xl p-3 ${action.iconClass}`}>
                  <Icon size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{action.title}</h3>
                  <p
                    className={`mt-1 text-xs ${
                      action.id === 'collect-tcs'
                        ? 'text-white/70'
                        : 'text-muted'
                    }`}
                  >
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="shrink-0 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recent collections */}
      <section className="rounded-card border border-border/70 bg-surface shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Recent Collections
            </h2>
            <p className="mt-1 text-sm text-muted">
              Overview of the latest TCS transactions
            </p>
          </div>

          <Link
            to="/collections"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500"
          >
            View all <ChevronRight size={17} />
          </Link>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">Retailer</th>
                <th className="px-5 py-4 font-semibold">TIN</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {collections.map((item) => (
                <tr
                  key={item.tin}
                  className="transition hover:bg-background/70"
                >
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {item.name}
                  </td>
                  <td className="px-5 py-4 text-muted">{item.tin}</td>
                  <td className="px-5 py-4 text-muted">{item.date}</td>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {item.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === 'Deposited'
                          ? 'bg-success-soft text-success'
                          : 'bg-warning-soft text-warning'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      aria-label={`View ${item.name}`}
                      className="rounded-lg p-2 text-muted hover:bg-primary-50 hover:text-primary-700"
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-border md:hidden">
          {collections.map((item) => (
            <article key={item.tin} className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">TIN: {item.tin}</p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === 'Deposited'
                      ? 'bg-success-soft text-success'
                      : 'bg-warning-soft text-warning'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{item.date}</span>
                <span className="font-bold text-foreground">
                  {item.amount}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <p className="pb-4 text-center text-xs text-muted">
        Retailer TCS Management System · National Board of Revenue, Bangladesh
      </p>
    </div>
  )
}

export default DashboardPage
