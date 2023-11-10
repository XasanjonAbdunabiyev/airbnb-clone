import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/navbar/Navbar'
import ClientOnly from '@/components/ClientOnly'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'

import ToasterProvider from './providers/ToastProvider'
import getCurrentUser from './actions/getCurrentUser'
import SessionProvider from './providers/SessionProvider'
export const metadata: Metadata = {
	title: 'AirBnb',
	description: 'AirBnb clone',
	icons: {
		icon: '/images/favicon.png',
	},
}

const font = Open_Sans({
	subsets: ['latin'],
	weight: ['500'],
})

export default  function RootLayout({
	children,
	params: { session, ...params },
}: {
	children: React.ReactNode
	params: { session: any }
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<SessionProvider session={session}>
					<ClientOnly>
						<ToasterProvider />
						<LoginModal />
						<RegisterModal />
						<Navbar />
					</ClientOnly>
					{children}
				</SessionProvider>
			</body>
		</html>
	)
}
