interface CircleProps {
	width?: string
	color?: string
}

export function Circle({ width = '0.25rem', color = '#d9d9d9' }: CircleProps) {
	return (
		<div
			style={{ width, height: width, backgroundColor: color }}
			className='rounded-full'
		></div>
	)
}
