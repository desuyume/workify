interface CircleProps {
  width?: string
  color?: string
}

export function Circle({ width = '0.25rem', color = '#d9d9d9' }: CircleProps) {
  return (
    <div className='rounded-full' style={{ width, height: width, backgroundColor: color }} />
  )
}
