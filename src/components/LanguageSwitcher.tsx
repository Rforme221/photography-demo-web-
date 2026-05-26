import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center border border-[#2A2A2A] rounded px-3 py-1.5 gap-2 font-mono text-[9px] tracking-wider leading-none select-none ${className}`}>
      <button
        onClick={() => setLanguage('EN')}
        className={`hover:text-gold transition-colors duration-300 cursor-pointer ${
          language === 'EN' ? 'text-gold font-bold' : 'text-white/45'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-white/10 font-light cursor-default">|</span>
      <button
        onClick={() => setLanguage('IT')}
        className={`hover:text-gold transition-colors duration-300 cursor-pointer ${
          language === 'IT' ? 'text-gold font-bold' : 'text-white/45'
        }`}
        aria-label="Passa all'italiano"
      >
        IT
      </button>
    </div>
  );
};
