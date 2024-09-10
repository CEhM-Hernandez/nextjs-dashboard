import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon
} from '@heroicons/react/24/outline'
import { fonts } from '@/app/ui/fonts'
import { fetchCardData } from '@/app/lib/data'

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon
}

export default async function CardWrapper (): Promise<JSX.Element> {
  const totalPaidInvoices = await fetchCardData().then((data) => data.totalPaidInvoices)
  const totalPendingInvoices = await fetchCardData().then((data) => data.totalPendingInvoices)
  const numberOfInvoices = await fetchCardData().then((data) => data.numberOfInvoices)
  const numberOfCustomers = await fetchCardData().then((data) => data.numberOfCustomers)

  return (
    <>
      <Card title='Collected' value={totalPaidInvoices} type='collected' />
      <Card title='Pending' value={totalPendingInvoices} type='pending' />
      <Card title='Total Invoices' value={numberOfInvoices} type='invoices' />
      <Card title='Total Customers' value={numberOfCustomers} type='customers' />
    </>
  )
}

function Card ({
  title,
  value,
  type
}: {
  title: string
  value: number | string
  type: 'invoices' | 'customers' | 'pending' | 'collected'
}): JSX.Element {
  const Icon = iconMap[type]
  const isIcon = Icon !== undefined && Icon !== null

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div className='flex p-4'>
        {isIcon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
        <h3 className='ml-2 text-sm font-medium'>{title}</h3>
      </div>
      <p
        className={`${fonts.lusitana}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  )
}
