import FeedbackStars from './feedback-stars'
import Feedback from './feedback'
import { Button } from '@workify/ui'
import { useEffect, useState } from 'react'
import { IFeedback, IFeedbackRating } from '@workify/shared'
import type { FeedbackSortBy } from '@workify/shared'
import { getExecutorFeedbacks, getExecutorRating } from '@/lib/api'

interface ProfileFeedbacksProps {
	userLogin: string
}

export default function ProfileFeedbacks({ userLogin }: ProfileFeedbacksProps) {
	const [sortBy, setSortBy] = useState<FeedbackSortBy>('date')
	const [isFeedbacksLoading, setIsFeedbackLoading] = useState<boolean>(true)
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
	const [totalCount, setTotalCount] = useState<number>(0)
	const [rating, setRating] = useState<IFeedbackRating>({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	})

	const fetchFeedbacks = async () => {
		setIsFeedbackLoading(true)
		getExecutorFeedbacks({
			params: { executorLogin: userLogin, query: { sortBy, take: 4 } },
		})
			.then(res => {
				setFeedbacks(res.data.feedbacks)
				setTotalCount(res.data.count)
			})
			.finally(() => setIsFeedbackLoading(false))
	}

	const fetchRating = async () => {
		getExecutorRating({
			params: { executorLogin: userLogin },
		}).then(res => {
			setRating(res.data)
		})
	}

	const handleClickShowMore = () => {
		getExecutorFeedbacks({
			params: {
				executorLogin: userLogin,
				query: { sortBy, take: 4, skip: feedbacks.length },
			},
		}).then(res => {
			setFeedbacks([...feedbacks, ...res.data.feedbacks])
			setTotalCount(res.data.count)
		})
	}

	const handleClickHideMore = () => {
		setFeedbacks(feedbacks.slice(0, 4))
	}

	useEffect(() => {
		fetchRating()
	}, [])

	useEffect(() => {
		fetchFeedbacks()
	}, [sortBy])

	return (
		<div className={'w-[60.5rem] pb-[3.75rem] transition-all flex flex-col'}>
			<div className='w-full flex flex-col mb-[3.4375rem]'>
				<>
					<FeedbackStars starsCount={5} reviewsCount={rating[5]} />
					<FeedbackStars starsCount={4} reviewsCount={rating[4]} />
					<FeedbackStars starsCount={3} reviewsCount={rating[3]} />
					<FeedbackStars starsCount={2} reviewsCount={rating[2]} />
					<FeedbackStars starsCount={1} reviewsCount={rating[1]} />
				</>
			</div>

			<div className='w-full flex items-center mb-[4.0625rem]'>
				<p className='text-xl font-medium mr-[0.8125rem]'>Сортировать по:</p>
				<select
					defaultValue={sortBy}
					onChange={e => setSortBy(e.target.value as FeedbackSortBy)}
					className='text-primary-dark bg-primary-light h-[1.5625rem] pl-[0.9375rem] pb-[2px] rounded-[0.78125rem] outline-none cursor-pointer'
				>
					<option value='date'>Дате</option>
					<option value='rating'>Рейтингу</option>
				</select>
			</div>

			<div className='w-full flex flex-wrap justify-between gap-[3.125rem] mb-[6.125rem] relative'>
				{isFeedbacksLoading ? (
					<div className='w-full h-full flex justify-center items-center absolute inset-0'>
						<p className='text-xl text-primary-light'>Загрузка...</p>
					</div>
				) : !feedbacks.length ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primary-light text-xl'>Отзывов нет</p>
					</div>
				) : (
					<>
						{feedbacks.map(feedback => (
							<Feedback key={feedback.id} feedback={feedback} />
						))}
					</>
				)}
			</div>

			<div className='flex justify-center'>
				{feedbacks.length > 4 && (
					<Button
						title='Скрыть'
						variant='dark-transparent'
						width='16.4375rem'
						height='2.25rem'
						className='self-center mr-4'
						onClick={handleClickHideMore}
					/>
				)}
				{totalCount > 4 && feedbacks.length < totalCount && (
					<Button
						title='Показать еще'
						variant='light-transparent'
						width='16.4375rem'
						height='2.25rem'
						className='self-center mr-0'
						onClick={handleClickShowMore}
					/>
				)}
			</div>
		</div>
	)
}
