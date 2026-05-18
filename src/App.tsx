/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Instagram, Twitter, Linkedin, ArrowDown, ChevronRight, Menu, X } from 'lucide-react';

import heroVideo from './assets/flova_Standalone_cinemagraph_loop_video_202605181148_0d503d.mp4';

// --- Types & Constants ---
const GENRES = ['WEDDINGS', 'EDITORIAL', 'PORTRAITURE', 'FASHION', 'COMMERCIAL', 'FINE ART', 'DESTINATION'];

const PORTFOLIO_ITEMS = [
  { id: 1, type: 'WEDDINGS', title: 'The Amalfi Coast', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', size: 'large' },
  { id: 2, type: 'EDITORIAL', title: 'Vogue September', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80', size: 'small' },
  { id: 3, type: 'FASHION', title: 'Paris Fashion Week', image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80', size: 'small' },
  { id: 4, type: 'PORTRAITURE', title: 'The Artist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80', size: 'small' },
  { id: 5, type: 'COMMERCIAL', title: 'Architecture Digest', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', size: 'large' },
  { id: 6, type: 'FINE ART', title: 'Silence', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80', size: 'small' },
];

const STATS = [
  { label: 'Shoots', target: 340, suffix: '+' },
  { label: 'Countries', target: 28, suffix: '' },
  { label: '48hr Delivery', target: 48, suffix: 'hr' },
  { label: 'Rating', target: 4.9, suffix: '', decimals: 1 },
];

const TESTIMONIALS = [
  { text: "Every frame captured by Nep feels like a memory I didn't know I had. Pure cinematic magic.", author: "Elena Rossi", type: "Wedding" },
  { text: "The eye for detail and the way light is used is nothing short of artistic mastery.", author: "Marc Jacobs", type: "Editorial" },
  { text: "They don't just take photos; they craft an atmosphere that stays with you forever.", author: "Sarah Jenkins", type: "Commercial" },
];

// --- Components ---

const FadingVideo = ({ src, fallbackImage, opacity }: { src?: string, fallbackImage: string, opacity: any }) => {
  if (!src) {
    return (
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        className="bg-cover bg-center h-full w-full opacity-40"
        style={{ opacity, backgroundImage: `url(${fallbackImage})` }}
      />
    );
  }

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute inset-0 z-0 h-full w-full overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-40"
      >
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  );
};

const MagneticButton = ({ children, className, primary = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) => {
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
        className={`px-8 py-4 transition-colors font-mono text-sm tracking-widest uppercase ${
          primary 
            ? "bg-gold text-base hover:bg-opacity-90" 
            : "border border-gold text-gold hover:bg-gold hover:text-base"
        } ${className}`}
      >
        {children}
      </motion.button>
    </div>
  );
};

const Counter = ({ target, suffix, decimals = 0 }: { target: number, suffix: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isStarted.current) {
        isStarted.current = true;
        let start = 0;
        const duration = 600;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Cubic-bezier ease-out equivalent
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = start + (target - start) * easeProgress;
          
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
};

export default function App() {
  const [darkRoom, setDarkRoom] = useState(() => localStorage.getItem('darkroom') === 'true');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [beforeAfterProgress, setBeforeAfterProgress] = useState(1);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const { scrollY } = useScroll();
  const heroSplitTransform = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const checkTouch = () => setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    checkTouch();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('darkroom', darkRoom.toString());
    if (darkRoom) {
      document.body.classList.add('dark-room-active');
    } else {
      document.body.classList.remove('dark-room-active');
    }
  }, [darkRoom]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'ALL') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(item => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className={`min-h-screen transition-colors duration-600 ${darkRoom ? 'dark-room-active' : ''}`}>
      <div className="noise-overlay" />
            {/* Custom Cursor */}
      {!isTouchDevice && (
        <motion.div 
          className="cursor-follower"
          animate={{ 
            x: cursorPos.x, 
            y: cursorPos.y,
            scale: isHoveringImage ? 1.5 : 1,
            opacity: isHoveringImage ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        />
      )}

      {/* [01] HEADER */}
      <header 
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 px-6 md:px-10 flex items-center justify-between font-mono text-xs tracking-widest uppercase ${
          isScrolled || isMobileMenuOpen ? "bg-base py-3 editorial-border-b" : "bg-transparent"
        }`}
      >
        <div id="header-logo" className="flex items-center gap-2 group cursor-pointer lg:flex-1">
          <span className="text-xl font-bold tracking-tighter">NEP<span className="text-gold">.</span>PHOTO</span>
        </div>
        
        <nav id="header-nav" className="hidden md:flex items-center justify-center gap-10 text-[11px] opacity-70 lg:flex-1">
          {['About', 'Work', 'Process', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors hover:opacity-100">{item}</a>
          ))}
        </nav>

        <div className="flex items-center gap-6 lg:flex-1 lg:justify-end">
          <MagneticButton primary className="hidden sm:block text-[10px] py-2 px-6 font-bold">
            Book Now
          </MagneticButton>
          
          <button 
            className="md:hidden text-white/70 hover:text-gold p-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-base md:hidden"
          >
            <div className="flex flex-col h-full pt-32 px-10">
              <nav className="flex flex-col gap-6">
                {['About', 'Work', 'Process', 'Contact'].map((item, idx) => (
                  <div key={item} className="overflow-hidden">
                    <motion.a 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.1 + idx * 0.1, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      href={`#${item.toLowerCase()}`} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-6xl uppercase tracking-tighter hover:text-gold transition-colors block"
                    >
                      {item}
                    </motion.a>
                  </div>
                ))}
              </nav>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pb-12 flex flex-col gap-10"
              >
                <MagneticButton 
                  primary 
                  className="w-full py-6 text-lg font-bold" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Session
                </MagneticButton>
                
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30 text-center">Follow the narrative</span>
                  <div className="flex gap-10 justify-center opacity-60">
                    <Instagram size={22} className="hover:text-gold transition-colors" />
                    <Twitter size={22} className="hover:text-gold transition-colors" />
                    <Linkedin size={22} className="hover:text-gold transition-colors" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* [02] HERO */}
        <section className="relative h-screen overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 z-0">
            <FadingVideo 
              src={heroVideo}
              fallbackImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
              opacity={heroOpacity}
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/60 z-10" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0D0D0D]/40 z-10 pointer-events-none" />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-display text-[11vw] sm:text-7xl md:text-9xl flex items-center gap-3 sm:gap-8 overflow-hidden py-4 sm:py-10">
                <motion.span 
                  className="opacity-90 leading-none"
                  style={{ x: useTransform(scrollY, [0, 500], [0, -60]), filter: useTransform(scrollY, [0, 500], ['blur(0px)', 'blur(8px)']) }}
                >
                  FRAME
                </motion.span>
                <motion.span 
                  initial={{ height: 0 }}
                  animate={{ height: "4rem" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-[1px] sm:h-24 bg-gold/50 mx-1 sm:mx-4"
                ></motion.span>
                <motion.span 
                  className="opacity-90 leading-none"
                  style={{ x: useTransform(scrollY, [0, 500], [0, 60]), filter: useTransform(scrollY, [0, 500], ['blur(0px)', 'blur(8px)']) }}
                >
                  EVERYTHING
                </motion.span>
              </h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.6em] text-center max-w-[280px] sm:max-w-none leading-relaxed"
              >
                Visual Narrative • Editorial Archive • MMXXVI
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
          >
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase opacity-40">Discovery</span>
            <div className="relative w-px h-16 sm:h-20 bg-white/10 overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-gold to-transparent"
              />
            </div>
          </motion.div>
        </section>

        {/* [03] MARQUEE TICKER */}
        <section className="h-12 border-y border-[#2A2A2A] bg-base flex items-center overflow-hidden whitespace-nowrap">
          <div className="flex animate-[marquee_30s_linear_infinite]">
            {[...GENRES, ...GENRES].map((genre, idx) => (
              <div key={idx} className="flex items-center px-10 gap-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{genre}</span>
                <span className="text-gold">•</span>
              </div>
            ))}
          </div>
        </section>

        {/* [04] PORTFOLIO GRID */}
        <section id="work" className="py-24 px-6 md:px-10 max-w-7xl mx-auto editorial-border-b">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-end lg:items-end justify-between mb-16 gap-8"
          >
            <h2 className="font-display text-5xl sm:text-7xl uppercase leading-none opacity-90 w-full lg:w-auto">Editorial<br />Archive.</h2>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-[10px] tracking-widest w-full lg:w-auto">
              {['ALL', ...GENRES.slice(0, 4)].map(filter => (
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 [perspective:1000px] border-t border-l border-[#2A2A2A]">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: idx * 0.05,
                    layout: { duration: 0.4 }
                  }}
                  className={`relative group cursor-none overflow-hidden [transform-style:preserve-3d] border-r border-b border-[#2A2A2A] p-6 ${item.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'}`}
                  onClick={() => setSelectedProject(item)}
                  onMouseEnter={() => {
                    setHoveredImageId(item.id);
                    setIsHoveringImage(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredImageId(null);
                    setIsHoveringImage(false);
                  }}
                >
                  <div 
                    className={`transition-all duration-500 overflow-hidden aspect-[4/5] ${item.size === 'large' ? 'md:aspect-video' : 'md:aspect-[4/5]'}`}
                    style={{
                      filter: hoveredImageId === null 
                        ? 'grayscale(0%) opacity(1)' 
                        : hoveredImageId === item.id 
                          ? 'grayscale(0%) opacity(1)' 
                          : 'grayscale(70%) opacity(0.3)'
                    }}
                  >
                    <img loading="lazy" src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40">
                    <span className="bg-[#0D0D0D] px-2 py-1">0{idx+1} / {item.type}</span>
                    <span className="text-[#F2EDE6]/60 group-hover:text-gold transition-colors">{item.title}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* [05] COUNTER STRIP */}
        <section className="bg-base py-20 px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {STATS.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col gap-2"
              >
                <span className={`font-mono text-4xl md:text-5xl ${idx === 0 ? 'text-gold' : 'text-[#F2EDE6]'}`}>
                  <Counter target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* [06] PROCESS ROW */}
        <section id="process" className="bg-[#111111] py-32 px-10 editorial-border-t">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[11px] font-mono text-gold mb-12 tracking-[0.4em] uppercase"
            >
              THE METHOD
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {[
                { id: '01', title: 'Book', desc: 'A deep dive into your vision. We align aesthetics, light sensibilities, and cinematic goals before a single frame is locked.' },
                { id: '02', title: 'Shoot', desc: 'Minimal intervention. Maximum presence. We observe the unobserved, working with natural shadows and organic movement.' },
                { id: '03', title: 'Deliver', desc: 'Precision grading in our digital darkroom. Each frame is treated like a physical slide, ensuring timeless texture and depth.' },
              ].map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  className="group"
                >
                  <div className="flex items-center gap-6 mb-6">
                    <span className="font-mono text-xs opacity-40">0{step.id}</span>
                    <span className="font-display italic text-3xl group-hover:text-gold transition-colors">{step.title}</span>
                  </div>
                  <p className="font-mono text-xs leading-relaxed text-[#F2EDE6]/50 tracking-wider">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EASTER EGG: Before/After Slider (About Section) */}
        <section id="about" className="py-24 sm:py-40 px-6 sm:px-10 bg-base border-y border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            <div 
              className="relative w-full max-w-md aspect-[3/4] cursor-ew-resize select-none overflow-hidden border border-[#2A2A2A]"
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setBeforeAfterProgress(x / rect.width);
                }
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                setBeforeAfterProgress(x / rect.width);
              }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setBeforeAfterProgress(x / rect.width);
              }}
              onMouseUp={() => setBeforeAfterProgress(1)}
              onMouseLeave={() => setBeforeAfterProgress(1)}
              onTouchEnd={() => setBeforeAfterProgress(1)}
            >
              {/* IMAGE: RAW Photo 600x800 */}
              <div className="absolute inset-0 bg-[url('/src/assets/images/about_section_portrait_1779019597653.png')] bg-cover bg-center grayscale sepia brightness-50" />
              
              {/* IMAGE: EDITED Photo 600x800 */}
              <div 
                className="absolute inset-0 bg-[url('/src/assets/images/about_section_portrait_1779019597653.png')] bg-cover bg-center"
                style={{ clipPath: `inset(0 ${100 - beforeAfterProgress * 100}% 0 0)` }}
              />
              
              <div 
                className="absolute top-0 bottom-0 w-px bg-gold z-10"
                style={{ left: `${beforeAfterProgress * 100}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-base border border-gold rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-10 font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 bg-base border border-gold text-gold">
                HOLD TO REVEAL RAW
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="font-mono text-gold text-[10px] sm:text-[11px] uppercase tracking-[0.4em] mb-6 block">Our Ethos</span>
              <h2 className="font-display text-4xl sm:text-6xl mb-8 sm:mb-10 uppercase leading-[1.1] tracking-tighter">The Romantic Subject.<br className="hidden sm:block" />The Mechanical Observer.</h2>
              <p className="font-mono text-xs sm:text-[13px] text-white/50 leading-relaxed max-w-md mb-10 sm:mb-12 mx-auto md:mx-0">
                We reject the standard. Every commission is a cinematic event, utilizing shadows to tell stories that light often hides. Our process is quiet, intentional, and rooted in the traditions of film noir.
              </p>
              <div className="flex gap-10 sm:gap-16 pt-10 border-t border-[#2A2A2A] justify-center md:justify-start">
                <div>
                  <span className="block font-display text-2xl mb-2 italic text-gold">The Eye</span>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Visual Direction</span>
                </div>
                <div>
                  <span className="block font-display text-2xl mb-2 italic text-gold">The Lab</span>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Cinematic Grading</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* [07] TESTIMONIALS */}
        <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.9, 
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex flex-col gap-8"
              >
                <p className="font-display text-2xl italic leading-relaxed text-paper/90">
                  "{t.text}"
                </p>
                <div className="mt-auto">
                  <div className="h-px w-8 bg-gold mb-4" />
                  <span className="block font-mono text-[11px] uppercase tracking-widest">{t.author}</span>
                  <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">{t.type} Client</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* [08] INSTAGRAM FEED STRIP */}
        <section className="py-12 bg-base border-y border-white/5 overflow-hidden">
          <div className="flex gap-4 px-4 text-center">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const src = i === 1 
                ? "/src/assets/images/regenerated_image_1779089289089.jpg"
                : i === 2 
                ? "/src/assets/images/regenerated_image_1779089290327.jpg"
                : i === 3 
                ? "/src/assets/images/regenerated_image_1779089291667.jpg"
                : `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?auto=format&fit=crop&q=80&w=800&h=800`;

              return (
                <motion.div 
                  key={i}
                  className="relative flex-none w-64 md:w-80 aspect-square group cursor-none overflow-hidden"
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                >
                  {/* IMAGE: Instagram Square 800x800 */}
                  <img 
                    loading="lazy"
                    src={src} 
                    alt="" 
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-base/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-gold" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* [09] CTA BLOCK */}
        <section className="py-24 sm:py-40 px-6 sm:px-10 bg-[#111] text-center border-b border-white/5">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-7xl md:text-8xl mb-12 sm:mb-16 uppercase italic"
          >
            Ready to be seen?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8"
          >
            <MagneticButton primary className="w-full sm:w-auto text-base font-display normal-case italic !px-8 sm:!px-12 !py-4 sm:!py-6 text-lg sm:text-xl">
              Book a Consultation
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto text-[11px]">
              View Full Work
            </MagneticButton>
          </motion.div>
        </section>
      </main>

      {/* [10] FOOTER */}
      <footer className="h-24 md:h-20 w-full bg-base editorial-border-t flex flex-col md:flex-row items-center justify-between px-10 z-50 py-4 gap-6">
        <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">© 2026 NEP PHOTOGRAPHY STUDIO</div>
        <div className="flex gap-8 text-[10px] font-mono opacity-60 uppercase tracking-widest">
          <a href="#" className="hover:text-gold transition-colors">Instagram</a>
          <a href="#" className="hover:text-gold transition-colors">Vimeo</a>
          <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em]">{darkRoom ? 'Normal Light' : 'Dark Room Mode'}</span>
          <button 
            onClick={() => setDarkRoom(!darkRoom)}
            className="w-10 h-5 border border-gold rounded-full relative flex items-center px-1 cursor-pointer transition-colors"
          >
            <motion.div 
              layout
              className={`w-2 h-2 ${darkRoom ? 'bg-gold ml-auto' : 'bg-gold opacity-40'}`} 
            />
          </button>
        </div>
      </footer>

      {/* [11] PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#0D0D0D]/95 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-base editorial-border-l editorial-border-r border-y border-[#2A2A2A] overflow-y-auto flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 text-white/50 hover:text-gold transition-colors p-2"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden">
                <img 
                  loading="lazy"
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="font-mono text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block">Archive / {selectedProject.type}</span>
                  <h2 className="font-display text-5xl md:text-7xl uppercase mb-8 leading-none tracking-tighter">{selectedProject.title}</h2>
                  <div className="w-12 h-1 bg-gold mb-8" />
                  <p className="font-mono text-[13px] text-white/60 leading-relaxed mb-10 max-w-sm">
                    A cinematic exploration into {selectedProject.title.toLowerCase()}. This project focuses on the interplay of natural highlights and the deep textures of the human condition.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 border-t border-[#2A2A2A] pt-10">
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Location</span>
                      <span className="font-display italic text-xl">International Archive</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Format</span>
                      <span className="font-display italic text-xl">35mm Digital</span>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <MagneticButton primary className="!px-10 !py-4 text-xs font-bold" onClick={() => setSelectedProject(null)}>
                      Back to Archive
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Keyframe for marquee
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
document.head.appendChild(styleSheet);
