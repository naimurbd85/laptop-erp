import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link href="/finance" className="text-xl font-bold text-blue-600">
            💻 Laptop ERP
          </Link>
        </div>
        <div className="flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/finance" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/inventory" className="hover:text-blue-600 transition">
            Inventory
          </Link>
          <Link href="/inventory/new" className="hover:text-blue-600 transition">
            Add Laptop
          </Link>
          <Link href="/investments" className="hover:text-blue-600 transition">
            Investments
          </Link>
          <Link href="/expenses" className="hover:text-blue-600 transition">
            Expenses
          </Link>
        </div>
      </div>
    </nav>
  )
}