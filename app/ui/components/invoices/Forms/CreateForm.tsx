'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/components/button'
import { CustomerField, State } from '@/app/lib/definitions'
import AmountInput from './AmountInput'
import ChooseCustomerInput from './ChoseCustomerInput'
import Fieldset from './Fieldset'
import { useActionState } from 'react'
import { createInvoice } from '@/app/lib/actions'
/* eslint @typescript-eslint/no-misused-promises: */

export default function Form ({ customers }: { customers: CustomerField[] }): JSX.Element {
  const initialState: State = {
    errors: {},
    message: null
  }

  const [state, CreateformAction] = useActionState(createInvoice, initialState)
  return (
    <form action={CreateformAction}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <ChooseCustomerInput customers={customers} state={state} />
        <AmountInput state={state} />
        <Fieldset state={state} />
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
          Create Invoice
        </Button>
      </div>
    </form>
  )
}
