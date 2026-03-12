import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5"; 
import { useNavigate, useLocation } from 'react-router-dom';

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
    setData((preve) => {
      return { ...preve, [name]: value }
    })
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

      if (response.data.error) {
        toast.error(response.data.message) 
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData({ email: "", newPassword: "", confirmPassword: "" })
        // Successful reset ke baad Home page redirect
        navigate("/")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4'>
      <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-purple-100 relative overflow-hidden'>
        <button onClick={() => navigate("/verifyotp")} className='absolute top-5 left-5 text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium'>
          <IoArrowBack size={20}/> Back
        </button>
        <div className='text-center mb-8 mt-4'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>New Password</h2>
            <p className='text-purple-600 font-medium mt-2 italic text-sm text-center'>Resetting for: {data.email}</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='space-y-1'>
            <label htmlFor='newPassword' className='block text-sm font-semibold text-gray-700 ml-1'>New Password</label>
            <div className='relative flex items-center'>
                <input 
                  type={showPassword ? "text" : "password"} id='newPassword' name='newPassword'
                  value={data.newPassword} onChange={handleChange}
                  className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                  placeholder='Enter new password' 
                />
                <div onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-purple-600'>
                    { showPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/> }
                </div>
            </div>
          </div>
          <div className='space-y-1'>
            <label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-700 ml-1'>Confirm Password</label>
            <div className='relative flex items-center'>
                <input 
                  type={showConfirmPassword ? "text" : "password"} id='confirmPassword' name='confirmPassword'
                  value={data.confirmPassword} onChange={handleChange}
                  className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200'
                  placeholder='Confirm new password' 
                />
                <div onClick={() => setShowConfirmPassword(prev => !prev)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-purple-600'>
                    { showConfirmPassword ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/> }
                </div>
            </div>
          </div>
          <button disabled={!valideValue} className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transform transition-all duration-300 active:scale-95 ${valideValue ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"}`}>
            Reset Password 
          </button>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword