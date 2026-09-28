import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// সব ইনভেস্টমেন্ট দেখার জন্য GET মেথড
export async function GET() {
  try {
    const investments = await prisma.investment.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(investments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch investments' }, { status: 500 })
  }
}

// নতুন ইনভেস্টমেন্ট যোগ করার জন্য POST মেথড
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { investorName, amount, date, note } = body

    const newInvestment = await prisma.investment.create({
      data: {
        investorName: investorName || 'Owner',
        amount: parseFloat(amount),
        date: date ? new Date(date) : new Date(),
        note,
      },
    })

    return NextResponse.json(newInvestment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add investment' }, { status: 500 })
  }
}