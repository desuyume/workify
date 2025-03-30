import { Button } from '@workify/ui'

interface ConfirmSignoutProps {
  onSignout: () => void
  onCancel: () => void
}

export default function ConfirmSignout({ onSignout, onCancel }: ConfirmSignoutProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='p-16 flex flex-col justify-center items-center bg-primary-dark rounded-[0.625rem]'
    >
      <p className='text-4xl font-medium text-center mb-10'>Вы уверены, что хотите выйти?</p>

      <div className='w-full flex justify-center'>
        <Button width='12rem' onClick={onSignout} title='Выйти' variant='light' className='mr-10' />
        <Button width='12rem' onClick={onCancel} title='Отмена' variant='light' />
      </div>
    </div>
  )
}
