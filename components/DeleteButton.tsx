'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this laptop?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete product')

      router.refresh() // রিফ্রেশ করে লিস্ট আপডেট করবে
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 text-white px-2.5 py-1 rounded text-xs hover:bg-red-600 transition disabled:opacity-50"
    >
      {loading ? '...' : 'Delete'}
    </button>
  )
}