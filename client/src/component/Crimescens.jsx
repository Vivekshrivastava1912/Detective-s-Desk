import React from 'react'
import RedMarquee from './RedMarques'

const Crimescens = () => {
  const avidences = [
    { id: 1, title: 'Evidence 1', description: 'Description of Evidence 1', Image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Evidence 2', description: 'Description of Evidence 2', Image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Evidence 3', description: 'Description of Evidence 3', Image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Evidence 4', description: 'Description of Evidence 4', Image: 'https://via.placeholder.com/150' },
   
  ]

  return (
    <div className='min-h-screen bg-black p-5'>
      {/* Title Section */}
    
      <div className='flex w-full justify-center'>
        <h1 className='m-4 md:m-10 p-2 rounded-xl text-xl sm:text-2xl md:text-3xl text-white font-bold flex 
                bg-white/7 transition-transform duration-500 ease-in-out 
                rotate-0 hover:rotate-1 hover:bg-white/10 cursor-pointer'>
          THE FLOATING 
          <span className='text-teal-500 drop-shadow-[1px_0_12px_rgba(255,0,0,1)] ml-2'>
             EVIDENCE
          </span>
        </h1>
      </div>

      {/* Grid Container for Cards */}
      <div className='grid grid-cols-1  gap-6 max-w-7xl mx-auto'>
        {avidences.map((item) => (
          <div key={item.id} className='bg-white/10 
          flex
          hover:bg-red-500/40
          h-100
          p-4 rounded-2xl border border-white/5 hover:border-red-900'>
           
           <div className='w-half bg-amber-400'> <h2 className='text-white text-xl font-bold'>{item.title}</h2>
            <p className='text-gray-400 text-sm mt-2'>{item.description}</p></div>
             <img src={item.Image} alt={item.title} className='w-half bg-green-300 object-cover rounded-xl mb-4' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Crimescens