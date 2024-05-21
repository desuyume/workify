import Pagination from '@/app/ui/pagination'
import Filters from '@/components/vacancy/filters'
import Vacancies from '@/components/vacancy/vacancies'

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		search?: string
		page?: string
	}
}) {
	return (
		<div className='w-full flex justify-center'>
			<div className='w-[1214px] flex flex-col items-center mr-[2.8125rem]'>
				<Vacancies />
				<Pagination totalPages={10} />
			</div>
			<Filters />
		</div>
	)
}
