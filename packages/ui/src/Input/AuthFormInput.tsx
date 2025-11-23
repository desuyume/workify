'use client'

import { cn } from '@workify/shared'
import { useState } from 'react'
import { EyeIcon } from '../Icons'

interface AuthFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function AuthFormInput({ name, placeholder, className, ...props }: AuthFormInputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-[20.6875rem] h-[3.375rem] bg-primary-dark bg-opacity-10 outline outline-[1px] outline-[rgba(24,21,21,0.34)] pl-[0.625rem] text-base placeholder:text-base placeholder:tracking-normal text-primary-dark rounded-lg placeholder:text-primary-dark',
        className,
        {
          'tracking-[0.2rem] text-[0.6rem]': props.type === 'password'
        }
      )}
      name={name}
      placeholder={placeholder}
      type={props.type ?? 'text'}
    />
  )
}

export function AuthFormPasswordInput({ ...props }: AuthFormInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className={cn('relative flex items-center', props.className)}>
      <AuthFormInput {...props} className='pr-8' type={isShowPassword ? 'text' : 'password'} />
      <EyeIcon
        className='absolute right-4'
        isActive={isShowPassword}
        onClick={() => {
          setIsShowPassword(!isShowPassword)
        }}
        tabIndex={-1}
        theme='dark'
      />
    </div>
  )
}
