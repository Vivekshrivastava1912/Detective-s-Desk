import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import { IoArrowBack } from "react-icons/io5"; 
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate() 
  const [data, setData] = useState({ email: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => ({ ...preve, [name]: value }))
  }

  const valideValue = data.email.trim() !== ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        method: 'put', 
        url: "api/user/forget-password", 
        data: data 
      })

      if (response.data.error) {
        toast.error(response.data.message) 
      }

      if (response.data.success) {
        toast.success(response.data.message)
        // YAHAN CHANGE: email ko agle page par bhej rahe hain
        navigate("/verifyotp", { state: { email: data.email } }) 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4'>
      <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-purple-100 relative'>
        <button onClick={() => navigate("/login")} className='absolute top-5 left-5 text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium'>
          <IoArrowBack size={20}/> Back
        </button>
        <div className='text-center mb-8 mt-4'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>FlashMart</h2>
            <p className='text-purple-600 font-medium mt-2'>Verify Email</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='space-y-1'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-700 ml-1'>Email</label>
            <input 
              type="email" id='email' name='email' autoFocus value={data.email} onChange={handleChange}
              className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
              placeholder='Enter your email'
            />
          </div>
          <button disabled={!valideValue} className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transform transition-all duration-300 active:scale-95 ${valideValue ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"}`}>
            Send OTP
          </button>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassword