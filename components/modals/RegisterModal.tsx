'use client'

import React, { useCallback, useState } from 'react'

import axios from 'axios'

import Heading from '../Heading'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

import useRegisterModal from '@/hooks/useRegisterModal'
import { toast } from 'react-hot-toast'

import Modal from './Modal'
import TextInput from '../inputs/TextInput'
import Button from '../Button'

const RegisterModal = () => {
	const registerModal = useRegisterModal()
	const [isLoading, setIsLoading] = useState(false)

	/* Form control  */
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		axios.post('/api/register', data)
			.then(() => {
				registerModal.onClose()
			})
			.catch((_error) => {
				toast.error('Somethings went wrong !')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const modalBodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to Airbnb"
				subTitle="Create an account"
			/>
			<TextInput
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextInput
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextInput
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const registerFooterContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => {}}
			/>
			<Button
				outline
				label="Continue with GitHub"
				icon={AiFillGithub}
				onClick={() => {}}
			/>
			<div className="text-neutral-500 text-center mt-4 font-medium">
				<div className="flex flex-row gap-4 items-center justify-center">
					<div className="font-bold">
						Already have an account ?
					</div>
					<div
						className="hover:underline font-semibold text-black cursor-pointer"
						onClick={registerModal.onClose}>
						Log In
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			footer={registerFooterContent}
			body={modalBodyContent}
		/>
	)
}

export default RegisterModal
