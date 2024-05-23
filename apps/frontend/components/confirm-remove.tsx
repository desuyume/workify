import { Button } from '@workify/ui'

interface ConfirmRemoveProps {
	onRemove: () => void
	onCancel: () => void
}

export default function ConfirmRemove({
	onCancel,
	onRemove,
}: ConfirmRemoveProps) {
	return (
		<div
			onClick={e => e.stopPropagation()}
			className='p-16 flex flex-col justify-center items-center bg-primary-dark rounded-[0.625rem]'
		>
			<p className='text-4xl font-medium text-center mb-10'>
				Вы уверены, что хотите удалить эту анкету?
			</p>

			<div className='w-full flex justify-center'>
				<Button width='12rem' onClick={onRemove} title='Удалить' variant='light' className='mr-10' />
				<Button width='12rem' onClick={onCancel} title='Отмена' variant='light' />
			</div>
		</div>
	)
}
