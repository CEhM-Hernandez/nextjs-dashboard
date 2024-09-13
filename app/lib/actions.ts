'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { InvoiceSchema } from './schemas'

const CreateAndUpdateInvoiceFormSchema = InvoiceSchema.omit({
  id: true,
  date: true
})

const errorMSG = (error: Error): string => {
  const errorMessage = error.message !== null ? error.message : 'An unknown error occurred'

  if (errorMessage.includes('out of range')) {
    return 'The amount is too high'
  } else if (errorMessage.includes('invalid input syntax for type uuid')) {
    return 'User not found'
  } else if (errorMessage.includes('invalid input syntax for type integer')) {
    return 'Invalid amount'
  } else if (errorMessage.includes('invalid input syntax for type')) {
    return 'Invalid input'
  }
  return errorMessage
}

export async function createInvoice (formData: FormData): Promise<string | undefined> {
  const { customerId, amount, status } = CreateAndUpdateInvoiceFormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  const amountInCents = amount * 100
  const [date] = new Date().toISOString().split('T')
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
  } catch (error) {
    throw new Error(errorMSG(error as Error))
  }

  revalidatePath('dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function updateInvoice (id: string, formData: FormData): Promise<string | undefined> {
  const { customerId, amount, status } = CreateAndUpdateInvoiceFormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  const amountInCents = amount * 100

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `
  } catch (error) {
    throw new Error(errorMSG(error as Error))
  }

  revalidatePath('dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice (id: string): Promise<string> {
  try {
    await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `
  } catch (error) {
    throw new Error(errorMSG(error as Error))
  }

  revalidatePath('dashboard/invoices')
  redirect('/dashboard/invoices')
}
