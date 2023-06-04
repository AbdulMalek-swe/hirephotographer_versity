import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from 'rtk/store/store';
import { addUserActions } from 'rtk/feature/addUserSlice';
import { useCookies } from 'react-cookie';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, , removeCookie] = useCookies(["access_token"]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const user = useSelector(state=>state?.reducer?.user)
    const handleDelete = e =>{
      store.dispatch(addUserActions.removeUser());
      removeCookie("access_token", { path: "/" });
    }
  return (
    <div className="relative z-10">
      <button
        onClick={toggleSidebar}
        className={`fixed top-0 left-0 w-12 h-12  bg-black text-white  rounded-br-md   z-10 focus:outline-none ${isOpen ? 'hidden' : ''
          }`}
      >
        <DoubleArrowIcon />
      </button>
      <div
        className={`bg-sidebar text-white h-screen w-1/5 flex flex-col fixed top-0 left-0 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="bg-black rounded-full p-1 text-sideCross focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
<div>
<svg width="215" height="75" viewBox="0 0 205 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.86464 1C-22.3218 127.813 93.4871 86.8741 203 25.9245" stroke="white" stroke-width="5" />
            <text x="35%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50"   className="dd font-old-english text-black"
          style={{ fontFamily: 'Old English', fontStyle: 'normal' }}  >
              Demo
            </text>
          </svg>
</div>
        <nav className="flex-1">
          <ul className="space-y-4 p-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              {!user.email && <Link to="/login" className="text-gray-400 hover:text-white">
               Sign In
              </Link>}
             { user.email && <button onClick={handleDelete} className="text-gray-400 hover:text-white">
                Log out
              </button>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;