'use client'

import { NavButton } from '@workify/ui'
import { useState } from 'react'
import { IUserVacancy } from '@workify/shared'
import Vacancy from '../vacancy/vacancy'

interface ProfileVacanciesProps {
  userLogin: string
  vacancies: IUserVacancy[]
}

export default function ProfileVacancies({ userLogin, vacancies }: ProfileVacanciesProps) {
  const [activeSection, setActiveSection] = useState<'vacancy' | 'feedback'>('vacancy')
  return (
    <div
      className={
        'w-full foreground rounded-t-[0.625rem] border-t border-primary-light pt-[8.25rem] flex flex-col items-center relative'
      }
    >
      <nav className='h-[4.625rem] px-[0.9375rem] pb-[0.9375rem] bg-primary-dark rounded-b-[0.625rem] flex justify-between items-end absolute -top-[1px]'>
        <NavButton
          title='Анкеты'
          isActive={activeSection === 'vacancy'}
          onClick={() => setActiveSection('vacancy')}
        />
      </nav>

      {activeSection === 'vacancy' && (
        <div className={'w-[68rem] pb-[5.25rem] flex flex-col realtive transition-all'}>
          {vacancies.length === 0 && (
            <p className='text-xl font-medium text-center '>У пользователя нет анкет</p>
          )}
          {vacancies.map((vacancy) => (
            <Vacancy key={vacancy.id} vacancy={vacancy} inProfile />
          ))}
        </div>
      )}
    </div>
  )
}
