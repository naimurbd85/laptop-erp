import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function FinanceDashboard() {
  // ডাটাবেজ থেকে সব তথ্য একসাথে ফেচ করা
  const investments = await prisma.investment.findMany()
  const expenses = await prisma.expense.findMany()
  const products = await prisma.product.findMany()

  // ক্যালকুলেশন
  const totalInvestment = investments.reduce((acc, item) => acc + item.amount, 0)
  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0)
  
  // স্টকে থাকা ল্যাপটপের ক্রয়মূল্য (Asset Value)
  const availableInventoryValue = products
    .filter(p => p.status === 'AVAILABLE')
    .reduce((acc, item) => acc + item.buyPrice, 0)

  // বিক্রি হওয়া ল্যাপটপের সম্ভাব্য গ্রস প্রফিট (যদি status SOLD থাকে)
  const soldProducts = products.filter(p => p.status === 'SOLD')
  const grossProfitFromSales = soldProducts.reduce((acc, item) => acc + (item.sellPrice - item.buyPrice), 0)

  // নেট ব্যালেন্স বা ক্যাশ পজিশন রাফ আইডিয়া (Total Investment - Total Expenses)
  const netCapitalRemaining = totalInvestment - totalExpense

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Overview & Profit / Loss</h1>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 font-medium">Total Capital Invested</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-2">৳{totalInvestment.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-sm text-gray-500 font-medium">Total Expenses / Costs</p>
          <h3 className="text-2xl font-bold text-red-600 mt-2">৳{totalExpense.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500 font-medium">Active Inventory Value</p>
          <h3 className="text-2xl font-bold text-green-600 mt-2">৳{availableInventoryValue.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 font-medium">Gross Profit (From Sales)</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-2">৳{grossProfitFromSales.toLocaleString()}</h3>
        </div>
      </div>

      {/* Detailed Breakdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Capital vs Expense Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Investment Capital</span>
              <span className="font-semibold text-blue-600">৳{totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Operational Expense</span>
              <span className="font-semibold text-red-600">- ৳{totalExpense.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold text-gray-800">Net Balance / Capital in Hand</span>
              <span className={`font-bold ${netCapitalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ৳{netCapitalRemaining.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Inventory & Sales Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Products in Stock</span>
              <span className="font-semibold">{products.filter(p => p.status === 'AVAILABLE').length} Units</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Products Sold</span>
              <span className="font-semibold">{soldProducts.length} Units</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold text-gray-800">Estimated Potential Stock Value</span>
              <span className="font-bold text-blue-600">৳{availableInventoryValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}