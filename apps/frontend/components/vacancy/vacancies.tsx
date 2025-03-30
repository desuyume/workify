import { IUserVacancy } from '@workify/shared'
import Vacancy from './vacancy'

interface VacanciesProps {
  vacancies: IUserVacancy[]
}

export default function Vacancies({ vacancies }: VacanciesProps) {
  return (
    <div className='w-[1214px] flex flex-col mb-[6.0625rem]'>
      {vacancies.length === 0 && (
        <p className='text-xl font-medium text-center pt-[6.0625rem]'>Нет подходящих анкет</p>
      )}
      {vacancies.map((vacancy) => (
        <Vacancy key={vacancy.id} vacancy={vacancy} />
      ))}
    </div>
  )
}
