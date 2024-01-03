"use client"
import React, { useState } from 'react';
import './page.css'
import axios from 'axios';
const addSchool = () => {


  const [schoolData, setSchoolData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    image: null,
  });

  const [isloading, setLoading] = useState(false)
  const [text, setText] = useState(<h1 className='absolute text-black shadow-xl p-8 bg-white w-fit h-fit'>Loading...</h1>)


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSchoolData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSchoolData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', schoolData.name);
    formData.append('email', schoolData.email);
    formData.append('address', schoolData.address);
    formData.append('city', schoolData.city);
    formData.append('state', schoolData.state);
    formData.append('contact', schoolData.contact);
    formData.append('image', schoolData.image);

    try {
      const res = await axios.post('http://localhost:8000/newschool', formData);
      setSchoolData({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        contact: '',
        image: null,
      });
      setLoading(false)
    } catch (error) {
      setText(<h1 className='absolute text-red-600 shadow-xl p-8 bg-white w-fit h-fit'>Failed to fetch</h1>)
      console.log(error);
    }
  };


  return (
    <div className='flex h-screen justify-center items-center'>
      {isloading && text}
      <form className='flex flex-col bg-red-400 p-2 w-fit gap-2 rounded shadow '>
        <h1 className='text-2xl font-bold text-center'>Add Your School</h1>
        <label htmlFor="name">Name Of School:</label>
        <input onChange={handleInputChange} type="text" id='name'  value={schoolData.name}/>
        <label htmlFor="email">Email</label>
        <input onChange={handleInputChange} type="email" id='email'  value={schoolData.email}/>
        <label htmlFor="address">Address:</label>
        <input onChange={handleInputChange} type="text" id='address' value={schoolData.address} />
        <label htmlFor="city">City:</label>
        <input onChange={handleInputChange} type="text" id='city' value={schoolData.city} />
        <label htmlFor="state">State</label>
        <input onChange={handleInputChange} type="text" id='state' value={schoolData.state} />
        <label htmlFor="contect">Contact</label>
        <input onChange={handleInputChange} type="number" id='contact' value={schoolData.contact} />
        <label htmlFor="img">Image:</label>
        <input onChange={handleImageChange} type="file" id='image' />
        <input type="submit" value="Submit" onClick={handleSubmit} className='p-2 bg-blue-600 text-white  hover:bg-blue-500' />
      </form>
    </div>
  )
}

export default addSchool