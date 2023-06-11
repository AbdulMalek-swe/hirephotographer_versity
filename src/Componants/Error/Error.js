import React from 'react';

const Error = () => {
    return (
        <div className='bg-black h-screen flex items-center justify-center'>
             
            <img  src='https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif' alt='error...' />

            <h1 className='text-6xl text-red-800 fixed top-1/2 left-1/2'>oops error page</h1>
        </div>
    );
};

export default Error;