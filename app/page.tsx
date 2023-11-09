import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import RegisterModal from '@/components/modals/RegisterModal'
import useLoginModal from '@/hooks/useLoginModal'

const HomePage = async () => {
	const session = await getServerSession(authOptions)
	return (
		<div>
			{JSON.stringify(session)}
		</div>
	)
}

export default HomePage
