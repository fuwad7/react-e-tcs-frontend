import { useMemo, useState } from 'react'
import {
  MapPin,
  Plus,
  Search,
  Store,
  UserCheck,
  UserRoundX,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useRetailerStore } from '@/features/retailers/store/retailerStore'

type StatusFilter = 'All Status' | 'Active' | 'Inactive'

function RetailerListPage() {
  const retailers = useRetailerStore((state) => state.retailers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All Status')

  const filteredRetailers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return retailers.filter((retailer) => {
      const matchesSearch =
        !query ||
        retailer.name.toLowerCase().includes(query) ||
        retailer.tin.toLowerCase().includes(query) ||
        retailer.mobile.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All Status' || retailer.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [retailers, search, statusFilter])

  const activeCount = retailers.filter((item) => item.status === 'Active').length
  const inactiveCount = retailers.length - activeCount

  const summaryCards = [
    {
      label: 'Total Retailers',
      value: retailers.length,
      icon: Users,
      iconClass: 'bg-primary-50 text-primary-700',
    },
    {
      label: 'Active Retailers',
      value: activeCount,
      icon: UserCheck,
      iconClass: 'bg-success-soft text-success',
    },
    {
      label: 'Inactive Retailers',
      value: inactiveCount,
      icon: UserRoundX,
      iconClass: 'bg-warning-soft text-warning',
    },
  ]

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted hover:text-primary-700">Dashboard</Link>
            <span className="text-muted">/</span>
            <span className="font-semibold text-primary-700">Retailers</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Retailer Management
          </h1>
          <p className="mt-1 text-sm text-muted">
            View, search and manage registered retailers.
          </p>
        </div>

        <Link
          to="/retailers/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
        >
          <Plus size={19} /> Add Retailer
        </Link>
      </section>

      <section aria-label="Retailer statistics" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <article
              key={card.label}
              className="flex items-center justify-between rounded-card border border-border/70 bg-surface p-5 shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-muted">{card.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${card.iconClass}`}>
                <Icon size={22} />
              </div>
            </article>
          )
        })}
      </section>

      <section className="overflow-hidden rounded-card border border-border/70 bg-surface shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Registered Retailers</h2>
            <p className="mt-1 text-sm text-muted">
              {filteredRetailers.length} of {retailers.length} retailers
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:w-72">
              <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, TIN or mobile..."
                aria-label="Search retailers"
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none placeholder:text-muted focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              aria-label="Filter by status"
              className="h-11 min-w-0 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 sm:w-40"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-background text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">Retailer</th>
                <th className="px-5 py-4 font-semibold">TIN Number</th>
                <th className="px-5 py-4 font-semibold">Mobile</th>
                <th className="px-5 py-4 font-semibold">Address</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRetailers.map((retailer) => (
                <tr key={retailer.id} className="transition hover:bg-background/70">
                  <td className="px-5 py-4">
                    <Link to={`/retailers/${retailer.id}`} className="flex items-center gap-3">
                      {retailer.photoUrl ? (
                        <img src={retailer.photoUrl} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
                      ) : (
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                          <Store size={19} />
                        </span>
                      )}
                      <span className="font-semibold text-foreground hover:text-primary-700">
                        {retailer.name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-muted">{retailer.tin || '—'}</td>
                  <td className="px-5 py-4 text-muted">{retailer.mobile}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 text-muted">
                      <MapPin size={16} /> {retailer.address}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      retailer.status === 'Active'
                        ? 'bg-success-soft text-success'
                        : 'bg-warning-soft text-warning'
                    }`}>
                      {retailer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-border md:hidden">
          {filteredRetailers.map((retailer) => (
            <Link
              key={retailer.id}
              to={`/retailers/${retailer.id}`}
              className="block p-4 transition hover:bg-background/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {retailer.photoUrl ? (
                    <img src={retailer.photoUrl} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <Store size={19} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {retailer.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted">TIN: {retailer.tin || 'Not provided'}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  retailer.status === 'Active'
                    ? 'bg-success-soft text-success'
                    : 'bg-warning-soft text-warning'
                }`}>
                  {retailer.status}
                </span>
              </div>
              <div className="ml-[52px] mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                <span>{retailer.mobile}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} /> {retailer.address}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredRetailers.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Search size={24} className="mx-auto text-muted" />
            <h3 className="mt-3 font-semibold text-foreground">No retailers found</h3>
            <p className="mt-1 text-sm text-muted">
              Try another name, TIN, mobile number or status.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setStatusFilter('All Status')
              }}
              className="mt-4 text-sm font-semibold text-primary-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default RetailerListPage
