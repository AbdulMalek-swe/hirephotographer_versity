import HeroSection from 'Componants/Hero/Hero';
import axios from 'apiService/axios';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { addUserActions } from 'rtk/feature/addUserSlice';
import store from 'rtk/store/store';

const AppLayout = () => {
   
    return (
        <div>
            <HeroSection/>
            <Outlet/>
            <div>goto mosque</div>
        </div>
    );
};

export default AppLayout;