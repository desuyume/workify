interface LocationIconProps {
	className?: string
}

export default function LocationIcon({ className }: LocationIconProps) {
	return (
		<svg
			width='19'
			height='25'
			viewBox='0 0 19 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={!!className ? className : ''}
		>
			<g clipPath='url(#clip0_365_442)'>
				<path
					d='M9.5 0C4.25107 0 0 4.17065 0 9.32028C0 16.5473 6.57131 22.8271 8.78608 24.7373C9.19172 25.0876 9.80828 25.0876 10.222 24.7373C12.4368 22.8271 19.0081 16.5473 19.0081 9.32028C19 4.17065 14.7489 0 9.5 0ZM9.5 16.205C5.62212 16.205 2.48249 13.1248 2.48249 9.32028C2.48249 5.51576 5.62212 2.43553 9.5 2.43553C13.3779 2.43553 16.5175 5.51576 16.5175 9.32028C16.5175 13.1248 13.3779 16.205 9.5 16.205Z'
					fill='#FFFEF4'
				/>
				<path
					d='M9.49994 13.6423C11.9329 13.6423 13.9051 11.7073 13.9051 9.32041C13.9051 6.9335 11.9329 4.99854 9.49994 4.99854C7.06701 4.99854 5.09473 6.9335 5.09473 9.32041C5.09473 11.7073 7.06701 13.6423 9.49994 13.6423Z'
					fill='#FFFEF4'
				/>
			</g>
			<defs>
				<clipPath id='clip0_365_442'>
					<rect width='19' height='25' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}
