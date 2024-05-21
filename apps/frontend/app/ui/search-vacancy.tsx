'use client'

import { Search } from '@workify/ui'
import { getUrlWithSearchVacancy } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sort from './sort'

export default function SearchVacancy() {
	const [search, setSearch] = useState<string>('')
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const clickSearchHandler = () => {
		const url = getUrlWithSearchVacancy(search, searchParams, pathname)

		router.push(url)
	}

	useEffect(() => {
		setSearch(searchParams.get('search') || '')
	}, [])

	return (
		<div className='h-[2.25rem] flex'>
			<Search
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder='Поиск анкет'
				className='mr-[1.1875rem]'
			/>
			<button
				onClick={clickSearchHandler}
				className='w-[5.75rem] h-full bg-white text-black text-xl rounded-[1.125rem] border border-white mr-5 hover:bg-transparent hover:text-white transition-colors'
			>
				Найти
			</button>
			<Sort />
		</div>
	)
}
