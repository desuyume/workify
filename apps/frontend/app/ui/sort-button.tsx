export default function SortButton() {
	return (
		<button className='w-[2.25rem] aspect-square bg-white rounded-[1.125rem] flex flex-col justify-center items-center'>
			<svg
				width='15'
				height='5'
				viewBox='0 0 15 5'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M1 2.5H10' stroke='black' strokeLinecap='round' />
				<circle cx='12.5' cy='2.5' r='2' stroke='black' />
			</svg>
			<svg
				width='15'
				height='5'
				viewBox='0 0 15 5'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M14 2.5H5' stroke='black' strokeLinecap='round' />
				<circle
					cx='2.5'
					cy='2.5'
					r='2'
					transform='matrix(-1 0 0 1 5 0)'
					stroke='black'
				/>
			</svg>
		</button>
	)
}
