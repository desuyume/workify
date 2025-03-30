'use client'

import { useProfile } from '@/contexts/profile'
import { useSession } from 'next-auth/react'
import Loading from '@/app/ui/loading'
import Unauthorized from '@/app/ui/unauthorized'
import ProfileContent from '@/components/profile/profile-content'

export default function Page() {
  const session = useSession()
  const { profile } = useProfile()

  if (session.status === 'loading') {
    return <Loading className='w-full h-full' />
  }

  if (session.status === 'unauthenticated') {
    return <Unauthorized />
  }

  return <ProfileContent user={profile.user} />
}
