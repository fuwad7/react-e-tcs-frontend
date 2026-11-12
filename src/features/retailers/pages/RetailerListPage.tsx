import { useMemo, useState } from 'react'
import {
  MapPin,
  Phone,
  Plus,
  Search,
  Store,
  Users,
  UserCheck,
  UserX,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type RetailerStatus = 'Active' | 'Inactive'

interface Retailer {
  id: number
  name: string
  tin: string
  mobile: string
  address: string
  status: RetailerStatus
}

type StatusFilter = 'All' | RetailerStatus

const retailers: Retailer[] = [
  {
    id: 1,
    name: 'Rahman Traders',
    tin: '123456789012',
    mobile: '01712345678',
    address: 'Mirpur, Dhaka',
    status: 'Active',
  },
  {
    id: 2,
    name: 'M/S Karim Enterprise',
    tin: '987654321098',
    mobile: '01812345678',
    address: 'Uttara, Dhaka',
    status: 'Active',
  },
  {
    id: 3,
    name: 'New Market Store',
    tin: '456789123012',
    mobile: '01912345678',
    address: 'New Market, Dhaka',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Al-Amin Corporation',
    tin: '789123456012',
    mobile: '01612345678',
    address: 'Motijheel, Dhaka',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Sarker Trading',
    tin: '321654987012',
    mobile: '01512345678',
    address: 'Farmgate, Dhaka',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Maa Enterprise',
    tin: '654321789012',
    mobile: '01312345678',
    address: 'Mohammadpur, Dhaka',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Bismillah Traders',
    tin: '852963741012',
    mobile: '01412345678',
    address: 'Jatrabari, Dhaka',
    status: 'Active',
  },
  {
    id: 8,
    name: 'City Fashion House',
    tin: '147258369012',
    mobile: '01798765432',
    address: 'Dhanmondi, Dhaka',
    status: 'Active',
  },
]

const filters: StatusFilter[] = ['All', 'Active', 'Inactive']

function RetailerListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')

  const filteredRetailers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return retailers.filter((retailer) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        retailer.name.toLowerCase().includes(normalizedSearch) ||
        retailer.tin.toLowerCase().includes(normalizedSearch) ||
        retailer.mobile.includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'All' || retailer.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const activeCount = retailers.filter(
    (retailer) => retailer.status === 'Active',
  ).length

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
      icon: UserX,
      iconClass: 'bg-warning-soft text-warning',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-primary-700">Retailers</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-foreground">
            Retailer Management
          </h1>

          <p className="mt-1 text-sm text-muted">
            View, search and manage registered retailers.
          </p>
        </div>

        <Link
          to="/retailers/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
        >
          <Plus size={18} />
          Add Retailer
        </Link>
      </section>

      {/* Summary cards */}
      <section
        aria-label="Retailer statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <article
              key={card.label}
              className="flex items-center justify-between rounded-card border border-border/70 bg-surface p-5 shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-muted">{card.label}</p>
                <p className="mt-2 text-2xl font-bold text-foreground">
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

      {/* Retailer list */}
      <section className="overflow-hidden rounded-card border border-border/70 bg-surface shadow-sm">
        <div className="border-b border-border p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Registered Retailers
              </h2>
              <p className="mt-1 text-sm text-muted">
                {filteredRetailers.length} of {retailers.length} retailers
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative min-w-0 sm:w-72">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, TIN or mobile..."
                  aria-label="Search retailers by name, TIN or mobile"
                  className="h-11 w-full rounded-control border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Status filter */}
              <div className="relative sm:w-40">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  aria-label="Filter retailers by status"
                  className="h-11 w-full appearance-none rounded-control border border-border bg-background px-4 pr-9 text-sm font-medium text-foreground outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                >
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter === 'All' ? 'All Status' : filter}
                    </option>
                  ))}
                </select>

                <Store
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
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
                <tr
                  key={retailer.id}
                  className="transition hover:bg-background/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                        <Store size={19} />
                      </div>
                      <span className="font-semibold text-foreground">
                        {retailer.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 tabular-nums text-muted">
                    {retailer.tin}
                  </td>

                  <td className="px-5 py-4 tabular-nums text-muted">
                    {retailer.mobile}
                  </td>

                  <td className="px-5 py-4 text-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {retailer.address}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        retailer.status === 'Active'
                          ? 'bg-success-soft text-success'
                          : 'bg-warning-soft text-warning'
                      }`}
                    >
                      {retailer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-border md:hidden">
          {filteredRetailers.map((retailer) => (
            <article key={retailer.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Store size={19} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {retailer.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      TIN: {retailer.tin}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    retailer.status === 'Active'
                      ? 'bg-success-soft text-success'
                      : 'bg-warning-soft text-warning'
                  }`}
                >
                  {retailer.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 pl-[52px] text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <Phone size={14} />
                  {retailer.mobile}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {retailer.address}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredRetailers.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-background text-muted">
              <Search size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-foreground">
              No retailers found
            </h3>

            <p className="mt-1 text-sm text-muted">
              Try another search term or change the status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('')
                setStatusFilter('All')
              }}
              className="mt-4 text-sm font-semibold text-primary-700 hover:text-primary-600"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Table footer */}
        {filteredRetailers.length > 0 && (
          <div className="border-t border-border bg-background/60 px-5 py-4">
            <p className="text-xs text-muted">
              Showing {filteredRetailers.length} of {retailers.length} retailers
            </p>
          </div>
        )}
      </section>

      <p className="pb-4 text-center text-xs text-muted">
        Retailer information shown here is demonstration data.
      </p>
    </div>
  )
}

export default RetailerListPage
