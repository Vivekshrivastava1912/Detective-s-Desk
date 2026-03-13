import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import { IoArrowBack, IoMailOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'

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
      if (response.data.error) toast.error(response.data.message)
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/verifyotp", { state: { email: data.email } })
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
            onClick={() => navigate("/login")}
            className='flex items-center gap-1.5 text-white/40 hover:text-white transition-all duration-300 text-sm font-medium mb-8 group'
          >
            <IoArrowBack size={16} className='group-hover:-translate-x-1 transition-transform duration-300' />
            Back to Login
          </button>

          {/* Icon */}
          <div className='flex justify-center mb-6'>
            <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center'>
              <IoMailOutline size={30} className='text-white/60' />
            </div>
          </div>

          {/* Header */}
          <div className='mb-8 text-center'>
            <h1 className='text-2xl font-black text-white tracking-tight'>
              Forgot Password
            </h1>
            <p className='text-white/30 text-sm mt-2 font-light'>
              Enter your email and we'll send a recovery OTP
            </p>
            <div className='mt-4 h-px bg-linear-to-r from-transparent via-white/20 to-transparent' />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-1.5'>
              <label htmlFor='email' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                Email Address
              </label>
              <input
                type="email"
                id='email'
                name='email'
                autoFocus
                value={data.email}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                placeholder='your@email.com'
              />
            </div>

            <button
              disabled={!valideValue}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95
                ${valideValue
                  ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
                }`}
            >
              Send OTP
            </button>
          </form>
        </div>
        <div className='h-px w-full bg-linear-to-r from-transparent via-white to-transparent mt-0.5 opacity-20' />
      </div>
    </section>
  )
}

export default ForgotPassword