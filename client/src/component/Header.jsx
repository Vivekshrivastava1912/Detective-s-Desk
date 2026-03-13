import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios'; 
import SummaryApi from '../common/SummaryApi'; 

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/Search"
  const user = useSelector((state) => state?.user)
 
  const navigate = useNavigate()

  const isUserLoggedIn = user?._id || localStorage.getItem('accesstoken');

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleMobileUser = () => {
    if (!isUserLoggedIn) {
      navigate("/Login")
      return
    }
    if (location.pathname.includes("userdetails")) {
      navigate(-1)
    } else {
      navigate("/userdetails")
    }
  }

  const handleDesktopUser = () => {
    if (location.pathname.includes("userdetails")) {
      navigate(-1)
    } else {
      navigate("/userdetails")
    }
    setOpenUserMenu(false); 
  }

  // ✅ Logout Logic bilkul UserDetails jaisa kar diya hai
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
        withCredentials: true
      });

      if (response.data.success) {
        localStorage.clear();
        window.location.href = "/Login"; 
      }
    } catch (error) {
      console.error("Logout failed", error);
      // Agar error bhi aaye, tab bhi local storage saaf karke login pe bhej dega
      localStorage.clear();
      window.location.href = "/Login";
    }
  }

  const [localCartTotal, setLocalCartTotal] = useState({ items: 0, price: 0 });

  useEffect(() => {
    const updateCartTotal = () => {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const totalItems = storedCart.length;
      const totalPrice = storedCart.reduce((acc, item) => acc + (item.sellingPrice || item.price || 0), 0);
      setLocalCartTotal({ items: totalItems, price: totalPrice });
    };

    updateCartTotal();
    const intervalId = setInterval(updateCartTotal, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <header className='h-auto lg:h-20 shadow-lg sticky top-0 z-40 bg-linear-to-r from-purple-50 to-purple-200 flex flex-col justify-center py-2 lg:py-0'>
        {!(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center justify-between px-4 gap-2 md:gap-8'>
            <div className='flex items-center shrink-0 lg:ml-30'>
              
            </div>

            <div className='hidden md:flex items-center gap-3 lg:gap-5 shrink-0'>

              {isUserLoggedIn ? (
                <div className='relative'>
                  <div
                    onClick={() => setOpenUserMenu(prev => !prev)}
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

                  {openUserMenu && (
                    <div className='absolute top-14 right-0 bg-white shadow-xl rounded-lg p-2 min-w-[150px] border border-gray-100 flex flex-col z-50'>
                      <div 
                        onClick={handleDesktopUser} 
                        className='cursor-pointer px-4 py-2 hover:bg-purple-50 text-gray-700 rounded-md text-sm font-medium transition-colors'
                      >
                        My Profile
                      </div>
                      <div 
                        onClick={handleLogout} 
                        className='cursor-pointer px-4 py-2 hover:bg-red-50 text-red-600 rounded-md text-sm font-bold transition-colors mt-1'
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={"Login"}
                  className="relative px-3 py-1.5 bg-purple-500 text-white font-black uppercase rounded-md
                  transition-all duration-300 
                  hover:bg-purple-500 group inline-block text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/Login")
                  }}
                >
                  <div className="relative inline-block">
                    Login
                    <div className="absolute left-0 w-0 h-1 bg-purple-50 transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </Link>
              )}

            </div>

            <div className='md:hidden relative'>
              <div
                className='flex items-center shrink-0 cursor-pointer text-purple-500 transition-all duration-300 ease-in-out hover:text-purple-500 hover:scale-110 hover:-rotate-12 active:scale-95'
                onClick={() => {
                   if(!isUserLoggedIn) { navigate('/Login'); return; }
                   setOpenUserMenu(prev => !prev);
                }}
              >
                <FaUserCircle size={30} />
              </div>

               {openUserMenu && isUserLoggedIn && (
                  <div className='absolute top-10 right-0 bg-white shadow-xl rounded-lg p-2 min-w-[150px] border border-gray-100 flex flex-col z-50'>
                    <div 
                      onClick={() => { handleMobileUser(); setOpenUserMenu(false); }} 
                      className='cursor-pointer px-4 py-2 hover:bg-purple-50 text-gray-700 rounded-md text-sm font-medium transition-colors'
                    >
                      My Profile
                    </div>
                    <div 
                      onClick={handleLogout} 
                      className='cursor-pointer px-4 py-2 hover:bg-red-50 text-red-600 rounded-md text-sm font-bold transition-colors mt-1'
                    >
                      Logout
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header