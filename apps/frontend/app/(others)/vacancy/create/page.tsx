import CreateEditVacancy from '@/components/vacancy/create-edit/create-edit-vacancy'
import { CreateEditVacancyProvider } from '@/contexts/create-edit-vacancy'

export default function Page() {
  return (
    <CreateEditVacancyProvider>
      <CreateEditVacancy type='create' />
    </CreateEditVacancyProvider>
  )
}
