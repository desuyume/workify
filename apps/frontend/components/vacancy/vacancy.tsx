import Image from 'next/image'
import Stars from '@/app/ui/stars'
import { IUserVacancy, cn, formatMoney } from '@workify/shared'
import Link from 'next/link'
import defaultProfilePic from '@/public/images/default-profile-pic.webp'

interface VacancyProps {
  vacancy: IUserVacancy
  inProfile?: boolean
}

export default function Vacancy({ vacancy, inProfile = false }: VacancyProps) {
  return (
    <div
      className={cn('w-full rounded-[0.3125rem] last-of-type:mb-0', {
        'bg-primary-dark h-[18.25rem] pt-[1.5625rem] pl-[3.8125rem] pb-6 pr-[3.9375rem] mb-[1.1875rem]':
          inProfile,
        'foreground flex items-center border-white border-t border-l h-[16.5rem] p-[0.625rem] mb-[1.5625rem]':
          !inProfile
      })}
    >
      {!inProfile && (
        <Link className='mr-[1.875rem]' href={`/profile/${vacancy.user.login}`}>
          <Image
            src={!!vacancy.user.avatar ? vacancy.user.avatar : defaultProfilePic}
            alt='profile-img'
            width={201}
            height={244}
            className='min-w-[201px] max-w-[201px] h-[244px] object-cover rounded-tl-[0.3125rem] rounded-b-[0.3125rem] rounded-tr-[5rem]'
          />
        </Link>
      )}

      <div className='w-full h-full flex flex-col'>
        <div className='w-full h-[1.5625rem] flex items-center pr-[0.9375rem] mb-[1.0625rem]'>
          <p className='text-xl font-santello max-w-[20rem] truncate'>{vacancy.title}</p>
          <hr className='w-[5.3125rem] border-t border-t-white rounded-full mx-[0.625rem] mt-[0.125rem]' />
          <Stars rating={Math.round(vacancy.rating)} />
          <hr className='flex-1 border-t border-t-white rounded-full mx-[0.625rem] mt-[0.125rem]' />
          <p className='text-xl font-light text-right'>{vacancy.category?.title.toLowerCase()}</p>
        </div>

        <div className='w-full flex-1 flex'>
          <div
            className={cn('h-full flex flex-col justify-between flex-1', {
              'pt-[0.8125rem]': inProfile,
              'pt-[0.6875rem]': !inProfile
            })}
          >
            <p
              className={cn(
                'text-[0.9375rem] leading-[1.1328125rem] font-light text-opacity-70 max-w-[35.875rem] line-clamp-[8] break-words whitespace-pre-wrap',
                {
                  'ml-[8.0625rem]': inProfile,
                  'ml-[6.0625rem]': !inProfile
                }
              )}
            >
              {vacancy.description}
            </p>
            <div
              className={cn('w-full h-[1.125rem] flex items-center pl-[0.1875rem]', {
                'pr-[7.8125rem]': inProfile,
                'pr-[0.625rem]': !inProfile
              })}
            >
              <p className='text-[0.9375rem] font-medium underline skip-ink-none'>
                {!!vacancy.price ? `От ${formatMoney(vacancy.price)} ₽` : 'цена не указана'}
              </p>
              <hr className='flex-1 border-t border-t-white rounded-full mx-[0.625rem] mt-[0.125rem]' />
              <Link
                href={`/vacancy/${vacancy.id}`}
                className='text-[0.9375rem] font-medium underline skip-ink-none'
              >
                больше
              </Link>
            </div>
          </div>
          {vacancy.cover && (
            <Image
              src={`${vacancy.cover}`}
              alt='cover-img'
              width={157}
              height={201}
              className='w-[157px] h-[201px] object-cover rounded-[0.3125rem]'
            />
          )}
        </div>
      </div>
    </div>
  )
}
