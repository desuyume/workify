import { getServerSession } from 'next-auth'
import Sidebar from '../ui/sidebar'
import { authOptions } from '../api/auth/[...nextauth]/options'
import SignOutButton from '../ui/sign-out-button'
import { Glow, Search } from '@workify/ui'
import SortButton from '../ui/sort-button'
import bgLines from '@/public/images/layout-bg-lines.svg'
import Image from 'next/image'
import LayoutBgLines from '../ui/layout-bg-lines'

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	return (
		<section className='flex pl-[5.9375rem] relative'>
			{session && session?.user && <SignOutButton />}

			<Glow className='absolute -left-[22.6875rem] -top-[22rem]' />
			<Image
				src={bgLines}
				alt='bg-lines'
				className='w-[calc(100vw+1px)] absolute top-0 right-[-1px] -z-50'
			/>
			{/* <LayoutBgLines /> */}
			<Sidebar />

			<div className='flex-1 flex flex-col pt-[2.875rem] pb-[7.5rem]'>
				<div className='h-[2.25rem] flex mb-[4.4375rem]'>
					<Search placeholder='Поиск анкет' className='mr-[1.1875rem]' />
					<button className='w-[5.75rem] h-full bg-white text-black text-xl rounded-[1.125rem] border border-white mr-5 hover:bg-transparent hover:text-white transition-colors'>
						Найти
					</button>
					<SortButton />
				</div>

				{children}
			</div>
		</section>
	)
}
