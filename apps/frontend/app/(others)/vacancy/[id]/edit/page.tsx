import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ErrorUI from '@/app/ui/error-ui'
import Unauthorized from '@/app/ui/unauthorized'
import CreateEditVacancy from '@/components/vacancy/create-edit/create-edit-vacancy'
import { CreateEditVacancyProvider } from '@/contexts/create-edit-vacancy'
import { getVacancyById } from '@/lib/api/requests/vacancy/id'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
	const session = await getServerSession(authOptions)
	const vacancy = await getVacancyById({ params })

	if (!session?.user) {
		return <Unauthorized />
	}

	if (!vacancy.data) {
		notFound()
	}

	if (session?.user.id !== vacancy.data.user.id) {
		return <ErrorUI title='Доступ запрещен' />
	}

	return (
		<CreateEditVacancyProvider>
			<CreateEditVacancy type='edit' fetchedVacancy={vacancy.data} />
		</CreateEditVacancyProvider>
	)
}
