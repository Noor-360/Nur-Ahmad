import React, { useState, useEffect } from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  dateString: string;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, dateString }) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={`
      relative z-50 
      bg-gradient-to-r from-[#1a0a52] via-[#4a00e0] to-[#1a0a52]
      border-b-4 border-[#00f5ff] shadow-lg overflow-hidden
      transition-all duration-300
    `}>
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 animate-shine"></div>
      </div>

      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-4 lg:gap-0">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer transform hover:scale-105 transition-transform duration-300">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff0050] via-[#00f5ff] to-[#39ff14] p-[2px] shadow-[0_0_15px_rgba(255,0,80,0.8)] relative overflow-hidden">
             {/* Spinning Border Effect */}
             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-white/50 animate-spin opacity-50"></div>
             
             <div className="w-full h-full rounded-full bg-[#1a0a52] flex items-center justify-center border border-white/20 relative z-10">
                <span className="text-white font-bold text-xs text-center leading-tight drop-shadow-md">বাংলা<br/>নিউজ</span>
             </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#fff] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              বাংলা নিউজ মিডিয়া
            </h1>
            <span className="text-xs text-[#00f5ff] tracking-wider font-semibold uppercase drop-shadow-sm">Bangla News Media</span>
          </div>
        </div>

        {/* Right Side: Social Icons + Date + Clock */}
        <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Social Icons Integrated with Dark Mode Toggle */}
            <div className="flex items-center gap-2 bg-[#0d0221]/50 px-3 py-1.5 rounded-full border border-[#00f5ff]/30 backdrop-blur-sm shadow-inner order-2 md:order-1">
              <SocialLink href="https://facebook.com" color="text-[#1877f2]" icon="fa-facebook" />
              <SocialLink href="https://twitter.com" color="text-[#1da1f2]" icon="fa-twitter" />
              <SocialLink href="https://youtube.com" color="text-[#ff0000]" icon="fa-youtube" />
              <SocialLink href="https://web.whatsapp.com" color="text-[#25d366]" icon="fa-whatsapp" />
              <SocialLink href="https://imo.im" color="text-[#00aff0]" icon="fa-comment-dots" />
              
              {/* Divider */}
              <div className="w-[1px] h-5 bg-white/20 mx-1"></div>

              {/* Dark Mode Toggle inside Social Bar */}
              <button 
                onClick={toggleDarkMode}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-yellow-300 hover:text-[#00f5ff] transition-all duration-300"
                title="Toggle Dark Mode"
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 order-1 md:order-2">
              {/* Date Display */}
              <div className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-md text-xs md:text-sm font-bold shadow-sm backdrop-blur-md whitespace-nowrap">
                 {dateString || "Loading..."}
              </div>

              {/* Clock */}
              <div className="bg-black/40 border border-[#39ff14]/50 text-[#39ff14] px-3 py-1 rounded-md font-mono font-bold text-sm shadow-[0_0_8px_rgba(57,255,20,0.4)] tracking-wider">
                {time || "Loading..."}
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

const SocialLink = ({ href, icon, color }: { href: string; icon: string; color: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`${color} hover:scale-125 transition-transform duration-300 p-1`}
  >
    <i className={`fab ${icon} text-lg`}></i>
  </a>
);

export default Header;