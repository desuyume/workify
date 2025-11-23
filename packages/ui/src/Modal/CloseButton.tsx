import { cn } from '@workify/shared'

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <button
      className={cn(
        'w-[2.625rem] h-[2.625rem] text-primary-light bg-primary-dark border-2 border-primary-dark hover:text-primary-dark hover:bg-primary-light rounded-full cursor-pointer transition-colors group',
        className
      )}
      onClick={props.onClick}
    >
      <div className='w-full h-full relative flex justify-center items-center'>
        <svg
          className='absolute group-hover:[&_path]:stroke-primary-dark'
          fill='none'
          height='16'
          viewBox='0 0 16 16'
          width='16'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            className='stroke-primary-light'
            d='M14.3911 1.11391L0.999805 14.8861'
            strokeLinecap='round'
            strokeWidth='2'
          />
        </svg>
        <svg
          className='absolute group-hover:[&_path]:stroke-primary-dark'
          fill='none'
          height='16'
          viewBox='0 0 17 16'
          width='17'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            className='stroke-primary-light'
            d='M1.8042 1.11391L15.1955 14.8861'
            strokeLinecap='round'
            strokeWidth='2'
          />
        </svg>
      </div>
    </button>
  )
}
