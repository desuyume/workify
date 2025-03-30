import { Circle } from '@workify/ui'
import HomeIcon from './icons/HomeIcon'
import Link from 'next/link'
import ProfileIcon from './icons/ProfileIcon'
import SettingsIcon from './icons/SettingsIcon'
import SignInOutButton from './sign-in-out-button'

export default function Sidebar() {
  return (
    <nav className='pt-[9.75rem] min-h-screen fixed left-[5.9375rem] flex flex-col items-center mr-[4.9375rem]'>
      <ul
        className={
          'w-[2.9375rem] h-[14.75rem] border border-white rounded-[1.4375rem] flex flex-col justify-evenly items-center mb-[1.8125rem]'
        }
      >
        <Circle />
        <li>
          <Link href='/vacancy'>
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link href='/profile'>
            <ProfileIcon />
          </Link>
        </li>
        <li>
          <Link href='/settings'>
            <SettingsIcon />
          </Link>
        </li>
        <li className='pl-0.5'>
          <SignInOutButton />
        </li>

        <Circle />
      </ul>
      <hr className='w-[1px] flex-1 border-l border-white' />
    </nav>
  )
}
