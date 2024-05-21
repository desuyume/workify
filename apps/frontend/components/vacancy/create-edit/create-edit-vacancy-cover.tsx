import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'
import AddIcon from '@/app/ui/icons/AddIcon'
import { useEffect, useRef } from 'react'
import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'
import { cn } from '@workify/shared'

export default function CreateEditVacancyCover() {
	const { vacancy, setVacancy } = useCreateEditVacancy()

	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setVacancy({ ...vacancy, cover: e.target.files[0] })
		}
	}

	useEffect(() => {
		if (!vacancy.cover) {
			imgRef.current?.setAttribute('src', '')
		}
	}, [vacancy.cover])

	return (
		<div>
			<div
				className={cn({
					block: vacancy.cover,
					hidden: !vacancy.cover,
				})}
			>
				<img
					ref={imgRef}
					src={
						vacancy.cover
							? typeof vacancy.cover === 'object'
								? URL.createObjectURL(vacancy.cover)
								: `${process.env.SERVER_URL}/${vacancy.cover}`
							: '#'
					}
					width={155}
					height={198}
					className='rounded-[0.3125rem]'
				/>

				<div className='w-full h-full bg-primary-dark rounded-[0.3125rem] absolute inset-0 opacity-0 shadow-toggleSwitch group-hover:opacity-85 transition-all duration-500'>
					<div className='w-full h-full flex flex-col justify-center items-center'>
						<GarbageIcon
							isColored
							className='mb-[1.3125rem]'
							onClick={() => setVacancy({ ...vacancy, cover: null })}
						/>
						<ChangeIcon isColored onClick={() => inputRef.current?.click()} />
					</div>
				</div>
			</div>

			<div
				className={cn({
					block: !vacancy.cover,
					hidden: vacancy.cover,
				})}
			>
				<AddIcon />
				<input
					ref={inputRef}
					accept='image/*'
					type='file'
					title=''
					onChange={e => handleFileChange(e)}
					className='outline-none absolute inset-0 opacity-0 w-full h-full cursor-pointer'
				/>
			</div>
		</div>
	)
}
