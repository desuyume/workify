import { prisma } from '..'
import { RUSSIAN_CITIES } from '../constants/russian-cities'

export const citySeed = async () => {
	await Promise.all(
		RUSSIAN_CITIES.map(city =>
			prisma.city.upsert({
				where: {
					name: city.name,
				},
				update: {
					name: city.name,
					subject: city.subject,
					population: city.population,
				},
				create: {
					name: city.name,
					subject: city.subject,
					population: city.population,
				},
			})
		)
	)

	console.log('cities seed done')
}
