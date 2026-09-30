'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewInventoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Dynamic Options States with Plus (+) support
  const [brands, setBrands] = useState(['HP', 'Dell', 'Asus', 'Lenovo', 'Acer', 'Apple'])
  const [processors, setProcessors] = useState(['Core i7', 'Core i5', 'Core i3', 'Celeron', 'Ryzen 7', 'Ryzen 5', 'Ryzen 3'])
  const [generations, setGenerations] = useState(['4th Gen', '6th Gen', '7th Gen', '8th Gen', '10th Gen', '11th Gen', '12th Gen', '13th Gen'])
  const [rams, setRams] = useState(['4 GB', '8 GB', '16 GB', '32 GB'])
  const [gpuTypes, setGpuTypes] = useState(['Intel UHD', 'Intel Iris Xe', 'Nvidia MX150', 'Nvidia GTX 1650', 'Nvidia RTX 3050', 'AMD Radeon'])
  const [gpuSizes, setGpuSizes] = useState(['128 MB', '2 GB', '4 GB', '6 GB', '8 GB'])
  const [conditions, setConditions] = useState(['Used', 'Refurbished', 'New'])

  // Get today's date in YYYY-MM-DD format for default value
  const today = new Date().toISOString().split('T')[0]

  const handleAddOption = (listName: string) => {
    const newVal = prompt(`Enter new value:`)
    if (!newVal || !newVal.trim()) return
    const trimmed = newVal.trim()

    if (listName === 'brand') setBrands(prev => [...prev, trimmed])
    if (listName === 'processor') setProcessors(prev => [...prev, trimmed])
    if (listName === 'generation') setGenerations(prev => [...prev, trimmed])
    if (listName === 'ram') setRams(prev => [...prev, trimmed])
    if (listName === 'gpuType') setGpuTypes(prev => [...prev, trimmed])
    if (listName === 'gpuSize') setGpuSizes(prev => [...prev, trimmed])
    if (listName === 'condition') setConditions(prev => [...prev, trimmed])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      serialNumber: formData.get('serialNumber'),
      processor: formData.get('processor'),
      generation: formData.get('generation'),
      ram: formData.get('ram'),
      storageType: formData.get('storageType'),
      storageCapacity: formData.get('storageCapacity'),
      gpu: formData.get('gpu'),
      gpuSize: formData.get('gpuSize'),
      condition: formData.get('condition'),
      receivedDate: formData.get('receivedDate'),
      buyPrice: parseFloat(formData.get('buyPrice') as string),
      sellPrice: parseFloat(formData.get('sellPrice') as string),
      quantity: parseInt(formData.get('quantity') as string) || 1,
      remarks: formData.get('remarks'),
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
      form.reset()
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
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <div className="flex gap-2 mt-1">
            <select name="brand" required className="block w-full p-2 border rounded-md border-gray-300">
              <option value="">Select Brand</option>
              {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
            <button type="button" onClick={() => handleAddOption('brand')} className="bg-gray-200 px-3 rounded-md hover:bg-gray-300 font-bold">+</button>
          </div>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input type="text" name="model" required placeholder="e.g. ProBook 450 G5" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        {/* Serial Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Serial Number</label>
          <input type="text" name="serialNumber" required placeholder="Unique laptop serial number" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        {/* Processor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Processor</label>
          <div className="flex gap-2 mt-1">
            <select name="processor" required className="block w-full p-2 border rounded-md border-gray-300">
              <option value="">Select Processor</option>
              {processors.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
            <button type="button" onClick={() => handleAddOption('processor')} className="bg-gray-200 px-3 rounded-md hover:bg-gray-300 font-bold">+</button>
          </div>
        </div>

        {/* Generation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Generation (প্রজন্ম)</label>
          <div className="flex gap-2 mt-1">
            <select name="generation" required className="block w-full p-2 border rounded-md border-gray-300">
              <option value="">Select Generation</option>
              {generations.map((g, i) => <option key={i} value={g}>{g}</option>)}
            </select>
            <button type="button" onClick={() => handleAddOption('generation')} className="bg-gray-200 px-3 rounded-md hover:bg-gray-300 font-bold">+</button>
          </div>
        </div>

        {/* RAM */}
        <div>
          <label className="block text-sm font-medium text-gray-700">RAM</label>
          <div className="flex gap-2 mt-1">
            <select name="ram" required className="block w-full p-2 border rounded-md border-gray-300">
              <option value="">Select RAM</option>
              {rams.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
            <button type="button" onClick={() => handleAddOption('ram')} className="bg-gray-200 px-3 rounded-md hover:bg-gray-300 font-bold">+</button>
          </div>
        </div>

        {/* Storage Type & Capacity */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Storage Type</label>
            <select name="storageType" required className="mt-1 block w-full p-2 border rounded-md border-gray-300">
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input type="text" name="storageCapacity" required placeholder="e.g. 256GB" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
          </div>
        </div>

        {/* GPU Type & Size */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">GPU (Graphics)</label>
            <div className="flex gap-1 mt-1">
              <select name="gpu" className="block w-full p-2 border rounded-md border-gray-300 text-sm">
                <option value="">Select GPU</option>
                {gpuTypes.map((gt, i) => <option key={i} value={gt}>{gt}</option>)}
              </select>
              <button type="button" onClick={() => handleAddOption('gpuType')} className="bg-gray-200 px-2 rounded-md hover:bg-gray-300 font-bold text-sm">+</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GPU Size</label>
            <div className="flex gap-1 mt-1">
              <select name="gpuSize" className="block w-full p-2 border rounded-md border-gray-300 text-sm">
                <option value="">Select Size</option>
                {gpuSizes.map((gs, i) => <option key={i} value={gs}>{gs}</option>)}
              </select>
              <button type="button" onClick={() => handleAddOption('gpuSize')} className="bg-gray-200 px-2 rounded-md hover:bg-gray-300 font-bold text-sm">+</button>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <div className="flex gap-2 mt-1">
            <select name="condition" required className="block w-full p-2 border rounded-md border-gray-300">
              {conditions.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
            <button type="button" onClick={() => handleAddOption('condition')} className="bg-gray-200 px-3 rounded-md hover:bg-gray-300 font-bold">+</button>
          </div>
        </div>

        {/* Receive Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Receive Date (রিসিভ তারিখ)</label>
          <input type="date" name="receivedDate" defaultValue={today} required className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity (সংখ্যা)</label>
          <input type="number" name="quantity" defaultValue={1} min={1} required className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        {/* Buy Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Buy Price (৳)</label>
          <input type="number" name="buyPrice" required placeholder="e.g. 25000" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        {/* Sell Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sell Price (৳)</label>
          <input type="number" name="sellPrice" required placeholder="e.g. 30000" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>

        {/* Remarks */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Remarks / Notes (রিমার্কস)</label>
          <textarea name="remarks" placeholder="Any special notes about the laptop..." className="mt-1 block w-full p-2 border rounded-md border-gray-300" rows={2}></textarea>
        </div>

        {/* Submit Button */}
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