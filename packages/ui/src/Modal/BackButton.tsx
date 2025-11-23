import { cn } from '@workify/shared'

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function BackButton({ className, ...props }: BackButtonProps) {
  return (
    <button
      className={cn(
        'w-[2.625rem] h-[2.625rem] bg-primary-dark border-2 border-primary-dark hover:bg-primary-light rounded-full cursor-pointer transition-colors flex flex-col justify-center items-center group pr-0.5',
        className
      )}
      onClick={props.onClick}
    >
      <svg
        className='absolute top-[0.6rem] group-hover:[&_path]:stroke-primary-dark'
        fill='none'
        height='10'
        viewBox='0 0 17 10'
        width='17'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className='stroke-primary-light'
          d='M2 9L15 1'
          strokeLinecap='round'
          strokeWidth='2'
        />
      </svg>
      <svg
        className='absolute bottom-[0.6rem] group-hover:[&_path]:stroke-primary-dark'
        fill='none'
        height='10'
        viewBox='0 0 17 10'
        width='17'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className='stroke-primary-light'
          d='M2 1L15 9'
          strokeLinecap='round'
          strokeWidth='2'
        />
      </svg>
    </button>
  )
}
