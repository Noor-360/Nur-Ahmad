import React from 'react';

const NewsTicker = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 text-white overflow-hidden py-2 shadow-md border-b border-white/20">
       <div className="absolute inset-0 bg-black/10"></div>
       <div className="relative flex whitespace-nowrap overflow-hidden">
         <div className="animate-marquee inline-block px-4 font-semibold text-sm md:text-base tracking-wide">
           <i className="fas fa-bullhorn mr-2 text-yellow-300"></i>
           স্বাগতম বাংলা নিউজ মিডিয়া অ্যাপে! 📢 দেশ-বিদেশের সর্বশেষ খবর, খেলার লাইভ আপডেট এবং ১৫০+ পত্রিকা এখন এক ঠিকানায়। &nbsp;&nbsp;|&nbsp;&nbsp;
           <i className="fas fa-magic mr-1 text-cyan-300"></i> আমাদের এআই অ্যাসিস্ট্যান্টের সাথে চ্যাট করুন এবং যেকোনো প্রশ্নের উত্তর পান। &nbsp;&nbsp;|&nbsp;&nbsp;
           <i className="fas fa-moon mr-1 text-indigo-300"></i> চোখের সুরক্ষায় ব্যবহার করুন **ডার্ক মোড**। &nbsp;&nbsp;|&nbsp;&nbsp;
           <i className="fas fa-mosque mr-1 text-green-300"></i> ইসলামিক কর্নার থেকে অর্জন করুন বিশুদ্ধ জ্ঞান। &nbsp;&nbsp;|&nbsp;&nbsp;
           সত্য ও বস্তুনিষ্ঠ সংবাদের সাথে থাকুন, বাংলা নিউজ মিডিয়ার সাথে থাকুন। 🇧🇩
         </div>
       </div>
    </div>
  );
};

export default NewsTicker;