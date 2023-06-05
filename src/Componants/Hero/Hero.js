import React from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Modal from './Modal';
import { useLocation } from 'react-router-dom';
 
 
const HeroSection = () => {
    const location = useLocation()
   console.log(location);
   
    return (
        <>
      {
        location.pathname=="/"?<Slider/>:""
      }      

            <Sidebar/>
            <Modal/>
        </>
    );
};

export default HeroSection;