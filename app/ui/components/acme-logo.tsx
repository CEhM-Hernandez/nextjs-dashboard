import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { fonts } from '@/app/ui/fonts'

export default function AcmeLogo (): JSX.Element {
  return (
    <div className={`${fonts.lusitana} flex flex-row items-center leading-none text-white`}>
      <GlobeAltIcon className='h-12 w-12 rotate-[15deg]' />
      <p className='text-[44px] leading-[44px]'>Acme</p>
    </div>
  )
}
