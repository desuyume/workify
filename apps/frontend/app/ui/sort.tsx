import { useEffect, useState } from 'react'
import SortIcon from './icons/SortIcon'
import { SortBy, cn } from '@workify/shared'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import SortButton from './sort-button'

const sortOptions = ['rating', 'cost', 'reviews']

export default function Sort() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [sortBy, setSortBy] = useState<SortBy | null>(null)
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const handleClickSort = (sortOption: SortBy) => {
		if (sortBy === sortOption) {
			removeSortParam()
		} else {
			addSortParam(sortOption)
		}

		setIsOpen(false)
	}

	const addSortParam = (sortOption: SortBy) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', '1')
		params.set('sortBy', sortOption)
		router.push(`/vacancy?${params.toString()}`)
		setSortBy(sortBy)
	}

	const removeSortParam = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('sortBy')
		router.push(`${pathname}?${params.toString()}`)
		setSortBy(null)
	}

	useEffect(() => {
		const sortBy = searchParams.get('sortBy') as SortBy

		if (sortOptions.includes(sortBy)) {
			setSortBy(sortBy)
		} else {
			removeSortParam()
		}
	}, [searchParams])

	return (
		<div className='relative flex justify-center'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'w-[2.25rem] aspect-square bg-white border border-white hover:bg-transparent rounded-[1.125rem] flex flex-col justify-center items-center group transition-colors',
					{
						'bg-transparent': isOpen,
					}
				)}
			>
				<SortIcon isActive={isOpen} />
			</button>

			<div
				className={cn(
					'w-48 bg-white absolute -bottom-2 translate-y-full rounded-[0.625rem] transition-opacity z-30',
					{
						'opacity-0 invisible': !isOpen,
						'opacity-100 visible': isOpen,
					}
				)}
			>
				<p className='text-center text-primary-dark border-b border-primary-dark'>
					Сортировать по:
				</p>
				<SortButton
					title='цене'
					sortBy='cost'
					onClick={handleClickSort}
					isActive={sortBy === 'cost'}
				/>
				<SortButton
					title='количеству отзывов'
					sortBy='reviews'
					onClick={handleClickSort}
					isActive={sortBy === 'reviews'}
				/>
				<SortButton
					title='рейтингу'
					sortBy='rating'
					onClick={handleClickSort}
					isActive={sortBy === 'rating'}
					className='rounded-b-[0.625rem]'
				/>
			</div>
		</div>
	)
}
