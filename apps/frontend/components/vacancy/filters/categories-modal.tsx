'use client'

import Modal from '@/app/ui/modal'
import { useVacancyFilters } from '@/contexts/vacancy-filters'
import { IVacancyCategory, cn } from '@workify/shared'
import { Dispatch, SetStateAction } from 'react'

interface CategoriesModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  categories: IVacancyCategory[]
}

export default function CategoriesModal({
  isVisible,
  setIsVisible,
  categories
}: CategoriesModalProps) {
  const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

  const handleClick = (category: IVacancyCategory) => {
    const isActive = vacancyFilters.categories.includes(category.id)

    if (isActive) {
      setVacancyFilters({
        ...vacancyFilters,
        categories: vacancyFilters.categories.filter((c) => c !== category.id)
      })
    } else {
      setVacancyFilters({
        ...vacancyFilters,
        categories: [...vacancyFilters.categories, category.id]
      })
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
      children={
        <div
          onClick={(e) => e.stopPropagation()}
          className='size-[30rem] bg-primary-dark rounded-[0.625rem]'
        >
          <div className='w-full h-full flex flex-col overflow-y-auto rounded-[0.625rem]'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleClick(category)}
                className={cn(
                  'w-full bg-primary-dark text-primary-light hover:bg-primary-light hover:text-primary-dark font-medium text-lg py-2 transition-colors',
                  {
                    'bg-primary-light text-primary-dark': vacancyFilters.categories.includes(
                      category.id
                    )
                  }
                )}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className='w-full h-14 flex border-t-2 border-primary-light'>
            <button
              onClick={() => setIsVisible(false)}
              className='w-1/2 h-full bg-primary-dark text-primary-light border-r border-primary-light text-lg font-medium hover:bg-primary-light hover:text-primary-dark transition-colors'
            >
              Сохранить
            </button>
            <button
              onClick={() =>
                setVacancyFilters({
                  ...vacancyFilters,
                  categories: []
                })
              }
              className='w-1/2 h-full bg-primary-dark text-primary-light border-l border-primary-light text-lg font-medium hover:bg-primary-light hover:text-primary-dark transition-colors'
            >
              Сбросить
            </button>
          </div>
        </div>
      }
    />
  )
}
