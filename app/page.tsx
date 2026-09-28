"use client";

import { useState } from "react";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  buyPrice: number;
  sellPrice: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export default function ERPDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "1", sku: "LAP-M3M-01", name: "MacBook Pro 16 M3 Max", category: "Laptops", stock: 12, buyPrice: 220000, sellPrice: 245000, status: "In Stock" },
    { id: "2", sku: "LAP-XPS-02", name: "Dell XPS 15 OLED", category: "Laptops", stock: 3, buyPrice: 165000, sellPrice: 185000, status: "Low Stock" },
    { id: "3", sku: "LAP-ROG-03", name: "ASUS ROG Strix G16", category: "Gaming", stock: 5, buyPrice: 145000, sellPrice: 165000, status: "In Stock" },
    { id: "4", sku: "ACC-LOG-04", name: "Logitech MX Master 3S", category: "Accessories", stock: 0, buyPrice: 7800, sellPrice: 9500, status: "Out of Stock" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStockValue = inventory.reduce((acc, item) => acc + item.buyPrice * item.stock, 0);
  const totalItemsCount = inventory.reduce((acc, item) => acc + item.stock, 0);
  const lowStockCount = inventory.filter((item) => item.status === "Low Stock" || item.stock <= 3).length;

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Top Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Laptop ERP & Inventory</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Branch: Main Warehouse (Mymensingh)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Database Connected
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Inventory Value</p>
            <h3 className="text-2xl font-bold mt-2">৳ {totalStockValue.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 block">Based on purchase cost</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Units in Stock</p>
            <h3 className="text-2xl font-bold mt-2">{totalItemsCount} Units</h3>
            <span className="text-xs text-blue-600 dark:text-blue-400 mt-1 block">Across all categories</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Low Stock Alerts</p>
            <h3 className="text-2xl font-bold mt-2 text-amber-600">{lowStockCount} Items</h3>
            <span className="text-xs text-amber-500 mt-1 block">Needs reordering soon</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Active Products</p>
            <h3 className="text-2xl font-bold mt-2">{inventory.length} SKUs</h3>
            <span className="text-xs text-zinc-400 mt-1 block">Laptops & Accessories</span>
          </div>
        </div>

        {/* Inventory Control Panel & Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Stock & Inventory Management</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Monitor stock levels, purchase prices, and retail rates.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search by SKU or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                + Add Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-right">Buy Price</th>
                  <th className="py-3 px-4 text-right">Sell Price</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-zinc-500">{item.sku}</td>
                    <td className="py-3.5 px-4 font-medium">{item.name}</td>
                    <td className="py-3.5 px-4 text-zinc-500">{item.category}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">{item.stock}</td>
                    <td className="py-3.5 px-4 text-right">৳ {item.buyPrice.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-medium">৳ {item.sellPrice.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.stock > 5
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : item.stock > 0
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                        }`}
                      >
                        {item.stock > 5 ? "In Stock" : item.stock > 0 ? "Low Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium rounded transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}