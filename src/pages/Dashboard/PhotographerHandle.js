import React, { useEffect, useState } from 'react';
import axios from 'apiService/axios'
import { Button, Modal, TextField } from '@mui/material';
import { Formik } from 'formik';
 
const PhotographerHandle = () => {
    const [photographer,setPhotographer] = useState([])
    const [open, setOpen] =  useState(false);
    const [price,setPrice] = useState({})
    const handleOpen = async (id) => {
      const value = photographer.find(item=>item._id===id);
      
      setPrice(value)
      setOpen(true);
    }
    const handleClose = () => setOpen(false);
    useEffect(()=>{
      axios.get("/photographer")
      .then(res=>{
        console.log(res);
        setPhotographer(res?.data?.data)
      })
    },[])
    const handleDelete=e=>{
        axios.delete(`/photographer/${e}`)
        .then(response => {
          console.log('Delete request succeeded!');
          const filter = photographer.filter(item=>item._id!==e)
          setPhotographer(filter)
          // Handle the response data here if needed
        })
        .catch(error => {
          console.error('Error occurred while making the delete request:', error);
          // Handle the error here
        });
    }
    const handleActive=(e,bool)=>{
        let status;
        console.log(bool);
        if(bool=='false'){
            status = true;
            console.log(status);
        }
        else{
            status = false;
            console.log(status);
        }
        axios.patch(`/photographer/${e}`,{activeStatus:status})
        .then(response => {
          console.log('Delete request succeeded!');
        //   const filter = photographer.filter(item=>item._id!==e)
        //   setPhotographer(filter)
          // Handle the response data here if needed
        })
        .catch(error => {
          console.error('Error occurred while making the delete request:', error);
          // Handle the error here
        });
    }
    const handleSubmit = (values)=>{
      //  console.log(values,price._id);
      axios.patch(`/photographer/${price._id}`,{amount:values.amount})
      .then(response => {
        console.log(' ');
      //   const filter = photographer.filter(item=>item._id!==e)
      //   setPhotographer(filter)
        // Handle the response data here if needed
      })
      .catch(error => {
        console.error('Error occurred while making the delete request:', error);
        // Handle the error here
      });
    }
      return (
         <div className='container-sk'>
           <div  className='flex flex-wrap gap-y-3 '>
             { photographer.map(item=><div className="max-w-xs mx-auto bg-white rounded shadow-lg p-6 relative border border-[#BECCBE]">
        <div className="flex items-center justify-center" key={item._id}>
          <img src={item.imageURL} alt="loading ..." className="w-[150px] h-[150px] rounded-full" />
          <p className="absolute top-0 right-0 text-2xl font-bold mt-2 mr-2">${item?.amount}/hr</p>
        </div>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">{item?.name}</h2>
          <p className="text-gray-700">Photographer</p>
          <p className="text-gray-700 my-5"> * {item?.rating}/5 (6 jobs)</p>
        </div>
        <div className=' flex justify-between mb-12'>
        <p>Photography</p>
        <p>Photography</p>
        </div>
        <div className='flex justify-center flex-wrap gap-2'>
            <button className='bg-black hover:underline text-white px-3 py-1 rounded-sm mx-2' onClick={()=>handleDelete(item?._id)}>delete</button>
            <button className='bg-black hover:underline text-white px-3 py-1 rounded-sm mx-2' onClick={()=>handleOpen(item?._id)}>update</button>
            <button className='bg-black hover:underline text-white px-3 py-1 rounded-sm mx-2'  onClick={()=>handleActive(item?._id,item?.activeStatus)}>active {item.activeStatus}</button>
            
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:h-[40vw]  h-[75vh] bg-gray-700 rounded-lg pb-5'>
            <div className='flex items-center justify-center'>
            <Formik
                                    enableReinitialize
                                    initialValues={{
                                      amount:price?.amount||""
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.amount) {
                                            errors.amount = "Please enter your amount.";
                                        } 
                                        return errors;
                                    }}
                                    onSubmit={(values, { resetForm }) => {
                                       handleSubmit(values)
                                    }}
                                    
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,

                                        /* and other goodies */
                                    }) => (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="mt-5 lg:mt-10 flex flex-col gap-4"
                                        >
                                            <TextField
                                            type='number'
                                                autoComplete="off"
                                                name="amount"
                                                fullWidth
                                                className="custom-input"
                                                id="amount"
                                                label="amount"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.amount}
                                                InputLabelProps={{
                                                    style: { color: "#FFFFFF" },
                                                }}
                                                error={
                                                    errors.amount &&
                                                    touched.amount &&
                                                    errors.amount
                                                }
                                                helperText={
                                                    errors.amount &&
                                                    touched.amount &&
                                                    errors.amount
                                                }
                                            />

                                            
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                className="py-3 bg-primary capitalize lg:text-2xl md:text-xl text-lg text-white hover:font-bold duration-300 font-display"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save
                                            </Button>


                                        </form>
                                    )}
                                </Formik>
            </div>
        </div>
      </Modal>
      </div>) }
  
          </div>
         </div>
    );
};

export default PhotographerHandle;