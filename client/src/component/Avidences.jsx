import React from 'react'
import RedMarquee from './RedMarques'

const Avidences = () => {
  const avidences = [
    { id: 1, title: 'Evidence 1', description: 'Description of Evidence 1', Image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Evidence 2', description: 'Description of Evidence 2', Image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Evidence 3', description: 'Description of Evidence 3', Image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Evidence 4', description: 'Description of Evidence 4', Image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Evidence 5', description: 'Description of Evidence 5', Image: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Evidence 6', description: 'Description of Evidence 6', Image: 'https://via.placeholder.com/150' },
     { id: 1, title: 'Evidence 1', description: 'Description of Evidence 1', Image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Evidence 2', description: 'Description of Evidence 2', Image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Evidence 3', description: 'Description of Evidence 3', Image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Evidence 4', description: 'Description of Evidence 4', Image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Evidence 5', description: 'Description of Evidence 5', Image: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Evidence 6', description: 'Description of Evidence 6', Image: 'https://via.placeholder.com/150' }
  ]

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
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {avidences.map((item) => (
          <div key={item.id} className='bg-white/10 
          transition-transform duration-500 ease-in-out 
                rotate-358 hover:rotate-362
          hover:bg-red-600/20
          p-4 rounded-2xl border border-white/5 hover:border-red-900'>
            <img src={item.Image} alt={item.title} className='w-full h-20 object-cover rounded-xl mb-4' />
            <h2 className='text-white text-xl font-bold'>{item.title}</h2>
            <p className='text-gray-400 text-sm mt-2'>{item.description}</p>
          </div>
        ))}
      </div>
      <div className='bg-red-600/50 w-full h-px my-10'></div>
      
    </div></>
  )
}

export default Avidences