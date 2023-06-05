import { Button } from '@mui/material'
import React, { useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import axios from 'apiService/axios';


 
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PhotoUpload = () => {
    const user = useSelector(state=>state.reducer.user)
    console.log(user);
    const [file, setFile] = useState(null);
    const handleChange = (e) => {
      setFile(e.target.files[0]);
    };
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
         
        formData.append("file", file);
        formData.append("email", user.email);
        try {
            const res = await axios.post("/upload-user", formData);
            
            if (res.status === 200) {
              const data = res.data;
              
              if (data.modifiedCount === 1) {
                // Success
                // window.location.reload();
              } else {
                console.error("Failed to upload the file");
              }
            } else {
              console.error("Failed to upload the file. Server responded with status:", res.status);
            }
          } catch (err) {
            console.error("Error uploading the file:", err);
          }
      };
    
    return (
        <div className='container flex justify-center'>

            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">


                    <div id="dropdown" className="z-10  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                 <input type='file' onChange={handleChange}/>
                   <button onClick={handleUpload}>submit</button>
                    </div>
                </div>
                <div className="flex flex-col items-center pb-10">
                    {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src= "" alt="Bonnie imasge" />                    */}
                   
                    
                    <div className="flex mt-4 space-x-3 md:mt-6">
              
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PhotoUpload;