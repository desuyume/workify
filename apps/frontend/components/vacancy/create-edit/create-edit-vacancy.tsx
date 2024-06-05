'use client'

import SettingSwitch from '@/app/ui/setting-switch'
import CreateEditVacancyForm from './create-edit-vacancy-form'
import CreateEditVacancyPhotos from './create-edit-vacancy-photos'
import { Button } from '@workify/ui'
import { IFetchedVacancy, Rating, cn, isNumber } from '@workify/shared'
import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'
import { useSession } from 'next-auth/react'
import Loading from '@/app/ui/loading'
import Unauthorized from '@/app/ui/unauthorized'
import { createVacancy } from '@/lib/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { updateVacancy } from '@/lib/api/requests/vacancy/id'
import { AxiosError } from 'axios'
import { imgSrcToFile } from '@/lib/utils/imageConvert'

export default function CreateEditVacancy({
	type,
	fetchedVacancy,
	className,
}: {
	type: CreateEditVacancyType
	fetchedVacancy?: IFetchedVacancy
	className?: string
}) {
	const { vacancy, setVacancy } = useCreateEditVacancy()
	const session = useSession()
	const router = useRouter()

	const mutateVacancy = async () => {
		const data = new FormData()
		if (!vacancy.title) {
			toast.error('Название вакансии не может быть пустым')
			return
		}
		data.append('title', vacancy.title)
		data.append('description', vacancy.description)
		if (vacancy.category) {
			data.append('categoryId', `${vacancy.category?.id}`)
		}
		if (vacancy.city) {
			data.append('city', `${vacancy.city.name}`)
		}
		if (vacancy.price) {
			if (isNumber(vacancy.price)) {
				data.append('price', `${vacancy.price}`)
			} else {
				toast.error('Цена должна быть числом')
				return
			}
		}
		data.append('isLocationHidden', `${vacancy.isLocationHidden}`)
		data.append('isVacancyHidden', `${vacancy.isVacancyHidden}`)
		if (vacancy.cover) {
			if (vacancy.cover instanceof File) {
				data.append('cover', vacancy.cover)
			}
			if (typeof vacancy.cover === 'string') {
				data.append('cover', await imgSrcToFile(vacancy.cover, 'cover.jpg'))
			}
		}
		for (const photo of vacancy.photos) {
			if (photo.url instanceof File) {
				data.append('photos', photo.url)
			}
			if (typeof photo.url === 'string') {
				console.log('123')

				data.append('photos', await imgSrcToFile(photo.url, 'photo.jpg'))
			}
		}

		if (type === 'create') {
			createVacancy({ params: { data } })
				.then(res => {
					router.push(`/vacancy/${res.data.id}`)
					router.refresh()
					toast.success('Вакансия успешно создана')
					clearVacancy()
				})
				.catch(err => {
					if (err instanceof AxiosError) {
						toast.error(err.response?.data.message)
					}
					console.log(err)
				})
		}

		if (type === 'edit' && fetchedVacancy?.id) {
			updateVacancy({ params: { data, id: fetchedVacancy.id } })
				.then(res => {
					router.push(`/vacancy/${res.data.id}`)
					router.refresh()
					toast.success('Вакансия успешно обновлена')
					clearVacancy()
				})
				.catch(err => {
					if (err instanceof AxiosError) {
						toast.error(err.response?.data.message)
					}
					console.log(err)
				})
		}
	}

	const clearVacancy = () => {
		setVacancy({
			title: '',
			description: '',
			category: null,
			price: null,
			cover: null,
			photos: [],
			city: null,
			isLocationHidden: false,
			isVacancyHidden: false,
		})
	}

	useEffect(() => {
		if (type === 'edit') {
			if (fetchedVacancy) {
				setVacancy({
					title: fetchedVacancy.title,
					description: fetchedVacancy.description,
					category: fetchedVacancy.category,
					price: !!fetchedVacancy.price ? `${fetchedVacancy.price}` : null,
					cover: fetchedVacancy.cover,
					photos: fetchedVacancy.photos,
					city: fetchedVacancy.city,
					isLocationHidden: fetchedVacancy.isLocationHidden,
					isVacancyHidden: fetchedVacancy.isVacancyHidden,
				})
			}
		}
	}, [])

	if (session.status === 'loading') {
		return <Loading className='w-full h-full' />
	}

	if (session.status === 'unauthenticated') {
		return <Unauthorized />
	}

	return (
		session.status === 'authenticated' && (
			<div
				className={cn(
					'w-full foreground pt-[1.625rem] pb-[7.5rem] flex flex-col items-center rounded-[0.625rem]',
					className
				)}
			>
				<CreateEditVacancyForm className='mb-[1.875rem]' />

				<div className='w-[55.3125rem] mb-[3.75rem]'>
					<p className='font-medium text-[1.25rem] leading-6 mb-5'>
						Фотографии
					</p>
					<CreateEditVacancyPhotos />
				</div>

				<div className='w-full h-[7.5rem] bg-primary-dark flex justify-center items-center mb-[3.75rem]'>
					<SettingSwitch
						title='Скрыть анкету'
						switchId='hide-vacancy'
						className='px-5'
						width='15.0625rem'
						checked={vacancy.isVacancyHidden}
						onChange={e =>
							setVacancy({ ...vacancy, isVacancyHidden: e.target.checked })
						}
						settingType='hide-vacancy'
					/>
				</div>

				<div className='w-full h-[5.125rem] flex items-center'>
					<hr className='flex-1 border-t border-t-white rounded-full' />
					<div className='w-[15.9375rem] h-full flex flex-col justify-between mx-10'>
						<Button
							variant='light-transparent'
							title='Сохранить'
							width='100%'
							height='2.25rem'
							onClick={mutateVacancy}
						/>
						<Button
							variant='dark-transparent'
							title='Сбросить'
							width='100%'
							height='2.25rem'
							onClick={clearVacancy}
						/>
					</div>
					<hr className='flex-1 border-t border-t-white rounded-full' />
				</div>
			</div>
		)
	)
}
