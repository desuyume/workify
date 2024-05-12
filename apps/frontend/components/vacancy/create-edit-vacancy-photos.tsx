import Image from 'next/image'
import tattoo from '@/public/images/tattoo-vacancy.png'
import AddIcon from '@/app/ui/icons/AddIcon'
import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'
import { IVacancyPhoto } from '@workify/shared'

export default function CreateEditVacancyPhotos({
	type,
	photos,
}: {
	type: CreateEditVacancyType
	photos?: IVacancyPhoto[]
}) {
	const photosCount = type === 'edit' ? photos?.length ?? 0 : 0

	return (
		<div className='w-[55.3125rem] flex flex-wrap gap-[1.875rem]'>
			{Array.from({ length: photosCount }).map((_, index) => (
				<div className='relative group'>
					<Image
						key={index}
						src={tattoo}
						alt='tattoo-img'
						width={275}
						height={348}
						className='rounded-[0.3125rem]'
					/>

					<div className='w-full h-full bg-primary-dark rounded-[0.3125rem] absolute inset-0 opacity-0 shadow-toggleSwitch group-hover:opacity-85 transition-all duration-500' />
					<div className='w-full h-full rounded-[0.3125rem] flex flex-col justify-center items-center absolute inset-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500'>
						<GarbageIcon isColored className='mb-[1.3125rem]' />
						<ChangeIcon isColored withInputFile />
					</div>
				</div>
			))}

			{photosCount < 6 && (
				<div className='w-[275px] h-[348px] bg-primary-dark rounded-[0.3125rem] flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity relative'>
					<AddIcon />
					<input
						accept='image/*'
						type='file'
						title=''
						className='outline-none absolute inset-0 opacity-0 w-full h-full cursor-pointer'
					/>
				</div>
			)}
		</div>
	)
}
