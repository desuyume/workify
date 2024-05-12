import Link from 'next/link'
import ArrowIcon from './icons/ArrowIcon'
import { cn } from '@workify/shared'

export function PaginationButtonLeft({
	href,
	isDisabled,
}: {
	href: string
	isDisabled?: boolean
}) {
	const className =
		'size-[3.125rem] border border-primary-light bg-transparent rounded-[0.625rem] flex justify-center items-center mr-[2.1875rem]'

	return isDisabled ? (
		<div className={cn(className, 'opacity-50')}>
			<ArrowIcon variant='light' direction='left' />
		</div>
	) : (
		<Link
			href={href}
			className={cn(
				className,
				'hover:bg-primary-light transition-colors group'
			)}
		>
			<ArrowIcon variant='light' direction='left' />
		</Link>
	)
}

export function PaginationButtonRight({
	href,
	isDisabled,
}: {
	href: string
	isDisabled?: boolean
}) {
	const className =
		'bg-primary-light border border-primary-light w-[9.375rem] h-[3.125rem] rounded-[0.625rem] flex justify-center items-center ml-[2.1875rem]'

	return isDisabled ? (
		<div className={cn(className, 'opacity-50')}>
			<p className='text-[1.25rem] text-primary-dark group-hover:text-primary-light transition-colors mr-5'>
				Далее
			</p>
			<ArrowIcon variant='dark' direction='right' />
		</div>
	) : (
		<Link
			href={href}
			className={cn(className, 'hover:bg-transparent transition-colors group')}
		>
			<p className='text-[1.25rem] text-primary-dark group-hover:text-primary-light transition-colors mr-5'>
				Далее
			</p>
			<ArrowIcon variant='dark' direction='right' />
		</Link>
	)
}
