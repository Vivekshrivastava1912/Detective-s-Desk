import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5"; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate() 

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return { ...preve, [name]: value }
    })
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must be same")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data 
      })
      if (response.data.error) {
        toast.error(response.data.message) 
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({ name: "", email: "", password: "", confirmPassword: "" })
        navigate("/login")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <>
      {/* Background ko fully transparent/blur rakhne ke liye fixed overlay */}
      <section className='fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4'>
        
        <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-purple-100 relative overflow-hidden'>
          
          {/* Back Button - Ab ye hamesha Home page (/) par le jayega */}
          <button 
            onClick={() => navigate("/")} 
            className='absolute top-5 left-5 text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium'
          >
            <IoArrowBack size={20}/> Back
          </button>

          <div className='text-center mb-8 mt-4'>
              <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>FlashMart</h2>
              <p className='text-purple-600 font-medium mt-2'>Welcome! Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-1'>
              <label htmlFor='name' className='block text-sm font-semibold text-gray-700 ml-1'>Name</label>
              <input 
                type="text"
                id='name'
                autoFocus
                value={data.name}
                name='name'
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                placeholder='Enter Your Name' 
              />
            </div>

            <div className='space-y-1'>
              <label htmlFor='email' className='block text-sm font-semibold text-gray-700 ml-1'>Email</label>
              <input 
                type="email"
                id='email'
                value={data.email}
                name='email'
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                placeholder='Enter Your Email'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label htmlFor='password' className='block text-sm font-semibold text-gray-700 ml-1'>Password</label>
                <div className='relative flex items-center'>
                    <input 
                    type={showPassword ? "text" : "password"}
                    id='password'
                    value={data.password}
                    name='password'
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                    placeholder='Password' 
                    />
                    <div onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-purple-600'>
                        { showPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/> }
                    </div>
                </div>
              </div>

              <div className='space-y-1'>
                <label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-700 ml-1'>Confirm</label>
                <div className='relative flex items-center'>
                    <input 
                    type={showConfirmPassword ? "text" : "password"}
                    id='confirmPassword'
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                    placeholder='Confirm' 
                    />
                    <div onClick={() => setShowConfirmPassword(prev => !prev)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-purple-600'>
                        { showConfirmPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/> }
                    </div>
                </div>
              </div>
            </div>

            <button 
              disabled={!valideValue} 
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transform transition-all duration-300 active:scale-95 
                ${valideValue 
                  ? "bg-purple-600 hover:bg-purple-700 cursor-pointer" 
                  : "bg-gray-300 cursor-not-allowed"}`}
            >
              Register Now
            </button>

            <p className='text-center text-sm text-gray-500 mt-4'>
              Already have an account? <Link to={"/login"} className='text-purple-700 font-bold hover:underline cursor-pointer ml-1'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register