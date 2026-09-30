import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// নতুন প্রোডাক্ট যোগ করার জন্য (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const product = await prisma.product.create({
      data: {
        brand: body.brand,
        model: body.model,
        serialNumber: body.serialNumber,
        processor: body.processor,
        generation: body.generation,
        ram: body.ram,
        storageType: body.storageType,
        storageCapacity: body.storageCapacity,
        gpu: body.gpu,
        gpuSize: body.gpuSize,
        condition: body.condition,
        receivedDate: body.receivedDate ? new Date(body.receivedDate) : new Date(),
        buyPrice: parseFloat(body.buyPrice),
        sellPrice: parseFloat(body.sellPrice),
        quantity: body.quantity ? parseInt(body.quantity) : 1,
        remarks: body.remarks,
        status: 'AVAILABLE',
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 })
  }
}

// সব প্রোডাক্ট দেখার জন্য (GET)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 })
  }
}