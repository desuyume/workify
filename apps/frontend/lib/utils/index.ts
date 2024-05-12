import { VacancyFilters } from '@/contexts/vacancy-filters'
import { ReadonlyURLSearchParams } from 'next/navigation'

export const generatePagination = (c: number, m: number) => {
	var current = c,
		last = m,
		delta = 2,
		left = current - delta,
		right = current + delta + 1,
		range = [],
		rangeWithDots = [],
		l

	for (let i = 1; i <= last; i++) {
		if (i == 1 || i == last || (i >= left && i < right)) {
			range.push(i)
		}
	}

	for (let i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1)
			} else if (i - l !== 1) {
				rangeWithDots.push('...')
			}
		}
		rangeWithDots.push(i)
		l = i
	}

	return rangeWithDots
}

export const getURLWithVacancyFilters = (
	filters: VacancyFilters,
	searchParams: ReadonlyURLSearchParams,
	pathname: any
) => {
	const params = new URLSearchParams(searchParams)

	params.delete('categories')
	params.delete('costFrom')
	params.delete('costTo')
	params.delete('worksAmount')
	params.delete('city')

	params.set('page', '1')

	if (filters.categories.length > 0) {
		params.set('categories', filters.categories.join('-'))
	}

	if (filters.cost.from) {
		params.set('costFrom', filters.cost.from.toString())
	}

	if (filters.cost.to) {
		params.set('costTo', filters.cost.to.toString())
	}

	if (filters.worksAmount) {
		params.set('worksAmount', filters.worksAmount.toString())
	}

	if (filters.city) {
		params.set('city', filters.city)
	}

	return `${pathname}?${params.toString()}`
}
