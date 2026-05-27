import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export const MagneticButton = ({ children, className, primary = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    // Max displacement ±12px within 80px range
    const dist = Math.sqrt(x * x + y * y);
    if (dist < 80) {
      setPosition({ x: x * 0.2, y: y * 0.2 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseOut = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
      className="magnetic-area inline-block"
    >
      <motion.button
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className={`cta-btn px-8 py-4 transition-all duration-300 font-mono text-[11px] tracking-[0.14em] uppercase rounded-none select-none cursor-none ${
          primary 
            ? "border border-accent-purple text-accent-purple bg-transparent hover:bg-accent-purple hover:text-text-primary hover:shadow-[0_0_24px_rgba(139,47,201,0.3)]" 
            : "border border-border-subtle text-text-secondary hover:border-accent-orange hover:text-accent-orange bg-transparent"
        } ${className}`}
      >
        {children}
      </motion.button>
    </div>
  );
};
