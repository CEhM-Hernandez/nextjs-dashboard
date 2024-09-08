import { fonts } from './ui/fonts'
import './ui/global.css'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' className={`${fonts.montserrat}`}>
      <body>{children}</body>
    </html>
  )
}
