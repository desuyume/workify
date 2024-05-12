import SettingSwitch from '@/app/ui/setting-switch'
import CreateEditVacancyForm from './create-edit-vacancy-form'
import CreateEditVacancyPhotos from './create-edit-vacancy-photos'
import { Button } from '@workify/ui'
import { cn } from '@workify/shared'
import { IVacancy } from '@workify/shared'
import { vacancyMockInfo } from './vacancy'

export default function CreateEditVacancy({
	type,
	vacancyId,
	className,
}: {
	type: CreateEditVacancyType
	vacancyId?: string
	className?: string
}) {
	const vacancyInfo: IVacancy | null = type === 'edit' ? vacancyMockInfo : null

	return (
		<div
			className={cn(
				'w-[94%] foreground pt-[1.625rem] pb-[7.5rem] flex flex-col items-center rounded-[0.625rem]',
				className
			)}
		>
			<CreateEditVacancyForm
				className='mb-[1.875rem]'
				type={type}
				title={vacancyInfo?.title}
				category={vacancyInfo?.category}
				description={vacancyInfo?.description}
				location={vacancyInfo?.location}
				isLocationHidden={vacancyInfo?.isLocationHidden}
				cover={vacancyInfo?.cover}
			/>

			<div className='w-[55.3125rem] mb-[3.75rem]'>
				<p className='font-medium text-[1.25rem] leading-6 mb-5'>Фотографии</p>
				<CreateEditVacancyPhotos type={type} photos={vacancyInfo?.photos} />
			</div>

			<div className='w-full h-[7.5rem] bg-primary-dark flex justify-center items-center mb-[3.75rem]'>
				<SettingSwitch
					title='Скрыть анкету'
					switchId='hide-vacancy'
					className='px-5'
					width='15.0625rem'
					isChecked={vacancyInfo?.isVacancyHidden}
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
					/>
					<Button
						variant='dark-transparent'
						title='Сбросить'
						width='100%'
						height='2.25rem'
					/>
				</div>
				<hr className='flex-1 border-t border-t-white rounded-full' />
			</div>
		</div>
	)
}
