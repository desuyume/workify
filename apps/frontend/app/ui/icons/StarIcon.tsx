import Image from 'next/image'
import starIcon from '@/public/icons/star.svg'
import unfilledStarIcon from '@/public/icons/star-unfilled.svg'

interface StarIconProps {
	isFilled?: boolean
}

export default function StarIcon({ isFilled = false }: StarIconProps) {
	return (
		<div className='w-[1.25rem] h-[1.25rem] flex justify-center items-center'>
			<Image src={isFilled ? starIcon : unfilledStarIcon} alt='star' width={16} height={16} />
		</div>
	)
}
