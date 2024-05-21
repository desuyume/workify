import { cn } from '@workify/shared'

interface LoadingProps {
	className?: string
}

export default function Loading({ className }: LoadingProps) {
	return (
		<div
			id='loading'
			className={cn(
				'w-screen h-screen flex flex-col justify-center items-center',
				className
			)}
		>
			<p className='text-primary-light text-4xl underline skip-ink-none animate-pulse'>
				Workify
			</p>
		</div>
	)
}
