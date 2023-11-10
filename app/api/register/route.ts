import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'

/* Register POST Api handlers */
export async function POST(request: Request) {
	const body = await request.json()

	const { name, email, password } = body

	const hashedPassword = await bcrypt.hash(password, 12)

	const exist = await prisma.user.findUnique({
		where: {
			email: email,
		},
	})

	if (exist) {
		return NextResponse.json('User already exists', { status: 400 })
	}

	const user = prisma.user.create({
		data: {
			email,
			hashedPassword,
			name,
		},
	})

	return NextResponse.json(user)
}
