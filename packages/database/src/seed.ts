import { prisma } from '.'
import { citySeed } from './seeds/cities.seed'
import { vacancyCategorySeed } from './seeds/vacancy.seed'

;(async () => {
	try {
		await vacancyCategorySeed()
		await citySeed()

		console.log('seed done')
	} catch (error) {
		console.error(error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
})()
