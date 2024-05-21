import { cn } from '@workify/shared'

interface EditIconProps {
	className?: string
	onClick?: () => void
	isDisabled?: boolean
}

export default function EditIcon({
	className,
	onClick,
	isDisabled,
}: EditIconProps) {
	return (
		<button
			disabled={isDisabled}
			onClick={onClick}
			className={cn(
				'transition-opacity',
				{
					'hover:[&_path]:first-of-type:fill-[#FEFDF3] opacity-100':
						!isDisabled,
					'opacity-70': isDisabled,
				},
				className
			)}
		>
			<svg
				width='24'
				height='19'
				viewBox='0 0 24 19'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M20.4022 1.02477C20.6152 0.848964 20.9289 0.880216 21.103 1.09457L22.984 3.41063C23.1581 3.62499 23.1266 3.94128 22.9136 4.11708L9.38381 15.2869C9.2935 15.3614 9.18015 15.4017 9.06351 15.4007L6.74473 15.3805C6.43405 15.3778 6.20209 15.0922 6.26075 14.7846L5.77168 14.6906L6.26075 14.7846L6.69855 12.4887C6.72058 12.3732 6.78211 12.2691 6.87241 12.1945L20.4022 1.02477Z'
					stroke='#FEFDF3'
				/>
				<path d='M1 18H12.902' stroke='#FEFDF3' strokeLinecap='round' />
			</svg>
		</button>
	)
}
