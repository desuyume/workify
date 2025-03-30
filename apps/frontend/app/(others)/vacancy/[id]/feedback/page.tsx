import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ErrorUI from '@/app/ui/error-ui'
import Unauthorized from '@/app/ui/unauthorized'
import FeedbackForm from '@/components/feedback/feedback-form'
import { getCreatedFeedback, getVacancyById } from '@/lib/api'
import { cn } from '@workify/shared'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const fetchVacancy = async (id: number) => {
  return await getVacancyById({
    params: {
      id
    }
  })
    .then((res) => res)
    .catch(() => null)
}

const fetchCreatedFeedback = async (id: number) => {
  return await getCreatedFeedback({
    params: {
      vacancyId: id
    }
  })
    .then((res) => res)
    .catch(() => null)
}

export default async function Page({
  params
}: {
  params: {
    id: number
  }
}) {
  const session = await getServerSession(authOptions)
  const vacancy = await fetchVacancy(params.id)
  const feedback = await fetchCreatedFeedback(params.id)

  if (!vacancy?.data) {
    notFound()
  }

  if (!session?.user) {
    return <Unauthorized />
  }

  if (session.user.id === vacancy.data.user.id) {
    return (
      <ErrorUI
        title='Вы не можете оставить себе отзыв'
        link={{
          title: 'К вакансии',
          href: `/vacancy/${params.id}`
        }}
      />
    )
  }

  return (
    <div
      className={cn(
        'w-full foreground py-[1.625rem] flex flex-col items-center rounded-[0.625rem]'
      )}
    >
      <FeedbackForm vacancyId={params.id} feedback={feedback?.data || null} />
    </div>
  )
}
