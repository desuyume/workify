import { cn } from '@workify/shared'

interface BackButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
}

export function BackButton({ className, ...props }: BackButtonProps) {
	return (
		<button
			onClick={props.onClick}
			className={cn(
				'w-[2.625rem] h-[2.625rem] bg-primary-dark border-2 border-primary-dark hover:bg-primary-light rounded-full cursor-pointer transition-colors flex flex-col justify-center items-center group pr-0.5',
				className
			)}
		>
			<svg
				width='17'
				height='10'
				viewBox='0 0 17 10'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute top-[0.6rem] group-hover:[&_path]:stroke-primary-dark'
			>
				<path
					d='M2 9L15 1'
					strokeWidth='2'
					strokeLinecap='round'
					className='stroke-primary-light'
				/>
			</svg>
			<svg
				width='17'
				height='10'
				viewBox='0 0 17 10'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute bottom-[0.6rem] group-hover:[&_path]:stroke-primary-dark'
			>
				<path
					d='M2 1L15 9'
					strokeWidth='2'
					strokeLinecap='round'
					className='stroke-primary-light'
				/>
			</svg>
		</button>
	)
}
