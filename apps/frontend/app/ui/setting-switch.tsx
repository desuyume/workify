'use client'

import { cn } from '@workify/shared'
import ToggleSwitch from './toggle-switch'
import { useProfile } from '@/contexts/profile'
import { ChangeEvent, useEffect, useState } from 'react'
import { updateEmailCommunication, updatePhoneCommunication } from '@/lib/api'

export type SettingToggleSwitchType =
  | 'email-communication'
  | 'phone-communication'
  | 'hide-location'
  | 'hide-vacancy'

interface SettingSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  width?: string
  switchId: SettingToggleSwitchType
  settingType: SettingToggleSwitchType
  className?: string
}

export default function SettingSwitch({
  title,
  width = '26.875rem',
  switchId,
  settingType,
  className,
  ...props
}: SettingSwitchProps) {
  const [isChecked, setIsChecked] = useState<boolean>(props.checked || false)
  const { profile } = useProfile()

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    switch (settingType) {
      case 'email-communication': {
        updateEmailCommunication({
          params: {
            isVisible: checked
          }
        })
        break
      }
      case 'phone-communication': {
        updatePhoneCommunication({
          params: {
            isVisible: checked
          }
        })
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    switch (settingType) {
      case 'email-communication': {
        setIsChecked(profile.user.communication?.isEmailVisible || false)
        break
      }
      case 'phone-communication': {
        setIsChecked(profile.user.communication?.isPhoneVisible || false)
        break
      }
      default:
        break
    }
  }, [profile])

  return (
    <div
      style={{
        width
      }}
      className={cn(
        'h-10 flex justify-between items-center pl-3 pr-2.5 foreground rounded-[0.3125rem]',
        className
      )}
    >
      <p className='font-light text-lg text-primary-light'>{title}</p>
      <ToggleSwitch id={switchId} isChecked={isChecked} onChange={handleCheck} {...props} />
    </div>
  )
}
