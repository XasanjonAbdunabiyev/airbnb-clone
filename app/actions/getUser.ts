import React from 'react'

import prisma from '@/app/libs/prismadb'

async function getUser() {
	return await prisma.user?.findUnique({
		where: {
			email: '',
		},
	})
}

export default getUser
