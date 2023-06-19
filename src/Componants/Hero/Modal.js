 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(true);

    // useEffect(() => {
    //   let timerInterval;
    
    //   function timer(isBoolean) {
    //     timerInterval = setInterval(() => {
    //       setIsOpen(isBoolean);
    //     }, 10000);
    //   }
    
    //   if (isOpen) {
    //     timer(false);
    //   }
    
    //   return () => clearInterval(timerInterval); // Clear the interval when the component unmounts
    
    // }, [isOpen]);
    
    // useEffect(() => {
    //   const closeTimer = setTimeout(() => {
    //     setIsOpen(false);
    //   }, 6000);
    
    //   const openTimer = setTimeout(() => {
    //     setIsOpen(true);
    //   }, 12000);
    
    //   return () => {
    //     clearTimeout(closeTimer); // Clear the timeout when the component unmounts
    //     clearTimeout(openTimer); // Clear the timeout when the component unmounts
    //   };
    
    // }, []);
    
    
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <ModalArea isOpen={isOpen} onClose={closeModal} />
        </div>
    );
};

export default Modal;

export const ModalArea  = ({isOpen,onClose}) => {
    if (!isOpen) return null;
    const handleClose = () => {
        onClose();
      };
   
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg relative">
        <h2 className="text-xl font-bold mb-4">Photographer</h2>
        <p className='text-xl'>Are u willing to join as a photographer  <Link className='underline text-red-700' to="/join/photographer">join with us</Link>   </p>
        <div className="mt-6   flex justify-end">
          <button
            className="absolute px-4 py-2   bg-red-500 rounded-full  text-black  -top-5 -right-5 " // Added absolute, top-2, and right-2 classes
            onClick={handleClose}
          >
           X
          </button>
        </div>
      </div>
    </div>
    
    );
};