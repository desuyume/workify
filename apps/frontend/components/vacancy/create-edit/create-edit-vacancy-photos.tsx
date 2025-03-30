import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'
import CreateEditVacancyPhoto from './create-edit-vacancy-photo'

export default function CreateEditVacancyPhotos() {
  const { vacancy } = useCreateEditVacancy()
  const photosCount = vacancy.photos?.length

  return (
    <div className='w-[55.3125rem] flex flex-wrap gap-[1.875rem]'>
      {vacancy.photos?.map((p, index) => (
        <div key={p.id} className='relative group'>
          <CreateEditVacancyPhoto index={index} />
        </div>
      ))}

      {photosCount < 6 && (
        <div className='relative group'>
          <CreateEditVacancyPhoto index={photosCount} />
        </div>
      )}
    </div>
  )
}
