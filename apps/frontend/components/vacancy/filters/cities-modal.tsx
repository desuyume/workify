'use client'

import Modal from '@/app/ui/modal'
import { getCities } from '@/lib/api/requests/cities'
import { ICity, cn } from '@workify/shared'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface CitiesModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  activeCity: string | null
  handleClickCity: (city: ICity) => void
}

export default function CitiesModal({
  isVisible,
  setIsVisible,
  activeCity,
  handleClickCity
}: CitiesModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cities, setCities] = useState<ICity[]>([])

  const handleChange = (value: string) => {
    setSearchQuery(value)
    if (value.length < 3) return
    setIsLoading(true)
  }

  const fetchCities = () => {
    getCities({
      params: {
        searchParams: {
          search: searchQuery
        }
      }
    })
      .then((res) => setCities(res.data))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!debouncedSearchQuery || debouncedSearchQuery.length < 3) {
      setCities([])
      setIsLoading(false)
    } else {
      fetchCities()
    }
  }, [debouncedSearchQuery])

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
      children={
        <div
          onClick={(e) => e.stopPropagation()}
          className='size-[30rem] bg-primary-dark overflow-y-auto rounded-[0.625rem]'
        >
          <input
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='Найти город...'
            className='w-full bg-primary-dark text-xl text-center py-2 border-2 border-primary-light placeholder:text-gray-200 placeholder:text-opacity-50 rounded-t-[0.625rem] outline-none'
          />
          {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <p className='text-primary-light text-xl'>Загрузка...</p>
            </div>
          ) : (
            <div className='w-full h-full flex flex-col'>
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleClickCity(city)}
                  className={cn(
                    'w-full bg-primary-dark text-primary-light hover:bg-primary-light hover:text-primary-dark font-medium text-lg py-2 transition-colors',
                    {
                      'bg-primary-light text-primary-dark': city.name === activeCity
                    }
                  )}
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}
        </div>
      }
    />
  )
}
