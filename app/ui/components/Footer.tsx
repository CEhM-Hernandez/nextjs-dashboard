import Link from 'next/link'
import AcmeLogo from '@/app/ui/components/acme-logo'

export default function Footer (): JSX.Element {
  return (
    <footer className='min-h-80 p-0 m-0 flex items-center bg-[#0070f3] flex-wrap rounded-lg'>
      <div className='flex gap-8 flex-col md:flex-row max-w-5xl mx-auto'>
        <Link
          href='/#'
        >
          <AcmeLogo />
        </Link>
        <nav className='flex items-center justify-center text-center'>
          <ul className='flex flex-col md:flex-row gap-4'>
            <li>
              <Link
                href='/dashboard'
                className='text-white'
                content='dashboard'
              >Dashboard
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/invoices'
                className='text-white'
                content='invioices'
              >Invioices
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/customers'
                className='text-white'
                content='customers'
              >Customers
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
