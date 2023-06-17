import axios from 'apiService/axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contacts = () => {
    const [contact, setContact] = useState([])
    const [messageId, setMessageId] = useState("")
    useEffect(() => {
        axios.get('/contact')
            .then(res => {
                setContact(res?.data?.contact)
                console.log(res?.data?.contact);
            })
    }, [])

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const user = useSelector(state => state.reducer?.user)
    console.log(user);
    const onsubmit = (data) => {
        console.log(data);
        const userData = { message: data.message }
        console.log(userData);
        axios.post('/contact', userData)
            .then(data => {
                if (data.status == 200) {
                    toast.success("successfully register")

                }

            })
            .catch(error => {
                // setLoader(false)
                console.log(error);

                toast.error(error.response.data.error)
            });
        reset()
    }
    return (
        <div className=' bg-black  h-screen'>
            <div className='relative bg-contact bg-center bg-cover bg-no-repeat bg-static bg-fixed container-sk ' id='contact'>
                <div className='container-ml   pb-10'>
                    <div className='pt-1  '>
                        <h1 className='text-white text-[40px] px-3 border-l-[5px] border-white h-[60px] my-12 '>Contact with us</h1>
                    </div>
                    <div>
                        {
                            contact.map(item => <div className=' '>
                               <div className='borde'>
                               <div className='rounded-sm flex justify-between items-center  mt-2 p-3 bg-red-500'>
                                    <h1 className='text-white'>{item?.message}d</h1>
                                    <button className="bg-gray-400 px-6 py-3" onClick={() => setMessageId(item?._id)}>message</button>
                                </div>

                                {item._id == messageId && <div className=' '>
                                    <form className="  flex justify-start items-center" onSubmit={handleSubmit(onsubmit)}>
                                        <div className=' '>
                                            <div>
                                                {/* <CustomeLabel name={"Message"} /> */}
                                                <textarea type="text" placeholder=" reply for  user comment" className="block border w-full px-5 py-3 mt-2 text-[#eae9e9d4]  placeholder-[#eae9e9d4] bg-transparent shadow-lg rounded-lg " {...register("message")} required />
                                            </div>


                                        </div>

                                        <button className="   px-6 py-3 mt-4 text-sm font-medium    capitalize transition-colors duration-300 transform bg-[#FFFFFFB2] rounded-lg hover:bg-blue-400 mx-3   ">
                                            <span className='text-[#002868]  '>SEND NOW</span>

                                        </button>
                                    </form>
                                </div>

                                }
                               </div>
                            </div>


                            )
                        }
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Contacts;

export const CustomeLabel = ({ name }) => {
    return (
        <label className="flex mb-2 text-sm text-white">

            {name}

            <span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-asterisk text-red" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
            </svg></span>
        </label>
    )

}