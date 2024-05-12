import { SettingInput, SettingTextarea } from '@/app/ui/setting-input'
import AvatarSetting from '@/components/settings/avatar-setting'
import SettingsNav from '@/components/settings/settings-nav'

export default function Page() {
	return (
		<div className='w-[94%] h-[76.6875rem] foreground flex flex-col items-center rounded-[0.625rem]'>
			<SettingsNav activeSection='profile' className='mb-[3.125rem]' />

			<AvatarSetting className='mb-[2.6875rem]' />

			<div className='w-[56.75rem] h-[40.3125rem] bg-primary-dark rounded-[0.625rem] pt-10 px-[3.875rem]'>
				<div className='w-full flex justify-between mb-[3.4375rem]'>
					<SettingInput
						id='login'
						name='login'
						value='Даниил Соколов'
						label='Имя/Логин'
						inputWidth='28.3125rem'
					/>
					<SettingInput
						id='birthday'
						name='birthday'
						value='2002-08-17'
						label='Дата Рождения'
						inputWidth='10.625rem'
						type='date'
					/>
				</div>

				<div className='w-full flex justify-between mb-[3.4375rem]'>
					<SettingInput
						id='speciality'
						name='speciality'
						value='Тату-мастер'
						label='Специализация'
						inputWidth='28.3125rem'
					/>
					<SettingInput
						id='phone'
						name='phone'
						value='+7 906 267 91 99'
						label='Телефон'
						inputWidth='10.625rem'
						type='tel'
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
