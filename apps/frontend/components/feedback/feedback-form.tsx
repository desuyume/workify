'use client'

import { Button, Textarea } from '@workify/ui'
import { IFeedbackWithExecutor, Rating, cn } from '@workify/shared'
import { useState } from 'react'
import FeedbackPhoto from './feedback-photo'
import RatingSelect from '@/app/ui/rating-select'
import { createFeedback, deleteFeedback, updateFeedback } from '@/lib/api'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { imgSrcToFile } from '@/lib/utils/imageConvert'

interface FeedbackFormProps {
  vacancyId: number
  feedback: IFeedbackWithExecutor | null
}

export default function FeedbackForm({ vacancyId, feedback }: FeedbackFormProps) {
  const [comment, setComment] = useState<string>(feedback?.comment ?? '')
  const [photo, setPhoto] = useState<string | File | null>(feedback?.photo ?? null)
  const [rating, setRating] = useState<Rating>(feedback?.rating ?? 1)
  const router = useRouter()

  const isCreated = feedback !== null

  const handleSend = async () => {
    if (comment.length > 1500) {
      toast.error('Комментарий не должен превышать 1500 символов')
      return
    }

    const feedbackData = new FormData()
    feedbackData.append('comment', comment)
    feedbackData.append('rating', `${rating}`)
    if (photo) {
      if (photo instanceof File) {
        feedbackData.append('photo', photo)
      }
      if (typeof photo === 'string') {
        feedbackData.append('photo', await imgSrcToFile(photo))
      }
    }

    if (isCreated) {
      updateFeedback({
        params: {
          vacancyId,
          feedbackId: feedback?.id,
          data: feedbackData
        }
      })
        .then((res) => {
          toast.success('Отзыв успешно обновлен')
          router.push(`/feedback/${res.data.id}`)
          router.refresh()
          clearFields()
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response?.data.message)
          }
        })
      return
    } else {
      createFeedback({
        params: {
          vacancyId,
          data: feedbackData
        }
      })
        .then((res) => {
          toast.success('Отзыв успешно отправлен')
          router.push(`/feedback/${res.data.id}`)
          router.refresh()
          clearFields()
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response?.data.message)
          }
        })
    }
  }

  const handleDelete = () => {
    if (feedback) {
      deleteFeedback({
        params: {
          id: feedback?.id
        }
      })
        .then(() => {
          toast.success('Отзыв успешно удален')
          router.push(`/vacancy/${vacancyId}`)
          router.refresh()
          clearFields()
        })
        .catch(() => toast.error('Не удалось удалить отзыв'))
    }
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
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className='w-full h-10 flex items-center'>
        <p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>Рейтинг</p>
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
              'hover:opacity-80': !photo
            }
          )}
        >
          <FeedbackPhoto photo={photo} setPhoto={setPhoto} />
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <Button
          title={isCreated ? 'Сохранить' : 'Отправить'}
          variant='light-transparent'
          width='12rem'
          height='2.5rem'
          onClick={handleSend}
        />

        {isCreated && (
          <Button
            title='Удалить'
            variant='transparent-light'
            width='12rem'
            height='2.5rem'
            onClick={handleDelete}
            className='ml-5'
          />
        )}
      </div>
    </div>
  )
}
