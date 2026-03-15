import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-slate-400 pt-16 pb-8 border-t border-slate-800 font-sans relative overflow-hidden">
      {/* Background subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-px bg-linear-to-r from-transparent via-teal-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Section 1: Agency Info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white tracking-widest mb-4 uppercase drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]">
              Detective's Desk
            </h3>
            <p className="text-sm leading-relaxed mb-4 text-slate-400">
              The city's premier digital investigation unit. We analyze the trails, cross-reference the SQL logs, and uncover the truth hidden in the shadows. Trust the evidence, not the alibi.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-md w-max">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-xs text-slate-300 font-mono tracking-wider">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Section 2: Public Records (Teal Hover Animations) */}
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-6 tracking-wider border-b border-slate-800 pb-2 uppercase">
              Public Records
            </h4>
            <ul className="space-y-3">
              {['Active Investigations', 'Crime Scene Gallery', 'Forensic Reports', 'Missing Persons', 'SQL Query Logs'].map((item, idx) => (
                <li key={idx}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                     className="group flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-2">
                    <span className="text-teal-500/0 group-hover:text-teal-500 transition-colors duration-300">▹</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Restricted Access (Red Hover & Border Animations) */}
          <div>
            <h4 className="text-lg font-semibold text-red-500/80 mb-6 tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2 uppercase">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Restricted Area
            </h4>
            <ul className="space-y-3">
              {['Evidence Vault', 'Witness Protection', 'Internal Affairs', 'Classified Archives'].map((item, idx) => (
                <li key={idx}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                     className="block px-2 py-1.5 text-sm text-slate-500 border border-transparent rounded hover:text-red-400 hover:bg-red-950/30 hover:border-red-500/40 transition-all duration-300">
                    <span className="font-mono opacity-50 mr-2 text-xs">[{idx + 1}]</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Secure Comms */}
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-6 tracking-wider border-b border-slate-800 pb-2 uppercase">
              Secure Comms
            </h4>
            <p className="text-sm mb-4 text-slate-400">
              Got a lead? Drop it anonymously. All transmissions are end-to-end encrypted.
            </p>
            <div className="group bg-slate-900/50 p-4 rounded-lg border border-slate-800 hover:border-teal-500/30 transition-colors duration-500">
              <p className="text-[10px] text-teal-600 uppercase tracking-widest mb-2 font-mono flex justify-between">
                <span>Encrypted Line</span>
                <span>256-bit AES</span>
              </p>
              <a href="mailto:tips@detectivesdesk.com" className="text-slate-300 group-hover:text-teal-400 font-mono text-sm transition-colors duration-300">
                tips@detectivesdesk.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500 font-mono flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Detective's Desk.</p>
            <span className="hidden md:inline-block w-1 h-1 bg-slate-600 rounded-full"></span>
            <p className="hidden md:block">Location: <span className="text-slate-400">Classified</span></p>
          </div>
          
          <div className="flex items-center gap-3 relative group cursor-pointer">
            <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-xs text-red-600/80 font-bold uppercase tracking-[0.3em] border border-red-900/50 px-3 py-1 rounded bg-red-950/20 group-hover:text-red-500 group-hover:border-red-500/50 transition-all duration-300">
              [ Top Secret ]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;