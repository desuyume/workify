'use client'

import { Button, Search } from '@workify/ui'
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
				onKeyDown={e => e.key === 'Enter' && clickSearchHandler()}
				placeholder='Поиск анкет'
				className='mr-[1.1875rem]'
			/>
			<Button
				variant='light-transparent'
				title='Найти'
				width='5.75rem'
				height='100%'
				borderRadius='1.125rem'
				onClick={clickSearchHandler}
				className='mr-5'
			/>
			<Sort />
		</div>
	)
}
