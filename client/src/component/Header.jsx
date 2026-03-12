import React, { useEffect, useState } from 'react'

import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
// toast import hata diya kyunki yahan zaroorat nahi hai

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/Search"
  const user = useSelector((state) => state?.user)
  const cart = useSelector((state) => state?.cart)
  const navigate = useNavigate()

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/Login")
      return
    }
    if (location.pathname.includes("userdetails")) {
      navigate(-1)
    } else {
      navigate("/register")
    }
  }

  const handleDesktopUser = () => {
    if (location.pathname.includes("userdetails")) {
      navigate(-1)
    } else {
      navigate("/userdetails")
    }
  }

  // ✅ New Logic to Calculate Cart Total from LocalStorage
  const [localCartTotal, setLocalCartTotal] = useState({ items: 0, price: 0 });

  useEffect(() => {
    const updateCartTotal = () => {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const totalItems = storedCart.length;
      const totalPrice = storedCart.reduce((acc, item) => acc + (item.sellingPrice || item.price || 0), 0);
      setLocalCartTotal({ items: totalItems, price: totalPrice });
    };

    // Initial load
    updateCartTotal();

    // Set an interval to check local storage changes (since other tabs/components might change it)
    const intervalId = setInterval(updateCartTotal, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <header className='h-auto lg:h-20 shadow-lg sticky top-0 z-40 bg-linear-to-r from-purple-50 to-purple-200 flex flex-col justify-center py-2 lg:py-0'>

        {/* TOP ROW */}
        {!(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center justify-between px-4 gap-2 md:gap-8'>

            {/* Logo Section */}
            <div className='flex items-center shrink-0 lg:ml-30'>
              
            </div>

            {/* Search bar - Desktop Only (Large screens) */}
            <div className='hidden lg:flex flex-1 max-w-lg'>
              <Search />
            </div>

            {/* Action Buttons Section (Desktop & Tablet) */}
            <div className='hidden md:flex items-center gap-3 lg:gap-5 shrink-0'>

              {/* Login / Account Section */}
              {user?._id ? (
                <div
                  onClick={handleDesktopUser}
                  className='group flex items-center gap-2 cursor-pointer select-none 
                             bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-xl
                             shadow-sm hover:shadow-md hover:bg-purple-50 
                             transition-all duration-300 transform hover:scale-105 active:scale-95'
                >
                  <div className='text-purple-500 group-hover:text-purple-700 transition-colors duration-300 group-hover:rotate-12'>
                    <FaUserCircle size={22} />
                  </div>
                  <p className='font-bold text-sm tracking-wide'>Account</p>
                </div>
              ) : (
                <Link
                  to={"Login"}
                  className="relative px-3 py-1.5 bg-purple-500 text-white font-black uppercase rounded-md
                  transition-all duration-300 
                  hover:bg-purple-500 group inline-block text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = e.currentTarget;
                    const destination = target.getAttribute('href');
                    target.style.animation = "superShake 1s cubic-bezier(.36,.07,.19,.97) both";
                    setTimeout(() => {
                      window.location.href = destination;
                    }, 800);
                  }}
                >
                  <div className="relative inline-block">
                    Login
                    <div className="absolute left-0 w-0 h-1 bg-purple-50 transition-all duration-500 group-hover:w-full"></div>
                  </div>

                  <style>{`
                  @keyframes superShake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-3deg); }
                    20%, 40%, 60%, 80% { transform: translateX(10px) rotate(3deg); }
                  }
                `}</style>
                </Link>
              )}

              {/* Cart Button */}
              <button
                onClick={() => navigate('/mycard')} // ✅ Updated Route here just in case
                className="flex items-center gap-3 bg-purple-500 lg:mr-30 text-white px-2 py-[-3] rounded-md hover:bg-green-600 transition-all duration-300 shadow-md group active:scale-95"
              >
                <div className="flex items-center justify-center">
                  <FaShoppingCart size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="text-left border-l border-purple-800 pl-2 leading-tight">
                  {/* ✅ Using localCartTotal instead of Redux cart */}
                  <p className="text-xs lg:text-sm font-bold">{localCartTotal.items} items</p>
                  <p className="text-[10px] lg:text-xs font-medium opacity-90">₹{localCartTotal.price}</p>
                </div>
              </button>
            </div>

            {/* User Icon - Mobile Only */}
            <div
              className='md:hidden flex items-center shrink-0 cursor-pointer'
              onClick={handleMobileUser}
            >
              <div className='text-purple-500 transition-all duration-300 ease-in-out
                            hover:text-purple-500 hover:scale-110 hover:-rotate-12 
                            active:scale-95'>
                <FaUserCircle size={30} />
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM ROW: Mobile Search bar (Only small & medium screens) */}
        <div className='lg:hidden px-4 mt-2 mb-1 w-full'>
          <Search />
        </div>

      </header>
    </>
  )
}

export default Header