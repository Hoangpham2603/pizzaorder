import Image from 'next/image'
import React from 'react'
import MenuCard from '../Menu/MenuCard'
import SectionHeaders from './SectionHeaders'

export default function HomeMenu() {
  return (
    <section className=''>
      <div className='absolute left-0 right-0  w-full justify-start '>
        <div className=' absolute left-0 -top-12 text-left -z-10 '>
          <Image src={'/sallad1.png'} width={192} height={195} alt={''} />
        </div>

        <div className=' absolute right-0 -top-36 -z-10 '>
          <Image src={'/sallad2.png'} width={107} height={195} />
        </div>
      </div>

      <div className='text-center'>
        <SectionHeaders subHeader={'Check Out'} mainHeader={'Menu'} />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>
    </section>
  )
}
