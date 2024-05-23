'use client'

import { NavButton } from '@workify/ui'
import { useState } from 'react'
import ProfileVacancies from './profile-vacancies'
import ProfileFeedbacks from './profile-feedbacks'
import { IUserVacancy } from '@workify/shared'

interface VacancyFeedbackProps {
	vacancies: IUserVacancy[]
}

export default function VacancyFeedback({ vacancies }: VacancyFeedbackProps) {
	const [activeSection, setActiveSection] = useState<'vacancy' | 'feedback'>(
		'vacancy'
	)
	return (
		<div
			className={
				'w-full foreground rounded-t-[0.625rem] border-t border-primary-light pt-[8.25rem] flex flex-col items-center relative'
			}
		>
			<nav className='w-[24.875rem] h-[4.625rem] px-[0.9375rem] pb-[0.9375rem] bg-primary-dark rounded-b-[0.625rem] flex justify-between items-end absolute -top-[1px]'>
				<NavButton
					title='Анкеты'
					isActive={activeSection === 'vacancy'}
					onClick={() => setActiveSection('vacancy')}
				/>
				<NavButton
					title='Отзывы'
					isActive={activeSection === 'feedback'}
					onClick={() => setActiveSection('feedback')}
				/>
			</nav>

			{activeSection === 'vacancy' && (
				<ProfileVacancies vacancies={vacancies} />
			)}
			{activeSection === 'feedback' && <ProfileFeedbacks />}
		</div>
	)
}
