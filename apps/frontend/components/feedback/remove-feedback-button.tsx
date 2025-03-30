'use client'

import Modal from '@/app/ui/modal'
import { Button } from '@workify/ui'
import { useState } from 'react'
import ConfirmRemove from '../confirm-remove'
import { deleteFeedback } from '@/lib/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface RemoveFeedbackButtonProps {
  feedbackId: number
}

export default function RemoveFeedbackButton({ feedbackId }: RemoveFeedbackButtonProps) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleClickRemove = () => {
    deleteFeedback({
      params: {
        id: feedbackId
      }
    })
      .then((res) => {
        setIsRemoveModalOpen(false)
        toast.success('Отзыв успешно удалена')
        router.push(`/profile/${res.data.executor.login}`)
      })
      .catch((e) => {
        console.log(e)

        toast.error('Не удалось удалить отзыв')
      })
  }

  return (
    <>
      <Button
        title='Удалить отзыв'
        variant='dark-transparent'
        width='15.9375rem'
        height='100%'
        className='mx-10'
        onClick={() => setIsRemoveModalOpen(true)}
      />

      <Modal
        isVisible={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        children={
          <ConfirmRemove
            onRemove={handleClickRemove}
            onCancel={() => setIsRemoveModalOpen(false)}
          />
        }
      />
    </>
  )
}
