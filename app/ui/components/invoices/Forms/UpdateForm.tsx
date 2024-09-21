'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/components/button'
import { CustomerField, InvoiceForm, State } from '@/app/lib/definitions'
import AmountInput from './AmountInput'
import ChooseCustomerInput from './ChoseCustomerInput'
import Fieldset from './Fieldset'
import { useActionState } from 'react'
import { updateInvoice } from '@/app/lib/actions'

export default function Form ({ customers, invoice }: { customers: CustomerField[], invoice: InvoiceForm }): JSX.Element {
  const initialState: State = {
    errors: {},
    message: null
  }

  const updateInvoiceWithID = updateInvoice.bind(null, invoice.id)
  const [state, UpdateformAction] = useActionState(updateInvoiceWithID, initialState)

  return (
    <form action={UpdateformAction}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <ChooseCustomerInput customers={customers} invoice={invoice} state={state} />
        <AmountInput state={state} invoice={invoice} />
        <Fieldset state={state} invoice={invoice} />
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
          Update Invoice
        </Button>
      </div>
    </form>
  )
}
