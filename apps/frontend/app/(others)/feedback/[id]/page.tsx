import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import FeedbackGeneralInfo from '@/components/feedback/feedback-general-info'
import RemoveFeedbackButton from '@/components/feedback/remove-feedback-button'
import { getFeedbackById } from '@/lib/api'
import { Button } from '@workify/ui'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const fetchFeedback = async (id: number) => {
	return await getFeedbackById({ params: { id } })
		.then(res => res.data)
		.catch(e => {
			if (e instanceof AxiosError) {
				if (e.response?.status === 404) {
					return null
				}
			}
			throw e
		})
}

export default async function Page({ params }: { params: { id: number } }) {
	const feedback = await fetchFeedback(params.id)
	const session = await getServerSession(authOptions)

	if (!feedback) {
		notFound()
	}

	const isOwner: boolean = session?.user.id === feedback.customer.id

	return (
		<div className='w-full foreground pt-[1.625rem] pb-10 flex flex-col items-center rounded-[0.625rem]'>
			<h3 className='text-4xl font-normal mb-8'>
				Отзыв на{' '}
				<Link
					className='font-bold text-primary-light hover:text-primary-dark transition-colors'
					href={`/profile/${feedback.executor.login}`}
				>
					{feedback.executor.name || feedback.executor.login}
				</Link>
			</h3>

			<FeedbackGeneralInfo
				avatar={feedback.customer.avatar}
				username={feedback.customer.name || feedback.customer.login}
				login={feedback.customer.login}
				comment={feedback.comment}
				date_created={feedback.date_created}
				rating={feedback.rating}
			/>

			<div className='mb-[2.8125rem] flex justify-center'>
				{feedback.photo && (
					<Image
						src={`${process.env.SERVER_URL}/${feedback.photo}`}
						alt='feedback-image'
						width={313}
						height={193}
						className='w-[313px] h-[193px] object-cover rounded-[0.625rem]'
					/>
				)}
			</div>

			<div className='w-full h-9 flex items-center'>
				<hr className='flex-1 border-t border-t-white rounded-full' />
				<Link
					href={
						isOwner
							? `/profile/${feedback.executor.login}/feedback`
							: `/profile/${feedback.customer.login}`
					}
					className='mx-10 h-full'
				>
					<Button
						title={isOwner ? 'Изменить отзыв' : 'Профиль автора'}
						variant='light-transparent'
						width='15.9375rem'
						height='100%'
					/>
				</Link>
				{isOwner && (
					<>
						<hr className='w-10 border-t border-t-white rounded-full' />
						<RemoveFeedbackButton feedbackId={feedback.id} />
					</>
				)}
				<hr className='flex-1 border-t border-t-white rounded-full' />
			</div>
		</div>
	)
}
