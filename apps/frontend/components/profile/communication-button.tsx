'use client'

import EmailIcon from '@/app/ui/icons/EmailIcon'
import PhoneIcon from '@/app/ui/icons/PhoneIcon'
import Modal from '@/app/ui/modal'
import { Button } from '@workify/ui'
import { useState } from 'react'

export default function CommunicationButton({
  communication,
  username,
  email,
  phone
}: {
  communication: { isEmailVisible: boolean; isPhoneVisible: boolean }
  username: string
  email: string
  phone: string
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <>
      <div className='w-full h-9 flex items-center'>
        <hr className='flex-1 border-t border-t-white rounded-full' />
        <Button
          title='Связаться'
          variant='light-transparent'
          className='mx-[2.1875rem]'
          width='11.0625rem'
          height='100%'
          onClick={() => setIsVisible(true)}
        />
        <hr className='w-[17.3125rem] border-t border-t-white rounded-full' />
      </div>

      <Modal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        children={
          <div
            onClick={(e) => e.stopPropagation()}
            className='p-10 bg-primary-dark flex flex-col justify-center items-center rounded-[0.625rem] [&>div]:mb-6 [&>div:last-of-type]:mb-0'
          >
            {communication.isEmailVisible && (
              <div className='w-full h-[50px] flex justify-between items-center'>
                <EmailIcon className='mr-6' />
                <a className='h-[50px] text-xl flex items-center' href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            )}

            {communication.isPhoneVisible && !!phone && (
              <div className='w-full h-[50px] flex justify-between items-center'>
                <PhoneIcon className='mr-6' />
                <a className='h-[50px] text-xl flex items-center' href={`tel:${phone}`}>
                  {phone}
                </a>
              </div>
            )}

            {!communication.isEmailVisible && !communication.isPhoneVisible && (
              <p className='text-center text-3xl'>{username} не указал свои контакты</p>
            )}
          </div>
        }
      />
    </>
  )
}
