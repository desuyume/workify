import { cn } from '@workify/shared'
import { NavButton } from '@workify/ui'
import Link from 'next/link'

interface SettingsNavProps {
	activeSection: 'profile' | 'security' | 'notifications'
	className?: string
}

export default function SettingsNav({
	activeSection,
	className,
}: SettingsNavProps) {
	return (
		<nav
			className={cn(
				'w-[37.5625rem] h-[4.125rem] bg-primary-dark rounded-b-[0.625rem] flex justify-between items-end px-[0.9375rem] pb-[0.875rem]',
				className
			)}
		>
			<Link href='/settings/profile'>
				<NavButton title='Профиль' isActive={activeSection === 'profile'} />
			</Link>
			<Link href={'/settings/security'}>
				<NavButton
					title='Безопасность'
					isActive={activeSection === 'security'}
				/>
			</Link>
			<Link href={'/settings/notifications'}>
				<NavButton
					title='Уведомления'
					isActive={activeSection === 'notifications'}
				/>
			</Link>
		</nav>
	)
}
