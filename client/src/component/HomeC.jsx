import React from 'react';

const HomeC = () => {
  return (
    // min-h-screen aur overflow-x-hidden lagaya hai taaki screen ke bahar content na jaye
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-400 selection:text-black overflow-x-hidden">
      
      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full group/main">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter transition-all duration-500 group-hover/main:drop-shadow-[0_0_15px_rgba(45,212,191,0.2)]">
            MASTER SQL.<br />SOLVE THE MURDER.
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed px-4 transition-colors duration-500 group-hover/main:text-neutral-300">
            Welcome to Detective's Desk. The police department's database is your only weapon. 
            Write real SQL queries to navigate through police reports, suspect interviews, and evidence logs to catch the killer.
          </p>
        </div>

        {/* The Case Box (Compact & Aligned with Hover effects) */}
        <div className="mt-8 bg-[#111111] border border-neutral-700 p-6 md:p-8 relative shadow-2xl w-full group/box hover:border-teal-400/40 transition-colors duration-500">
          
          {/* Decorative Top Border (Animates to Teal) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white group-hover/box:bg-teal-400 transition-colors duration-500"></div>
          
          {/* Case File Badge (Animates to Red) */}
          <div className="absolute -top-3 left-6 md:left-8 bg-black px-3 py-0.5 text-xs font-mono tracking-widest border border-neutral-700 uppercase group-hover/box:border-red-500/40 group-hover/box:text-red-400 transition-colors duration-500 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover/box:opacity-100 animate-pulse transition-opacity duration-300 hidden group-hover/box:inline-block"></span>
            Case File #8934-A
          </div>

          {/* Flex Container for Left (Content) and Right (Box) */}
          <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
            
            {/* LEFT SIDE: Briefing Text */}
            <div className="w-full md:w-1/2 space-y-5">
              <h3 className="text-2xl font-bold uppercase border-b border-neutral-800 pb-3 group-hover/box:border-teal-400/30 transition-colors duration-500">
                The Briefing
              </h3>
              <p className="text-neutral-300 font-mono text-[13px] leading-relaxed">
                A crime has taken place and the detective needs your help. The detective gave you the crime scene report, but you somehow lost it. 
              </p>
              
              <div className="bg-black p-4 border-l-2 border-white group-hover/box:border-red-500/50 transition-colors duration-500">
                <p className="text-neutral-300 font-mono text-[13px] leading-loose">
                  You vaguely remember that the crime was a <span className="text-white font-bold bg-neutral-800 px-1 py-0.5 rounded transition-colors duration-300 hover:bg-red-500/30 hover:text-red-400 cursor-default">MURDER</span> that occurred sometime on <span className="text-white font-bold bg-neutral-800 px-1 py-0.5 rounded transition-colors duration-300 hover:bg-teal-400/20 hover:text-teal-400 cursor-default">JAN. 15, 2018</span> and that it took place in <span className="text-white font-bold bg-neutral-800 px-1 py-0.5 rounded transition-colors duration-300 hover:bg-teal-400/20 hover:text-teal-400 cursor-default">SQL CITY</span>.
                </p>
              </div>

              <p className="text-neutral-400 text-[13px] italic group-hover/box:text-red-500/60 transition-colors duration-500">
                Mission: Start by retrieving the corresponding crime scene report from the police department’s database.
              </p>
            </div>

            {/* RIGHT SIDE: Interactive/Mock Terminal */}
            <div className="w-full md:w-1/2 group/terminal">
              <div className="bg-black border border-neutral-800 rounded-md overflow-hidden shadow-lg transition-transform duration-500 group-hover/terminal:-translate-y-1 group-hover/terminal:border-teal-400/30">
                
                {/* Terminal Header */}
                <div className="bg-[#1a1a1a] border-b border-neutral-800 px-4 py-2 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 group-hover/terminal:bg-red-500 transition-colors duration-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 group-hover/terminal:bg-yellow-500 transition-colors duration-300 delay-75"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 group-hover/terminal:bg-green-500 transition-colors duration-300 delay-150"></div>
                  <span className="ml-3 text-xs text-neutral-500 font-mono">terminal - sql_prompt</span>
                </div>
                
                {/* Terminal Code Area */}
                <div className="p-5 font-mono text-[13px] leading-loose overflow-x-auto">
                  <p className="text-neutral-500 mb-2">-- Type your SQL query below</p>
                  <p className="text-white whitespace-nowrap">
                    <span className="text-neutral-400 group-hover/terminal:text-teal-400 transition-colors duration-500">SELECT</span> * </p>
                  <p className="text-white whitespace-nowrap">
                    <span className="text-neutral-400 group-hover/terminal:text-teal-400 transition-colors duration-500">FROM</span> <span className="group-hover/terminal:text-neutral-300 transition-colors duration-500">crime_scene_report</span>
                  </p>
                  <p className="text-white whitespace-nowrap">
                    <span className="text-neutral-400 group-hover/terminal:text-teal-400 transition-colors duration-500">WHERE</span> city = <span className="group-hover/terminal:text-teal-200 transition-colors duration-500">'SQL City'</span> 
                  </p>
                  <p className="text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="text-neutral-400 group-hover/terminal:text-teal-400 transition-colors duration-500">AND</span> type = <span className="group-hover/terminal:text-red-400 transition-colors duration-500">'murder'</span> 
                    <span className="w-1.5 h-4 bg-white animate-pulse inline-block group-hover/terminal:bg-teal-400 transition-colors duration-300"></span>
                  </p>
                </div>
                
                {/* Terminal Footer */}
                <div className="bg-[#1a1a1a] p-3 border-t border-neutral-800 flex justify-end">
                  <button className="bg-white text-black px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-teal-400 hover:shadow-[0_0_10px_rgba(45,212,191,0.4)] active:scale-95">
                    Run Query
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default HomeC;