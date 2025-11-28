import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  activeColorClass?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2 m-1 rounded-lg font-bold text-sm md:text-base transition-all duration-300 relative overflow-hidden group
        ${isActive 
          ? 'bg-gradient-to-br from-[#ff0050] to-[#e00046] text-white shadow-[0_0_15px_rgba(255,0,80,0.5)] scale-105' 
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700'}
      `}
    >
      <span className="relative z-10">{label}</span>
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out`}></div>
    </button>
  );
};

export default TabButton;
