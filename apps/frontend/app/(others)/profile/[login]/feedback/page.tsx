import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ErrorUI from '@/app/ui/error-ui'
import Unauthorized from '@/app/ui/unauthorized'
import FeedbackForm from '@/components/feedback/feedback-form'
import { getUserProfileByLogin } from '@/lib/api'
import { cn } from '@workify/shared'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const fetchUser = async (login: string) => {
	return await getUserProfileByLogin({ params: { login } })
		.then(res => res.data)
		.catch(() => {
			return null
		})
}

export default async function Page({ params }: { params: { login: string } }) {
	const session = await getServerSession(authOptions)
	const user = await fetchUser(params.login)

	if (!user) {
		notFound()
	}

	if (!session?.user) {
		return <Unauthorized />
	}

	if (session.user.id === user.id) {
		return (
			<ErrorUI
				title='Вы не можете оставить себе отзыв'
				link={{ title: 'В профиль', href: `/profile/${user.login}` }}
			/>
		)
	}

	return (
		<div
			className={cn(
				'w-full foreground py-[1.625rem] flex flex-col items-center rounded-[0.625rem]'
			)}
		>
			<FeedbackForm executorLogin={user.login} />
		</div>
	)
}
