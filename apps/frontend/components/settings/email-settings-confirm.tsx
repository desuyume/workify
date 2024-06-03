'use client'

import { SettingInput } from '@/app/ui/setting-input'
import { useState } from 'react'

interface EmailSettingsConfirmProps {
	className?: string
}

export default function EmailSettingsConfirm({
	className,
}: EmailSettingsConfirmProps) {
	const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

	return (
		<div className={!!className ? className : ''}>
			<SettingInput
				id='email'
				name='email'
				value='daniil.sokolov@mail.ru'
				label='Почта'
				inputWidth='24.375rem'
				type='email'
				className='rounded-b-none'
				settingType='email'
			/>
			{/* <div className='w-[24.375rem] h-10 foreground rounded-b-[0.3125rem] pt-0.5 flex flex-col items-center'>
				<hr className='w-[22.875rem]' />
				<div className='flex-1 self-start flex items-center ml-3'>
					{isConfirmed ? (
						<p className='font-medium text-[0.8125rem] leading-4 underline skip-ink-none'>
							почта подтверждена
						</p>
					) : (
						<button
							onClick={() => setIsConfirmed(true)}
							className='font-medium text-[0.8125rem] leading-4'
						>
							подтвердить почту
						</button>
					)}
				</div>
			</div> */}
		</div>
	)
}
