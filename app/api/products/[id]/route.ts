import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// একটি নির্দিষ্ট প্রোডাক্টের তথ্য দেখার জন্য (GET)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 })
  }
}

// প্রোডাক্ট আপডেট করার জন্য (PUT)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedProduct = await prisma.product.update({
      where: { id },
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
        receivedDate: body.receivedDate ? new Date(body.receivedDate) : undefined,
        buyPrice: body.buyPrice ? parseFloat(body.buyPrice) : undefined,
        sellPrice: body.sellPrice ? parseFloat(body.sellPrice) : undefined,
        quantity: body.quantity ? parseInt(body.quantity) : undefined,
        remarks: body.remarks,
        status: body.status,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 })
  }
}

// প্রোডাক্ট ডিলিট করার জন্য (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 })
  }
}