'use client'

import {
  updateUserBirthday,
  updateUserDescription,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
  updateUserPhone,
  updateUserSpecialisation
} from '@/lib/api'
import EditIcon from './icons/EditIcon'
import { Input, PasswordInput, Textarea } from '@workify/ui'
import { useEffect, useState } from 'react'
import { useProfile } from '@/contexts/profile'
import { toast } from 'sonner'

export type SettingType = 'name' | 'birthday' | 'specialisation' | 'email' | 'phone' | 'password'

interface SettingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputWidth?: string
  settingType: SettingType
}

export function SettingInput({
  label,
  inputWidth = '19.375rem',
  settingType,
  ...props
}: SettingInputProps) {
  const [initialValue, setInitialValue] = useState<string>('')
  const [value, setValue] = useState<string>('')

  const { profile, setProfile } = useProfile()

  const handleClickEdit = () => {
    if (settingType === 'name') {
      updateUserName({
        params: {
          name: value
        }
      }).then(() => {
        setProfile({
          user: {
            ...profile.user,
            name: value
          }
        })
        toast.success('Имя успешно изменено')
      })
    }

    if (settingType === 'birthday') {
      updateUserBirthday({
        params: {
          birthday: !!value ? new Date(value) : null
        }
      }).then(() => {
        setProfile({
          user: {
            ...profile.user,
            birthday: value
          }
        })
        toast.success('Дата рождения успешно изменена')
      })
    }

    if (settingType === 'specialisation') {
      updateUserSpecialisation({
        params: {
          specialisation: value
        }
      }).then(() => {
        setProfile({
          user: {
            ...profile.user,
            specialisation: value
          }
        })
        toast.success('Специализация успешно изменена')
      })
    }

    if (settingType === 'email') {
      updateUserEmail({
        params: {
          email: value
        }
      })
        .then(() => {
          setProfile({
            user: {
              ...profile.user,
              email: value
            }
          })
          toast.success('Почта успешно изменена')
        })
        .catch((err) => toast.error(err.response.data.message))
    }

    if (settingType === 'phone') {
      updateUserPhone({
        params: {
          phone: value
        }
      }).then(() => {
        setProfile({
          user: {
            ...profile.user,
            phone: value
          }
        })
        toast.success('Телефон успешно изменен')
      })
    }

    if (settingType === 'password') {
      updateUserPassword({
        params: {
          password: value
        }
      }).then(() => {
        setProfile({
          user: {
            ...profile.user,
            password: value
          }
        })
        toast.success('Пароль успешно изменен')
      })
    }
  }

  useEffect(() => {
    if (settingType === 'name') {
      setValue(profile.user.name ?? '')
      setInitialValue(profile.user.name ?? '')
    }
    if (settingType === 'birthday') {
      setValue(
        profile.user.birthday ? new Date(profile.user.birthday).toISOString().split('T')[0] : ''
      )
      setInitialValue(
        profile.user.birthday ? new Date(profile.user.birthday).toISOString().split('T')[0] : ''
      )
    }
    if (settingType === 'specialisation') {
      setValue(profile.user.specialisation ?? '')
      setInitialValue(profile.user.specialisation ?? '')
    }
    if (settingType === 'email') {
      setValue(profile.user.email ?? '')
      setInitialValue(profile.user.email ?? '')
    }
    if (settingType === 'phone') {
      setValue(profile.user.phone ?? '')
      setInitialValue(profile.user.phone ?? '')
    }
    if (settingType === 'password') {
      setValue(profile.user.password ?? '')
      setInitialValue(profile.user.password ?? '')
    }
  }, [profile])

  return (
    <div className='h-[4.9375rem] flex items-end'>
      <div className='flex flex-col mr-4 relative'>
        <label className='font-medium text-[1.25rem] leading-6' htmlFor={props.id}>
          {label}
        </label>

        {settingType === 'password' ? (
          <PasswordInput
            {...props}
            width={inputWidth}
            className='mt-[0.9375rem]'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <Input
            {...props}
            width={inputWidth}
            className='mt-[0.9375rem]'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </div>

      <EditIcon
        isDisabled={value === initialValue}
        onClick={handleClickEdit}
        className='mb-[0.6875rem]'
      />
    </div>
  )
}

interface SettingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  textareaWidth?: string
  textareaHeight?: string
}

export function SettingTextarea({
  label,
  textareaWidth = '19.375rem',
  textareaHeight = '14.6875rem',
  ...props
}: SettingTextareaProps) {
  const [initialValue, setInitialValue] = useState<string>('')
  const [value, setValue] = useState<string>('')

  const { profile, setProfile } = useProfile()

  const clickEdit = () => {
    updateUserDescription({
      params: {
        description: value
      }
    }).then(() => {
      setProfile({
        user: {
          ...profile.user,
          description: value
        }
      })
      toast.success('Описание успешно изменено')
    })
  }

  useEffect(() => {
    setValue(profile.user.description ?? '')
    setInitialValue(profile.user.description ?? '')
  }, [profile])

  return (
    <div className='flex items-end'>
      <div className='flex flex-col mr-4'>
        <label className='font-medium text-[1.25rem] leading-6' htmlFor={props.id}>
          {label}
        </label>

        <Textarea
          {...props}
          textareaWidth={textareaWidth}
          textareaHeight={textareaHeight}
          className='mt-[0.9375rem]'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <EditIcon
        isDisabled={value === initialValue}
        onClick={clickEdit}
        className='mb-[0.6875rem]'
      />
    </div>
  )
}
