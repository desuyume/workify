import Pagination from '@/app/ui/pagination'
import Filters from '@/components/vacancy/filters'
import Vacancies from '@/components/vacancy/vacancies'
import { VacancyFiltersProvider } from '@/contexts/vacancy-filters'

export default function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string
		page?: string
	}
}) {
	const query = searchParams?.query
	const currentPage = Number(searchParams?.page) || 1

	return (
		<div className='w-full flex'>
			<div className='w-[1214px] flex flex-col items-center mr-[2.8125rem]'>
				<Vacancies />
				<Pagination totalPages={10} />
			</div>
			<Filters />
		</div>
	)
}
