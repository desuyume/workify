import { cn } from '@workify/shared'

interface StatisticProps {
	width: string
	statNumber: string
	title: string
	isTwoLine?: boolean
	className?: string
}

export default function Statistic({
	width,
	statNumber,
	title,
	isTwoLine,
	className,
}: StatisticProps) {
	return (
		<div style={{ width }} className={cn('flex flex-col', className, {
			'h-[9.9375rem]': isTwoLine,
			'h-[7.5rem]': !isTwoLine,
		})}>
			<div
				className={cn('flex', {
					'mb-2.5': isTwoLine,
				})}
			>
				<p className='w-[9.6875rem] text-[4.6875rem] leading-[5.6875rem] font-semibold mr-[2.125rem]'>
					{statNumber}
				</p>
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
