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
  const user = useSelector(state => state?.reducer?.user)
    
  const handleDelete = e => {
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
             {user?.imageURL&&<img className='ml-5 w-10 h-10 rounded-full' src={user.imageURL} alt='loading'/>}
             {user?.email&& <Link to="/profile"className="text-gray-400 hover:text-white ml-4">
               profile
             </Link>}
        </div>
        <nav className="flex-1">
          <ul className="space-y-4 p-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/photographer" className="text-gray-400 hover:text-white">
                  photographer
              </Link>
            </li>
            <li>
            {user?.email&& <Link to="/hire" className="text-gray-400 hover:text-white">
                 HireList
             </Link>}
            </li>
            <li>
              {
                user.role=='admin' && <Link to="/dashboard" className="text-gray-400 hover:text-white">
                dashboard
              </Link>
              }
              
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </li>
            
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              {!user.email && <Link to="/login" className="text-gray-400 hover:text-white">
                Sign In
              </Link>}
              {user.email && <button onClick={handleDelete} className="text-gray-400 hover:text-white">
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