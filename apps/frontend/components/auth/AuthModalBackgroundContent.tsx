import { Glow } from '@workify/ui'
import Image from 'next/image'
import laptopImg from '@/public/images/laptop.png'
import penImg from '@/public/images/pen.png'

export default function AuthModalBackgroundContent() {
  return (
    <div className='w-full h-full absolute inset-0 -z-10'>
      <Image
        src={laptopImg}
        alt='laptop'
        className='absolute -right-[9.125rem] bottom-[5.9375rem] z-10 pointer-events-none'
      />
      <Image
        src={penImg}
        alt='pen'
        className='absolute rotate-[2.43deg] left-[3.3125rem] top-[4.125rem] z-10 pointer-events-none'
      />
      <Image
        src={penImg}
        alt='pen'
        className='absolute rotate-[-21.66deg] left-5 top-[14.5625rem] z-10 pointer-events-none'
      />

      <hr className='w-[222.14px] border-t border-primary-dark absolute top-[46.76px] -left-[96.46px] rotate-[73deg]' />
      <hr className='w-[465.18px] border-t border-primary-dark absolute top-[71.68px] -left-[134.44px] rotate-[122.26deg]' />
      <hr className='w-[465.18px] border-t border-primary-dark absolute bottom-[225.5px] -left-[175.59px] rotate-[-104.19deg]' />
      <hr className='w-[412.43px] border-t border-primary-dark absolute bottom-[113px] -left-[33.72px] rotate-[-146.77deg]' />
      <hr className='w-[115.31px] border-t border-primary-dark absolute bottom-[40.46px] left-[123.34px] rotate-[135.32deg]' />
      <hr className='w-[324.68px] border-t border-primary-dark absolute bottom-[132px] -right-[83.84px] rotate-[-54.4deg]' />
      <hr className='w-[426.88px] border-t border-primary-dark absolute bottom-[212.5px] -right-[209.44px] rotate-[-84.62deg]' />
      <hr className='w-[89.55px] border-t border-primary-dark absolute bottom-[22px] right-[58.22px] rotate-[-150.57deg]' />

      <Glow
        width='26.5rem'
        className='absolute bottom-[6.625rem] right-[7rem] z-20'
        blur='38.29999923706055px'
      />
    </div>
  )
}
