import HeroSection from 'Componants/Hero/Hero';
import axios from 'apiService/axios';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { addUserActions } from 'rtk/feature/addUserSlice';
import store from 'rtk/store/store';

const AppLayout = () => {
    const [, , removeCookie] = useCookies(["access_token"]);
    const navigate = useNavigate()
    useEffect(()=>{
       async function userProfile(){
        try{
          const profile = await   axios.get("/user/detail")
            console.log(profile.data);
          // .then(res=>{
             store.dispatch(addUserActions.addUser(profile?.data?.user));
          // })
        }
        catch{
          removeCookie("access_token", { path: "/" });
          navigate("/")
        }
        
       }
     
      userProfile()
     },[navigate,removeCookie])

    return (
        <div>
            <HeroSection/>
            <Outlet/>
            <div>goto mosque</div>
        </div>
    );
};

export default AppLayout;