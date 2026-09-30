'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Standard Options Lists
  const brands = ['HP', 'Dell', 'Asus', 'Lenovo', 'Acer', 'Apple']
  const processors = ['Core i7', 'Core i5', 'Core i3', 'Celeron', 'Ryzen 7', 'Ryzen 5', 'Ryzen 3']
  const generations = ['4th Gen', '6th Gen', '7th Gen', '8th Gen', '10th Gen', '11th Gen', '12th Gen', '13th Gen']
  const rams = ['4 GB', '8 GB', '16 GB', '32 GB']
  const gpuTypes = ['Intel UHD', 'Intel Iris Xe', 'Nvidia MX150', 'Nvidia GTX 1650', 'Nvidia RTX 3050', 'AMD Radeon']
  const gpuSizes = ['128 MB', '2 GB', '4 GB', '6 GB', '8 GB']
  const conditions = ['Used', 'Refurbished', 'New']

  const [form, setForm] = useState({
    brand: '',
    model: '',
    serialNumber: '',
    processor: '',
    generation: '',
    ram: '',
    storageType: 'SSD',
    storageCapacity: '',
    gpu: '',
    gpuSize: '',
    condition: 'Used',
    buyPrice: '',
    sellPrice: '',
    quantity: '1',
    status: 'AVAILABLE',
    remarks: '',
  })

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setForm({
            brand: data.brand || '',
            model: data.model || '',
            serialNumber: data.serialNumber || '',
            processor: data.processor || '',
            generation: data.generation || '',
            ram: data.ram || '',
            storageType: data.storageType || 'SSD',
            storageCapacity: data.storageCapacity || '',
            gpu: data.gpu || '',
            gpuSize: data.gpuSize || '',
            condition: data.condition || 'Used',
            buyPrice: data.buyPrice ? data.buyPrice.toString() : '',
            sellPrice: data.sellPrice ? data.sellPrice.toString() : '',
            quantity: data.quantity ? data.quantity.toString() : '1',
            status: data.status || 'AVAILABLE',
            remarks: data.remarks || '',
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to update product')

      router.push(`/inventory/${id}`)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center mt-20 text-gray-600 font-semibold">Loading laptop details...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Edit Laptop Info</h1>
        <Link
          href={`/inventory/${id}`}
          className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-600 transition"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          >
            <option value="">Select Brand</option>
            {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          />
        </div>

        {/* Serial Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={form.serialNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300 font-mono"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="SOLD">SOLD</option>
            <option value="RESERVED">RESERVED</option>
          </select>
        </div>

        {/* Processor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Processor</label>
          <select
            name="processor"
            value={form.processor}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          >
            <option value="">Select Processor</option>
            {processors.map((p, i) => <option key={i} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Generation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Generation</label>
          <select
            name="generation"
            value={form.generation}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          >
            <option value="">Select Generation</option>
            {generations.map((g, i) => <option key={i} value={g}>{g}</option>)}
          </select>
        </div>

        {/* RAM */}
        <div>
          <label className="block text-sm font-medium text-gray-700">RAM</label>
          <select
            name="ram"
            value={form.ram}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          >
            <option value="">Select RAM</option>
            {rams.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Storage Type & Capacity */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Storage Type</label>
            <select
              name="storageType"
              value={form.storageType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
            >
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
              <option value="NVMe">NVMe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="text"
              name="storageCapacity"
              value={form.storageCapacity}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
            />
          </div>
        </div>

        {/* GPU Type & Size */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">GPU (Graphics)</label>
            <select
              name="gpu"
              value={form.gpu}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
            >
              <option value="">Select GPU</option>
              {gpuTypes.map((gt, i) => <option key={i} value={gt}>{gt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GPU Size</label>
            <select
              name="gpuSize"
              value={form.gpuSize}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
            >
              <option value="">Select Size</option>
              {gpuSizes.map((gs, i) => <option key={i} value={gs}>{gs}</option>)}
            </select>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
          >
            {conditions.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Buy Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Buy Price (৳)</label>
          <input
            type="number"
            name="buyPrice"
            value={form.buyPrice}
            onChange={handleChange}
            required
            className="mt-1 w-full border p-2 rounded-md border-gray-300"
          />
        </div>

        {/* Sell Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sell Price (৳)</label>
          <input
            type="number"
            name="sellPrice"
            value={form.sellPrice}
            onChange={handleChange}
            required
            className="mt-1 w-full border p-2 rounded-md border-gray-300"
          />
        </div>

        {/* Remarks */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full border p-2 rounded-md border-gray-300"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Laptop Details'}
          </button>
        </div>
      </form>
    </div>
  )
}