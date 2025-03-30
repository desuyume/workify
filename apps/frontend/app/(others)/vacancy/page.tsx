import Pagination from '@/app/ui/pagination'
import Filters from '@/components/vacancy/filters'
import Vacancies from '@/components/vacancy/vacancies'
import { getAllVacancy } from '@/lib/api'
import { IVacancyQuery } from '@workify/shared'

export default async function Page({ searchParams }: { searchParams?: IVacancyQuery }) {
  const vacancies = await getAllVacancy({
    params: {
      query: searchParams
    }
  })

  return (
    <div className='w-full flex justify-center'>
      <div className='w-[1214px] flex flex-col items-center mr-[2.8125rem]'>
        <Vacancies vacancies={vacancies.data.vacancies} />
        <Pagination totalPages={vacancies.data.totalPages > 0 ? vacancies.data.totalPages : 1} />
      </div>
      <Filters />
    </div>
  )
}
