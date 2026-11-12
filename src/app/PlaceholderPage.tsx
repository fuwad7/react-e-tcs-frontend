import { Link } from 'react-router-dom'

interface PlaceholderPageProps {
  title: string
  description: string
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg rounded-card border border-border bg-surface p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>

        <p className="mt-3 text-sm text-muted">{description}</p>

        <p className="mt-5 text-sm text-muted">
          This module is under development.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-control bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Back to Dashboard
        </Link>
      </div>
    </section>
  )
}

export default PlaceholderPage
