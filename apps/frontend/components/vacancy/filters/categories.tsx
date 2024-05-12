import CategoryItem from './category-item'

export default function Categories() {
	return (
		<div className='w-full h-[7.125rem]'>
			<p className='text-[0.9375rem] leading-[1.125rem] mb-2.5'>Категории</p>
			<div className='w-full flex flex-wrap gap-x-[8px] gap-y-[5px]'>
				<CategoryItem id={1} title='пупупупупуп' />
				<CategoryItem id={2} title='пупу' />
				<CategoryItem id={3} title='пупупу' />
				<CategoryItem id={4} title='пупупупупуп' />
				<CategoryItem id={5} title='пупупупупупу' />
				<button className='text-[0.9375rem] leading-[1.125rem] font-medium underline skip-ink-none ml-2.5 self-end'>
					Еще
				</button>
			</div>
		</div>
	)
}
