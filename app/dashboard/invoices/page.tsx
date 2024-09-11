import Search from '@/app/ui/components/search'
import { CreateInvoice } from '@/app/ui/components/invoices/buttons'
import { fonts } from '@/app/ui/fonts'
import Pagination from '@/app/ui/components/invoices/pagination'
import Table from '@/app/ui/components/invoices/table'
import { InvoicesTableSkeleton } from '@/app/ui/components/skeletons'
import { Suspense } from 'react'
import { SearchParams } from '@/app/lib/definitions'
import { fetchInvoicesPages } from '@/app/lib/data'

export default async function Page ({ searchParams }: SearchParams): Promise<JSX.Element> {
  const query = searchParams.query !== undefined ? searchParams.query : ''
  const currentPage = searchParams.page !== undefined ? searchParams.page : 1
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${fonts.lusitana} text-2xl`}>Invoices</h1>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search invoices...' />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage.toString()} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
