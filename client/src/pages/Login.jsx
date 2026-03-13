import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => ({ ...preve, [name]: value }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
        withCredentials: true
      })
      if (response.data.error) toast.error(response.data.message)
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('accesstoken', response.data.data.accesstoken)
        localStorage.setItem('refreshtoken', response.data.data.refreshtoken)
        setData({ email: "", password: "" })
        setTimeout(() => { window.location.href = "/" }, 1500)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>
      
      

      {/* Card */}
      <div className='relative z-10 w-full max-w-md'>

        {/* Glowing top border */}
        <div className='' />

        <div className='bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden'>

          {/* Corner accent */}
          <div className='absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full' />

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className='flex items-center gap-1.5 text-white/40 hover:text-white transition-all duration-300 text-sm font-medium mb-8 group'
          >
            <IoArrowBack size={16} className='group-hover:-translate-x-1 transition-transform duration-300' />
            Back
          </button>

          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-black text-white tracking-tight'>
              Detective's <span className='text-white/40 hover:text-white/50'>Desk</span>
            </h1>
            <p className='text-white/30 text-sm mt-1 font-light tracking-widest uppercase'>Welcome Back</p>
            <div className='mt-4 h-1 bg-linear-to-r from-white/30 to-transparent' />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>

            {/* Email */}
            <div className='space-y-1.5'>
              <label htmlFor='email' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                Email
              </label>
              <input
                type="email"
                id='email'
                autoFocus
                value={data.email}
                name='email'
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                placeholder='your@email.com'
              />
            </div>

            {/* Password */}
            <div className='space-y-1.5'>
              <div className='flex justify-between items-center'>
                <label htmlFor='password' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                  Password
                </label>
                <Link to="/forgotpassword" className='text-xs text-white/30 hover:text-white transition-colors duration-300'>
                  Forgot password?
                </Link>
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  value={data.password}
                  name='password'
                  onChange={handleChange}
                  className='w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                  placeholder='•••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(prev => !prev)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-300'
                >
                  {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={!valideValue}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 mt-2
                ${valideValue
                  ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
                }`}
            >
              Sign In
            </button>

            {/* Divider */}
            <div className='flex items-center gap-3 my-2'>
              <div className='flex-1 h-px bg-white/10' />
              <span className='text-white/20 text-xs'>or</span>
              <div className='flex-1 h-px bg-white/10' />
            </div>

            <p className='text-center text-sm text-white/30'>
              New here?{' '}
              <Link to="/register" className='text-white font-semibold hover:opacity-70 transition-opacity'>
                Create Account
              </Link>
            </p>
          </form>
        </div>

        {/* Glowing bottom border */}
        <div className='h-px w-full bg-linear-to-r from-transparent via-white to-transparent mt-0.5 opacity-20' />
      </div>
    </section>
  )
}

export default Login