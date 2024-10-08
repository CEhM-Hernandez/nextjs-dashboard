import { Suspense } from 'react'
import CardWrapper from '../ui/components/dashboard/cards'
import LatestInvoices from '../ui/components/dashboard/latest-invoices'
import RevenueChart from '../ui/components/dashboard/revenue-chart'
import { fonts } from '../ui/fonts'
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/components/skeletons'

export default async function Dashboard (): Promise<JSX.Element> {
  return (
    <main>
      <h1 className={`${fonts.lusitana} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}
