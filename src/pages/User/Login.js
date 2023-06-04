import { Box, Typography } from '@mui/material';
import axios from '../../apiService/axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const Login = () => {
    const { handleSubmit,register} = useForm()
    const [cookie,setCookie] = useCookies(["access_token"])
    const navigate = useNavigate()
    const onSubmit =data =>{
      console.log("object");
      const userData ={ email:data?.email,password:data?.password }
      console.log(userData);
      axios.post('/login',userData)
        .then(data => {
          setCookie("access_token",data?.data?.access_token,{maxAge:3600*24*3})
           if(data.status==200){
            toast.success("successfully sign up")
            navigate("/")
           }
         
        })
        .catch(error =>  {
          // setLoader(false)
          console.log(error);
          toast.error(error.response.data.error)
        });
    }
    return (
        <div>
             <div className="relative overflow-hidden h-screen flex items-center  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
        <div className="container-sk">
          <div className=" rotate-border  bg-white w-full mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3   p-1  ">
            <Box className="z-10 rounded-lg bg-hero-pattern  bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
              <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-black">
                <Typography className="text-center font-display lg:text-2xl md:text-xl text-lg font-bold text-white">
                  Sign in
                </Typography>
                <div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className='text-left'>
              <h1 class="mb-1 text-2xl font-bold text-white"> </h1>
            </div>
            <div class="mb-4 flex items-center flex-col rounded-xl  bg-blue ">
             
              <input type="email" required placeholder="example@gmail.com" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg" {...register("email")} />
              
              <input type="password" required placeholder="password" className="input input-bordered   w-full max-w-xs focus:outline-none border-2 inputs text-white border-white mt-1 p-2 rounded-lg"  {...register("password")} />        

                    
            </div>
            <button type="submit" class="mb-2 mt-4 block w-full rounded-2xl   py-2 font-semibold   bg-white text-gray-700 hover:bg-blue-400 hover:text-white"  >Sign In</button>
          </form>
           
          <div class="my-2 rounded-xl text-gray-300 p-4 text-center   bg-white">
            <p className='text-gray-700'>have an account yet!</p>
            <Link to="/sign" class="font-medium text-blue-500 hover:underline">signup now</Link>
          </div>
        </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Login;