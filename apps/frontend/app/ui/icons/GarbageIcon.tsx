import { cn } from '@workify/shared'

interface GarbageIconProps {
	isColored?: boolean
	className?: string
	onClick?: () => void
}

export default function GarbageIcon({
	isColored = false,
	className,
	onClick,
}: GarbageIconProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'size-[3.4375rem] rounded-full border border-primary-light flex justify-center items-center pl-1 cursor-pointer transition-all relative',
				className,
				{
					'bg-[#302A2A] bg-opacity-70 hover:bg-opacity-90': !isColored,
					'bg-[#5C1919] bg-opacity-50 hover:bg-opacity-90': isColored,
				}
			)}
		>
			<svg
				width='30'
				height='36'
				viewBox='0 0 30 36'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M19.1877 32.7639L6.9447 32.7639C6.45836 32.7639 6.04255 32.414 5.95942 31.9348L1.47642 6.09384C1.37034 5.48235 1.84108 4.92291 2.46171 4.92291L23.6707 4.92288C24.2913 4.92288 24.7621 5.48232 24.656 6.09381L20.173 31.9348C20.0899 32.414 19.674 32.7639 19.1877 32.7639Z'
					stroke='#FEFDF3'
				/>
				<path
					d='M9.22229 13.2227L17.7778 21.7782'
					stroke='#FEFDF3'
					strokeLinecap='round'
				/>
				<path
					d='M17.7778 13.2227L9.22228 21.7782'
					stroke='#FEFDF3'
					strokeLinecap='round'
				/>
			</svg>
		</button>
	)
}
