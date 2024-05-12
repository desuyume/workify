import * as z from 'zod'

export const regsiterSchema = z.object({
	login: z.string().min(1),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1),
	rePassword: z.string().min(1),
})
