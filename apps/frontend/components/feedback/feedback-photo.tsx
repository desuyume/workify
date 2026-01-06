'use client'

import GarbageIcon from '@/app/ui/icons/GarbageIcon'
import ChangeIcon from '@/app/ui/icons/ChangeIcon'
import AddIcon from '@/app/ui/icons/AddIcon'
import { useEffect, useRef } from 'react'
import { cn } from '@workify/shared'

interface FeedbackPhotoProps {
  photo: string | File | null
  setPhoto: (photo: string | File | null) => void
}

export default function FeedbackPhoto({ photo, setPhoto }: FeedbackPhotoProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0])
    }
  }

  useEffect(() => {
    if (!photo) {
      imgRef.current?.setAttribute('src', '')
    }
  }, [photo])

  return (
    <div>
      <div
        className={cn({
          block: photo,
          hidden: !photo
        })}
      >
        <img
          ref={imgRef}
          src={
            photo
              ? typeof photo === 'object'
                ? URL.createObjectURL(photo)
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${photo}`
              : '#'
          }
          width={313}
          height={193}
          className='w-[313px] h-[193px] object-cover rounded-[0.3125rem]'
        />

        <div className='w-full h-full bg-primary-dark rounded-[0.3125rem] absolute inset-0 opacity-0 shadow-toggleSwitch group-hover:opacity-85 transition-all duration-500'>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <GarbageIcon isColored className='mb-[1.3125rem]' onClick={() => setPhoto(null)} />
            <ChangeIcon isColored onClick={() => inputRef.current?.click()} />
          </div>
        </div>
      </div>

      <div
        className={cn({
          block: !photo,
          hidden: photo
        })}
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
