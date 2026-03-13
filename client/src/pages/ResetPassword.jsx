import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack, IoLockClosedOutline } from "react-icons/io5"
import { useNavigate, useLocation } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [data, setData] = useState({
    email: location?.state?.email || "",
    newPassword: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (!location?.state?.email) {
      toast.error("Please verify OTP first")
      navigate("/forgotpassword")
    }
  }, [location, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => ({ ...preve, [name]: value }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same")
      return
    }
    try {
      const response = await Axios({
        method: 'put',
        url: "api/user/reset-password",
        data: data
      })
      if (response.data.error) toast.error(response.data.message)
      if (response.data.success) {
        toast.success(response.data.message)
        setData({ email: "", newPassword: "", confirmPassword: "" })
        navigate("/")
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
            onClick={() => navigate("/verifyotp")}
            className='flex items-center gap-1.5 text-white/40 hover:text-white transition-all duration-300 text-sm font-medium mb-8 group'
          >
            <IoArrowBack size={16} className='group-hover:-translate-x-1 transition-transform duration-300' />
            Back
          </button>

          {/* Icon */}
          <div className='flex justify-center mb-6'>
            <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center'>
              <IoLockClosedOutline size={30} className='text-white/60' />
            </div>
          </div>

          {/* Header */}
          <div className='mb-8 text-center'>
            <h1 className='text-2xl font-black text-white tracking-tight'>Reset Password</h1>
            <p className='text-white/30 text-sm mt-2 font-light'>
              For{' '}
              <span className='text-white/60 font-medium'>{data.email}</span>
            </p>
            <div className='mt-4 h-px bg-linear-to-r from-transparent via-white/20 to-transparent' />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>

            {/* New Password */}
            <div className='space-y-1.5'>
              <label htmlFor='newPassword' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                New Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='newPassword'
                  name='newPassword'
                  value={data.newPassword}
                  onChange={handleChange}
                  className='w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                  placeholder='Enter new password'
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

            {/* Confirm Password */}
            <div className='space-y-1.5'>
              <label htmlFor='confirmPassword' className='block text-xs font-semibold text-white/50 tracking-widest uppercase'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id='confirmPassword'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleChange}
                  className='w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm'
                  placeholder='Confirm new password'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-300'
                >
                  {showConfirmPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                </button>
              </div>
            </div>

            {/* Password match indicator */}
            {data.newPassword && data.confirmPassword && (
              <p className={`text-xs font-medium tracking-wide ${data.newPassword === data.confirmPassword ? 'text-white/50' : 'text-red-400/70'}`}>
                {data.newPassword === data.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}

            <button
              disabled={!valideValue}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 mt-2
                ${valideValue
                  ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
                }`}
            >
              Reset Password
            </button>
          </form>
        </div>
        <div className='h-px w-full bg-linear-to-r from-transparent via-white to-transparent mt-0.5 opacity-20' />
      </div>
    </section>
  )
}

export default ResetPassword