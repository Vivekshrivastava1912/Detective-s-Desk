import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa"
import { IoMenuOutline, IoCloseOutline, IoLogOutOutline, IoPersonOutline } from "react-icons/io5"
import useMobile from '../hooks/useMobile'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const NAV_LINKS = [
  { label: 'Home', to: '/home' },
  { label: 'Problem', to: '/register' },
  { label: 'Rules', to: '/login' },
  { label: 'Learn SQL', to: '/learnsql' }
]

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()

  const user = useSelector((state) => state?.user)
  const isUserLoggedIn = user?._id || localStorage.getItem('accesstoken')

  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)

  // Scroll effect — add backdrop when scrolled
  

  // Close dropdown on outside click
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenUserMenu(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout, withCredentials: true })
      if (response.data.success) {
        localStorage.clear()
        window.location.href = '/login'
      }
    } catch (error) {
      localStorage.clear()
      window.location.href = '/login'
    }
  }

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <header
       className='bg-black p-3 sticky top-0 z-50'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between'>

          {/* ── LOGO (Animated Hover) ── */}
          <Link
            to='/home'
            className='flex items-center gap-3 group select-none relative z-50'
          >
            {/* Icon mark */}
            <div className='relative  rounded-xl overflow-hidden flex items-center justify-center
                            border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/50 
                            transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)]
                            group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]'
            >
              {/* Scanline effect on hover */}
              <div className='absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-transparent -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]' />
             
            </div>

            <div className='flex flex-col'>
              <div className='flex items-baseline gap-1.5'>
                <span className='text-white font-black text-xl tracking-tighter leading-none'>
                  Detective's
                </span>
                <span className='text-white/40 font-black text-xl tracking-tighter leading-none group-hover:text-white/80 transition-colors duration-500'>
                  Desk
                </span>
              </div>
              
            </div>
          </Link>

          {/* ── DESKTOP NAV (Magnetic Links Effect) ── */}
          <nav className='hidden md:flex items-center gap-2 bg-white/3 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]'>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-5 py-2 text-sm font-semibold tracking-wider transition-all duration-500 rounded-xl overflow-hidden group
                  ${isActive(to)
                    ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
              >
                {/* Glow effect on hover over unselected items */}
                {!isActive(to) && (
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] transition-opacity duration-500' />
                )}
                
                <span className='relative z-10'>{label}</span>
              </Link>
            ))}
          </nav>

          {/* ── RIGHT SIDE ── */}
          <div className='flex items-center gap-4 relative z-50'>

            {/* Desktop: Account / Login */}
            {isUserLoggedIn ? (
              <div className='hidden md:block relative' ref={menuRef}>
                <button
                  onClick={() => setOpenUserMenu(prev => !prev)}
                  className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-2xl border transition-all duration-500
                             text-sm font-semibold tracking-wide
                             ${openUserMenu 
                              ? 'bg-white/10 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                              : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30'}`}
                >
                  <div className='w-7 h-7 bg-white/10 rounded-full flex items-center justify-center'>
                    <FaUserCircle size={16} className={openUserMenu ? 'text-white' : 'text-white/70'} />
                  </div>
                  <span>Account</span>
                  {/* Neon Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-500 ${openUserMenu ? '-rotate-180 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-white/40'}`}
                    fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                  </svg>
                </button>

                {/* Dropdown (Animated) */}
                <div 
                  className={`absolute top-[calc(100%+12px)] right-0 w-52 bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden z-50 transition-all duration-300 origin-top-right
                    ${openUserMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
                >
                  {/* Glowing top line */}
                  <div className='absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/50 to-transparent' />
                  
                  <div className='p-2'>
                    <button
                      onClick={() => { navigate('/userdetails'); setOpenUserMenu(false) }}
                      className='group w-full flex items-center gap-3 px-3 py-3 rounded-xl
                                 text-white/60 hover:text-white hover:bg-white/10
                                 transition-all duration-300 text-sm font-semibold text-left'
                    >
                      <div className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors'>
                        <IoPersonOutline size={16} />
                      </div>
                      My Profile
                    </button>
                    <div className='h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-1' />
                    <button
                      onClick={handleLogout}
                      className='group w-full flex items-center gap-3 px-3 py-3 rounded-xl
                                 text-white/50 hover:text-red-400 hover:bg-red-500/10
                                 transition-all duration-300 text-sm font-semibold text-left'
                    >
                      <div className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors'>
                        <IoLogOutOutline size={16} />
                      </div>
                      Secure Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='hidden md:inline-flex relative items-center justify-center px-8 py-2.5 rounded-full overflow-hidden group'
              >
                {/* Glowing Background */}
                <div className='absolute inset-0 bg-white transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
                
                <span className='relative z-10 text-black text-sm font-black tracking-widest uppercase'>
                  Login
                </span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className='md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl
                         border border-white/10 bg-white/5 text-white/70 hover:text-white
                         active:scale-90 transition-all duration-300'
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label='Toggle menu'
            >
              {mobileMenuOpen
                ? <IoCloseOutline size={22} className='animate-in spin-in-90' />
                : <IoMenuOutline size={22} className='animate-in spin-in-90' />
              }
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU (Glassmorphism Slide Down) ── */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-black/95 backdrop-blur-3xl border-b border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)]
            ${mobileMenuOpen ? 'max-h-115 opacity-100 border-t' : 'max-h-0 opacity-0 border-t-0'}`}
        >
          <div className='p-2 flex flex-col gap-4'>

            {NAV_LINKS.map(({ label, to }, i) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-xl text-lg font-bold tracking-wider transition-all duration-300 overflow-hidden
                  ${isActive(to)
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                    : 'text-white/60 bg-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                style={{
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transitionDelay: `${i * 50}ms`
                }}
              >
                {label}
              </Link>
            ))}

            <div className='h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-2' />

            {isUserLoggedIn ? (
              <div 
                className='flex flex-col gap-3'
                style={{
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transitionDelay: '150ms'
                }}
              >
                <button
                  onClick={() => navigate('/userdetails')}
                  className='flex items-center gap-4 px-6 py-2 rounded-xl border border-white/10 bg-[#0a0a0a]
                             text-white/80 transition-all duration-300 text-lg font-semibold text-left'
                >
                  <IoPersonOutline size={24} className='text-white/50' /> My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-4 px-6 py-4 rounded-xl border border-red-500/20 bg-red-500/5
                             text-red-400 transition-all duration-300 text-lg font-semibold text-left'
                >
                  <IoLogOutOutline size={24} className='text-red-500/50' /> Secure Logout
                </button>
              </div>
            ) : (
              <Link
                to='/login'
                className='w-full py-4 rounded-xl text-center shadow-[0_0_30px_rgba(255,255,255,0.1)]
                           bg-white text-black text-lg font-black tracking-widest uppercase
                           active:scale-95 transition-all duration-300'
                style={{
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transitionDelay: '150ms'
                }}
              >
                Login to Access
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* spacer to prevent content from hiding under fixed header */}
      
      
    </>
  )
}

export default Header