import Image from 'next/image'
import React from 'react'
import Right from '../icons/Right'

export default function Hero() {
  return (
    <>
      <section className='mt-10 grid grid-cols-10'>
        <div className='col-span-4 mt-12 grid '>
          <h1 className='text-4xl font-semibold '>
            Everything <br />
            is better <br />
            with a&nbsp; <span className='text-primary'>Pizza </span>
          </h1>
          <p className='text-md mt-4 text-gray-500'>
            Pizza is the missing piece that makes every day complete, a&nbsp; simple yet delicious joy in life
          </p>
          <div className='mt-5 flex gap-5'>
            <button className='flex items-center justify-center gap-2 rounded-full bg-primary  px-9 py-2 uppercase text-white '>
              Order Now
              <Right />
            </button>
            <button className=' flex items-center items-center gap-2 border-0 py-2 text-sm font-semibold text-gray-600'>
              Learn more
              <Right />
            </button>
          </div>
        </div>

        <div className='relative col-span-6 grid '>
          <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} atl={'Pizza'} />
        </div>
      </section>
    </>
  )
}
