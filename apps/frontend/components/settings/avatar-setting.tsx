'use client'

import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'
import { cn } from '@workify/shared'
import defaultProfilePic from '@/public/images/default-profile-pic.webp'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { deleteUserAvatar, patchUserAvatar } from '@/lib/api'
import { useProfile } from '@/contexts/profile'
import { toast } from 'sonner'

interface AvatarSettingProps {
	className?: string
}

export default function AvatarSetting({ className }: AvatarSettingProps) {
	const { profile, setProfile } = useProfile()
	const session = useSession()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const data = new FormData()
			data.append('avatar', e.target.files[0])
			patchUserAvatar({
				params: { data },
			}).then(() => {
				e.target.files &&
					setProfile({
						user: {
							...profile.user,
							avatar: URL.createObjectURL(e.target.files[0]),
						},
					})
				toast.success('Фото успешно обновлено')
			})
		}
	}

	const handleClickRemove = () => {
		deleteUserAvatar({
			params: {},
			config: {
				headers: {
					Authorization: `Bearer ${session.data?.tokens.accessToken}`,
				},
			},
		}).then(() => {
			setProfile({ user: { ...profile.user, avatar: null } })
			toast.success('Фото успешно удалено')
		})
	}

	return (
		<div
			className={cn(
				'w-[14.4375rem] h-[17.6875rem] bg-primary-dark rounded-[10.71875rem] relative',
				className
			)}
		>
			{profile.user?.avatar ? (
				<Image
					alt='profile-img'
					src={
						!!profile.user.avatar.includes('blob')
							? profile.user.avatar
							: `${process.env.SERVER_URL}/${profile.user.avatar}`
					}
					width={231}
					height={283}
					className='w-[231px] h-[283px] object-cover rounded-[10.71875rem]'
				/>
			) : (
				<Image
					alt='profile-img'
					src={defaultProfilePic}
					width={231}
					height={283}
					className='w-[231px] h-[283px] object-cover rounded-[10.71875rem]'
				/>
			)}

			<div className='w-full h-full absolute inset-0 bg-primary-dark rounded-[10.71875rem] bg-opacity-50 flex flex-col justify-center items-center'>
				{profile.user.avatar && (
					<GarbageIcon onClick={handleClickRemove} className='mb-[1.3125rem]' />
				)}

				<div className='relative'>
					<ChangeIcon />
					<input
						accept='image/*'
						type='file'
						title=''
						onChange={e => handleFileChange(e)}
						className='outline-none absolute inset-0 opacity-0 w-full h-full cursor-pointer'
					/>
				</div>
			</div>
		</div>
	)
}
