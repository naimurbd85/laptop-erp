'use client'

import { useState, useEffect } from 'react'

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ফর্মের ফিল্ডগুলোর জন্য স্টেট (Controlled State)
  const [investorName, setInvestorName] = useState('Owner')
  const [investmentType, setInvestmentType] = useState('Owner/Partner Investment')
  const [amount, setAmount] = useState('')
  const [investmentMethod, setInvestmentMethod] = useState('Cash')
  const [account, setAccount] = useState('Main Cash')
  const [transactionNo, setTransactionNo] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      investorName: investorName || 'Owner',
      investmentType,
      amount: parseFloat(amount) || 0,
      investmentMethod,
      account,
      transactionNo,
      date,
      note,
    }

    try {
      const res = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to save investment')

      // সফলভাবে সেভ হওয়ার পর ফর্ম রিসেট
      setInvestorName('Owner')
      setInvestmentType('Owner/Partner Investment')
      setAmount('')
      setInvestmentMethod('Cash')
      setAccount('Main Cash')
      setTransactionNo('')
      setDate(new Date().toISOString().split('T')[0])
      setNote('')

      fetchInvestments()
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
          <input 
            type="text" 
            value={investorName} 
            onChange={(e) => setInvestorName(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border rounded-md border-gray-300" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Type</label>
          <select
            value={investmentType}
            onChange={(e) => setInvestmentType(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white"
          >
            <option value="Owner/Partner Investment">Owner/Partner Investment</option>
            <option value="Other Investment">Other Investment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (৳)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
            placeholder="e.g. 100000" 
            className="mt-1 block w-full p-2 border rounded-md border-gray-300" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Method</label>
          <select
            value={investmentMethod}
            onChange={(e) => setInvestmentMethod(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white"
          >
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Mobile Banking">Mobile Banking</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cash / Bank / Mobile Account</label>
          <input 
            type="text" 
            value={account} 
            onChange={(e) => setAccount(e.target.value)} 
            placeholder="e.g. Dutch-Bangla Bank / bKash" 
            className="mt-1 block w-full p-2 border rounded-md border-gray-300" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Transaction / Reference No.</label>
          <input 
            type="text" 
            value={transactionNo} 
            onChange={(e) => setTransactionNo(e.target.value)} 
            placeholder="e.g. TrxID or Cheque No." 
            className="mt-1 block w-full p-2 border rounded-md border-gray-300" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border rounded-md border-gray-300" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose / Description</label>
          <input 
            type="text" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="e.g. Personal savings / Bank loan" 
            className="mt-1 block w-full p-2 border rounded-md border-gray-300" 
          />
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
              <th className="p-3">Method & Account</th>
              <th className="p-3">Purpose / Note</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {investments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">No investments recorded yet.</td>
              </tr>
            ) : (
              <div></div> // mapping loop below
            )}
            {investments.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-600">{new Date(inv.date).toLocaleDateString()}</td>
                <td className="p-3 font-semibold text-gray-800">
                  {inv.investorName}
                  <div className="text-xs text-gray-400 font-normal">{inv.investmentType}</div>
                </td>
                <td className="p-3 text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{inv.investmentMethod}</span>
                  <div className="text-xs text-gray-500 mt-1">{inv.account} {inv.transactionNo ? `(${inv.transactionNo})` : ''}</div>
                </td>
                <td className="p-3 text-gray-600">{inv.note || '-'}</td>
                <td className="p-3 text-right font-semibold text-blue-600">৳{inv.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}