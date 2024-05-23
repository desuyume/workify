'use client'

import { IUser } from '@workify/shared'
import React from 'react'

export interface IUserProfile extends Omit<IUser, 'id'> {
	password: string | null
}

export interface Profile {
	user: IUserProfile
}

export interface ProfileContextProps {
	profile: Profile
	setProfile: (value: Profile) => void
}

export const ProfileContext = React.createContext<ProfileContextProps>({
	profile: {
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
			vacancies: [],
		},
	},
	setProfile: () => {},
})
