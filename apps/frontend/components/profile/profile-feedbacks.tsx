import FeedbackStars from './feedback-stars'
import Feedback from './feedback'
import { Button } from '@workify/ui'

export default function ProfileFeedbacks() {
	return (
		<div className={'w-[60.5rem] pb-[3.75rem] transition-all flex flex-col'}>
			<div className='w-full flex flex-col mb-[3.4375rem]'>
				<FeedbackStars starsCount={5} reviewsCount={15} />
				<FeedbackStars starsCount={4} reviewsCount={2} />
				<FeedbackStars starsCount={3} reviewsCount={0} />
				<FeedbackStars starsCount={2} reviewsCount={0} />
				<FeedbackStars starsCount={1} reviewsCount={0} />
			</div>

			<div className='w-full flex items-center mb-[4.0625rem]'>
				<p className='text-xl font-medium mr-[0.8125rem]'>Сортировать по:</p>
				<select className='text-primary-dark bg-primary-light h-[1.5625rem] pl-[0.9375rem] pb-[2px] rounded-[0.78125rem] outline-none cursor-pointer'>
					<option>Дате</option>
					<option>Рейтингу</option>
				</select>
			</div>

			<div className='w-full flex flex-wrap justify-between gap-[3.125rem] mb-[6.125rem]'>
				<Feedback />
				<Feedback />
				<Feedback withImage={false} />
				<Feedback withImage={false} />
			</div>

			<Button
				title='Показать еще отзывы'
				variant='light-transparent'
				width='16.4375rem'
				height='2.25rem'
				className='self-center'
			/>
		</div>
	)
}
