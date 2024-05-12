import { cn } from '@workify/shared'

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
	title: string
}

export function NavButton({
	isActive = false,
	title,
	className,
	...props
}: NavButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				'font-montserrat font-medium text-xl rounded-[0.625rem] w-[11.0625rem] h-9 transition-colors',
				className,
				{
					'text-primary-dark bg-primary-light cursor-default': isActive,
					isActive,
					'text-primary-light bg-transparent hover:bg-primary-light hover:text-primary-dark':
						!isActive,
				}
			)}
		>
			{title}
		</button>
	)
}
