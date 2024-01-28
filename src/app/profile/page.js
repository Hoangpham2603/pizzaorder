'use client'
import { useSession } from 'next-auth/react'

import { redirect } from 'next/navigation'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ProfilePage() {
  const session = useSession()
  const { status } = session

  const [userName, setUserName] = useState(session.data?.user.name || '')
  // console.log('profile page session ', session)

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName })
    })
  }

  const userImage = session.data.user.image

  return (
    <section className='mt-8'>
      <h2 className='mb-4 text-center text-4xl font-semibold text-primary'>Profile</h2>
      <div className='mx-auto max-w-md '>
        <div className='flex items-center gap-2'>
          <div>
            <div className='rounded-lg bg-gray-100 p-1'>
              <Image
                priority={true}
                className='mb-1.5 h-full w-full rounded-lg'
                src={userImage}
                width={120}
                height={120}
                alt={'userImage'}
              />
              <button type='button'>Edit</button>
            </div>
          </div>

          <form className='grow' onSubmit={handleProfileUpdate}>
            <input
              type='text'
              placeholder='First and Last Name'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input type='email' value={session.data.user.email} disabled={true} />
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}
