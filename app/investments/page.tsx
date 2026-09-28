'use client'

import { useState, useEffect } from 'react'

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ইনভেস্টমেন্ট ফেচ করা
  const fetchInvestments = async () => {
    try {
      const res = await fetch('/api/investments')
      const data = await res.json()
      if (res.ok) setInvestments(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchInvestments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      investorName: formData.get('investorName'),
      amount: formData.get('amount'),
      date: formData.get('date'),
      note: formData.get('note'),
    }

    try {
      const res = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to save investment')

      e.currentTarget.reset()
      fetchInvestments()
      alert('Investment added successfully!')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalInvestment = investments.reduce((acc, item) => acc + item.amount, 0)

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Business Investments & Capital</h1>
        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Total Capital: </span>
          <span className="text-lg font-bold text-blue-600">৳{totalInvestment.toLocaleString()}</span>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Investor Name</label>
          <input type="text" name="investorName" defaultValue="Owner" required className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (৳)</label>
          <input type="number" name="amount" required placeholder="e.g. 100000" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} required className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Note / Source</label>
          <input type="text" name="note" placeholder="e.g. Personal savings / Bank loan" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2.5 rounded-md font-semibold hover:bg-blue-700 transition">
            {loading ? 'Saving...' : 'Add Investment'}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-left text-gray-700">
              <th className="p-3">Date</th>
              <th className="p-3">Investor Name</th>
              <th className="p-3">Note</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {investments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">No investments recorded yet.</td>
              </tr>
            ) : (
              investments.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-600">{new Date(inv.date).toLocaleDateString()}</td>
                  <td className="p-3 font-semibold text-gray-800">{inv.investorName}</td>
                  <td className="p-3 text-gray-600">{inv.note || '-'}</td>
                  <td className="p-3 text-right font-semibold text-blue-600">৳{inv.amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}