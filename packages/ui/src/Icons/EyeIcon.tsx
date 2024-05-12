import { cn } from '@workify/shared'

interface EyeIconProps {
	className?: string
	onClick?: () => void
	isActive?: boolean
	theme?: 'light' | 'dark'
}

export function EyeIcon({
	className,
	onClick,
	isActive = false,
	theme = 'light',
}: EyeIconProps) {
	return (
		<button type='button' onClick={onClick} className={className}>
			<svg
				width='15'
				height='9'
				viewBox='0 0 15 9'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M13.4929 4.10291C8.73278 -1.25166 3.92991 1.39528 1.52185 4.07605C1.20384 4.43009 1.22364 4.96737 1.55914 5.30487C5.93675 9.70868 10.9546 7.98725 13.4893 5.3013C13.806 4.96576 13.7995 4.44771 13.4929 4.10291Z'
					stroke={theme === 'light' ? 'white' : 'black'}
					strokeLinecap='round'
					className={cn({
						'fill-white': isActive && theme === 'light',
						'fill-black': isActive && theme === 'dark',
					})}
				/>
				<circle cx='7.5' cy='4.5' r='2.5' fill={theme === 'light' ? 'white' : 'black'} />
			</svg>
		</button>
	)
}
