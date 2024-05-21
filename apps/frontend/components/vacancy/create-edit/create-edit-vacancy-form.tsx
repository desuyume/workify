import SettingSwitch from '@/app/ui/setting-switch'
import { Input, Textarea } from '@workify/ui'
import { cn } from '@workify/shared'
import VacancyCategoryButton from '../vacancy-category-button'
import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'
import CreateEditVacancyCover from './create-edit-vacancy-cover'
import VacancyCityButton from '../vacancy-city-button'

interface CreateEditVacancyFormProps {
	type: CreateEditVacancyType
	className?: string
}

export default function CreateEditVacancyForm({
	type,
	className,
}: CreateEditVacancyFormProps) {
	const { vacancy, setVacancy } = useCreateEditVacancy()

	return (
		<div
			className={cn(
				'w-[58.8125rem] h-[58.6875rem] bg-primary-dark rounded-[0.625rem] py-5 px-10 flex flex-col justify-between',
				className
			)}
		>
			<div className='w-full h-10 flex items-center'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>
					Название
				</p>
				<Input
					value={vacancy.title}
					onChange={e => setVacancy({ ...vacancy, title: e.target.value })}
					className='pl-5 flex-1'
				/>
			</div>

			<div className='w-full h-10 flex items-center'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>
					Категория
				</p>
				<VacancyCategoryButton
					value={vacancy.category?.title}
					className='16.875rem px-5 py-2 foreground font-medium rounded-[0.3125rem] hover:bg-opacity-10 transition-colors'
				/>
			</div>

			<div className='w-full h-[23.25rem] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Описание
				</p>
				<Textarea
					value={vacancy.description?.replaceAll('<br/><br/>', '')}
					onChange={e =>
						setVacancy({ ...vacancy, description: e.target.value })
					}
					textareaHeight='23.25rem'
					className='pl-5 flex-1'
				/>
			</div>

			<div className='w-full h-10 flex items-center'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>
					Цена
				</p>
				<Input
					value={vacancy.price ?? ''}
					onChange={e => setVacancy({ ...vacancy, price: e.target.value })}
					className='text-center mr-2 pl-0'
					width='10rem'
					placeholder='не указано'
				/>
				<p className='font-medium text-xl'>₽</p>
			</div>

			<div className='w-full h-[6.25rem] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Город
				</p>
				<div className='flex-1 flex flex-col'>
					<VacancyCityButton className='16.875rem px-5 py-2 foreground font-medium rounded-[0.3125rem] hover:bg-opacity-10 transition-colors mb-5' />
					<SettingSwitch
						title='Скрыть местоположение'
						switchId='hide-location'
						width='21.25rem'
						isChecked={vacancy.isLocationHidden}
						onChange={e =>
							setVacancy({ ...vacancy, isLocationHidden: e.target.checked })
						}
						className='px-5'
					/>
				</div>
			</div>

			<div className='w-full h-[14.1875rem] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Обложка
				</p>
				<div
					className={cn(
						'w-[12.1875rem] h-full foreground rounded-[0.3125rem] flex justify-center items-center relative transition-opacity group',
						{
							'hover:opacity-80': !vacancy.cover,
						}
					)}
				>
					<CreateEditVacancyCover />
				</div>
			</div>
		</div>
	)
}
