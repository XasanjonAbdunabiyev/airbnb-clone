'use client'

import React from 'react'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

interface SessionProviderProps {
	children: React.ReactNode
	session: any
}

const SessionProvider: React.FC<SessionProviderProps> = ({
	children,
	session,
}) => {
	return (
		<NextAuthSessionProvider session={session}>
			{children}
		</NextAuthSessionProvider>
	)
}

export default SessionProvider
