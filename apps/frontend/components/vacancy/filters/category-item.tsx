'use client'

import { useVacancyFilters } from '@/contexts/vacancy-filters'
import { cn } from '@workify/shared'

interface CategoryItemProps {
	id: number
	title: string
}

export default function CategoryItem({ id, title }: CategoryItemProps) {
	const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

	const isActive = vacancyFilters.categories.includes(id)

	const handleClick = () => {
		if (isActive) {
			setVacancyFilters({
				...vacancyFilters,
				categories: vacancyFilters.categories.filter(c => c !== id),
			})
		} else {
			setVacancyFilters({
				...vacancyFilters,
				categories: [...vacancyFilters.categories, id],
			})
		}
	}

	return (
		<button
			onClick={handleClick}
			className={cn(
				'px-4 h-[1.5625rem] text-primary-dark rounded-[1.125rem] transition-colors',
				{
					'bg-[#A5C585]': isActive,
					'bg-primary-light hover:bg-[#A5C585]': !isActive,
				}
			)}
		>
			{title}
		</button>
	)
}
