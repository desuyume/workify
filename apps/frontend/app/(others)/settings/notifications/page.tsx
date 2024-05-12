import SettingSwitch from '@/app/ui/setting-switch'
import SettingsNav from '@/components/settings/settings-nav'

export default function Page() {
	return (
		<div className='w-[94%] h-[30.9375rem] foreground flex flex-col items-center rounded-[0.625rem]'>
			<SettingsNav activeSection='notifications' className='mb-[3.4375rem]' />

			<div className='bg-primary-dark w-[37.5625rem] h-[18.75rem] rounded-[0.625rem] flex flex-col items-center justify-between py-10'>
				<SettingSwitch
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
				/>
			</div>
		</div>
	)
}
