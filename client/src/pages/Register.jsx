import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => ({ ...preve, [name]: value }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must be same")
      return
    }
    try {
      const response = await Axios({ ...SummaryApi.register, data: data })
      if (response.data.error) toast.error(response.data.message)
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
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>

      {/* Grid background */}
      <div className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className='relative z-10 w-full max-w-md'>
        <div className='h-px w-full bg-linear-to-r from-transparent via-white to-transparent mb-0.5 opacity-60' />

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
              Detective's <span className='text-white/40'>Desk</span>
            </h1>
            <p className='text-white/30 text-sm mt-1 font-light tracking-widest uppercase'>Create Account</p>
            <div className='mt-4 h-px bg-linear-to-r from-white/20 to-transparent' />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* Name */}
            <div className='space-y-1.5'>
              <label htmlFor='name' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                Full Name
              </label>
              <input
                type="text"
                id='name'
                autoFocus
                value={data.name}
                name='name'
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                placeholder='Enter your full name'
              />
            </div>

            {/* Email */}
            <div className='space-y-1.5'>
              <label htmlFor='email' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                Email
              </label>
              <input
                type="email"
                id='email'
                value={data.email}
                name='email'
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                placeholder='your@email.com'
              />
            </div>

            {/* Password Row */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1.5'>
                <label htmlFor='password' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    value={data.password}
                    name='password'
                    onChange={handleChange}
                    className='w-full px-3 py-3 pr-9 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                    placeholder='••••••'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(prev => !prev)}
                    className='absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-300'
                  >
                    {showPassword ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                  </button>
                </div>
              </div>

              <div className='space-y-1.5'>
                <label htmlFor='confirmPassword' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                  Confirm
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id='confirmPassword'
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                    className='w-full px-3 py-3 pr-9 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                    placeholder='••••••'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className='absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-300'
                  >
                    {showConfirmPassword ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={!valideValue}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 mt-2
                ${valideValue
                  ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
                }`}
            >
              Create Account
            </button>

            <div className='flex items-center gap-3 my-2'>
              <div className='flex-1 h-px bg-white/10' />
              <span className='text-white/20 text-xs'>or</span>
              <div className='flex-1 h-px bg-white/10' />
            </div>

            <p className='text-center text-sm text-white/30'>
              Already have an account?{' '}
              <Link to="/login" className='text-white font-semibold hover:opacity-70 transition-opacity'>
                Sign In
              </Link>
            </p>
          </form>
        </div>
        <div className='h-px w-full bg-linear-to-r from-transparent via-white to-transparent mt-0.5 opacity-20' />
      </div>
    </section>
  )
}

export default Register