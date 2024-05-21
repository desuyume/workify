import { cn } from '@workify/shared'

interface SortIconProps {
	isActive?: boolean
}

export default function SortIcon({ isActive }: SortIconProps) {
	return (
		<div
			className={cn(
				'group-hover:[&_path]:stroke-white group-hover:[&_circle]:stroke-white',
				{
					'[&_path]:stroke-white [&_circle]:stroke-white': isActive,
				}
			)}
		>
			<svg
				width='15'
				height='5'
				viewBox='0 0 15 5'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M1 2.5H10'
					strokeLinecap='round'
					className='stroke-black group-hover:stroke-white'
				/>
				<circle
					cx='12.5'
					cy='2.5'
					r='2'
					className='stroke-black group-hover:stroke-white'
				/>
			</svg>
			<svg
				width='15'
				height='5'
				viewBox='0 0 15 5'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M14 2.5H5'
					strokeLinecap='round'
					className='stroke-black group-hover:stroke-white'
				/>
				<circle
					cx='2.5'
					cy='2.5'
					r='2'
					transform='matrix(-1 0 0 1 5 0)'
					className='stroke-black group-hover:stroke-white'
				/>
			</svg>
		</div>
	)
}
