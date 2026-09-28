'use client'

import { useState, useEffect } from 'react'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/expenses')
      const data = await res.json()
      if (res.ok) setExpenses(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      amount: formData.get('amount'),
      category: formData.get('category'),
      date: formData.get('date'),
      note: formData.get('note'),
    }

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to save expense')

      e.currentTarget.reset()
      fetchExpenses()
      alert('Expense recorded successfully!')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0)

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Business Expenses & Costs</h1>
        <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Total Expenses: </span>
          <span className="text-lg font-bold text-red-600">৳{totalExpense.toLocaleString()}</span>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expense Title / Reason</label>
          <input type="text" name="title" required placeholder="e.g. Shop Rent / Electricity Bill" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (৳)</label>
          <input type="number" name="amount" required placeholder="e.g. 5000" className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" className="mt-1 block w-full p-2 border rounded-md border-gray-300">
            <option value="Rent">Rent & Utilities</option>
            <option value="Transport">Transport & Shipping</option>
            <option value="Marketing">Marketing</option>
            <option value="Salary">Salary</option>
            <option value="General">General / Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} required className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
          <input type="text" name="note" placeholder="Additional details..." className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-2.5 rounded-md font-semibold hover:bg-red-700 transition">
            {loading ? 'Saving...' : 'Add Expense Record'}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-left text-gray-700">
              <th className="p-3">Date</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Note</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">No expenses recorded yet.</td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-600">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="p-3 font-semibold text-gray-800">{exp.title}</td>
                  <td className="p-3 text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{exp.category}</span>
                  </td>
                  <td className="p-3 text-gray-500 text-sm">{exp.note || '-'}</td>
                  <td className="p-3 text-right font-semibold text-red-600">৳{exp.amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}