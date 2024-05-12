import { cn } from '@workify/shared'

interface AuthModalProps {
	isVisible: boolean
	onClose: () => void
	children: React.ReactNode
}

export function AuthModal({ isVisible, onClose, children }: AuthModalProps) {
	const handleCloseClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.preventDefault()
		onClose()
	}

	return (
		<div
			className={cn(
				'bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center fixed inset-0 z-50 transition-opacity',
				{
					'visible opacity-100': isVisible,
					'invisible opacity-0': !isVisible,
				}
			)}
			onClick={handleCloseClick}
		>
			{children}
		</div>
	)
}

export default AuthModal
