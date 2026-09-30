import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {product.brand} {product.model}
        </h1>
        <div className="space-x-2">
          <Link
            href={`/inventory/${product.id}/edit`}
            className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-amber-600 transition"
          >
            Edit Laptop
          </Link>
          <Link
            href="/inventory"
            className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-600 transition"
          >
            Back to Inventory
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-3 bg-gray-50 p-4 rounded-md">
          <p><strong className="text-gray-600">Serial Number:</strong> <span className="font-mono">{product.serialNumber}</span></p>
          <p><strong className="text-gray-600">Processor:</strong> {product.processor || '-'}</p>
          <p><strong className="text-gray-600">Generation:</strong> {product.generation || '-'}</p>
          <p><strong className="text-gray-600">RAM:</strong> {product.ram || '-'}</p>
          <p><strong className="text-gray-600">Storage Type:</strong> {product.storageType || '-'}</p>
          <p><strong className="text-gray-600">Storage Capacity:</strong> {product.storageCapacity || '-'}</p>
        </div>

        <div className="space-y-3 bg-gray-50 p-4 rounded-md">
          <p><strong className="text-gray-600">GPU:</strong> {product.gpu || '-'} ({product.gpuSize || '-'})</p>
          <p><strong className="text-gray-600">Condition:</strong> {product.condition || '-'}</p>
          <p><strong className="text-gray-600">Buy Price:</strong> ৳{product.buyPrice}</p>
          <p><strong className="text-gray-600">Sell Price:</strong> <span className="text-green-600 font-bold">৳{product.sellPrice}</span></p>
          <p><strong className="text-gray-600">Status:</strong> 
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${
              product.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
            }`}>
              {product.status}
            </span>
          </p>
          <p><strong className="text-gray-600">Received Date:</strong> {product.receivedDate ? new Date(product.receivedDate).toLocaleDateString() : '-'}</p>
        </div>
      </div>

      {product.remarks && (
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800"><strong>Remarks:</strong> {product.remarks}</p>
        </div>
      )}
    </div>
  )
}