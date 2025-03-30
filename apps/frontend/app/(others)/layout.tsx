import Sidebar from '../ui/sidebar'
import { Button, Glow } from '@workify/ui'
import SearchVacancy from '../ui/search-vacancy'
import Link from 'next/link'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex pl-[13.8125rem] relative bg-layout-lines bg-no-repeat'>
      <Glow className='absolute -left-[22.6875rem] -top-[22rem]' />
      <Sidebar />

      <div className='flex-1 min-h-screen flex flex-col pt-[2.875rem] pb-[7.5rem]'>
        <div className='w-[94%] h-[2.25rem] mb-[4.4375rem] flex justify-between'>
          <SearchVacancy />
          <Link href='/vacancy/create'>
            <Button
              title='Создать анкету'
              variant='light-transparent'
              width='15rem'
              height='100%'
            />
          </Link>
        </div>

        <div className='w-[94%] h-full'>{children}</div>
      </div>
    </section>
  )
}
