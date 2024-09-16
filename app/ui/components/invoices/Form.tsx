'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/components/button'
import { createInvoice, updateInvoice } from '@/app/lib/actions'
import { CustomerField, InvoiceForm, State } from '@/app/lib/definitions'
import AmountInput from './Forms/AmountInput'
import ChooseCustomerInput from './Forms/ChoseCustomerInput'
import Fieldset from './Forms/Fieldset'
import { useActionState } from 'react'
/* eslint @typescript-eslint/no-misused-promises: */

export default function Form ({ customers, invoice }: { customers: CustomerField[], invoice?: InvoiceForm }): JSX.Element {
  const initialState: State = {
    errors: {},
    message: null
  }

  const [CreateState, CreateformAction] = useActionState(createInvoice, initialState)
  const state = invoice !== undefined ? CreateState : initialState
  return (
    <form action={invoice !== undefined ? updateInvoice.bind(null, invoice.id) : CreateformAction}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <ChooseCustomerInput customers={customers} invoice={invoice} state={state} />
        <AmountInput invoice={invoice} state={state} />
        <Fieldset invoice={invoice} state={state} />
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/invoices'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button
          type='submit'
        >
          {invoice !== undefined ? 'Edit' : 'Create'} Invoice
        </Button>
      </div>
    </form>
  )
}
