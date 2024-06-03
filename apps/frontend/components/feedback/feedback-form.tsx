'use client'

import { Button, Textarea } from '@workify/ui'
import { Rating, cn } from '@workify/shared'
import { useState } from 'react'
import FeedbackPhoto from './feedback-photo'
import RatingSelect from '@/app/ui/rating-select'
import { createFeedback } from '@/lib/api'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

interface FeedbackFormProps {
	executorLogin: string
}

export default function FeedbackForm({ executorLogin }: FeedbackFormProps) {
	const [comment, setComment] = useState<string>('')
	const [photo, setPhoto] = useState<string | File | null>(null)
	const [rating, setRating] = useState<Rating>(1)
	const router = useRouter()

	const handleSend = () => {
		if (comment.length > 1500) {
			toast.error('Комментарий не должен превышать 1500 символов')
			return
		}

		const feedbackData = new FormData()
		feedbackData.append('comment', comment)
		feedbackData.append('rating', `${rating}`)
		if (photo) {
			feedbackData.append('photo', photo)
		}

		createFeedback({ params: { executorLogin, data: feedbackData } })
			.then(() => {
				toast.success('Отзыв успешно отправлен')
				router.push(`/profile/${executorLogin}`)
				clearFields()
			})
			.catch(err => {
				if (err instanceof AxiosError) {
					toast.error(err.response?.data.message)
				}
			})
	}

	const clearFields = () => {
		setComment('')
		setPhoto(null)
		setRating(1)
	}

	return (
		<div
			className={cn(
				'w-[58.8125rem] h-[50rem] bg-primary-dark rounded-[0.625rem] py-5 px-10 flex flex-col justify-between'
			)}
		>
			<div className='w-full h-[23.25rem] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Отзыв
				</p>
				<Textarea
					textareaHeight='23.25rem'
					className='pl-5 flex-1'
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
			</div>

			<div className='w-full h-10 flex items-center'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>
					Рейтинг
				</p>
				<RatingSelect rating={rating} setRating={setRating} />
			</div>

			<div className='w-full h-[193px] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Фото
				</p>
				<div
					className={cn(
						'w-[313px] h-full foreground rounded-[0.3125rem] flex justify-center items-center relative transition-opacity group',
						{
							'hover:opacity-80': !photo,
						}
					)}
				>
					<FeedbackPhoto photo={photo} setPhoto={setPhoto} />
				</div>
			</div>

			<div className='w-full flex justify-center'>
				<Button
					title='Отправить'
					variant='light-transparent'
					width='12rem'
					height='3rem'
					onClick={handleSend}
				/>
			</div>
		</div>
	)
}
