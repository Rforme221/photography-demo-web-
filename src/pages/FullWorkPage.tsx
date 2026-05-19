import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PORTFOLIO_ITEMS, GENRES } from '../constants';
import { MagneticButton } from '../components/MagneticButton';

interface FullWorkPortfolioItemProps {
  item: typeof PORTFOLIO_ITEMS[0];
  idx: number;
  setSelectedProject: (p: any) => void;
}

const PortfolioItemCard: React.FC<FullWorkPortfolioItemProps> = ({ 
  item, 
  idx, 
  setSelectedProject 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: idx % 3 * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group cursor-pointer"
      onClick={() => setSelectedProject(item)}
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-[#2A2A2A]">
        <motion.img 
          style={{ y, scale: 1.15 }}
          loading="lazy"
          referrerPolicy="no-referrer"
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-base/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <motion.div 
        style={{ opacity }}
        className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40"
      >
        <span>{item.type}</span>
        <span className="text-[#F2EDE6]/60 group-hover:text-gold transition-colors">{item.title}</span>
      </motion.div>
    </motion.div>
  );
};

export default function FullWorkPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'ALL') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(item => item.type === activeFilter);
  }, [activeFilter]);

  const handlePrevProject = () => {
    setSelectedProject((current) => {
      if (!current) return null;
      const currentIndex = PORTFOLIO_ITEMS.findIndex(item => item.id === current.id);
      const prevIndex = (currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
      return PORTFOLIO_ITEMS[prevIndex];
    });
  };

  const handleNextProject = () => {
    setSelectedProject((current) => {
      if (!current) return null;
      const currentIndex = PORTFOLIO_ITEMS.findIndex(item => item.id === current.id);
      const nextIndex = (currentIndex + 1) % PORTFOLIO_ITEMS.length;
      return PORTFOLIO_ITEMS[nextIndex];
    });
  };

  return (
    <div className="min-h-screen bg-base pt-32 px-6 md:px-10 pb-20">
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Narrative
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="font-mono text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block">Archive</span>
            <h1 className="font-display text-5xl sm:text-8xl uppercase leading-none opacity-90">Selected<br />Works.</h1>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-[10px] tracking-widest">
            {['ALL', ...GENRES].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 sm:px-4 py-2 border transition-all ${activeFilter === filter ? 'border-gold text-gold' : 'border-[#2A2A2A] text-white/40 hover:border-white/30'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <PortfolioItemCard 
                key={item.id}
                item={item}
                idx={idx}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-base/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#111] border border-[#2A2A2A] flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
              <button 
                className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-gold transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden">
                <motion.img 
                  key={selectedProject.image}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center overflow-y-auto max-h-[50vh] md:max-h-none text-white">
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block"
                  >
                    Archive / {selectedProject.type}
                  </motion.span>
                </div>
                
                <div className="overflow-hidden mb-8">
                  <motion.h2 
                    key={selectedProject.title}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter"
                  >
                    {selectedProject.title}
                  </motion.h2>
                </div>

                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-1 bg-gold mb-8" 
                />

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="font-mono text-[13px] text-white/60 leading-relaxed mb-10 max-w-sm"
                >
                  A cinematic exploration into {selectedProject.title.toLowerCase()}. This project focuses on the interplay of natural highlights and the deep textures of the human condition.
                </motion.p>
                
                <div className="grid grid-cols-2 gap-8 border-t border-[#2A2A2A] pt-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Location</span>
                    <span className="font-display italic text-xl">International Archive</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Format</span>
                    <span className="font-display italic text-xl">35mm Digital</span>
                  </motion.div>
                </div>
                
                <div className="mt-12 flex items-center gap-4">
                  <MagneticButton onClick={handlePrevProject} className="!p-4 flex items-center justify-center">
                    <ChevronLeft size={18} />
                  </MagneticButton>
                  
                  <MagneticButton primary className="!px-10 !py-4 text-xs font-bold" onClick={() => setSelectedProject(null)}>
                    Back to Archive
                  </MagneticButton>

                  <MagneticButton onClick={handleNextProject} className="!p-4 flex items-center justify-center">
                    <ChevronRight size={18} />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
