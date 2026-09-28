import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic' // সবসময় রিয়েল-টাইম ডাটা দেখানোর জন্য

export default async function InventoryPage() {
  // ডাটাবেজ থেকে সব প্রোডাক্ট ফেচ করা
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Laptop Inventory Management</h1>
        <Link
          href="/inventory/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          + Add New Laptop
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-left text-gray-700">
              <th className="p-3">Brand & Model</th>
              <th className="p-3">Serial Number</th>
              <th className="p-3">Processor / RAM / SSD</th>
              <th className="p-3">Buy Price</th>
              <th className="p-3">Sell Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No laptops found in stock. Add your first laptop!
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">
                    {product.brand} {product.model}
                  </td>
                  <td className="p-3 text-gray-600 font-mono text-sm">{product.serialNumber}</td>
                  <td className="p-3 text-gray-600 text-sm">
                    {product.processor || '-'} / {product.ram || '-'} / {product.storage || '-'}
                  </td>
                  <td className="p-3 text-gray-700">৳{product.buyPrice}</td>
                  <td className="p-3 text-gray-700 font-semibold">৳{product.sellPrice}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        product.status === 'AVAILABLE'
                          ? 'bg-green-100 text-green-700'
                          : product.status === 'SOLD'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}