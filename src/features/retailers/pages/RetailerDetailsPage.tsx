import {
  ArrowLeft,
  CalendarDays,
  Edit,
  MapPin,
  Phone,
  Store,
  UserRound,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { useRetailerStore } from '@/features/retailers/store/retailerStore'

function RetailerDetailsPage() {
  const { id } = useParams()
  const retailer = useRetailerStore((state) =>
    state.retailers.find((item) => item.id === id),
  )

  if (!retailer) {
    return (
      <section className="rounded-card border border-border bg-surface p-8 text-center">
        <Store size={32} className="mx-auto text-muted" />
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Retailer not found
        </h1>
        <p className="mt-2 text-sm text-muted">
          This retailer may have been removed or the link is invalid.
        </p>
        <Link
          to="/retailers"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700"
        >
          <ArrowLeft size={17} /> Back to Retailers
        </Link>
      </section>
    )
  }

  const details = [
    { label: 'Retailer Name', value: retailer.name, icon: Store },
    { label: 'TIN Number', value: retailer.tin || 'Not provided', icon: UserRound },
    { label: 'Mobile Number', value: retailer.mobile, icon: Phone },
    { label: 'Business Address', value: retailer.address, icon: MapPin },
    { label: 'Registration Status', value: retailer.status, icon: CalendarDays },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section>
        <div className="mb-2 flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted hover:text-primary-700">Dashboard</Link>
          <span className="text-muted">/</span>
          <Link to="/retailers" className="text-muted hover:text-primary-700">Retailers</Link>
          <span className="text-muted">/</span>
          <span className="font-semibold text-primary-700">Details</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Retailer Details
            </h1>
            <p className="mt-1 text-sm text-muted">
              View registered retailer information.
            </p>
          </div>
          <Link
            to={`/retailers/${retailer.id}/edit`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            <Edit size={17} /> Edit Retailer
          </Link>
        </div>
      </section>

      <section className="overflow-hidden rounded-card border border-border/70 bg-surface shadow-sm">
        <div className="flex flex-col items-center gap-4 border-b border-border bg-background p-6 text-center sm:flex-row sm:text-left">
          {retailer.photoUrl ? (
            <img
              src={retailer.photoUrl}
              alt={`${retailer.name} shop`}
              className="size-24 rounded-2xl border border-border object-cover"
            />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
              <Store size={38} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-foreground">{retailer.name}</h2>
            <p className="mt-1 text-sm text-muted">TIN: {retailer.tin || 'Not provided'}</p>
            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                retailer.status === 'Active'
                  ? 'bg-success-soft text-success'
                  : 'bg-warning-soft text-warning'
              }`}
            >
              {retailer.status}
            </span>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <Icon size={19} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted">{label}</p>
                <p className="mt-1 break-words text-sm font-semibold text-foreground">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <Link
          to="/retailers"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground hover:bg-background"
        >
          <ArrowLeft size={17} /> Back to Retailers
        </Link>
        <Link
          to="/collect-tcs"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary-700 px-5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Collect TCS
        </Link>
      </div>
    </div>
  )
}

export default RetailerDetailsPage
