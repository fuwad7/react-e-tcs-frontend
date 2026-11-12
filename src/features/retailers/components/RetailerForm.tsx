import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  Camera,
  ImagePlus,
  MapPin,
  Search,
  Store,
  X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import type { Retailer, RetailerStatus } from '@/features/retailers/store/retailerStore'

interface RetailerFormProps {
  initialData?: Retailer
  onSave: (data: Omit<Retailer, 'id'>) => string | void
  pageTitle: string
  submitLabel: string
}

function RetailerForm({
  initialData,
  onSave,
  pageTitle,
  submitLabel,
}: RetailerFormProps) {
  const navigate = useNavigate()

  const [name, setName] = useState(initialData?.name ?? '')
  const [tin, setTin] = useState(initialData?.tin ?? '')
  const [mobile, setMobile] = useState(initialData?.mobile ?? '')
  const [address, setAddress] = useState(initialData?.address ?? '')
  const [status, setStatus] = useState<RetailerStatus>(
    initialData?.status ?? 'Active',
  )
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    initialData?.photoUrl ?? null,
  )
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      // Photo data is stored as a data URL, so no object URL cleanup is needed.
    }
  }, [])

  function handlePhotoChange(file: File | undefined) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be 5 MB or less.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result)
        setError('')
      }
    }

    reader.onerror = () => {
      setError('Unable to read the selected image.')
    }

    reader.readAsDataURL(file)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (tin && !/^\d{12}$/.test(tin)) {
      setError('TIN must contain exactly 12 digits.')
      return
    }

    if (!/^01\d{9}$/.test(mobile)) {
      setError('Enter a valid 11-digit Bangladesh mobile number.')
      return
    }

    if (!photoUrl) {
      setError('Shop photo is required.')
      return
    }

    onSave({
      name: name.trim(),
      tin,
      mobile,
      address: address.trim(),
      status,
      photoUrl,
    })

    navigate('/retailers')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section>
        <div className="mb-2 flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted hover:text-primary-700">
            Dashboard
          </Link>
          <span className="text-muted">/</span>
          <Link to="/retailers" className="text-muted hover:text-primary-700">
            Retailers
          </Link>
          <span className="text-muted">/</span>
          <span className="font-semibold text-primary-700">{pageTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={initialData ? `/retailers/${initialData.id}` : '/retailers'}
            aria-label="Go back"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:bg-background hover:text-primary-700"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Enter the retailer's business and contact information.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-card border border-border/70 bg-surface shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Store size={20} />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Retailer Information</h2>
              <p className="mt-1 text-xs text-muted">
                Business and contact details
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="tin" className="mb-2 block text-sm font-semibold text-foreground">
                TIN Number <span className="font-normal text-muted">(Optional)</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="tin"
                  value={tin}
                  onChange={(event) => setTin(event.target.value.replace(/\D/g, '').slice(0, 12))}
                  inputMode="numeric"
                  placeholder="Enter 12-digit TIN number"
                  className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
                <button
                  type="button"
                  onClick={() => setMessage('TIN lookup requires backend/API integration.')}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-primary-700 px-4 text-sm font-semibold text-primary-700 hover:bg-primary-50"
                >
                  <Search size={16} />
                  <span className="hidden sm:inline">Fetch</span>
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                Business / Retailer Name <span className="text-danger">*</span>
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter business or retailer name"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="mb-2 block text-sm font-semibold text-foreground">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <input
                id="mobile"
                required
                inputMode="numeric"
                value={mobile}
                onChange={(event) => setMobile(event.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="01XXXXXXXXX"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-semibold text-foreground">
                Retailer Status <span className="text-danger">*</span>
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as RetailerStatus)}
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="mb-2 block text-sm font-semibold text-foreground">
                Business Address <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-4 text-muted" />
                <textarea
                  id="address"
                  required
                  rows={3}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Enter complete business address"
                  className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-card border border-border/70 bg-surface shadow-sm">
          <div className="border-b border-border p-5">
            <h2 className="font-bold text-foreground">Shop Photo</h2>
            <p className="mt-1 text-xs text-muted">
              Upload a clear photo of the retailer's shop. Maximum 5 MB.
            </p>
          </div>

          <div className="p-5">
            {photoUrl ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img src={photoUrl} alt="Shop preview" className="h-56 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl(null)}
                  aria-label="Remove shop photo"
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white text-danger shadow-md"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-border bg-background px-5 py-9 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                  <ImagePlus size={27} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">Upload shop photo</h3>
                <p className="mt-1 text-xs text-muted">PNG, JPG or WEBP · Maximum 5 MB</p>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white hover:bg-primary-600">
                    <ImagePlus size={17} />
                    Choose Photo
                    <input type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhotoChange(event.target.files?.[0])} />
                  </label>

                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground hover:bg-background">
                    <Camera size={17} />
                    Take Photo
                    <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(event) => handlePhotoChange(event.target.files?.[0])} />
                  </label>
                </div>
              </div>
            )}
          </div>
        </section>

        {error && (
          <div role="alert" className="rounded-xl border border-danger/20 bg-danger-soft px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {message && (
          <div role="status" className="rounded-xl border border-info/20 bg-info-soft px-4 py-3 text-sm text-foreground">
            {message}
          </div>
        )}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            to={initialData ? `/retailers/${initialData.id}` : '/retailers'}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-foreground hover:bg-background"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary-700 px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary-600"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RetailerForm
