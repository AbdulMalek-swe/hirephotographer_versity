import React, {   useEffect, useState } from 'react';
import pic from 'assets/unnamed.jpg'
import { Link, useNavigate  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
 
// import {  useGoogleLogin } from '@react-oauth/google';
 
import load from 'assets/unnamed.jpg'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import axios from '../../apiService/axios';
const Register = () => {
   

  const { register, handleSubmit, watch, } = useForm();
 const [loader,setLoader] = useState(false);
 const [cookie,setCookie] = useCookies(["access_token"])
  const navigate = useNavigate()
  
const token = cookie['access_token'];
useEffect(()=>{
  if(token){
    navigate("/")
  }
},[navigate,token])
  const onSubmit = data => {
   const userData ={firstName:data?.fname,lastName:data?.lname,email:data.email,password:data?.password,confirmPassword:data.cPassword}
    axios.post('/signup',userData)
      .then(data => {
        setCookie("access_token",data?.data?.access_token,{maxAge:3600*24*3})
         if(data.status==200){
          toast.success("successfully sign in")
          navigate("/")
         } 
      })
      .catch(error =>  {
        toast.error(error.response.data.error)
      });
  }
  return (
     <>
     {
         loader && <div className='flex items-center justify-center h-screen'><img src={load} alt="loading..." width="40px" height="40px"/></div>
     }
     {
      !loader &&
      <div class="h-screen md:flex">
      <div class="flex items-center justify-center   py-10 md:w-1/2 h-full bg-[#041532]">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className='text-left'>
              <h1 class="mb-1 text-2xl font-bold text-white">Sign up</h1>
            </div>
            <div class="mb-4 flex items-center flex-col rounded-xl  bg-blue ">
              <input type="text" required placeholder="first name" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg"  {...register("fname")} />
              <input type="text" required placeholder="last name" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg"  {...register("lname")} />
              <input type="email" required placeholder="example@gmail.com" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg" {...register("email")} />
              
              <input type="password" required placeholder="password" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg"  {...register("password")} />        

                 <input type="confirmpassword" required placeholder="confirm password" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg"  {...register("cPassword")} />        
            </div>
            <button type="submit" class="mb-2 mt-4 block w-full rounded-2xl   py-2 font-semibold   bg-white text-gray-700 hover:bg-blue-400 hover:text-white"  >Sign Up</button>
          </form>
        
          <div class="my-2 rounded-xl text-gray-300 p-4 text-center   bg-white">
            <p className='text-gray-700'>have an account yet!</p>
            <Link to="/login" class="font-medium text-blue-500 hover:underline">signin now</Link>
          </div>
        </div>
      </div>
      <div class="bg-[#11213e] i relative hidden w-1/2 items-center justify-around overflow-hidden   md:flex  ">
        <div>
          <img src={pic} alt='loading...' />
        </div>
      </div>
    </div>
     }
     </>
  );
};

export default Register;