import { SettingInput, SettingTextarea } from '@/app/ui/setting-input'
import AvatarSetting from '@/components/settings/avatar-setting'
import SettingsNav from '@/components/settings/settings-nav'

export default async function Page() {
	return (
		<div className='w-full h-[76.6875rem] foreground flex flex-col items-center rounded-[0.625rem]'>
			<SettingsNav activeSection='profile' className='mb-[3.125rem]' />

			<AvatarSetting className='mb-[2.6875rem]' />

			<div className='w-[56.75rem] h-[40.3125rem] bg-primary-dark rounded-[0.625rem] pt-10 px-[3.875rem]'>
				<div className='w-full flex justify-between mb-[3.4375rem]'>
					<SettingInput
						id='name'
						name='name'
						label='Имя/Логин'
						inputWidth='28.3125rem'
						settingType='name'
					/>
					<SettingInput
						id='birthday'
						name='birthday'
						label='Дата Рождения'
						inputWidth='10.625rem'
						type='date'
						settingType='birthday'
					/>
				</div>

				<div className='w-full flex justify-between mb-[3.4375rem]'>
					<SettingInput
						id='specialisation'
						name='specialisation'
						label='Специализация'
						inputWidth='28.3125rem'
						settingType='specialisation'
					/>
					<SettingInput
						id='phone'
						name='phone'
						label='Телефон'
						inputWidth='10.625rem'
						type='tel'
						settingType='phone'
					/>
				</div>

				<SettingTextarea
					id='description'
					name='description'
					value={`Привет! Я тату-мастер с опытом работы в индустрии татуировок более 3 лет. Моя страсть к искусству и творчеству позволяет мне создавать уникальные и индивидуальные дизайны, которые выражают личность и жизненные ценности каждого клиента. Моя цель - не просто нанести татуировку, а создать произведение искусства, которое будет радовать вас на протяжении многих лет.

Каждая работа для меня - это уникальный проект, который я разрабатываю в тесном взаимодействии с клиентом, учитывая его пожелания и предпочтения.
					
Если вы ищете татуировщика, который сможет воплотить ваши идеи в жизнь с мастерством и тщательностью, обращайтесь ко мне. Я всегда готов воплотить ваши тату-идеи в реальность и создать для вас произведение искусства.`}
					label='Описание'
					textareaWidth='46.5rem'
				/>
			</div>
		</div>
	)
}
