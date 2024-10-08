import Form from '@/app/ui/components/invoices/Form'
import Breadcrumbs from '@/app/ui/components/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import { notFound } from 'next/navigation'

export default async function Page ({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const { id } = params
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])

  if (invoice === undefined) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}
