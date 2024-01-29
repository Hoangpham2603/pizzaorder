'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const session = useSession()
  const { status } = session

  console.log(session)
  const [userName, setUserName] = useState('')
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const userImage = session.data?.user.image

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name)
    }
  }, [session, status])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setSaved(false)
    setIsSaving(true)
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName })
    })
    setIsSaving(false)
    if (res.ok) {
      setSaved(true)
    }
  }

  const handleProfileUpload = async (e) => {
    const files = e.target.files
    if (files?.length > 0) {
      const data = new FormData()
      data.set('files', files[0])
      await fetch('api/upload', {
        method: 'POST',
        body: data
        // headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
  }

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <section className='mt-8'>
      <h2 className='mb-4 text-center text-4xl font-semibold text-primary'>Profile</h2>
      <div className='mx-auto max-w-md '>
        {saved && <h2 className='rounded-lg border border-green-300 bg-green-200 p-4 text-center'>Profile Saved</h2>}

        {isSaving && (
          <div role='status' className='flex items-center justify-center bg-green-200 p-4'>
            <svg
              aria-hidden='true'
              className='h-6 w-6 animate-spin fill-green-600 text-gray-200 dark:text-gray-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='ml-3 text-lg '>Saving ...</span>
          </div>
        )}

        <div className='flex items-center gap-2'>
          <div>
            <div className='rounded-lg  p-1'>
              <Image
                priority={true}
                className='mb-1.5 h-full w-full rounded-lg'
                src={userImage}
                width={120}
                height={120}
                alt={'userImage'}
              />
              <label>
                <input type='file' className='hidden' onChange={handleProfileUpload} />
                <span className=' block cursor-pointer rounded-lg border p-2 text-center'>Edit</span>
              </label>
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
