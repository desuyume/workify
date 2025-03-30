import SettingSwitch from '@/app/ui/setting-switch'
import SettingsNav from '@/components/settings/settings-nav'

export default function Page() {
  return (
    <div className='w-full h-[30.9375rem] foreground flex flex-col items-center rounded-[0.625rem]'>
      <SettingsNav activeSection='communication' className='mb-[3.4375rem]' />

      <div className='bg-primary-dark w-[37.5625rem] h-[11rem] rounded-[0.625rem] flex flex-col items-center justify-between py-10'>
        {/* <SettingSwitch
					title='Уведомления о сообщениях'
					switchId='messages-notification'
				/>
				<SettingSwitch
					title='Уведомления об откликах на почту'
					switchId='email-notification'
				/>
				<SettingSwitch
					title='Уведомления об откликах в Telegram'
					switchId='telegram-notification'
				/>
				<SettingSwitch
					title='Всплывающие уведомления'
					switchId='popup-notification'
				/> */}
        <SettingSwitch
          title='Показывать эл.почту в связи'
          switchId='email-communication'
          settingType='email-communication'
          name='email-communication'
        />
        <SettingSwitch
          title='Показывать телефон в связи'
          switchId='phone-communication'
          settingType='phone-communication'
          name='phone-communication'
        />
      </div>
    </div>
  )
}
