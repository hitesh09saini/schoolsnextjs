import React from 'react'
import Link from 'next/link'

const Links = () => {
  return (
    <div className='bg-black text-white absolute top-0 right-0  p-2 flex  gap-4 '>
       <div className='active:text-green-600'>
        <Link href="/addschool">
         <span className='hover:bg-gray-300 active:text-green-600 bg-white text-black px-2 py-1 rounded-full mr-2'>+</span>
          Add School</Link>
       </div>
       <div className='active:text-green-600'>
        <Link href="/showschools">See All Colleges</Link>
       </div>
    </div>
  )
}

export default Links