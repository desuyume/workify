'use client'

import React, { useEffect, useMemo } from 'react'
import { Profile, ProfileContext } from './ProfileContext'
import { getUserProfile } from '@/lib/api'
import { useSession } from 'next-auth/react'

export interface ProfileProviderProps {
	children: React.ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
	children,
}) => {
	const session = useSession()
	const [profile, setProfile] = React.useState<Profile>({
		user: {
			name: null,
			avatar: null,
			birthday: null,
			description: null,
			email: '',
			login: '',
			phone: null,
			specialisation: null,
			password: null,
			rating: 0,
			vacancies: [],
			communication: {
				isEmailVisible: true,
				isPhoneVisible: true,
			},
		},
	})

	const value = useMemo(
		() => ({
			profile,
			setProfile,
		}),
		[profile]
	)

	useEffect(() => {
		getUserProfile({ params: {} })
			.then(res =>
				setProfile({
					user: {
						...res.data,
						password: null,
						birthday: !!res.data.birthday
							? new Date(res.data.birthday).toISOString().split('T')[0]
							: null,
					},
				})
			)
			.catch(err => console.error(err))
	}, [session])

	return (
		<ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
	)
}
