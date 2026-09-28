import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // যদি src ফোল্ডার না থাকে, তবে relative path দিয়েও দিতে পারেন

// নতুন ল্যাপটপ স্টকে অ্যাড করার জন্য POST রিকোয়েস্ট
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { brand, model, serialNumber, processor, ram, storage, condition, buyPrice, sellPrice } = body

    // ডাটাবেজে সেভ করা
    const product = await prisma.product.create({
      data: {
        brand,
        model,
        serialNumber,
        processor,
        ram,
        storage,
        condition,
        buyPrice: parseFloat(buyPrice),
        sellPrice: parseFloat(sellPrice),
        status: "AVAILABLE",
      },
    })

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// সব ল্যাপটপের স্টক দেখার জন্য GET রিকোয়েস্ট
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, products })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}