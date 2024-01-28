'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginInProgress, setLoginInProgress] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoginInProgress(true)
    await signIn('credentials', { email, password, callbackUrl: '/' })

    setLoginInProgress(false)
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4 font-semibold'>Login</h1>
      <form type='submit' className='max-w-md mx-auto' onSubmit={handleFormSubmit}>
        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
          name='email'
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button type='submit ' disabled={loginInProgress} className='bg-primary text-white'>
          Login
        </button>
        <div className='my-4 text-center text-gray-600 italic'>or Login with Gmail</div>
        <button
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className='flex gap-4 justify-center'
        >
          <Image src='/google.png' alt='google' width={24} height={24} />
          Login With Google
        </button>
      </form>
    </section>
  )
}
