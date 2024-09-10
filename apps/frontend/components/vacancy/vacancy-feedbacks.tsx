'use client'

import { useEffect, useState } from 'react'
import { IFeedback, IFeedbackRating } from '@workify/shared'
import type { FeedbackSortBy } from '@workify/shared'
import { getVacancyFeedbacks, getVacancyRating } from '@/lib/api'
import Feedbacks from '../feedback/feedbacks'

interface VacancyFeedbacksProps {
	vacancyId: number
}

export default function VacancyFeedbacks({ vacancyId }: VacancyFeedbacksProps) {
	const [sortBy, setSortBy] = useState<FeedbackSortBy>('date')
	const [isFeedbacksLoading, setIsFeedbackLoading] = useState<boolean>(true)
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
	const [totalCount, setTotalCount] = useState<number>(0)
	const [rating, setRating] = useState<IFeedbackRating>({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	})

	const fetchFeedbacks = async () => {
		setIsFeedbackLoading(true)
		getVacancyFeedbacks({
			params: { vacancyId, query: { sortBy, take: 4 } },
		})
			.then(res => {
				setFeedbacks(res.data.feedbacks)
				setTotalCount(res.data.count)
			})
			.finally(() => setIsFeedbackLoading(false))
	}

	const fetchRating = async () => {
		getVacancyRating({
			params: { vacancyId },
		}).then(res => {
			setRating(res.data)
		})
	}

	const handleClickShowMore = () => {
		getVacancyFeedbacks({
			params: {
				vacancyId,
				query: { sortBy, take: 4, skip: feedbacks.length },
			},
		}).then(res => {
			setFeedbacks([...feedbacks, ...res.data.feedbacks])
			setTotalCount(res.data.count)
		})
	}

	const handleClickHideMore = () => {
		setFeedbacks(feedbacks.slice(0, 4))
	}

	useEffect(() => {
		fetchRating()
	}, [])

	useEffect(() => {
		fetchFeedbacks()
	}, [sortBy])

	return (
		<Feedbacks
			rating={rating}
			sortBy={sortBy}
			setSortBy={setSortBy}
			isFeedbacksLoading={isFeedbacksLoading}
			feedbacks={feedbacks}
			handleClickHideMore={handleClickHideMore}
			handleClickShowMore={handleClickShowMore}
			totalCount={totalCount}
		/>
	)
}
