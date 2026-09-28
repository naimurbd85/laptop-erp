"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export default function ERPHome() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // ডেমো বা এপিআই থেকে ডেটা ফেচ করার ব্যবস্থা
  useEffect(() => {
    // এখানে আপনি আপনার API বা Supabase থেকে ডেটা লোড করতে পারেন
    // আপাতত ডেমো ল্যাপটপ ও এক্সেসরিজ ডেটা দিয়ে রাখা হলো
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "MacBook Pro 16 M3 Max",
        category: "Laptops",
        price: 245000,
        stock: 12,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
        description: "Apple M3 Max chip, 36GB Unified Memory, 1TB SSD Storage",
      },
      {
        id: "2",
        name: "Dell XPS 15 OLED",
        category: "Laptops",
        price: 185000,
        stock: 8,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
        description: "Intel Core i9, 32GB RAM, 1TB NVMe SSD, RTX 4070",
      },
      {
        id: "3",
        name: "ASUS ROG Strix G16",
        category: "Gaming",
        price: 165000,
        stock: 5,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60",
        description: "Intel i7 14th Gen, RTX 4060, 16GB DDR5, 165Hz Display",
      },
      {
        id: "4",
        name: "Logitech MX Master 3S",
        category: "Accessories",
        price: 9500,
        stock: 25,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
        description: "Advanced Wireless Mouse with Quiet Clicks & 8000 DPI",
      },
    ];

    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Laptop ERP & Store
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full">
              System Live
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero & Search Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inventory & Product Catalog</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage stocks, track sales, and explore available devices.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search laptops, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["All", "Laptops", "Gaming", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">No products found matching your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-base mt-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">৳ {product.price.toLocaleString()}</span>
                      <p className="text-xs text-zinc-400">Stock: {product.stock} units</p>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}