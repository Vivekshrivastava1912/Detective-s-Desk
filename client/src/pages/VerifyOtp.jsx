import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import { IoArrowBack } from "react-icons/io5"; 
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(["", "", "", "", "", ""]) 
  const inputRefs = useRef([])

  useEffect(() => {
    if (!location?.state?.email) {
        navigate("/forgotpassword")
    }
  }, [location, navigate])

  const handleChange = (index, value) => {
    if (isNaN(value)) return 
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) 
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
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
        data: {
            otp: fullOtp,
            email: location?.state?.email
        }
      })

      if (response.data.error) {
        toast.error(response.data.message) 
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setOtp(["", "", "", "", "", ""])
        // YAHAN CHANGE: Email ko ResetPassword page par bhej rahe hain
        navigate("/resetpassword", { state: { email: location?.state?.email } }) 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP")
    }
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4'>
      <div className='bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-purple-100 relative'>
        <button onClick={() => navigate("/forgotpassword")} className='absolute top-5 left-5 text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium'>
          <IoArrowBack size={20}/> <span className='hidden sm:inline'>Back</span>
        </button>
        <div className='text-center mb-8 mt-4'>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight'>Verify OTP</h2>
            <p className='text-purple-600 font-medium mt-2 text-sm sm:text-base'>Enter code sent to {location?.state?.email}</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='flex justify-center gap-2 sm:gap-3'>
            {otp.map((data, index) => (
                <input 
                    key={index} type="text" inputMode="numeric" maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data} onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className='w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all'
                />
            ))}
          </div>
          <button disabled={!valideValue} className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-white shadow-md transform transition-all duration-300 active:scale-95 ${valideValue ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"}`}>
            Verify OTP
          </button>
        </form>
      </div>
    </section>
  )
}

export default VerifyOtp