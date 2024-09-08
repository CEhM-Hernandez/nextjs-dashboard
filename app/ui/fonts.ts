import { Lusitana, Montserrat } from 'next/font/google'

const montserrat = Montserrat(
  {
    weight: ['400', '700'],
    subsets: ['latin']
  })

const lusitana = Lusitana(
  {
    weight: ['400', '700'],
    subsets: ['latin']
  })

export const fonts = {
  montserrat: montserrat.className,
  lusitana: lusitana.className
}
