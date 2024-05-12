import StarIcon from '@/app/ui/icons/StarIcon'

interface FeedbackStarsProps {
	starsCount: 1 | 2 | 3 | 4 | 5
	reviewsCount: number
}

export default function FeedbackStars({
	starsCount,
	reviewsCount,
}: FeedbackStarsProps) {
	return (
		<div className='w-full flex items-end mb-[0.3125rem] last-of-type:mb-0'>
			<div className='flex h-5'>
				{[...Array(starsCount)].map((_, index) => (
					<StarIcon key={index} isFilled />
				))}
			</div>
			<hr className='flex-1 border-t border-t-white rounded-full mr-[0.625rem]' />
			<p className='font-light text-lg leading-[1.375rem]'>
				{reviewsCount} отзывов
			</p>
		</div>
	)
}
