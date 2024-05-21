import { VacancyFiltersProvider } from '@/contexts/vacancy-filters'
import Categories from './filters/categories'
import Cost from './filters/cost'
import WorkAmount from './filters/work-amount'
import Cities from './filters/cities'
import FilterButtons from './filters/filter-buttons'

export default function Filters() {
	return (
		<VacancyFiltersProvider>
			<div className='w-[19.375rem] h-[52.8125rem] foreground rounded-[0.3125rem] border-t border-white flex flex-col'>
				<div className='w-full h-[43.4375rem] pt-[0.9375rem] pb-[2.1875rem] px-[1.9375rem] flex flex-col justify-between'>
					<Categories />
					<Cost />
					<WorkAmount />
					<Cities />
				</div>

				<hr className='w-[17.875rem] border-t border-t-white rounded-full mx-auto' />

				<FilterButtons />
			</div>
		</VacancyFiltersProvider>
	)
}
