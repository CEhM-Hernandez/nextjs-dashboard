'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/components/button'
import { createInvoice, updateInvoice } from '@/app/lib/actions'
import { CustomerField, InvoiceForm, State } from '@/app/lib/definitions'
import AmountInput from './Forms/AmountInput'
import ChooseCustomerInput from './Forms/ChoseCustomerInput'
import Fieldset from './Forms/Fieldset'
import { useActionState } from 'react'

export default function Form ({ customers, invoice }: { customers: CustomerField[], invoice?: InvoiceForm }): JSX.Element {
  const initialState: State = {
    errors: {},
    message: null
  }
  const isEdit = invoice !== undefined

  const updateInvoiceWithId = isEdit ? updateInvoice.bind(null, invoice.id) : () => null

  const [CreateState, CreateformAction] = useActionState(createInvoice, initialState)
  const [EditState, EditformAction] = useActionState(updateInvoiceWithId, initialState)
  const state = isEdit ? EditState : CreateState
  return (
    <form action={isEdit ? EditformAction : CreateformAction}>
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
          {isEdit ? 'Edit' : 'Create'} Invoice
        </Button>
      </div>
    </form>
  )
}
