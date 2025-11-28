import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import TabButton from './components/TabButton';
import NewspaperCard from './components/NewspaperCard';
import ScrollToTop from './components/ScrollToTop';
import ChatWidget from './components/ChatWidget';
import { BANGLA_NEWSPAPERS, INTL_NEWSPAPERS, ARAB_NEWSPAPERS, ISLAMIC_CONTENT, TV_CHANNELS, MOTIVATIONAL_QUOTES, EXTERNAL_AI_MODELS } from './constants';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'bangla' | 'intl' | 'arab' | 'islamic'>('bangla');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [dateString, setDateString] = useState("");

  // Initialize Dark Mode from LocalStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(isDark);
  }, []);

  // Update Body Class for Dark Mode and Color Palette
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#0a0014';
      document.body.style.color = '#e0e0ff';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#f8f9ff';
      document.body.style.color = '#121212';
      localStorage.setItem('darkMode', 'disabled');
    }
  }, [darkMode]);

  // Date Logic - Enhanced to show Day and Date in Bengali Numerals
  useEffect(() => {
    const updateDate = () => {
      const d = new Date();
      const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
      const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
      
      const dayName = days[d.getDay()];
      const dayDate = d.getDate();
      const monthName = months[d.getMonth()];
      const year = d.getFullYear();
      
      // Convert English numbers to Bengali numerals
      const toBengaliDigits = (num: number | string) => {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().split('').map(d => {
            const index = parseInt(d);
            return isNaN(index) ? d : bengaliDigits[index];
        }).join('');
      };
      
      setDateString(`আজ: ${dayName}, ${toBengaliDigits(dayDate)} ${monthName} ${toBengaliDigits(year)}`);
    };
    updateDate();
  }, []);

  // Motivational Quote Rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-[#ff0050] selection:text-white relative`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} dateString={dateString} />
      
      <NewsTicker />

      {/* New Social Buttons Area */}
      <div className="bg-[#f8f9ff] dark:bg-[#0a0014] py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
          <a href="https://chat.openai.com" target="_blank" rel="noreferrer" 
             className="flex-1 max-w-[200px] text-center bg-gradient-to-r from-[#ffaa00] to-[#ff5500] text-black px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(255,170,0,0.4)] hover:-translate-y-1 transition-transform border-2 border-yellow-400 relative overflow-hidden group">
             <span className="relative z-10">যা জানতে চান জিজ্ঞেস করুন</span>
             <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </a>
          <a href="https://banglasangbad100.blogspot.com" target="_blank" rel="noreferrer" 
             className="flex-1 max-w-[200px] text-center bg-gradient-to-r from-[#00b4ff] to-[#4a00e0] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(74,0,224,0.4)] hover:-translate-y-1 transition-transform border-2 border-[#00f5ff] relative overflow-hidden group">
             <span className="relative z-10">বাংলা সংবাদ</span>
             <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 my-6 text-center">
        <form action="https://www.google.com/search" method="get" target="_blank" className="flex justify-center max-w-lg mx-auto shadow-xl rounded-xl overflow-hidden border-2 border-[#ff0050]/50 dark:border-[#ff0050]/30 transform hover:scale-105 transition-transform duration-300">
          <input type="text" name="q" placeholder="গুগল অনুসন্ধান করুন..." className="w-full px-5 py-3 outline-none dark:bg-[#1a0a52] dark:text-white dark:placeholder-gray-400" />
          <button type="submit" className="bg-gradient-to-r from-[#ff0050] to-[#ffaa00] text-white font-bold px-6 py-3 hover:brightness-110 transition-all">
            অনুসন্ধান
          </button>
        </form>
      </div>

      {/* Motivational Quote Display */}
      <div className="container mx-auto px-4 mb-10">
        <div className="relative overflow-hidden rounded-2xl p-[3px] bg-gradient-to-r from-[#1a0a52] via-[#4a00e0] to-[#ff0050] animate-gradient-x shadow-[0_0_20px_rgba(74,0,224,0.5)]">
          <div className="bg-[#1a0a52] rounded-xl p-8 text-center min-h-[140px] flex items-center justify-center relative overflow-hidden">
            
            {/* Background Texture - SVG Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 }}>
            </div>
            
            {/* Animated Gradient Blob */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-tr from-transparent via-[#ff0050]/20 to-transparent animate-pulse"></div>

            {/* Dynamic Quote Text with Animation */}
            <div key={quoteIndex} className="relative z-10 max-w-2xl px-4 animate-quote">
                <i className="fas fa-quote-left text-[#00f5ff] text-2xl absolute -top-4 -left-4 opacity-50"></i>
                <p className="text-white text-lg md:text-2xl font-bold italic leading-relaxed tracking-wide text-shadow-glow">
                  {MOTIVATIONAL_QUOTES[quoteIndex].text}
                </p>
                <i className="fas fa-quote-right text-[#00f5ff] text-2xl absolute -bottom-4 -right-4 opacity-50"></i>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 pb-12">
        
        {/* Newspaper Section */}
        <section className="mb-16 bg-white dark:bg-[#1a0a52] p-4 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f5ff] blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff0050] blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#4a00e0] dark:text-[#00f5ff] border-b-4 border-[#ff0050] pb-2 inline-block drop-shadow-sm">
              অনলাইন পত্রিকা 🗞️
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            <TabButton label="বাংলা পত্রিকা" isActive={activeTab === 'bangla'} onClick={() => setActiveTab('bangla')} />
            <TabButton label="আন্তর্জাতিক পত্রিকা" isActive={activeTab === 'intl'} onClick={() => setActiveTab('intl')} />
            <TabButton label="আরব বিশ্ব" isActive={activeTab === 'arab'} onClick={() => setActiveTab('arab')} />
            <TabButton label="ইসলামিক কর্নার" isActive={activeTab === 'islamic'} onClick={() => setActiveTab('islamic')} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-[fadeIn_0.5s_ease-out]">
            {activeTab === 'bangla' && BANGLA_NEWSPAPERS.map((np, idx) => (
              <NewspaperCard key={idx} data={np} variant="bangla" />
            ))}
            {activeTab === 'intl' && INTL_NEWSPAPERS.map((np, idx) => (
              <NewspaperCard key={idx} data={np} variant="intl" />
            ))}
            {activeTab === 'arab' && ARAB_NEWSPAPERS.map((np, idx) => (
              <NewspaperCard key={idx} data={np} variant="arab" />
            ))}
            {activeTab === 'islamic' && ISLAMIC_CONTENT.map((np, idx) => (
              <NewspaperCard key={idx} data={np} variant="islamic" />
            ))}
          </div>
        </section>

        {/* External AI Models Directory (E Ayojon) */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#4a00e0] dark:text-[#00f5ff] border-b-4 border-[#ff0050] pb-2 inline-block drop-shadow-sm">
               এ আয়োজন (AI Models) 🤖
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {EXTERNAL_AI_MODELS.map((model, idx) => (
               <a 
                 key={idx}
                 href={model.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-white dark:bg-[#1a0a52] p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center group"
               >
                 <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white text-xl shadow-md ${model.color}`}>
                   <i className={`fas ${model.icon}`}></i>
                 </div>
                 <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#4a00e0] dark:group-hover:text-[#00f5ff] transition-colors">
                   {model.name}
                 </span>
               </a>
             ))}
          </div>
        </section>

        {/* Live TV Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#4a00e0] dark:text-[#00f5ff] border-b-4 border-[#ff0050] pb-2 inline-block drop-shadow-sm">
               লাইভ টিভি চ্যানেল 📺
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TV_CHANNELS.map((tv, idx) => (
              <a key={idx} href={tv.url} target="_blank" rel="noopener noreferrer" 
                 className="group bg-white dark:bg-[#1a0a52] p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-gray-100 dark:border-gray-700 hover:shadow-[0_10px_30px_rgba(74,0,224,0.3)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center h-48 relative overflow-hidden">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <i className={`${tv.iconClass} text-5xl mb-4 ${tv.colorClass} group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-transform duration-300 relative z-10`}></i>
                  
                  <span className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-[#4a00e0] dark:group-hover:text-[#00f5ff] transition-colors relative z-10">
                    {tv.name}
                  </span>
                  
                  {/* Digital Glitch Line on Hover */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff0050] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#1a0a52] text-white py-8 border-t-4 border-[#00f5ff]">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#39ff14]">বাংলা নিউজ মিডিয়া</h2>
           <p className="text-gray-300 mb-4">&copy; {new Date().getFullYear()} বাংলা নিউজ মিডিয়া অ্যাপ। সর্বস্বত্ব সংরক্ষিত।</p>
           <div className="text-sm text-[#00f5ff] italic">"জ্ঞানই শক্তি, আর সংবাদই সেই জ্ঞানের দরজা"</div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <ScrollToTop />
      
      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;