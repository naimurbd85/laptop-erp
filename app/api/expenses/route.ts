import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(expenses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, amount, category, date, note } = body

    const newExpense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount),
        category: category || 'General',
        date: date ? new Date(date) : new Date(),
        note,
      },
    })

    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add expense' }, { status: 500 })
  }
}