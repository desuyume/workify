'use client'

import { useVacancyFilters } from '@/contexts/vacancy-filters'

export default function Cost() {
  const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

  return (
    <div className='w-full flex flex-col'>
      <p className='text-[0.9375rem] leading-[1.125rem] mb-2.5'>Стоимость </p>
      <div className='w-[8.4375rem] h-[1.5625] bg-primary-light rounded-[1.125rem] pl-[1.0625rem] flex justify-between items-center mb-[0.3125rem]'>
        <p className='font-medium text-black text-[0.9375rem]'>От</p>
        <input
          value={vacancyFilters.cost.from ?? ''}
          onChange={(e) =>
            setVacancyFilters({
              ...vacancyFilters,
              cost: {
                ...vacancyFilters.cost,
                from: e.target.value
              }
            })
          }
          className='w-[5.0625rem] h-full font-medium text-black text-[0.9375rem] pr-[1.0625rem] outline-none border-none bg-transparent rounded-r-[1.125rem]'
        />
      </div>
      <div className='w-[8.4375rem] h-[1.5625] bg-primary-light rounded-[1.125rem] pl-[1.0625rem] flex justify-center items-center'>
        <p className='font-medium text-black text-[0.9375rem] mr-[1.0625rem]'>До</p>
        <input
          value={vacancyFilters.cost.to ?? ''}
          onChange={(e) =>
            setVacancyFilters({
              ...vacancyFilters,
              cost: {
                ...vacancyFilters.cost,
                to: e.target.value
              }
            })
          }
          className='w-[5.0625rem] h-full font-medium text-black text-[0.9375rem] pr-[1.0625rem] outline-none border-none bg-transparent rounded-r-[1.125rem]'
        />
      </div>
    </div>
  )
}
