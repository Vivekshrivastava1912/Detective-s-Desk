import React from 'react'

const RedMarquee = () => {
  const techText = "CRIME SCENE ALPHA • EVIDENCE DETECTED • ANALYZING DATA • ACCESS GRANTED • SYSTEM BREACH • ";

  return (
    <div className="bg-black py- overflow-hidden border-t border-b border-red-600 flex group min-w-full">
      {/* Moving Text Container */}
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Text Repeated for Infinite Loop */}
        <span className="text-red-600 text-sm font-md tracking-widest uppercase flex items-center shadow-[3px_0_10px_rgba(220,38,38,0.5)]">
          {techText + techText + techText}
        </span>
        <span className="text-red-600 text-sm font-md tracking-widest uppercase flex items-center shadow-[3px_0_10px_rgba(220,38,38,0.5)]">
          {techText + techText + techText}
        </span>
      </div>

      {/* Tailwind and CSS for Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default RedMarquee