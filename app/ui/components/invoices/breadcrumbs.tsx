import { clsx } from 'clsx'
import Link from 'next/link'
import { fonts } from '@/app/ui/fonts'

interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

export default function Breadcrumbs ({
  breadcrumbs
}: {
  breadcrumbs: Breadcrumb[]
}): JSX.Element {
  return (
    <nav aria-label='Breadcrumb' className='mb-6 block'>
      <ol className={clsx(fonts.lusitana, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active === true ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1
              ? (
                <span className='mx-3 inline-block'>/</span>
                )
              : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
