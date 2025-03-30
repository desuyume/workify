import { Rating, cn } from '@workify/shared'
import StarIcon from './icons/StarIcon'

interface StarsProps {
  rating: Rating
  className?: string
}

export default function Stars({ rating, className }: StarsProps) {
  return (
    <div className={cn('w-[6.25rem] h-[1.25rem] flex', className)}>
      {[...Array(rating)].map((_, index) => (
        <StarIcon key={index} isFilled />
      ))}
      {[...Array(5 - rating)].map((_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
  )
}
