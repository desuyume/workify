import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'
import { getAllVacancyCategories } from '@/lib/api'
import { IVacancyCategory, cn } from '@workify/shared'
import { useEffect, useState } from 'react'

interface VacancyCategoriesProps {
  isVisible: boolean
  onClose: () => void
}

export default function VacancyCategories({ isVisible, onClose }: VacancyCategoriesProps) {
  const [categories, setCategories] = useState<IVacancyCategory[]>([])
  const { vacancy, setVacancy } = useCreateEditVacancy()

  const handleClickCategory = (category: IVacancyCategory) => {
    setVacancy({
      ...vacancy,
      category
    })
    onClose()
  }

  useEffect(() => {
    if (isVisible) {
      getAllVacancyCategories({
        params: {}
      }).then((res) => {
        setCategories(res.data)
      })
    }
  }, [isVisible])

  return (
    <div
      className={cn(
        'size-[20rem] text-primary-dark flex flex-col items-center rounded-[0.625rem] overflow-y-auto transition-opacity z-50 absolute bottom-0 right-0 translate-y-full translate-x-full',
        {
          'opacity-100 visible': isVisible,
          'opacity-0 invisible': !isVisible
        }
      )}
    >
      {categories.map((category) => (
        <div key={category.id} className='w-full'>
          <button
            onClick={() => handleClickCategory(category)}
            className={cn(
              'w-full bg-primary-dark text-primary-light hover:bg-primary-light hover:text-primary-dark font-medium text-lg py-2 transition-colors',
              {
                'bg-primary-light text-primary-dark': category.id === vacancy.category?.id
              }
            )}
          >
            {category.title}
          </button>
        </div>
      ))}
    </div>
  )
}
