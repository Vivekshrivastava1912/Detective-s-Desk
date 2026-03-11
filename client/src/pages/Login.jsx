import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5"; 
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate() 

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return { ...preve, [name]: value }
    })
  }

  // Check if both fields are filled
  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.login, // Make sure SummaryApi has login endpoint
        data: data,
        withCredentials: true // <--- SIRF YE LINE ADD KI HAI COOKIES KE LIYE
      })

      if (response.data.error) {
        toast.error(response.data.message) 
      }

      if (response.data.success) {
        toast.success(response.data.message)
        
        // Storing token/user
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshtoken',response.data.data.refreshtoken)
        setData({ email: "", password: "" })
        
        // --- CHANGE MADE HERE ---
        // navigate("/") ko hata kar window.location.href lagaya hai
        // Taki page reload ho aur Header update ho jaye
        window.location.href = "/" 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4'>
      
      <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-purple-100 relative overflow-hidden'>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/")} 
          className='absolute top-5 left-5 text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium'
        >
          <IoArrowBack size={20}/> Back
        </button>

        <div className='text-center mb-8 mt-4'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>FlashMart</h2>
            <p className='text-purple-600 font-medium mt-2'>Welcome Back! Please Login</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          
          <div className='space-y-1'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-700 ml-1'>Email</label>
            <input 
              type="email"
              id='email'
              autoFocus
              value={data.email}
              name='email'
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
              placeholder='Enter Your Email'
            />
          </div>

          <div className='space-y-1'>
            <div className='flex justify-between items-center px-1'>
                <label htmlFor='password' title='className used instead of class' className='block text-sm font-semibold text-gray-700'>Password</label>
                {/* YAHAN CHANGE KIYA HAI: to="/forgotpassword" set kiya hai */}
                <Link to="/forgotpassword" title="Redirecting to Register..." className='text-xs text-purple-600 hover:underline'>Forgot password?</Link>
            </div>
            <div className='relative flex items-center'>
                <input 
                  type={showPassword ? "text" : "password"}
                  id='password'
                  value={data.password}
                  name='password'
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                  placeholder='Enter Password' 
                />
                <div onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-purple-600'>
                    { showPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/> }
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
            Login
          </button>

          <p className='text-center text-sm text-gray-500 mt-4'>
            Don't have an account? <Link to={"/register"} className='text-purple-700 font-bold hover:underline cursor-pointer ml-1'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login