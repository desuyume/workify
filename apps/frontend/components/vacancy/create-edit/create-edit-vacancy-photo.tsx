import AddIcon from '@/app/ui/icons/AddIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'
import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'
import { cn } from '@workify/shared'
import { useEffect, useRef } from 'react'

interface CreateEditVacancyPhotoProps {
  index: number
}

export default function CreateEditVacancyPhoto({ index }: CreateEditVacancyPhotoProps) {
  const { vacancy, setVacancy } = useCreateEditVacancy()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const photos = [...vacancy.photos]
      photos[index] = {
        id: e.target.files[0].size + Date.now(),
        url: e.target.files[0]
      }
      setVacancy({
        ...vacancy,
        photos
      })
    }
  }

  useEffect(() => {
    if (!vacancy.photos[index]) {
      imgRef.current?.setAttribute('src', '')
    }
  }, [vacancy.photos])

  return (
    <div>
      <div
        className={cn({
          block: vacancy.photos[index],
          hidden: !vacancy.photos[index]
        })}
      >
        <img
          ref={imgRef}
          src={
            vacancy.photos[index]
              ? typeof vacancy.photos[index].url === 'object'
                ? URL.createObjectURL(vacancy.photos[index].url as File)
                : vacancy.photos[index].url
              : '#'
          }
          className='w-[275px] h-[348px] object-cover rounded-[0.3125rem]'
        />

        <div className='w-full h-full bg-primary-dark rounded-[0.3125rem] absolute inset-0 opacity-0 shadow-toggleSwitch group-hover:opacity-85 transition-all duration-500'>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <GarbageIcon
              isColored
              className='mb-[1.3125rem]'
              onClick={() =>
                setVacancy({
                  ...vacancy,
                  photos: vacancy.photos.filter((_, i) => i !== index)
                })
              }
            />
            <ChangeIcon isColored onClick={() => inputRef.current?.click()} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          'w-[275px] h-[348px] bg-primary-dark rounded-[0.3125rem] flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity relative',
          {
            flex: !vacancy.photos[index],
            hidden: vacancy.photos[index]
          }
        )}
      >
        <AddIcon />
        <input
          ref={inputRef}
          accept='image/*'
          type='file'
          title=''
          onChange={(e) => handleFileChange(e)}
          className='outline-none absolute inset-0 opacity-0 w-full h-full cursor-pointer'
        />
      </div>
    </div>
  )
}
