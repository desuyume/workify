import SettingSwitch from '@/app/ui/setting-switch'
import { Input, Textarea } from '@workify/ui'
import tattoo from '@/public/images/tattoo-vacancy.png'
import Image from 'next/image'
import { cn } from '@workify/shared'
import AddIcon from '@/app/ui/icons/AddIcon'
import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'

interface CreateEditVacancyFormProps {
	type: CreateEditVacancyType
	title?: string
	category?: string
	description?: string
	location?: string | null
	isLocationHidden?: boolean
	cover?: string | null
	className?: string
}

export default function CreateEditVacancyForm({
	type,
	title,
	category,
	description,
	location,
	isLocationHidden,
	cover,
	className,
}: CreateEditVacancyFormProps) {
	return (
		<div
			className={cn(
				'w-[58.8125rem] h-[56.1875rem] bg-primary-dark rounded-[0.625rem] py-5 px-10 flex flex-col justify-between',
				className
			)}
		>
			<div className='w-full h-10 flex items-center'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>
					Название
				</p>
				<Input value={type === 'edit' ? title : ''} className='pl-5 flex-1' />
			</div>

			<div className='w-full h-10 flex items-center'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-xl'>
					Категория
				</p>
				<Input
					inputWidth='16.875rem'
					value={type === 'edit' ? category : ''}
					className='pl-5'
				/>
			</div>

			<div className='w-full h-[23.25rem] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Описание
				</p>
				<Textarea
					value={
						type === 'edit' ? description?.replaceAll('<br/><br/>', '') : ''
					}
					textareaHeight='23.25rem'
					className='pl-5 flex-1'
				/>
			</div>

			<div className='w-full h-[6.25rem] flex items-start'>
				<p className='min-w-[6.875rem] mr-[2.8125rem] font-medium text-[1.25rem] leading-6 pt-2'>
					Место
				</p>
				<div className='flex-1 flex flex-col'>
					<Input
						inputWidth='100%'
						value={type === 'edit' ? location ?? '' : ''}
						className='pl-5 mb-5'
					/>
					<SettingSwitch
						title='Скрыть местоположение'
						switchId='hide-location'
						width='21.25rem'
						isChecked={isLocationHidden}
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
							'hover:opacity-80': !cover,
						}
					)}
				>
					{type === 'edit' && cover ? (
						<>
							<Image
								src={tattoo}
								alt='tattoo-img'
								width={155}
								height={198}
								className='rounded-[0.3125rem]'
							/>

							<div className='w-full h-full bg-primary-dark rounded-[0.3125rem] absolute inset-0 opacity-0 shadow-toggleSwitch group-hover:opacity-85 transition-all duration-500'>
								<div className='w-full h-full flex flex-col justify-center items-center'>
									<GarbageIcon isColored className='mb-[1.3125rem]' />
									<ChangeIcon isColored withInputFile />
								</div>
							</div>
						</>
					) : (
						<>
							<AddIcon />
							<input
								accept='image/*'
								type='file'
								title=''
								className='outline-none absolute inset-0 opacity-0 w-full h-full cursor-pointer'
							/>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
