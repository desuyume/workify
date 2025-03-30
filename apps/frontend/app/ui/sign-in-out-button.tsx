'use client'

import { signOut, useSession } from 'next-auth/react'
import ExitIcon from './icons/ExitIcon'
import Link from 'next/link'
import { useState } from 'react'
import ConfirmLogout from '@/components/confirm-signout'
import Modal from './modal'

export default function SignInOutButton() {
  const [isConfimModalVisible, setIsConfimModalVisible] = useState<boolean>(false)
  const session = useSession()

  return !!session.data && !!session.data?.user ? (
    <>
      <button className='inline-block' onClick={() => setIsConfimModalVisible(true)}>
        <ExitIcon />
      </button>
      <Modal
        isVisible={isConfimModalVisible}
        onClose={() => setIsConfimModalVisible(false)}
        children={
          <ConfirmLogout
            onSignout={() =>
              signOut({
                callbackUrl: '/',
                redirect: true
              })
            }
            onCancel={() => setIsConfimModalVisible(false)}
          />
        }
      />
    </>
  ) : (
    <Link className='inline-block' href='/?section=auth'>
      <ExitIcon />
    </Link>
  )
}
