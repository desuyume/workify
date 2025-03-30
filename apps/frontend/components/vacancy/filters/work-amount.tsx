'use client'

import { useVacancyFilters } from '@/contexts/vacancy-filters'
import { cn } from '@workify/shared'

export default function WorkAmount() {
  const amounts = ['0+', '3+', '5+', '10+']

  const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

  const handleClickAmount = (amount: string) => {
    const isActive = vacancyFilters.worksAmount === amount

    if (isActive) {
      setVacancyFilters({
        ...vacancyFilters,
        worksAmount: ''
      })
    } else {
      setVacancyFilters({
        ...vacancyFilters,
        worksAmount: amount
      })
    }
  }

  return (
    <div>
      <p className='text-[0.9375rem] leading-[1.125rem] mb-2.5'>Количество работ</p>
      <div className='h-[8.1875rem] pl-[0.3125rem] flex flex-col justify-between'>
        {amounts.map((amount) => {
          return (
            <div key={amount} className='flex items-center'>
              <button
                onClick={() => handleClickAmount(amount.replaceAll('+', ''))}
                className={cn(
                  'size-[1.3125rem] bg-primary-light border-[0.3125rem] border-primary-light rounded-[0.4375rem] mr-[0.6875rem] transition-colors',
                  {
                    'border-[#A5C585]': amount.replaceAll('+', '') === vacancyFilters.worksAmount
                  }
                )}
              />
              <p className='font-medium text-[0.9375rem] leading-[1.125rem]'>{amount}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
