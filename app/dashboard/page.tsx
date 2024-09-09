import { fetchLatestInvoices, fetchRevenue } from '../lib/data'
import LatestInvoices from '../ui/components/dashboard/latest-invoices'
import RevenueChart from '../ui/components/dashboard/revenue-chart'
import { fonts } from '../ui/fonts'

export default async function Dashboard (): Promise<JSX.Element> {
  const revenue = await fetchRevenue()
  const latestInvoices = await fetchLatestInvoices()

  return (
    <main>
      <h1 className={`${fonts.lusitana} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* <Card title='Collected' value={totalPaidInvoices} type='collected' /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  )
}
