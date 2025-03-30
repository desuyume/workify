import Image from 'next/image'
import defaultProfileImg from '@/public/images/default-profile-pic.webp'
import Stars from '@/app/ui/stars'
import { IFeedback, formatDate } from '@workify/shared'
import Link from 'next/link'

interface FeedbackProps {
  feedback: IFeedback
}

export default function Feedback({ feedback }: FeedbackProps) {
  return (
    <div className='w-[26.9375rem] flex flex-col'>
      <div className='flex mb-[1.4375rem]'>
        <Link className='mr-6' href={`/profile/${feedback.customer.login}`}>
          <Image
            src={
              !!feedback.customer.avatar
                ? `${process.env.SERVER_URL}/${feedback.customer.avatar}`
                : defaultProfileImg
            }
            alt='profile-image'
            width={89}
            height={89}
            className='w-[89px] h-[89px] object-cover rounded-[0.3125rem]'
          />
        </Link>

        <div className='flex flex-col justify-between items-start'>
          <Link className='text-lg leading-[1.375rem]' href={`/profile/${feedback.customer.login}`}>
            {feedback.customer.name ?? feedback.customer.login}
          </Link>

          <Stars rating={feedback.rating} />
          <p className='text-lg leading-[1.375rem]'>
            {formatDate(new Date(feedback.date_created))}
          </p>
        </div>
      </div>
      <div className='mb-[0.8125rem]'>
        <p className='text-[1.25rem] leading-6 font-medium mb-[1.1875rem]'>Комментарий</p>
        <p className='font-light text-[0.9375rem] leading-[1.125rem] line-clamp-[7] break-words whitespace-pre-wrap'>
          {feedback.comment}
        </p>
      </div>
      <Link
        href={`/feedback/${feedback.id}`}
        className='font-medium text-[0.9375rem] leading-[1.125rem] underline skip-ink-none self-end'
      >
        Читать еще
      </Link>
      {feedback.photo && (
        <Image
          src={`${process.env.SERVER_URL}/${feedback.photo}`}
          alt='feedback-image'
          width={313}
          height={193}
          className='w-[313px] h-[193px] object-cover rounded-[0.625rem]'
        />
      )}

      <hr className='mt-[0.9375rem]' />
    </div>
  )
}
