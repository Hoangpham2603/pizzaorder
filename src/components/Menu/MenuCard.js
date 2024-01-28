import React from 'react'

export default function MenuCard() {
  return (
    <div className='bg-slate-100 p-4 rounded-lg text-center hover:bg-white/50 transition-all hover:shadow-2xl hover:shadown-black/50'>
      <div className='text-center'>
        <img className='max-h-28 block mx-auto' src='/pizza.png' atl='pizza' />
      </div>
      <h4 className='font-semibold my-4 text-xl'>Peperoni Pizza</h4>
      <p className='text-ray-500 text-sm'>every body out for Friday and here i am coding</p>
      <button className='bg-primary text-white px-4 rounded-full py-2 mt-3'>Add to cart $12</button>
    </div>
  )
}
