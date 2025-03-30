'use client'

import { generatePagination } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PaginationButtonLeft, PaginationButtonRight } from './pagination-button'
import Link from 'next/link'
import { cn } from '@workify/shared'
import { useEffect } from 'react'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = Number(searchParams.get('page')) || 1
  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      router.push(`${pathname}?page=${totalPages}`)
    }
    if (currentPage < 1) {
      router.push(`${pathname}?page=1`)
    }
  }, [currentPage])

  return (
    <nav className='inline-flex items-center'>
      <PaginationButtonLeft href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

      <div className='flex'>
        {allPages.map((page) => {
          return (
            <div key={page} className='mr-2.5 last-of-type:mr-0'>
              {page === '...' || currentPage === page ? (
                <p
                  className={cn('text-[1.25rem] leading-6 text-primary-light', {
                    underline: currentPage === page
                  })}
                >
                  {page}
                </p>
              ) : (
                <Link
                  href={createPageURL(page)}
                  className={cn(
                    'text-[1.25rem] leading-6 text-primary-light hover:opacity-75 transition-opacity',
                    {
                      underline: currentPage === page
                    }
                  )}
                >
                  {page}
                </Link>
              )}
            </div>
          )
        })}
      </div>

      <PaginationButtonRight
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </nav>
  )
}
