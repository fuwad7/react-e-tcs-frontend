import { Link, useParams } from 'react-router-dom'

import RetailerForm from '@/features/retailers/components/RetailerForm'
import { useRetailerStore } from '@/features/retailers/store/retailerStore'

function EditRetailerPage() {
  const { id } = useParams()
  const retailer = useRetailerStore((state) =>
    state.retailers.find((item) => item.id === id),
  )
  const updateRetailer = useRetailerStore((state) => state.updateRetailer)

  if (!retailer) {
    return (
      <section className="rounded-card border border-border bg-surface p-8 text-center">
        <h1 className="text-xl font-bold text-foreground">Retailer not found</h1>
        <Link to="/retailers" className="mt-4 inline-block text-sm font-semibold text-primary-700">
          Back to Retailers
        </Link>
      </section>
    )
  }

  return (
    <RetailerForm
      key={retailer.id}
      initialData={retailer}
      pageTitle="Edit Retailer"
      submitLabel="Save Changes"
      onSave={(data) => updateRetailer(retailer.id, data)}
    />
  )
}

export default EditRetailerPage
