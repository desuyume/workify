import { toast } from 'sonner'

export interface IRegFields {
  login: string
  email: string
  password: string
  rePassword: string
}

export const regValidation = (fields: IRegFields): boolean => {
  for (const field in fields) {
    if (!Object.prototype.hasOwnProperty.call(fields, field)) {
      toast.error(`Все поля обязательны для заполнения`)
      return false
    }
  }

  if (fields.login.length < 3) {
    toast.error('Минимальная длина логина 3 символа')
    return false
  }

  if (fields.password.length < 6) {
    toast.error('Минимальная длина пароля 6 символов')
    return false
  }

  if (fields.password.length < 6) {
    toast.error('Минимальная длина пароля 6 символов')
    return false
  }

  if (fields.password !== fields.rePassword) {
    toast.error('Пароли не совпадают')
    return false
  }

  return true
}
