'use client'

import React, { useCallback, useState } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const registerModal = useRegisterModal()
	const loginModal = useLoginModal();

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value)
	}, [])

	console.log(registerModal.isOpen)

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        cursor-pointer
                        hover:bg-neutral-100
                        transition
                        rounded-full
                    ">
					your home
				</div>
				<div
					onClick={toggleOpen}
					className="
                    p-4
                    md:py-1
                    md:px-2
                    border
                    border-neutral-100
                    flex flex-row
                    items-center gap-3 transition 
                    hover:shadow-md rounded-full
                    cursor-pointer
                ">
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src="/images/placeholder.jpg" />
					</div>
				</div>
			</div>

			{isOpen && (
				<div
					className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        right-0
                        top-12
                        overflow-hidden
                        text-sm
                    ">
					<div className="flex flex-col cursor-pointer">
						<>
							<MenuItem
								label="Login"
								onClick={() => loginModal.onOpen()}
							/>
							<MenuItem
								label="Sign Up"
								onClick={() =>
									registerModal.onOpen()
								}
							/>
						</>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
