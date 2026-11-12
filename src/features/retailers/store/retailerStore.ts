import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type RetailerStatus = 'Active' | 'Inactive'

export interface Retailer {
  id: string
  name: string
  tin: string
  mobile: string
  address: string
  status: RetailerStatus
  photoUrl: string | null
}

interface RetailerState {
  retailers: Retailer[]
  addRetailer: (retailer: Omit<Retailer, 'id'>) => string
  updateRetailer: (id: string, data: Omit<Retailer, 'id'>) => void
}

const initialRetailers: Retailer[] = [
  {
    id: '1',
    name: 'Rahman Traders',
    tin: '123456789012',
    mobile: '01712345678',
    address: 'Mirpur, Dhaka',
    status: 'Active',
    photoUrl: null,
  },
  {
    id: '2',
    name: 'M/S Karim Enterprise',
    tin: '987654321098',
    mobile: '01812345678',
    address: 'Uttara, Dhaka',
    status: 'Active',
    photoUrl: null,
  },
  {
    id: '3',
    name: 'New Market Store',
    tin: '456789123012',
    mobile: '01912345678',
    address: 'New Market, Dhaka',
    status: 'Inactive',
    photoUrl: null,
  },
  {
    id: '4',
    name: 'City Fashion House',
    tin: '789123456012',
    mobile: '01612345678',
    address: 'Gulshan, Dhaka',
    status: 'Active',
    photoUrl: null,
  },
  {
    id: '5',
    name: 'Al-Amin General Store',
    tin: '321654987012',
    mobile: '01512345678',
    address: 'Dhanmondi, Dhaka',
    status: 'Active',
    photoUrl: null,
  },
  {
    id: '6',
    name: 'Modern Electronics',
    tin: '654321987012',
    mobile: '01798765432',
    address: 'Banani, Dhaka',
    status: 'Active',
    photoUrl: null,
  },
  {
    id: '7',
    name: 'Popular Enterprise',
    tin: '852963741012',
    mobile: '01898765432',
    address: 'Mohammadpur, Dhaka',
    status: 'Inactive',
    photoUrl: null,
  },
  {
    id: '8',
    name: 'New Star Traders',
    tin: '147258369012',
    mobile: '01998765432',
    address: 'Badda, Dhaka',
    status: 'Active',
    photoUrl: null,
  },
]

export const useRetailerStore = create<RetailerState>()(
  persist(
    (set) => ({
      retailers: initialRetailers,

      addRetailer: (retailer) => {
        const id = crypto.randomUUID()

        set((state) => ({
          retailers: [...state.retailers, { ...retailer, id }],
        }))

        return id
      },

      updateRetailer: (id, data) =>
        set((state) => ({
          retailers: state.retailers.map((retailer) =>
            retailer.id === id ? { ...data, id } : retailer,
          ),
        })),
    }),
    {
      name: 'retailer-tcs-session',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
