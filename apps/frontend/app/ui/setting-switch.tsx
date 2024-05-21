import { cn } from '@workify/shared'
import ToggleSwitch from './toggle-switch'

interface SettingSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string
	width?: string
	switchId: string
	isChecked?: boolean
	className?: string
}

export default function SettingSwitch({
	title,
	width = '26.875rem',
	switchId,
	isChecked = false,
	className,
	...props
}: SettingSwitchProps) {
	return (
		<div
			style={{ width }}
			className={cn(
				'h-10 flex justify-between items-center pl-3 pr-2.5 foreground rounded-[0.3125rem]',
				className
			)}
		>
			<p className='font-light text-lg text-primary-light'>{title}</p>
			<ToggleSwitch id={switchId} isChecked={isChecked} {...props} />
		</div>
	)
}
