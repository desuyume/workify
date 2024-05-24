import { getUserProfileByLogin } from '@/lib/api'
import ProfileContent from '@/components/profile/profile-content'
import { notFound } from 'next/navigation'

const fetchUser = async (login: string) => {
	return await getUserProfileByLogin({ params: { login } })
		.then(res => res.data)
		.catch(() => {
			return null
		})
}

export default async function Page({ params }: { params: { login: string } }) {
	const user = await fetchUser(params.login)

	if (!user) {
		notFound()
	}

	return <ProfileContent user={user} isByLogin />
}
