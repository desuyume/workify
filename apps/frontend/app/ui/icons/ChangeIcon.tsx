import { cn } from '@workify/shared'

interface ChangeIconProps {
	isColored?: boolean
	withInputFile?: boolean
	className?: string
}

export default function ChangeIcon({
	isColored = false,
	withInputFile = false,
	className,
}: ChangeIconProps) {
	return (
		<div
			className={cn(
				'size-[3.4375rem] rounded-full border border-primary-light flex justify-center items-center cursor-pointer transition-colors relative',
				className,
				{
					'bg-[#302A2A] bg-opacity-70 hover:bg-opacity-90': !isColored,
					'bg-[#99C86A] bg-opacity-20 hover:bg-opacity-60': isColored,
				}
			)}
		>
			<svg
				width='27'
				height='52'
				viewBox='0 0 27 52'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M0.944359 18.327L1.10944 18.0944C7.19612 9.52149 19.9635 9.6413 25.8882 18.327V18.327M25.8882 18.327L25.8882 12.4444M25.8882 18.327L20.2222 18.327'
					stroke='#FEFDF3'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M25.8401 33.6152L25.6714 33.8451C19.4511 42.3216 6.68714 42.0016 0.899321 33.2242V33.2242M0.899321 33.2242L0.807102 39.106M0.899321 33.2242L6.56464 33.313'
					stroke='#FEFDF3'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>

			{withInputFile && (
				<input
					accept='image/*'
					type='file'
					title=''
					className='outline-none absolute inset-0 opacity-0 w-full h-full cursor-pointer'
				/>
			)}
		</div>
	)
}
