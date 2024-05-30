import Image from 'next/image'
import Link from 'next/link'
import { Button, Glow } from '@workify/ui'
import gridImg from '@/public/images/mainGrid.png'
import Statistic from './ui/statistic'
import LoginRegButton from './ui/login-reg-button'

export default function Home() {
	return (
		<>
			<header className='w-full h-[7.1875rem] px-[10.125rem] flex justify-between items-center'>
				<Link
					href='/'
					className='text-2xl text-primary-light underline skip-ink-none'
				>
					Workify
				</Link>

				<LoginRegButton />
			</header>

			<main className='w-full min-h-[calc(100vh-7.1875rem)] px-[10.125rem] relative'>
				<div className='w-full min-h-[calc(100vh-7.1875rem)] flex flex-col justify-center'>
					<h1 className='text-[2.34375rem] mb-[1.875rem] inline-block font-santello'>
						Workify - ваш путь к новым возможностям
					</h1>
					<h2 className='text-[3.8125rem] leading-tight font-santello max-w-[50rem] mb-[9.5rem]'>
						СОЗДАВАЙТЕ, НАХОДИТЕ, РАБОТАЙТЕ
					</h2>
					<div className='w-[39.125rem] h-[20.8125rem] flex flex-wrap justify-between content-between'>
						<Statistic
							width='17.0625rem'
							statNumber='750'
							title='зарегистрированных
							пользователей'
							isTwoLine
						/>
						<Statistic
							width='14.3125rem'
							statNumber='95%'
							title='удовлетворенных
							клиентов'
							isTwoLine
						/>
						<Statistic width='14rem' statNumber='500' title='успешных сделок' />
						<Statistic
							width='14.3125rem'
							statNumber='600'
							title='активных анкет'
						/>
					</div>
				</div>
				<div className='w-[31.35vw] aspect-[602/258] bg-primary-dark flex flex-col flex-center rounded-[2.9375rem] absolute top-[29%] right-[11.7%]'>
					<div className='w-full h-[28%] flex justify-between items-center pl-[5.5%] mb-[1.375rem]'>
						<Link className='w-[78%] h-full peer' href='/vacancy/create'>
							<Button
								title='создать анкету'
								variant='light'
								width='100%'
								height='100%'
								fontSize='1.2vw'
							/>
						</Link>

						<div className='flex-1 flex justify-center peer-hover:[&_svg]:fill-primary-light peer-hover:[&_path]:stroke-primary-dark'>
							<svg
								width='37'
								height='37'
								viewBox='0 0 37 37'
								xmlns='http://www.w3.org/2000/svg'
								className='fill-none'
							>
								<circle
									cx='18.5'
									cy='18.5'
									r='18'
									className='stroke-primary-light'
								/>
								<path
									d='M18.5 8.5L18.5 27.5'
									strokeLinecap='round'
									className='stroke-primary-light'
								/>
								<path
									d='M8.5 18.5H29.5'
									stroke='#FFFEF4'
									strokeLinecap='round'
									className='stroke-primary-light'
								/>
							</svg>
						</div>
					</div>
					<div className='w-full h-[28%] flex justify-between items-center pl-[5.5%]'>
						<Link className='w-[78%] h-full peer' href='/vacancy'>
							<Button
								title='найти исполнителя'
								variant='dark'
								width='100%'
								height='100%'
								fontSize='1.2vw'
							/>
						</Link>

						<div className='ml-1 flex-1 flex justify-center peer-hover:[&_path]:fill-primary-light peer-hover:[&_circle]:first-of-type:fill-primary-light peer-hover:[&_circle]:last-of-type:stroke-primary-dark'>
							<svg
								width='36'
								height='44'
								viewBox='0 0 36 44'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M26.0437 26.5821L21.9411 29.2484L29.2486 40.4925C29.9849 41.6254 31.5001 41.947 32.633 41.2107C33.7659 40.4744 34.0874 38.9592 33.3512 37.8263L26.0437 26.5821Z'
									className='stroke-primary-light'
								/>
								<circle
									cx='15.5'
									cy='15.5'
									r='15'
									className='stroke-primary-light'
								/>
								<circle
									cx='15.5'
									cy='15.5'
									r='10'
									className='stroke-primary-light'
								/>
							</svg>
						</div>
					</div>
				</div>

				<Image
					alt=''
					src={gridImg}
					style={{ width: 'auto', height: '100%' }}
					priority
					className='min-h-full absolute top-0 right-0 -z-10'
				/>

				<Glow className='absolute top-[20%] -left-[467px] -z-10' />
			</main>
		</>
	)
}
