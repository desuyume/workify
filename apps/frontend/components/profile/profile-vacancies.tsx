import { IUserVacancy } from '@workify/shared'
import Vacancy from '../vacancy/vacancy'

interface ProfileVacanciesProps {
	vacancies: IUserVacancy[]
}

export default function ProfileVacancies({ vacancies }: ProfileVacanciesProps) {
	return (
		<div
			className={'w-[68rem] pb-[5.25rem] flex flex-col realtive transition-all'}
		>
			{vacancies.length === 0 && (
				<p className='text-xl font-medium text-center '>
					У пользователя нет анкет
				</p>
			)}
			{vacancies.map(vacancy => (
				<Vacancy key={vacancy.id} vacancy={vacancy} inProfile />
			))}
		</div>
	)
}
