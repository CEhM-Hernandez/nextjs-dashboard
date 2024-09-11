import Link from 'next/link'
import AcmeLogo from '@/app//ui/components/acme-logo'

export default function Header (): JSX.Element {
  return (
    <div className='flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52'>
      <Link
        href='/#'
      >
        <AcmeLogo />
      </Link>
    </div>
  )
}
