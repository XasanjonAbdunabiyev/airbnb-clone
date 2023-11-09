'use client'

import React, { useState } from 'react'

import { signIn } from 'next-auth/react'

import Heading from '../Heading'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

import useLoginModal from '@/hooks/useLoginModal'
import { toast } from 'react-hot-toast'

import Modal from './Modal'
import TextInput from '../inputs/TextInput'
import Button from '../Button'

const LoginModal = () => {
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)

	/* Form control  */
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		signIn('credentials', {
			...data,
			redirect: false
		}).then((callback) => {
			setIsLoading(false)

			if (callback?.ok) {
				toast.success('Logged In')
				loginModal.onClose()
			}

			if (callback?.error) {
				console.log(callback);
			}
		})
	}

	const modalBodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome back"
				subTitle="Login to your account"
			/>
			<TextInput
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
				type='text'
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
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			footer={registerFooterContent}
			body={modalBodyContent}
		/>
	)
}

export default LoginModal
