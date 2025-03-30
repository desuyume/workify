import { SortBy, cn } from '@workify/shared'

interface SortButtonProps {
  title: string
  sortBy: SortBy
  onClick: (sortOption: SortBy) => void
  className?: string
  isActive?: boolean
}

export default function SortButton({
  title,
  sortBy,
  onClick,
  className,
  isActive
}: SortButtonProps) {
  return (
    <button
      onClick={() => onClick(sortBy)}
      className={cn(
        'w-full border-b border-primary-dark text-primary-dark hover:bg-primary-green transition-colors',
        className,
        {
          'bg-primary-green border-primary-green': isActive
        }
      )}
    >
      {title}
    </button>
  )
}
