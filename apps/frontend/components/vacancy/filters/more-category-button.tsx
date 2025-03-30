'use client'

import { useState } from 'react'
import CategoriesModal from './categories-modal'
import { IVacancyCategory } from '@workify/shared'

interface MoreCategoryButtonProps {
  categories: IVacancyCategory[]
}

export default function MoreCategoryButton({ categories }: MoreCategoryButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  return (
    <>
      <button
        onClick={() => setIsModalVisible(true)}
        className='text-[0.9375rem] leading-[1.125rem] font-medium underline skip-ink-none ml-2.5 self-end hover:opacity-80 transition-opacity'
      >
        Еще
      </button>

      <CategoriesModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        categories={categories}
      />
    </>
  )
}
