import { getAllVacancyCategories } from '@/lib/api'
import CategoryItem from './category-item'
import MoreCategoryButton from './more-category-button'

export default async function Categories() {
	const categories = await getAllVacancyCategories({ params: {} })

	return (
		<div className='w-full h-[7.125rem]'>
			<p className='text-[0.9375rem] leading-[1.125rem] mb-2.5'>Категории</p>
			<div className='w-full flex flex-wrap gap-x-[8px] gap-y-[5px]'>
				<CategoryItem
					id={categories.data[3].id}
					title={categories.data[3].title}
				/>
				<CategoryItem
					id={categories.data[0].id}
					title={categories.data[0].title}
				/>
				<CategoryItem
					id={categories.data[4].id}
					title={categories.data[4].title}
				/>
				<CategoryItem
					id={categories.data[11].id}
					title={categories.data[11].title}
				/>
				<CategoryItem
					id={categories.data[6].id}
					title={categories.data[6].title}
				/>

				<MoreCategoryButton categories={categories.data} />
			</div>
		</div>
	)
}
