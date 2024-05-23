'use client'

import Modal from '@/app/ui/modal'
import { Button } from '@workify/ui'
import { useState } from 'react'
import ConfirmRemove from '../confirm-remove'
import { deleteVacancy } from '@/lib/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface RemoveVacancyButtonProps {
	vacancyId: number
}

export default function RemoveVacancyButton({
	vacancyId,
}: RemoveVacancyButtonProps) {
	const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false)
	const router = useRouter()

	const handleClickRemove = () => {
		deleteVacancy({ params: { id: vacancyId } })
			.then(() => {
				setIsRemoveModalOpen(false)
				toast.success('Анкета успешно удалена')
				router.push('/vacancy')
			})
			.catch(() => {
				toast.error('Не удалось удалить анкету')
			})
	}

	return (
		<>
			<Button
				title='Удалить анкету'
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
