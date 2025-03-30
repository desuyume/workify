import { cn } from '@workify/shared'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'dark' | 'light' | 'light-transparent' | 'dark-transparent' | 'transparent-light'
  title: string
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: '300' | '400' | '500' | '600' | '700'
  borderRadius?: string
}

export function Button({
  variant,
  title,
  className,
  width = '29.375rem',
  height = '4.5rem',
  fontSize = '2rem',
  fontWeight = '400',
  borderRadius = '4.90625rem',
  ...props
}: ButtonProps) {
  switch (variant) {
    case 'dark':
      return (
        <button
          {...props}
          style={{ width, height, fontSize, fontWeight, borderRadius }}
          className={cn(
            'font-montserrat text-primary-light bg-primary-dark border border-primary-light hover:bg-primary-light hover:text-primary-dark hover:border-primary-dark transition-colors',
            className
          )}
        >
          {title}
        </button>
      )
    case 'light':
      return (
        <button
          {...props}
          style={{ width, height, fontSize, fontWeight, borderRadius }}
          className={cn(
            'font-montserrat text-primary-dark bg-primary-light border border-primary-dark hover:bg-primary-dark hover:text-primary-light hover:border-primary-light transition-colors',
            className
          )}
        >
          {title}
        </button>
      )
    case 'light-transparent':
      return (
        <button
          {...props}
          style={{ width, height }}
          className={cn(
            'text-xl font-medium text-primary-dark bg-primary-light border border-primary-light hover:bg-transparent hover:text-primary-light rounded-[0.625rem] transition-colors',
            className
          )}
        >
          {title}
        </button>
      )
    case 'dark-transparent':
      return (
        <button
          {...props}
          style={{ width, height }}
          className={cn(
            'text-xl font-medium text-primary-light bg-primary-dark border border-primary-dark hover:bg-transparent hover:border-primary-light rounded-[0.625rem] transition-colors',
            className
          )}
        >
          {title}
        </button>
      )
    case 'transparent-light':
      return (
        <button
          {...props}
          style={{ width, height }}
          className={cn(
            'text-xl font-medium text-primary-light bg-transparent border border-primary-light hover:bg-primary-light hover:text-primary-dark rounded-[0.625rem] transition-colors',
            className
          )}
        >
          {title}
        </button>
      )
    default:
      return
  }
}
