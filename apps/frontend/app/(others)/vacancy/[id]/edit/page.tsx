import CreateEditVacancy from '@/components/vacancy/create-edit-vacancy'

export default function Page({ params }: { params: { id: string } }) {
	return <CreateEditVacancy type='edit' vacancyId={params.id} />
}
