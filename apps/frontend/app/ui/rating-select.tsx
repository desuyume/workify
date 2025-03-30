import { Rating, cn } from '@workify/shared'
import { Button } from '@workify/ui'

function RatingButton({
  buttonRating,
  rating,
  setRating
}: {
  buttonRating: Rating
  rating: Rating
  setRating: (rating: Rating) => void
}) {
  return (
    <Button
      title={buttonRating.toString()}
      onClick={() => setRating(buttonRating)}
      variant='dark-transparent'
      width='2.5rem'
      height='2.5rem'
      fontSize='1.5rem'
      borderRadius='0.3125rem'
      className={cn(
        'disabled:hover:bg-primary-light',
        buttonRating === rating ? 'bg-primary-light text-primary-dark' : ''
      )}
      disabled={buttonRating === rating}
    />
  )
}

interface RatingSelectProps {
  rating: Rating
  setRating: (rating: Rating) => void
}

export default function RatingSelect({ rating, setRating }: RatingSelectProps) {
  return (
    <div className='flex'>
      <RatingButton buttonRating={Rating.one} rating={rating} setRating={setRating} />
      <RatingButton buttonRating={Rating.two} rating={rating} setRating={setRating} />
      <RatingButton buttonRating={Rating.three} rating={rating} setRating={setRating} />
      <RatingButton buttonRating={Rating.four} rating={rating} setRating={setRating} />
      <RatingButton buttonRating={Rating.five} rating={rating} setRating={setRating} />
    </div>
  )
}
