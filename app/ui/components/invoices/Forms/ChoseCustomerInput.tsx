import { State, CustomerField, InvoiceForm } from '@/app/lib/definitions'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function ChooseCustomerInput ({ customers, invoice, state }: { customers: CustomerField[], invoice?: InvoiceForm, state: State }): JSX.Element {
  const { errors } = state

  return (
    <div className='mb-4'>
      <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
        Choose customer
      </label>
      <div className='relative'>
        <select
          id='customer'
          name='customerId'
          className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
          defaultChecked={invoice !== undefined}
          defaultValue={invoice !== undefined ? invoice.customer_id : ''}
          aria-describedby='customer-error'
        >
          <option value='' disabled>
            Select a customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
      </div>
      <div
        id='customer-error'
        aria-live='polite'
        aria-atomic='true'
      >
        {errors?.customerId?.map((error: string) => (
          <p className='mt-2 text-sm text-red-500' key={error}>
            {error}
          </p>
        ))}
      </div>
    </div>
  )
}
