import React, { useEffect, useState } from "react";

const useMobile = (breakpoint = 768) => {
    // 1. Initial state setup
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

    const handleResize = () => {
       
        const checkpoint = window.innerWidth < breakpoint
        setIsMobile(checkpoint)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
       
            window.removeEventListener('resize', handleResize)
        }
        
    }, []) 

    return [isMobile]
}

export default useMobile