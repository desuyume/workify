'use client'

import { cn } from '@workify/shared'
import { useEffect, useRef } from 'react'

export type StatisticType =
  | 'usersCount'
  | 'satisfiedUsersPercennt'
  | 'feedbacksCount'
  | 'activeVacanciesCount'

interface StatisticProps {
  width: string
  statNumber: number
  title: string
  isTwoLine?: boolean
  className?: string
  type: StatisticType
}

export default function Statistic({
  width,
  statNumber,
  title,
  isTwoLine,
  className,
  type
}: StatisticProps) {
  // create a ref and declare an instance for each countUp animation
  const countupRef = useRef(null)
  let countUpAnim

  // useEffect with empty dependency array runs once when component is mounted
  useEffect(() => {
    initCountUp()
  }, [countupRef.current])

  // dynamically import and initialize countUp, sets value of `countUpAnim`
  // you don't have to import this way, but this works best for next.js
  async function initCountUp() {
    const countUpModule = await import('countup.js')
    if (!countupRef.current) return
    countUpAnim = new countUpModule.CountUp(countupRef.current, statNumber, {
      suffix: type === 'satisfiedUsersPercennt' ? '%' : '',
      duration: 5
    })
    if (!countUpAnim.error) {
      countUpAnim.start()
    } else {
      console.error(countUpAnim.error)
    }
  }

  return (
    <div
      style={{
        width
      }}
      className={cn('flex flex-col', className, {
        'h-[9.9375rem]': isTwoLine,
        'h-[7.5rem]': !isTwoLine
      })}
    >
      <div
        className={cn('flex', {
          'mb-2.5': isTwoLine
        })}
      >
        <p
          ref={countupRef}
          className='w-[9.6875rem] h-[5.6875rem] text-[4.6875rem] leading-[5.6875rem] font-semibold mr-[2.125rem]'
        ></p>
        <svg
          width='40'
          height='42'
          viewBox='0 0 40 42'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='mt-8'
        >
          <circle cx='20' cy='22' r='19.5' stroke='#FFFEF4' />
          <path
            d='M10 15.5L19.3549 29.3179C20.1888 30.5497 22.0276 30.4725 22.7554 29.1752L38 2'
            stroke='#99C86A'
            strokeWidth='4'
            strokeLinecap='round'
          />
        </svg>
      </div>
      <p className='text-2xl leading-[1.8125rem]'>{title}</p>
    </div>
  )
}
