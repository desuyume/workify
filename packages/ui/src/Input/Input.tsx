'use client'

import type { ChangeEvent} from 'react';
import { useEffect, useState } from 'react'
import { cn } from '@workify/shared'
import { EyeIcon } from '../Icons/EyeIcon'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input({ ...props }: InputProps) {
  const [value, setValue] = useState(props.value ?? '')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e)
    }
    setValue(e.target.value)
  }

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    } else {
      setValue('')
    }
  }, [props.value])

  return (
    <input
      {...props}
      className={cn(
        'w-full h-10 foreground pl-3 font-light text-lg text-primary-light outline-none rounded-[0.3125rem]',
        props.className,
        {
          'tracking-[0.3125rem] text-[0.4rem]': props.type === 'password'
        }
      )}
      onChange={handleOnChange}
      style={{ width: props.width ?? '19.375rem' }}
      value={value}
    />
  )
}

interface PasswordInputProps extends InputProps { }

export function PasswordInput({ ...props }: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        {...props}
        className={cn('pr-[2.3125rem]', props.className)}
        type={isShowPassword ? 'text' : 'password'}
      />
      <EyeIcon
        className='absolute left-[10.375rem] bottom-4'
        isActive={isShowPassword}
        onClick={() => {
          setIsShowPassword(!isShowPassword)
        }}
      />
    </div>
  )
}

interface SettingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaWidth?: string
  textareaHeight?: string
}

export function Textarea({
  textareaWidth = '19.375rem',
  textareaHeight = '14.6875rem',
  ...props
}: SettingTextareaProps) {
  const [value, setValue] = useState(props.value ?? '')

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) {
      props.onChange(e)
    }
    setValue(e.target.value)
  }

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    } else {
      setValue('')
    }
  }, [props.value])

  return (
    <textarea
      {...props}
      className={cn(
        'foreground pt-[0.5625rem] pl-3 pr-[0.9375rem] pb-[0.625rem] font-light text-[0.9375rem] leading-[1.125rem] text-primary-light text-stroke outline-none rounded-[0.3125rem] resize-none',
        props.className
      )}
      onChange={handleOnChange}
      style={{ width: textareaWidth, height: textareaHeight }}
      value={value}
    />
  )
}
