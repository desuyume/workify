'use client'

import { cn } from '@workify/shared'
import { ChangeEvent, useEffect, useState } from 'react'

interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  isChecked?: boolean
}

export default function ToggleSwitch({
  id = 'check',
  isChecked = false,
  ...props
}: ToggleSwitchProps) {
  const [checked, setChecked] = useState(isChecked)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e)
    }
    setChecked(!checked)
  }

  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center cursor-pointer shadow-toggleSwitch relative w-[2.1875rem] h-5 rounded-[0.625rem] transition-all duration-[400ms]',
        {
          'bg-primary-light': checked,
          'bg-primary-dark': !checked
        }
      )}
    >
      <input
        {...props}
        onChange={handleOnChange}
        checked={checked}
        type='checkbox'
        id={id}
        className='sr-only'
      />
      <span
        className={cn('size-[0.875rem] absolute rounded-full transition-all duration-[400ms]', {
          'left-[18px] bg-primary-dark': checked,
          'left-[3px] bg-primary-light': !checked
        })}
      />
    </label>
  )
}
