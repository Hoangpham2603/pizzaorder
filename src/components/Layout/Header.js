'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  const session = useSession()
  const status = session.status
  const userData = session.data?.user
  let username = userData?.name || userData?.email

  return (
    <header className='flex items-center justify-between'>
      <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
        <Link href={'/'} className='text-primary font-semibold text-2xl'>
          Mama PIZZA
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className='whitespace-nowrap cursor-pointer'>
              Hello, {username}
            </Link>
            <button onClick={() => signOut()} className='bg-primary text-white px-6 py-2 rounded-full'>
              Logout
            </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'} className=''>
              Login
            </Link>
            <Link href={'/register'} className='bg-primary text-white px-6 py-2 rounded-full'>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
