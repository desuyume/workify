'use client'

import { useVacancyFilters } from '@/contexts/vacancy-filters'
import { getURLWithVacancyFilters } from '@/lib/utils'
import { Button } from '@workify/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function FilterButtons() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

  const handleApplyFilters = () => {
    const url = getURLWithVacancyFilters(vacancyFilters, searchParams, pathname)
    router.push(url)
  }

  const handleResetFilters = () => {
    setVacancyFilters({
      categories: [],
      cost: {},
      worksAmount: null,
      city: null
    })
  }

  return (
    <div className='w-full flex-1 flex flex-col justify-center items-center'>
      <Button
        title='Применить'
        variant='light-transparent'
        width='11.75rem'
        height='1.5625rem'
        className='text-primary-dark text-[0.9375rem] rounded-[1.125rem] mb-[1.1875rem]'
        onClick={handleApplyFilters}
      />
      <Button
        title='Сбросить'
        variant='transparent-light'
        width='11.75rem'
        height='1.5625rem'
        className='text-[0.9375rem] rounded-[1.125rem]'
        onClick={handleResetFilters}
      />
    </div>
  )
}
