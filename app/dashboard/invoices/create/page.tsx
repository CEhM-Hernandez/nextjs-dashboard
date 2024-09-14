import Form from '@/app/ui/components/invoices/Form'
import Breadcrumbs from '@/app/ui/components/invoices/breadcrumbs'
import { fetchCustomers } from '@/app/lib/data'

export default async function Page (): Promise<JSX.Element> {
  const customers = await fetchCustomers()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true
          }
        ]}
      />
      <Form customers={customers} />
    </main>
  )
}
