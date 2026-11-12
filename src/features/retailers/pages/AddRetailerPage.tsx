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
import { Link } from 'react-router-dom'

function AddRetailerPage() {
  const [tin, setTin] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null)
      return
    }

    const previewUrl = URL.createObjectURL(photo)
    setPhotoPreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [photo])

  function handlePhotoChange(file: File | undefined) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size must be 5 MB or less.')
      return
    }

    setMessage('')
    setPhoto(file)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(
      'Form validation successful. Backend integration is required to save this retailer.',
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page heading */}
      <section>
        <div className="mb-2 flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted hover:text-primary-700">
            Dashboard
          </Link>
          <span className="text-muted">/</span>
          <Link
            to="/retailers"
            className="text-muted hover:text-primary-700"
          >
            Retailers
          </Link>
          <span className="text-muted">/</span>
          <span className="font-semibold text-primary-700">
            Add Retailer
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/retailers"
            aria-label="Back to retailers"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-muted transition hover:bg-background hover:text-primary-700"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Add New Retailer
            </h1>
            <p className="mt-1 text-sm text-muted">
              Enter retailer information and upload a shop photo.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Retailer information */}
        <section className="rounded-card border border-border/70 bg-surface shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Store size={20} />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                Retailer Information
              </h2>
              <p className="mt-1 text-xs text-muted">
                Basic business and contact details
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            {/* TIN */}
            <div className="sm:col-span-2">
              <label
                htmlFor="tin"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                TIN Number
                <span className="ml-1 font-normal text-muted">(Optional)</span>
              </label>

              <div className="flex gap-2">
                <input
                  id="tin"
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  pattern="[0-9]{12}"
                  value={tin}
                  onChange={(event) =>
                    setTin(event.target.value.replace(/\D/g, ''))
                  }
                  placeholder="Enter 12-digit TIN number"
                  className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMessage(
                      'TIN lookup is not available yet. Backend/API integration is required.',
                    )
                  }
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-primary-700 px-4 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
                >
                  <Search size={16} />
                  <span className="hidden sm:inline">Fetch</span>
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">
                Enter a TIN to fetch business information when the API is connected.
              </p>
            </div>

            {/* Business name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="businessName"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Business / Retailer Name
                <span className="ml-1 text-danger">*</span>
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Enter business or retailer name"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Mobile Number <span className="text-danger">*</span>
              </label>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                required
                pattern="01[0-9]{9}"
                maxLength={11}
                value={mobile}
                onChange={(event) =>
                  setMobile(event.target.value.replace(/\D/g, ''))
                }
                placeholder="01XXXXXXXXX"
                title="Enter a valid 11-digit Bangladesh mobile number."
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Retailer Status <span className="text-danger">*</span>
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as 'Active' | 'Inactive')
                }
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Business Address <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-4 top-4 text-muted"
                />
                <textarea
                  id="address"
                  required
                  rows={3}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Enter complete business address"
                  className="w-full resize-y rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Shop photo */}
        <section className="rounded-card border border-border/70 bg-surface shadow-sm">
          <div className="border-b border-border p-5">
            <h2 className="font-bold text-foreground">Shop Photo</h2>
            <p className="mt-1 text-xs text-muted">
              Upload a clear photo of the retailer's shop.
            </p>
          </div>

          <div className="p-5">
            {photoPreview ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img
                  src={photoPreview}
                  alt="Shop preview"
                  className="h-56 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  aria-label="Remove shop photo"
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white text-danger shadow-md transition hover:bg-danger-soft"
                >
                  <X size={18} />
                </button>
                <div className="bg-surface px-4 py-3">
                  <p className="truncate text-sm font-medium text-foreground">
                    {photo?.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {(photo!.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-border bg-background px-5 py-9 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                  <ImagePlus size={27} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  Upload shop photo
                </h3>
                <p className="mt-1 text-xs text-muted">
                  PNG, JPG or WEBP · Maximum 5 MB
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white transition hover:bg-primary-600">
                    <ImagePlus size={17} />
                    Choose Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) =>
                        handlePhotoChange(event.target.files?.[0])
                      }
                    />
                  </label>

                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition hover:bg-background">
                    <Camera size={17} />
                    Take Photo
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="sr-only"
                      onChange={(event) =>
                        handlePhotoChange(event.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Feedback */}
        {message && (
          <div
            role="status"
            className="rounded-xl border border-info/20 bg-info-soft px-4 py-3 text-sm text-foreground"
          >
            {message}
          </div>
        )}

        {/* Form actions */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            to="/retailers"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={!photo}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Validate Retailer Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRetailerPage
