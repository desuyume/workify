import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
})
export const santello = localFont({
	src: '../../public/fonts/santello/SANTELLO.ttf',
	display: 'swap',
	variable: '--font-santello',
})
