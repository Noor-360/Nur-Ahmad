import React from 'react';
import { Newspaper } from '../types';

interface Props {
  data: Newspaper;
  variant: 'bangla' | 'intl' | 'arab' | 'islamic';
}

const NewspaperCard: React.FC<Props> = ({ data, variant }) => {
  // Determine gradient, border, and text styles based on variant
  let containerClasses = "";
  let textClasses = "";
  
  switch (variant) {
    case 'bangla':
      containerClasses = "bg-gradient-to-br from-green-50 to-green-100 dark:from-[#0d2a1a] dark:to-[#051a0d] border-green-400 dark:border-green-700 hover:shadow-[0_0_20px_rgba(74,0,224,0.5)]";
      textClasses = "text-green-900 dark:text-green-200 group-hover:text-[#4a00e0] dark:group-hover:text-[#4a00e0]";
      break;
    case 'intl':
      containerClasses = "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#0d1a2a] dark:to-[#050d1a] border-blue-400 dark:border-blue-700 hover:shadow-[0_0_20px_rgba(0,180,255,0.5)]";
      textClasses = "text-blue-900 dark:text-blue-200 group-hover:text-[#0080cc] dark:group-hover:text-[#0080cc]";
      break;
    case 'arab':
      containerClasses = "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-[#2a1505] dark:to-[#1a0a02] border-orange-400 dark:border-orange-700 hover:shadow-[0_0_20px_rgba(255,170,0,0.5)]";
      textClasses = "text-orange-900 dark:text-orange-200 group-hover:text-[#cc8800] dark:group-hover:text-[#cc8800]";
      break;
    case 'islamic':
      containerClasses = "bg-gradient-to-br from-teal-50 to-teal-100 dark:from-[#052a25] dark:to-[#021a15] border-teal-400 dark:border-teal-700 hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]";
      textClasses = "text-teal-900 dark:text-teal-200 group-hover:text-[#2acc00] dark:group-hover:text-[#2acc00]";
      break;
  }

  // Auto-translation logic
  let finalUrl = data.url;
  if (variant === 'intl') {
     // English to Bengali
     finalUrl = `https://translate.google.com/translate?sl=en&tl=bn&u=${encodeURIComponent(data.url)}`;
  } else if (variant === 'arab') {
     // Arabic to Bengali
     finalUrl = `https://translate.google.com/translate?sl=ar&tl=bn&u=${encodeURIComponent(data.url)}`;
  }

  return (
    <a 
      href={finalUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        group relative block w-full p-4 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 
        border-2 shadow-md overflow-hidden ${containerClasses}
      `}
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[40px]">
        <span className={`block font-bold text-sm md:text-base leading-tight transition-colors duration-300 ${textClasses}`}>
          {data.name}
        </span>
        {data.region && (
          <span className="block text-xs mt-1 opacity-70 font-semibold text-gray-600 dark:text-gray-400">
            {data.region}
          </span>
        )}
      </div>
      
      {/* Shine/Glow Effect on Hover */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </a>
  );
};

export default NewspaperCard;