import { cn } from '@workify/shared'

export function Glow({
  width = '35.125rem',
  blur = '409.20001220703125px',
  className
}: {
  width?: string
  blur?: string
  className?: string
}) {
  return (
    <div
      className={cn('aspect-square bg-primary-light rounded-full', className)}
      style={{ width, filter: `blur(${blur})` }}
    />
  )
}
