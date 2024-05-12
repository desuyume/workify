import EditIcon from './icons/EditIcon'
import { Input, PasswordInput, Textarea } from '@workify/ui'

interface SettingInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	inputWidth?: string
}

export function SettingInput({
	label,
	inputWidth = '19.375rem',
	...props
}: SettingInputProps) {
	return (
		<div className='h-[4.9375rem] flex items-end'>
			<div className='flex flex-col mr-4 relative'>
				<label
					className='font-medium text-[1.25rem] leading-6'
					htmlFor={props.id}
				>
					{label}
				</label>

				{props.type === 'password' ? (
					<PasswordInput
						{...props}
						inputWidth={inputWidth}
						className='mt-[0.9375rem]'
					/>
				) : (
					<Input
						{...props}
						inputWidth={inputWidth}
						className='mt-[0.9375rem]'
					/>
				)}
			</div>

			<EditIcon className='mb-[0.6875rem]' />
		</div>
	)
}

interface SettingTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
	return (
		<div className='flex items-end'>
			<div className='flex flex-col mr-4'>
				<label
					className='font-medium text-[1.25rem] leading-6'
					htmlFor={props.id}
				>
					{label}
				</label>

				<Textarea
					{...props}
					textareaWidth={textareaWidth}
					textareaHeight={textareaHeight}
					className='mt-[0.9375rem]'
				/>
			</div>

			<EditIcon className='mb-[0.6875rem]' />
		</div>
	)
}
