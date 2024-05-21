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

	params.delete('category')
	params.delete('cost_from')
	params.delete('cost_to')
	params.delete('works_amount')
	params.delete('city')

	params.set('page', '1')

	if (filters.categories.length > 0) {
		params.set('category', filters.categories.join('-'))
	}

	if (filters.cost.from) {
		params.set('cost_from', filters.cost.from.toString())
	}

	if (filters.cost.to) {
		params.set('cost_to', filters.cost.to.toString())
	}

	if (filters.worksAmount) {
		params.set('works_amount', filters.worksAmount.toString())
	}

	if (filters.city) {
		params.set('city', filters.city)
	}

	return `${pathname}?${params.toString()}`
}

export const getUrlWithSearchVacancy = (
	search: string,
	searchParams: ReadonlyURLSearchParams,
	pathname: any
) => {
	const params = new URLSearchParams(searchParams)

	params.set('page', '1')

	if (search) {
		params.set('search', search)
	} else {
		params.delete('search')
	}

	return params.size ? `/vacancy?${params.toString()}` : pathname
}

interface SearchParams {
	[key: string]: string | number | undefined
}

export const processSearchParams = (searchParams: SearchParams): string => {
	let result = ''

	for (const param in searchParams) {
		if (
			Object.prototype.hasOwnProperty.call(searchParams, param) &&
			searchParams[param] !== undefined
		) {
			result += `${param}=${searchParams[param]}&`
		}
	}

	// Remove trailing '&' if any
	if (result.endsWith('&')) {
		result = result.slice(0, -1)
	}

	return result === '' ? '' : `?${result}`
}
