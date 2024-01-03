import React from 'react'
// import Image from 'next/image'
import img from '../../../public/animi.png'
const School = ({ data }) => {
  return (
    <div className='p-2 shadow-xl  bg-gray-200 rounded '>
      <div className='flex items-center'>
        <img src={data.image||img} alt=""  className='hover:scale-150 h-[100px] w-[100px] rounded-full border border-[5px] border-black m-2 ' />
        {/* <Image 
         alt='img' src={data.image || img} className='hover:scale-150  rounded-full border border-[5px] border-black m-2 ' >
        </Image> */}
        <h1 className='text-3xl fontbold'>
          {data.name || "XYZ college of engineering"}
        </h1>
      </div>

      <div className='flex  justify-end px-4'>
        <div>
          <p>{`${data.city || "city"}, ${data.state || "state"}`}</p>
          <p>Address: {data.address}</p>
        </div>
      </div>

      <div>
        <p>Contect no. {data.contect || " 969486453"}</p>
        <p>Email Id:  {data.email || "hitesh96@gmail.com"}</p>
      </div>

    </div>
  )
}

export default School