import Image from 'next/image'
import profileImg from '@/public/images/profile-img.png'
import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'
import { cn } from '@workify/shared'

interface AvatarSettingProps {
	className?: string
}

export default function AvatarSetting({ className }: AvatarSettingProps) {
	return (
		<div
			className={cn(
				'w-[14.4375rem] h-[17.6875rem] bg-primary-dark rounded-[10.71875rem] relative',
				className
			)}
		>
			<Image
				src={profileImg}
				alt='profile-img'
				width={231}
				height={283}
				className='rounded-[10.71875rem]'
			/>
			<div className='w-full h-full absolute inset-0 bg-primary-dark rounded-[10.71875rem] bg-opacity-50 flex flex-col justify-center items-center'>
				<GarbageIcon className='mb-[1.3125rem]' />
				<ChangeIcon />
			</div>
		</div>
	)
}
