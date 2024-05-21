import { prisma } from '..'
import { DEFAULT_VACANCY_CATEGORIES } from '../constants/vacancy-categories'

export const vacancyCategorySeed = async () => {
	await Promise.all(
		DEFAULT_VACANCY_CATEGORIES.map(category =>
			prisma.vacancyCategory.upsert({
				where: {
					id: category.id,
				},
				update: {
					...category,
				},
				create: {
					...category,
				},
			})
		)
	)

	console.log('vacancy category seed done')
}
