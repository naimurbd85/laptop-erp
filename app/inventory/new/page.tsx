'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewInventoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      serialNumber: formData.get('serialNumber'),
      processor: formData.get('processor'),
      ram: formData.get('ram'),
      storage: formData.get('storage'),
      condition: formData.get('condition'),
      buyPrice: parseFloat(formData.get('buyPrice') as string),
      sellPrice: parseFloat(formData.get('sellPrice') as string),
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to save product')

      alert('Laptop added to stock successfully!')
      router.push('/inventory')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Laptop to Stock</h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input type="text" name="brand" required placeholder="e.g. HP / Dell / Lenovo" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input type="text" name="model" required placeholder="e.g. ProBook 450 G5" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Serial Number</label>
          <input type="text" name="serialNumber" required placeholder="Unique laptop serial number" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Processor</label>
          <input type="text" name="processor" placeholder="e.g. Core i5 8th Gen" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">RAM</label>
          <input type="text" name="ram" placeholder="e.g. 8GB DDR4" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Storage</label>
          <input type="text" name="storage" placeholder="e.g. 256GB SSD" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <input type="text" name="condition" placeholder="e.g. Fresh / Used / Minor Scratch" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Buy Price (৳)</label>
          <input type="number" name="buyPrice" required placeholder="e.g. 25000" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sell Price (৳)</label>
          <input type="number" name="sellPrice" required placeholder="e.g. 30000" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Saving...' : 'Add Laptop to Stock'}
          </button>
        </div>
      </form>
    </div>
  )
}