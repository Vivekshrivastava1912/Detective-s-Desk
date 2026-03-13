import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import { IoArrowBack, IoShieldCheckmarkOutline } from "react-icons/io5"
import { useNavigate, useLocation } from 'react-router-dom'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])

  useEffect(() => {
    if (!location?.state?.email) navigate("/forgotpassword")
  }, [location, navigate])

  const handleChange = (index, value) => {
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) inputRefs.current[index + 1].focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const valideValue = otp.every(el => el !== "")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullOtp = otp.join("")
    try {
      const response = await Axios({
        method: 'put',
        url: "api/user/verify-forgot-password-otp",
        data: { otp: fullOtp, email: location?.state?.email }
      })
      if (response.data.error) toast.error(response.data.message)
      if (response.data.success) {
        toast.success(response.data.message)
        setOtp(["", "", "", "", "", ""])
        navigate("/resetpassword", { state: { email: location?.state?.email } })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP")
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
            onClick={() => navigate("/forgotpassword")}
            className='flex items-center gap-1.5 text-white/40 hover:text-white transition-all duration-300 text-sm font-medium mb-8 group'
          >
            <IoArrowBack size={16} className='group-hover:-translate-x-1 transition-transform duration-300' />
            Back
          </button>

          {/* Icon */}
          <div className='flex justify-center mb-6'>
            <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center'>
              <IoShieldCheckmarkOutline size={30} className='text-white/60' />
            </div>
          </div>

          {/* Header */}
          <div className='mb-8 text-center'>
            <h1 className='text-2xl font-black text-white tracking-tight'>Verify OTP</h1>
            <p className='text-white/30 text-sm mt-2 font-light'>
              Code sent to{' '}
              <span className='text-white/60 font-medium'>{location?.state?.email}</span>
            </p>
            <div className='mt-4 h-px bg-linear-to-r from-transparent via-white/20 to-transparent' />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-8'>

            {/* OTP Inputs */}
            <div className='flex justify-center gap-2.5'>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-11 h-14 text-center text-xl font-bold rounded-xl border transition-all duration-300 focus:outline-none
                    ${digit
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'bg-white/5 text-white border-white/10 focus:border-white/40 focus:bg-white/10'
                    }`}
                />
              ))}
            </div>

            <button
              disabled={!valideValue}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95
                ${valideValue
                  ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
                }`}
            >
              Verify & Continue
            </button>
          </form>
        </div>
        <div className='h-px w-full bg-linear-to-r from-transparent via-white to-transparent mt-0.5 opacity-20' />
      </div>
    </section>
  )
}

export default VerifyOtp