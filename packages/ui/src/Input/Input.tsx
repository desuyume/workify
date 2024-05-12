'use client'

import { useState } from 'react'
import { cn } from '@workify/shared'
import { EyeIcon } from '../Icons/EyeIcon'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	inputWidth?: string
}

export function Input({ inputWidth = '19.375rem', ...props }: InputProps) {
	const [value, setValue] = useState(props.value ?? '')

	return (
		<input
			{...props}
			style={{ width: inputWidth }}
			value={value}
			onChange={e => setValue(e.target.value)}
			className={cn(
				'w-full h-10 foreground pl-3 font-light text-lg text-primary-light outline-none rounded-[0.3125rem]',
				props.className,
				{
					'tracking-[0.3125rem] text-[0.4rem]': props.type === 'password',
				}
			)}
		/>
	)
}

interface PasswordInputProps extends InputProps {}

export function PasswordInput({ ...props }: PasswordInputProps) {
	const [isShowPassword, setIsShowPassword] = useState(false)

	return (
		<div className='relative'>
			<Input
				{...props}
				type={isShowPassword ? 'text' : 'password'}
				className={cn('pr-[2.3125rem]', props.className)}
			/>
			<EyeIcon
				onClick={() => setIsShowPassword(!isShowPassword)}
				className='absolute left-[10.375rem] bottom-4'
				isActive={isShowPassword}
			/>
		</div>
	)
}

interface SettingTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	textareaWidth?: string
	textareaHeight?: string
}

export function Textarea({
	textareaWidth = '19.375rem',
	textareaHeight = '14.6875rem',
	...props
}: SettingTextareaProps) {
	const [value, setValue] = useState(props.value)

	return (
		<textarea
			{...props}
			style={{ width: textareaWidth, height: textareaHeight }}
			value={value}
			onChange={e => setValue(e.target.value)}
			className={cn(
				'foreground pt-[0.5625rem] pl-3 pr-[0.9375rem] pb-[0.625rem] font-light text-[0.9375rem] leading-[1.125rem] text-primary-light text-stroke outline-none rounded-[0.3125rem] resize-none',
				props.className
			)}
		/>
	)
}
