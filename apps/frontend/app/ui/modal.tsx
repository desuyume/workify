import ClientPortal from '@/components/ClientPortal'
import { cn } from '@workify/shared'

interface ModalProps {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ isVisible, onClose, children, className }: ModalProps) {
  const handleCloseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    onClose()
  }

  return (
    <ClientPortal selector='modal-root' show={isVisible} onClose={onClose}>
      <div
        className={cn(
          'bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center fixed inset-0 z-50 transition-opacity',
          className,
          {
            'visible opacity-100': isVisible,
            'invisible opacity-0': !isVisible
          }
        )}
        onClick={handleCloseClick}
      >
        {children}
      </div>
    </ClientPortal>
  )
}

export default Modal
