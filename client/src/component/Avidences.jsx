import React from 'react'
import RedMarquee from './RedMarques'
import ev1 from '../assets/1EV.jpeg';
import ev2 from '../assets/2EV.jpeg';
import ev3 from '../assets/3EV.jpeg';
import ev4 from '../assets/4EV.jpeg';
import ev5 from '../assets/5EV.jpeg';
import ev6 from '../assets/6EV.jpeg';
import ev7 from '../assets/7EV.jpeg';
import ev8 from '../assets/8EV.jpeg';
import ev9 from '../assets/9EV.jpeg';


const Avidences = () => {
  const avidences = [
    { 
      id: 1, 
      title: 'The Murder Weapon (Blood-Stained Knife)', 
      description: 'Recovered just 10 paces from the crime scene. Forensic analysis confirms the fingerprints on the hilt do not belong to the victim, and the blade bears traces of fresh, deep-red blood.', 
      Image: ev1 
    },
    { 
      id: 2, 
      title: 'The Torn Receipt', 
      description: "A crumpled coffee shop receipt recovered from the victim's coat pocket. The slip displays the time '11:45 PM' and location 'Downtown Cafe, Sector 4', establishing a critical timeline just before the murder.", 
      Image: ev2 
    },
    { 
      id: 3, 
      title: 'The Broken Pocket Watch', 
      description: "A shattered vintage pocket watch found half-buried in the dirt at the scene. The glass is completely smashed, and the hands are frozen exactly at '01:15 AM', likely indicating the exact moment of the physical struggle.", 
      Image: ev3 
    },
    { 
      id: 4, 
      title: 'The Threatening Letter', 
      description: 'An anonymous note discovered in the victim\'s room, constructed from letters cut out of old newspapers. It reads, "Your time is up," providing a clear motive of premeditated revenge.', 
      Image: ev4 
    },
    { 
      id: 5, 
      title: 'The Muddy Boot Print', 
      description: 'A size-11 heavy-duty construction boot impression preserved in the wet mud near the boundary wall. The specific tread pattern is exclusively issued to workers at the nearby industrial dockyards.', 
      Image: ev5 
    },
    { 
      id: 6, 
      title: 'The Burnt Train Ticket', 
      description: "A partially charred train ticket found discarded in the nearby bushes. The ticket is for the early morning Express train out of 'Central City', revealing the killer's intended escape route.", 
      Image: ev6 
    },
    { 
      id: 7, 
      title: 'The Unlocked Cell Phone', 
      description: "The victim's smartphone, found powered on at the scene with a severely cracked screen. The call log reveals the final incoming call was from an 'Unknown Number' at 12:02 AM, lasting precisely 40 seconds.", 
      Image: ev7 
    },
    { 
      id: 8, 
      title: 'The Blood-Stained Leather Glove', 
      description: "A right-handed leather glove found snagged on the barbed wire of the perimeter fence. The interior contains sweat DNA samples, while the exterior is stained with the victim's blood.", 
      Image: ev8 
    },
    { 
      id: 9, 
      title: 'The Poison Vial', 
      description: 'A small, empty glass vial bearing a faded label from a local pharmacy. Lab reports indicate it recently contained a lethal, fast-acting chemical, suggesting a potential backup murder weapon.', 
      Image: ev9 
    }
  ];
  return (
<>
<RedMarquee/>
    
    <div className='min-h-screen bg-linear-to-b from-white/5 to-black p-5'>
        
      {/* Title Section */}
      <div className='flex w-full justify-center'>
        <h1 className='m-4 md:m-10 p-2 rounded-xl text-xl sm:text-2xl md:text-3xl text-white font-bold flex 
                bg-white/7 transition-transform duration-500 ease-in-out 
                rotate-0 hover:rotate-1 hover:bg-white/10 cursor-pointer'>
          THE FLOATING 
          <span className='text-red-600/60 drop-shadow-[1px_0_12px_rgba(255,0,0,1)] ml-2'>
             EVIDENCE
          </span>
        </h1>
      </div>

      {/* Grid Container for Cards */}
   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl md:max-w-8xl mx-auto px-4'>
  {avidences.map((item) => (
    <div 
      key={item.id} 
      // 'group' class se hum child elements ko hover par control kar sakte hain
      className='group relative bg-[#18181b] p-5 rounded-2xl border border-white/5 
      transition-all duration-500 ease-out 
      hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] 
      hover:border-red-900/50 hover:bg-[#1f1616]'
    >
      
      {/* Image Container with Zoom Effect */}
      <div className='relative overflow-hidden rounded-xl mb-5'>
        {/* Evidence Tag Badge */}
 
        
        <img 
          src={item.Image} 
          alt={item.title} 
          className='w-full h-56 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110' 
        />
        
        {/* Subtle dark gradient over image for better blending */}
        <div className='absolute inset-0 bg-linear-to-t from-[#18181b] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500'></div>
      </div>

      {/* Title */}
      <h2 className='text-zinc-100 text-xl font-bold  group-hover:text-red-500 transition-colors duration-300 line-clamp-1'>
        {item.title}
      </h2>

      {/* Description */}
      <p className='text-zinc-400 text-sm mt-3  font-light'>
        {item.description}
      </p>
      
      {/* Decorative Line on Hover */}
      <div className='h-0.5 w-0 bg-red-800 mt-4 transition-all duration-500 ease-out group-hover:w-full'></div>
    </div>
  ))}
</div>
     
      
    </div></>
  )
}

export default Avidences