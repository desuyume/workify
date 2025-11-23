import Stars from '@/app/ui/stars'
import { Rating, formatDate } from '@workify/shared'
import Image from 'next/image'
import defaultProfileImg from '@/public/images/default-profile-pic.webp'
import Link from 'next/link'

interface FeedbackGeneralInfoProps {
  avatar: string | null
  username: string
  login: string
  rating: Rating
  date_created: string
  comment: string
}

export default function FeedbackGeneralInfo({
  avatar,
  username,
  login,
  rating,
  date_created,
  comment
}: FeedbackGeneralInfoProps) {
  return (
    <div className='w-[60.9375rem] h-[27.375rem] p-5 bg-primary-dark rounded-[0.625rem] flex flex-col mb-8'>
      <div className='w-full h-[89px] flex justify-between mb-[1.875rem]'>
        <div className='flex'>
          <Link href={`/profile/${login}`} className='mr-6'>
            <Image
              src={!!avatar ? `${process.env.BACKEND_URL}/${avatar}` : defaultProfileImg}
              alt='profile-image'
              width={89}
              height={89}
              className='w-[89px] h-[89px] object-cover rounded-[0.3125rem]'
            />
          </Link>

          <div className='h-full foreground rounded-[0.3125rem] flex justify-center items-center max-w-[22.5rem] overflow-y-hidden mr-[5.9375rem] px-4'>
            <Link href={`/profile/${login}`}>
              <p className='font-santello text-xl text-primary-light text-center max-w-full break-words'>
                {username}
              </p>
            </Link>
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
        <p className='font-light text-[0.9375rem] leading-[1.125rem] break-words whitespace-pre-wrap'>
          {comment}
        </p>
      </div>
    </div>
  )
}
