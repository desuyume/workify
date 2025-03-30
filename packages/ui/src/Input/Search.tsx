import { cn } from '@workify/shared'

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Search({ name, type, placeholder, className, ...props }: SearchProps) {
  return (
    <input
      {...props}
      type={type ?? 'text'}
      name={name}
      placeholder={placeholder}
      className={cn(
        'w-[29.0625rem] h-9 bg-transparent text-primary-light placeholder:text-primary-light placeholder:text-opacity-80 outline-none border border-primary-light rounded-[0.5625rem] pl-[0.9375rem] text-xl',
        className
      )}
    />
  )
}
