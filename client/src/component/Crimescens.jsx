import React from 'react'
import AquaMarquee from './AquaMarguee'
import vid1 from '../assets/1CRIME.mp4';
import vid2 from '../assets/2CRIME.mp4';
import vid3 from '../assets/3CRIME.mp4';
import vid4 from '../assets/4CRIME.mp4';

const Crimescens = () => {
  const avidences = [
    { 
      id: 1, 
      title: 'Scene 1: The Fractured Perimeter', 
      description: 'At exactly 4:30 AM, the silence of SQL City was shattered. The heavy iron gate at the rear of the estate shows signs of a forced entry, but this wasn\'t a professional "clean" job. The perpetrator used brute force, driven by a deep-seated grudge. Muddy footprints lead from the gate toward the main study, suggesting the killer knew exactly where the victim would be at this pre-dawn hour.', 
      video: vid1 
    },
    { 
      id: 2, 
      title: 'Scene 2: Echoes of Enmity', 
      description: 'The hallway serves as a grim timeline of the confrontation. Toppled vases and a shattered display case indicate a violent struggle. While the motive appeared to be robbery—given the emptied safe in the corner—the sheer aggression displayed suggests something more personal. This wasn\'t just about the money; it was about settling an old score that had been simmering for years.', 
      video: vid2 
    },
    { 
      id: 3, 
      title: 'Scene 3: The Final Transaction', 
      description: 'The heart of the tragedy lies here. The victim was found slumped over his desk, surrounded by scattered financial ledgers and a disconnected hard drive. The clock on the wall stopped at 4:32 AM during the scuffle. A single, cold blow delivered from behind reveals the "Dushmani" (enmity) aspect—a calculated strike from someone who didn\'t just want the victim\'s wealth, but his total elimination.', 
      video: vid3 
    },
    { 
      id: 4, 
      title: 'Scene 4: Shadows in the Alley', 
      description: 'Evidence trails off into the narrow alleyway behind the property. A discarded glove and a dropped piece of jewelry—likely a trophy from the robbery—were found near the drainage pipe. The killer vanished into the SQL City fog just as the first light of dawn broke. Every scrap of evidence here points to a perpetrator who was fueled by greed but guided by a long-standing hatred.', 
      video: vid4 
    }
  ];

  return (
    <div className='min-h-screen bg-[#0a0a0a] pb-16'>
      {/* Marquee Section */}
      <div className='bg-black '>
        <AquaMarquee />
      </div>

      {/* Title Section */}
      <div className='flex w-full justify-center mt-10 mb-10'>
        <h1 className='px-6 py-1 rounded-xl text-xl sm:text-2xl md:text-3xl text-white font-bold flex 
                bg-white/5 transition-all duration-500 ease-in-out 
                hover:-translate-y-1 hover:bg-white/10 cursor-pointer border border-white/10 hover:border-cyan-500/50 shadow-lg'>
          THE CRIME
          <span className='text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] ml-3'>
             SCENE
          </span>
        </h1>
      </div>

      {/* Grid Container for Scenes */}
      <div className='flex flex-col gap-10 max-w-7xl mx-auto px-4 md:px-8'>
        {avidences.map((item, index) => (
          <div 
            key={item.id} 
            // Alternating Layout: Even/Odd rows ke liye direction change (Mobile par normal, desktop par reverse)
            className={`group flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} 
            bg-[#141414] rounded-2xl border border-white/5 overflow-hidden 
            hover:border-cyan-900/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] 
            transition-all duration-500`}
          >
            
            {/* Text Content Area */}
            <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative'>
              {/* Subtle background glow on hover */}
              <div className='absolute inset-0 bg-linear-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
              
              <div className='relative z-10'>
                {/* Scene Number Tag */}
               
                
                <h2 className='text-zinc-100 text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-300 transition-colors duration-300'>
                  {item.title}
                </h2>
                <p className='text-zinc-400 text-sm md:text-base leading-relaxed'>
                  {item.description}
                </p>
              </div>
            </div>

            {/* Video Area */}
            <div className='w-full md:w-1/2 relative overflow-hidden bg-black min-h-62.5 md:min-h-87.5'>
              <video 
                src={item.video} 
                autoPlay 
                loop 
                muted 
                playsInline // Mobile par full screen hone se rokata hai
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 opacity-70 group-hover:opacity-100' 
              />
              
              {/* Blending Gradient on Desktop */}
           
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Crimescens