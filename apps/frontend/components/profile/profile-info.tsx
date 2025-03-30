import { cn } from '@workify/shared'

interface ProfileInfoProps {
  title: string
  value: string | null
  className?: string
}

export default function ProfileInfo({ title, value, className }: ProfileInfoProps) {
  return (
    <div className={cn('min-w-[10.625rem] max-w-[10.625rem] mr-24 last-of-type:mr-0', className)}>
      <p className='font-medium text-[1.25rem] leading-[1.5rem] mb-2.5'>{title}</p>
      <p className='font-light text-lg leading-[1.375rem] break-words line-clamp-3'>
        {value ?? 'не указано'}
      </p>
    </div>
  )
}
