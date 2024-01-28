'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCreatingUser(true)
    setError(false)
    setUserCreated(false)
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      setUserCreated(true)
    } else {
      setError(true)
    }
    setCreatingUser(false)
  }
  return (
    <section className='mt-8 '>
      <h1 className='mb-4 text-center text-4xl font-semibold text-primary'>Register</h1>
      {userCreated && (
        <div className='text-md my-4 text-center font-semibold'>
          User created <br /> Now you can
          <Link href={'/login'}> Login</Link>
        </div>
      )}
      {error && (
        <div className='my-4 text-center text-primary'>
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form className='mx-auto block max-w-md' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type='submit' disabled={creatingUser}>
          Register
        </button>

        <div className='my-4 text-center italic text-gray-600'>or Login with Gmail</div>
        <button
          type='button'
          className='flex items-center justify-center gap-4'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <Image src={'/google.png'} alt={'google'} width={30} height={30} />
          Login With Google
        </button>
        <div className='my-4 border-t pt-4 text-center'>
          Already have an account?{' '}
          <Link className='underline' href={'/login'}>
            {' '}
            Login &raquo;
          </Link>
        </div>
      </form>

      <div></div>
    </section>
  )
}
