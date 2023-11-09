'use client'

import React from 'react'

interface HeadingProps {
	title: string
	center?: boolean
	subTitle?: string
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
	return (
		<div className={center ? 'text-center' : 'text-start'}>
			<div className="text-2xl font-semibold">{title}</div>
			<div className="font-light text-neutral-500 mt-2">
				{subTitle}
			</div>
		</div>
	)
}

export default Heading
