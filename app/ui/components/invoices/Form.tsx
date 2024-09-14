import Link from 'next/link'
import { Button } from '@/app/ui/components/button'
import { createInvoice, updateInvoice } from '@/app/lib/actions'
import { CustomerField, InvoiceForm } from '@/app/lib/definitions'
import AmountInput from './Forms/AmountInput'
import ChooseCustomerInput from './Forms/ChoseCustomerInput'
import Fieldset from './Forms/Fieldset'
/* eslint @typescript-eslint/no-misused-promises: */

export default function Form ({ customers, invoice }: { customers: CustomerField[], invoice?: InvoiceForm }): JSX.Element {
  return (
    <form action={invoice !== undefined ? updateInvoice.bind(null, invoice.id) : createInvoice}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <ChooseCustomerInput customers={customers} invoice={invoice} />
        <AmountInput invoice={invoice} />
        <Fieldset invoice={invoice} />
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/invoices'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>{invoice !== undefined ? 'Edit' : 'Create'} Invoice</Button>
      </div>
    </form>
  )
}
