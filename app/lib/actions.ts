/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { State } from './definitions'

const InvoiceSchema = z.object({
  customerId: z.string({
    invalid_type_error: 'Please select a valid customer'
  }),
  amount: z.coerce
    .number()
    .gt(10, {
      message: 'Please enter an amount greater than $10.'
    }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.'
  })
})

const errorMSG = (error: Error): string => {
  const errorMessage = error.message !== null ? error.message : 'An unknown error occurred'
  return errorMessage
}

export async function createInvoice (prevState: State, formData: FormData): Promise<any> {
  const validatedFields = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    }
  }
  const { customerId, amount, status } = validatedFields.data

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

export async function updateInvoice (id: string, formData: FormData): Promise<any> {
  const validatedFields = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    }
  }
  const { customerId, amount, status } = validatedFields.data

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
