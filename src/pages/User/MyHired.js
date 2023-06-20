import React, { useEffect, useState } from 'react';
import axios from 'apiService/axios'
import { useSelector } from 'react-redux';
const MyHired = () => {
    const [photographer,setPhotographer] = useState([])
    const user = useSelector(state=>state?.reducer?.user)
    useEffect(()=>{
      axios.get(`/user/detail/${user.id}`)
      .then(res=>{
        console.log(res);
        setPhotographer(res.data.user.hiredPhotographer)
      })
    },[])
      return (
         <div className='container-sk mt-10'>
           <div  className='flex flex-wrap gap-y-3 '>
             { photographer.map(item=><div className="max-w-xs mx-auto bg-white rounded shadow-lg p-6 relative border border-[#BECCBE]">
        <div className="flex items-center justify-center" key={item._id}>
          <img src={item.img} alt="loading ..." className="w-[150px] h-[150px] rounded-full" />
          <p className="absolute top-0 right-0 text-2xl font-bold mt-2 mr-2">${item?.amount}/hr</p>
        </div>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">{item?.name}</h2>
          <p className="text-gray-700">Photographer</p>
          <p className="text-gray-700 my-5"> * {item?.rating}/5 (6 jobs)</p>
        </div>
        <div className=' flex justify-between mb-12'>
        <p>Photography</p>
        <p>Photography</p>
        </div>
        <div className='text-center'>
           
          
        </div>
      </div>) }
  
          </div>
         </div>
    );
};

export default MyHired;