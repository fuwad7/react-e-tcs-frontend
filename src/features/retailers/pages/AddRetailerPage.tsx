import RetailerForm from '@/features/retailers/components/RetailerForm'
import { useRetailerStore } from '@/features/retailers/store/retailerStore'

function AddRetailerPage() {
  const addRetailer = useRetailerStore((state) => state.addRetailer)

  return (
    <RetailerForm
      pageTitle="Add New Retailer"
      submitLabel="Save Retailer"
      onSave={addRetailer}
    />
  )
}

export default AddRetailerPage
