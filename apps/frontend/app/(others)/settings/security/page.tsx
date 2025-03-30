import { SettingInput } from '@/app/ui/setting-input'
import SettingSwitch from '@/app/ui/setting-switch'
import EmailSettingsConfirm from '@/components/settings/email-settings-confirm'
import SettingsNav from '@/components/settings/settings-nav'

export default function Page() {
  return (
    <div className='w-full h-[20.9375rem] foreground flex flex-col items-center rounded-[0.625rem]'>
      <SettingsNav activeSection='security' className='mb-[3.4375rem]' />

      <div className='w-[56.75rem] h-[10.0625rem] bg-primary-dark rounded-[0.625rem] pt-10 px-[5.4375rem] flex justify-between items-start'>
        <div>
          <EmailSettingsConfirm />
          {/* <EmailSettingsConfirm className='mb-2.5' /> */}
          {/* <SettingSwitch
						title='Двухфакторная аутентификация'
						switchId='2fa'
						width='24.375rem'
					/> */}
        </div>

        <SettingInput
          id='password'
          name='password'
          label='Пароль'
          inputWidth='11.9375rem'
          type='password'
          settingType='password'
          value=''
        />
      </div>
    </div>
  )
}
