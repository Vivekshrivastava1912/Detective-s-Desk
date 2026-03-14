import React from 'react'

const AquaMarquee = () => {
  const sceneText = "Scene 1: The Fractured Perimeter • Scene 2: Echoes of Enmity • Scene 3: The Final Transaction • Scene 4: Shadows in the Alley • ";

  return (
    // NAYA WRAPPER: Ye screen ki width ko 100% par lock kar dega aur bahar ka hissa hide kar dega
    <div className="w-full max-w-[100vw] overflow-hidden py-4 ">
      
      {/* Marquee Container: w-[110vw] aur -ml-[5vw] se tilt hone par kone khali nahi rahenge */}
      <div className="bg-black py-1 border-t border-b border-cyan-400 flex transform -rotate-2 w-[110vw] -ml-[5vw]">
        
        {/* Moving Text Container */}
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Text Repeated for Infinite Loop */}
          <span className="text-cyan-400 text-sm uppercase flex items-center mr-2">
            {sceneText + sceneText}
          </span>
          <span className="text-cyan-400 text-sm uppercase flex items-center mr-2">
            {sceneText + sceneText}
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
    </div>
  )
}

export default AquaMarquee