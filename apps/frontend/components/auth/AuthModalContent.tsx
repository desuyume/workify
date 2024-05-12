import { useState } from 'react'
import { IntroduceSection } from './IntroduceSection'
import { LoginSection } from './LoginSection'
import { RegSection } from './RegSection'
import { BackButton, CloseButton, Glow } from '@workify/ui'
import { cn } from '@workify/shared'
import AuthModalBackgroundContent from './AuthModalBackgroundContent'

interface AuthModalContentProps {
	onClose: () => void
}

export type AuthSection = 'introduce' | 'login' | 'reg'

export function AuthModalContent({ onClose }: AuthModalContentProps) {
	const [activeSection, setActiveSection] = useState<AuthSection>('introduce')

	return (
		<div
			onClick={e => e.stopPropagation()}
			className='bg-primary-light w-[51.69rem] h-[49.88rem] rounded-[2.19rem] pt-[3.4375rem] flex flex-col items-center z-50 overflow-hidden relative'
		>
			{(activeSection === 'login' || activeSection === 'reg') && (
				<BackButton
					onClick={() => setActiveSection('introduce')}
					className='absolute top-[2.375rem] right-[4.875rem]'
				/>
			)}
			<CloseButton
				onClick={onClose}
				className='absolute right-[1.875rem] top-[2.375rem]'
			/>

			<p className='text-[1.5625rem] text-primary-dark underline skip-ink-none mb-[3.75rem]'>
				Workify
			</p>

			<p
				className={cn(
					'font-santello text-[2.5rem] text-primary-dark leading-[3.1875rem] text-center w-[23.9375rem]',
					{
						'mb-[4.6875rem]': activeSection === 'introduce',
						'mb-[6.5625rem]': activeSection === 'login',
						'mb-[2.5rem]': activeSection === 'reg',
					}
				)}
			>
				Добро пожаловать в Workify!
			</p>

			{activeSection === 'introduce' && (
				<IntroduceSection setActiveSection={setActiveSection} />
			)}
			{activeSection === 'login' && (
				<LoginSection setActiveSection={setActiveSection} />
			)}
			{activeSection === 'reg' && (
				<RegSection setActiveSection={setActiveSection} />
			)}

			<div className='w-[36.8125rem] h-[5.3125rem] bg-primary-light absolute bottom-[1.8125rem] right-[5.375rem] pt-5 pl-[0.4375rem]'>
				<div className='text-primary-dark text-[0.8125rem] w-[32.8125rem] leading-tight text-center [&_span]:underline [&_span]:font-medium [&_span]:skip-ink-none'>
					<p>
						Продолжая, вы соглашаетесь с положениями основных документов{' '}
						<span>Workify</span>.
					</p>
					<p>
						Это <span>Условия предоставления услуг</span> и{' '}
						<span>Политика конфиденциальности</span>{' '}
					</p>
					<p>А также подтверждаете, что прочли их.</p>
				</div>
			</div>

			<AuthModalBackgroundContent />
		</div>
	)
}
