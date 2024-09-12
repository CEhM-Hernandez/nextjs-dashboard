'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { InvoiceSchema } from './schemas'

const CreateAndUpdateInvoiceFormSchema = InvoiceSchema.omit({
  id: true,
  date: true
})

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
    return 'An error occurred while creating the invoice'
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
    return 'An error occurred while updating the invoice'
  }

  revalidatePath('dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice (id: string): Promise<string | undefined> {
  try {
    await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `
  } catch (error) {
    return 'An error occurred while deleting the invoice'
  }

  revalidatePath('dashboard/invoices')
  redirect('/dashboard/invoices')
}
