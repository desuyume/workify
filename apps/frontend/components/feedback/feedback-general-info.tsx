import Stars from '@/app/ui/stars'
import { Rating, formatDate } from '@workify/shared'
import parse from 'html-react-parser'
import Image from 'next/image'
import defaultProfileImg from '@/public/images/default-profile-pic.webp'

interface FeedbackGeneralInfoProps {
	avatar: string | null
	username: string
	rating: Rating
	date_created: string
	comment: string
}

export default function FeedbackGeneralInfo({
	avatar,
	username,
	rating,
	date_created,
	comment,
}: FeedbackGeneralInfoProps) {
	return (
		<div className='w-[60.9375rem] h-[27.375rem] p-5 bg-primary-dark rounded-[0.625rem] flex flex-col mb-8'>
			<div className='w-full h-[89px] flex justify-between mb-[1.875rem]'>
				<div className='flex'>
					<Image
						src={
							!!avatar
								? `${process.env.SERVER_URL}/${avatar}`
								: defaultProfileImg
						}
						alt='profile-image'
						width={89}
						height={89}
						className='w-[89px] h-[89px] object-cover rounded-[0.3125rem] mr-6'
					/>
					<div className='h-full foreground rounded-[0.3125rem] flex justify-center items-center max-w-[22.5rem] overflow-y-hidden mr-[5.9375rem]'>
						<p className='font-santello text-xl text-primary-light text-center px-4 max-w-full break-words'>
							{username}
						</p>
					</div>
					<div className='w-[10.9375rem] h-full foreground rounded-[0.3125rem] flex justify-center items-center'>
						<Stars rating={rating} />
					</div>
				</div>

				<div className='h-full foreground rounded-[0.3125rem] flex justify-center items-center self-end'>
					<p className='font-montserrat font-light text-xl text-primary-light px-4'>
						{formatDate(new Date(date_created))}
					</p>
				</div>
			</div>

			<div className='w-full flex-1 overflow-y-auto foreground rounded-[0.3125rem] py-5 px-7'>
				<p className='font-light text-[0.9375rem] leading-[1.125rem] break-words'>
					{parse(comment)}
				</p>
			</div>
		</div>
	)
}
