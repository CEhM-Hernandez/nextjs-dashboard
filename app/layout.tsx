import Header from './ui/components/Header'
import { fonts } from './ui/fonts'
import './ui/global.css'
import Footer from '@/app/ui/components/Footer'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' className={`${fonts.montserrat} w-full`}>
      <body className='m-6'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
