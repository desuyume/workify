import CreateEditVacancy from '@/components/vacancy/create-edit/create-edit-vacancy'
import { CreateEditVacancyProvider } from '@/contexts/create-edit-vacancy'

export default function Page({ params }: { params: { id: string } }) {
	return (
		<CreateEditVacancyProvider>
			<CreateEditVacancy type='edit' vacancyId={params.id} />
		</CreateEditVacancyProvider>
	)
}
