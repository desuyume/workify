import Image from 'next/image'
import reviewImg from '@/public/images/review-image.png'
import profileImg from '@/public/images/review-profile.png'
import Stars from '@/app/ui/stars'

interface FeedbackProps {
	withImage?: boolean
}

export default function Feedback({ withImage = true }: FeedbackProps) {
	return (
		<div className='w-[26.9375rem] flex flex-col'>
			<div className='flex mb-[1.4375rem]'>
				<Image
					src={profileImg}
					alt='profile-image'
					width={89}
					height={89}
					className='rounded-[0.3125rem] mr-6'
				/>
				<div className='flex flex-col justify-between'>
					<p className='text-lg leading-[1.375rem]'>Артемий Якушев</p>
					<Stars rating={5} />
					<p className='text-lg leading-[1.375rem]'>01.05.2024</p>
				</div>
			</div>
			<div className='mb-[0.8125rem]'>
				<p className='text-[1.25rem] leading-6 font-medium mb-[1.1875rem]'>
					Комментарий
				</p>
				<p className='font-light text-[0.9375rem] leading-[1.125rem] line-clamp-[7]'>
					Я хотел бы выразить огромную благодарность] за невероятную работу! Это
					был мой первый опыт получения татуировки, и я был немного взволнован,
					но мастер сделал процесс очень комфортным и приятным.
					<br /> С самого начала он проявил внимательное отношение к моим
					пожеланиям. Он внимательно выслушал мои пававыав ыывааыв авываыаываыв
					ываыав ыва ываав ы аыв
				</p>
			</div>
			<button className='font-medium text-[0.9375rem] leading-[1.125rem] underline skip-ink-none self-end'>
				Читать еще
			</button>
			{withImage && (
				<Image
					src={reviewImg}
					alt='review-image'
					width={313}
					height={193}
					className='rounded-[0.625rem]'
				/>
			)}

			<hr className='mt-[0.9375rem]' />
		</div>
	)
}
