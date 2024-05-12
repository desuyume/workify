import type { Metadata } from 'next'
import { montserrat, santello } from './ui/fonts'
import './globals.css'
import '@workify/ui/styles.css'

import Providers from './providers'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
	title: 'Workify',
	description: 'Get started with Workify',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={`${montserrat.variable} ${santello.variable} font-montserrat`}
			>
				<Providers>
					{children}
					<Toaster position='top-center' />
				</Providers>
			</body>
		</html>
	)
}
