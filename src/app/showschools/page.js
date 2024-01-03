"use client"
import React, { useEffect, useState } from 'react'
import School from '@/components/School/School';
import axios from 'axios';
const page = () => {
  const [data, setData] = useState([]);
  
  const fetch= async()=>{
    try {
      const res = await axios.get('http://localhost:8000/getschools');
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetch();
  },[])

  return (
    <div className='p-2 border  pt-[50px] flex flex-col gap-4'>
        {
          data.map((item)=>(
             <School key={item.id} data={item}/>
          ))
        }

    </div>
  )
}

export default page