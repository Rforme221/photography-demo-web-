import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, ArrowDown, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';

import heroVideo from './assets/flova_Standalone_cinemagraph_loop_video_202605181148_0d503d.mp4';
import { GENRES, PORTFOLIO_ITEMS, STATS, TESTIMONIALS, resolveAsset } from './constants';
import { MagneticButton } from './components/MagneticButton';
import { Counter } from './components/Counter';
import { FadingVideo } from './components/FadingVideo';
import { useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Lightbox } from './components/Lightbox';

interface HomePagePortfolioItemProps {
  item: typeof PORTFOLIO_ITEMS[0];
  idx: number;
  hoveredImageId: number | null;
  setHoveredImageId: (id: number | null) => void;
  setIsHoveringImage: (is: boolean) => void;
  setSelectedProject: (p: typeof PORTFOLIO_ITEMS[0] | null) => void;
}

const PortfolioItemCard: React.FC<HomePagePortfolioItemProps> = ({ 
  item, 
  idx, 
  hoveredImageId, 
  setHoveredImageId, 
  setIsHoveringImage, 
  setSelectedProject 
}) => {
  const { getProjectTitle, getGenreLabel } = useLanguage();
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // High-fidelity hover mouse tracking dynamic springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseScale = useMotionValue(1.05);

  const hoverX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const hoverY = useSpring(mouseY, { stiffness: 90, damping: 22 });
  const hoverScale = useSpring(mouseScale, { stiffness: 90, damping: 22 });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: idx * 0.05,
        layout: { duration: 0.4 }
      }}
      className={`relative group cursor-none overflow-hidden [transform-style:preserve-3d] border-r border-b border-[#2A2A2A] p-6 ${item.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'}`}
      onClick={() => setSelectedProject(item)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
        mouseX.set(x * 16); // subtle shift (16px max displacement)
        mouseY.set(y * 16);
      }}
      onMouseEnter={() => {
        setHoveredImageId(item.id);
        setIsHoveringImage(true);
        mouseScale.set(1.15); // Luxurious lens-zoom on hover
      }}
      onMouseLeave={() => {
        setHoveredImageId(null);
        setIsHoveringImage(false);
        mouseX.set(0);
        mouseY.set(0);
        mouseScale.set(1.05); // Smoothly rest to default bounds
      }}
    >
      <div 
        className={`relative transition-all duration-700 overflow-hidden aspect-[4/5] ${item.size === 'large' ? 'md:aspect-video' : 'md:aspect-[4/5]'}`}
        style={{
          filter: hoveredImageId === null 
            ? 'grayscale(0%) opacity(1)' 
            : hoveredImageId === item.id 
              ? 'grayscale(0%) opacity(1)' 
              : 'grayscale(100%) opacity(0.2) blur(2px)'
        }}
      >
        <div className="absolute inset-x-0 -inset-y-12 overflow-hidden pointer-events-none">
          <motion.div style={{ y }} className="w-full h-full relative bg-[#0C0C0C]">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#070707] z-10">
                <div className="w-12 h-12 border border-[#2A2A2A] flex items-center justify-center animate-pulse">
                  <div className="w-2.5 h-2.5 bg-gold/20 rounded-full" />
                </div>
              </div>
            )}
            <motion.div 
              initial={{ filter: 'blur(15px)', opacity: 0 }}
              animate={{ 
                filter: isLoaded ? 'blur(0px)' : 'blur(15px)',
                opacity: isLoaded ? 1 : 0
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <motion.img 
                style={{ x: hoverX, y: hoverY, scale: hoverScale }}
                loading="lazy" 
                referrerPolicy="no-referrer"
                src={resolveAsset(item.image)} 
                alt={item.title} 
                onLoad={() => setIsLoaded(true)}
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Subtle Gold Grid Overlay on Hover */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {/* Vertical Grid Lines */}
          <div className="absolute left-1/3 top-0 bottom-0 w-[0.5px] bg-gold/30 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-[50ms]" />
          <div className="absolute left-2/3 top-0 bottom-0 w-[0.5px] bg-gold/30 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-[150ms]" />
          
          {/* Horizontal Grid Lines */}
          <div className="absolute top-1/3 left-0 right-0 h-[0.5px] bg-gold/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-[100ms]" />
          <div className="absolute top-2/3 left-0 right-0 h-[0.5px] bg-gold/30 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-[200ms]" />
          
          {/* Minimalist Viewfinder Framing Brackets */}
          <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-gold/40 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-gold/40 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
          <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-gold/40 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-gold/40 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
        className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40"
      >
        <span className="bg-[#0D0D0D] px-2 py-1">0{idx+1} / {getGenreLabel(item.type)}</span>
        <span className="text-[#F2EDE6]/60 group-hover:text-gold transition-colors">{getProjectTitle(item.title)}</span>
      </motion.div>
    </motion.div>
  );
};

export default function HomePage() {
  const { t, language, getProjectTitle, getGenreLabel } = useLanguage();
  const [darkRoom, setDarkRoom] = useState(() => localStorage.getItem('darkroom') === 'true');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { stiffness: 450, damping: 28, mass: 0.4 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 450, damping: 28, mass: 0.4 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [beforeAfterProgress, setBeforeAfterProgress] = useState(1);
  const [activeFilter, setActiveFilter] = useState('WILDLIFE');
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [aboutExpanded, setAboutExpanded] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject?.id]);

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
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Parallax Scroll Tracking for About Section
  const aboutSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"]
  });

  const bgYRaw = useTransform(aboutScrollProgress, [0, 1], [-55, 55]);
  const fgYRaw = useTransform(aboutScrollProgress, [0, 1], [-15, 15]);

  const bgY = useSpring(bgYRaw, { stiffness: 80, damping: 24, mass: 0.4 });
  const fgY = useSpring(fgYRaw, { stiffness: 80, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const checkTouch = () => setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.getElementById('full-screen-lightbox')) {
        return; // Let the Lightbox handle its own keyboard shortcuts
      }
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowLeft') handlePrevProject();
      if (e.key === 'ArrowRight') handleNextProject();
    };
    
    checkTouch();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
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
    if (activeFilter === 'ALL') return PORTFOLIO_ITEMS.slice(0, 6);
    return PORTFOLIO_ITEMS.filter(item => item.type === activeFilter).slice(0, 6);
  }, [activeFilter]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | null | undefined, targetId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-600 ${darkRoom ? 'dark-room-active' : ''}`}>
      <div className="noise-overlay" />
            
      {!isTouchDevice && (
        <motion.div 
          className="cursor-follower"
          style={{ 
            x: cursorSpringX, 
            y: cursorSpringY,
            translateX: "-50%",
            translateY: "-50%"
          }}
          animate={{ 
            scale: isHoveringImage ? 1.5 : 1,
            opacity: isHoveringImage ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <header 
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 px-6 md:px-10 flex items-center justify-between font-mono text-xs tracking-widest uppercase ${
          isScrolled || isMobileMenuOpen ? "bg-base py-3 editorial-border-b" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group cursor-pointer lg:flex-1">
          <img 
            src={resolveAsset("/src/assets/images/Logo/309609011_502923838511265_499136910629103232_n-Photoroom.png")} 
            alt="NEP.PHOTO" 
            className="h-12 md:h-14 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <nav className="hidden md:flex items-center justify-center gap-10 text-[11px] opacity-70 lg:flex-1">
          {[
            { key: 'nav.about', id: 'about' },
            { key: 'nav.work', id: 'work' },
            { key: 'nav.process', id: 'process' },
            { key: 'nav.contact', id: 'contact' }
          ].map(item => (
            <a 
              key={item.key} 
              href={`#${item.id}`} 
              onClick={(e) => handleScrollToSection(e, item.id)}
              className="hover:text-gold transition-colors hover:opacity-100"
            >
              {t(item.key as any)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 lg:flex-1 lg:justify-end">
          <LanguageSwitcher className="hidden sm:flex" />
          <MagneticButton primary className="hidden sm:block text-[10px] py-2 px-6 font-bold" onClick={() => handleScrollToSection(undefined, 'contact')}>
            {t('nav.book')}
          </MagneticButton>
          
          <button 
            className="md:hidden text-white/70 hover:text-gold p-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-base md:hidden"
          >
            <div className="flex flex-col h-full pt-32 px-10">
              <nav className="flex flex-col gap-6">
                {[
                  { key: 'nav.about', id: 'about' },
                  { key: 'nav.work', id: 'work' },
                  { key: 'nav.process', id: 'process' },
                  { key: 'nav.contact', id: 'contact' }
                ].map((item, idx) => (
                  <div key={item.key} className="overflow-hidden">
                    <motion.a 
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.2 + idx * 0.1, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      href={`#${item.id}`} 
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleScrollToSection(e, item.id);
                      }}
                      className="font-display text-6xl uppercase tracking-tighter hover:text-gold transition-colors block"
                    >
                      {t(item.key as any)}
                    </motion.a>
                  </div>
                ))}
              </nav>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-auto pb-12 flex flex-col gap-8"
              >
                <div className="flex justify-center mb-2">
                  <LanguageSwitcher />
                </div>
                
                <MagneticButton 
                  primary 
                  className="w-full py-6 text-lg font-bold" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleScrollToSection(undefined, 'contact');
                  }}
                >
                  {t('nav.book')}
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
        <section className="relative h-screen overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 z-0">
            <FadingVideo 
              src={heroVideo}
              fallbackImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
              opacity={heroOpacity}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/60 z-10" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-display text-[11vw] sm:text-7xl md:text-9xl flex items-center gap-3 sm:gap-8 overflow-hidden py-4 sm:py-10 text-white">
                <motion.span 
                  className="leading-none"
                  style={{ x: useTransform(scrollY, [0, 500], [0, -60]), filter: useTransform(scrollY, [0, 500], ['blur(0px)', 'blur(8px)']) }}
                >
                  {t('hero.title.frame')}
                </motion.span>
                <motion.span 
                  initial={{ height: 0 }}
                  animate={{ height: "4rem" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-[1px] sm:h-24 bg-gold/50 mx-1 sm:mx-4"
                ></motion.span>
                <motion.span 
                  className="leading-none"
                  style={{ x: useTransform(scrollY, [0, 500], [0, 60]), filter: useTransform(scrollY, [0, 500], ['blur(0px)', 'blur(8px)']) }}
                >
                  {t('hero.title.everything')}
                </motion.span>
              </h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.6em] text-center max-w-[280px] sm:max-w-none leading-relaxed text-white whitespace-pre-line"
              >
                {t('hero.subtitle')}
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
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase opacity-40 text-white">{language === 'IT' ? 'Scoperta' : 'Discovery'}</span>
            <div className="relative w-px h-16 sm:h-20 bg-white/10 overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-gold to-transparent"
              />
            </div>
          </motion.div>
        </section>

        <section className="h-12 border-y border-[#2A2A2A] bg-base flex items-center overflow-hidden whitespace-nowrap">
          <div className="flex animate-[marquee_30s_linear_infinite]">
            {[...GENRES, ...GENRES].map((genre, idx) => (
              <div key={idx} className="flex items-center px-10 gap-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{getGenreLabel(genre)}</span>
                <span className="text-gold">•</span>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="py-24 px-6 md:px-10 max-w-7xl mx-auto editorial-border-b">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-end lg:items-end justify-between mb-16 gap-8"
          >
            <h2 className="font-display text-5xl sm:text-7xl uppercase leading-none opacity-90 w-full lg:w-auto">
              {language === 'IT' ? <>Archivio<br />Editoriale.</> : <>Editorial<br />Archive.</>}
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-[10px] tracking-widest w-full lg:w-auto">
              {GENRES.map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-4 py-2 border transition-all ${activeFilter === filter ? 'border-gold text-gold' : 'border-[#2A2A2A] text-white/40 hover:border-white/30'}`}
                >
                  {getGenreLabel(filter)}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 [perspective:1000px] border-t border-l border-[#2A2A2A]">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredItems.map((item, idx) => (
                <PortfolioItemCard 
                  key={item.id}
                  item={item}
                  idx={idx}
                  hoveredImageId={hoveredImageId}
                  setHoveredImageId={setHoveredImageId}
                  setIsHoveringImage={setIsHoveringImage}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link to="/work">
              <MagneticButton>{language === 'IT' ? 'Esplora l’Archivio Completo' : 'Explore Full Archive'}</MagneticButton>
            </Link>
          </div>
        </section>

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
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                  {stat.label === 'Shoots' ? t('stats.shoots') :
                   stat.label === 'Countries' ? t('stats.countries') :
                   stat.label === '48hr Delivery' ? t('stats.delivery') :
                   stat.label === 'Rating' ? t('stats.rating') : stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section 
          id="process" 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111111] py-32 px-10 editorial-border-t origin-center"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[11px] font-mono text-gold mb-12 tracking-[0.4em] uppercase"
            >
              {language === 'IT' ? 'IL METODO' : 'THE METHOD'}
            </motion.div>
            <div className="flex flex-col md:flex-row gap-10 md:gap-4 lg:gap-8 items-start">
              {[
                { 
                  id: '01', 
                  title: 'Book', 
                  short: 'A deep dive into your vision. We align aesthetics and cinematic goals.',
                  long: 'The journey begins with an intimate dialogue. We don\'t just ask about the schedule; we explore the emotional geography of your event. Through shared moodboards and cinematic references, we define a visual language that honors your story. This phase is about trust and technical preparation—scouting for light patterns and understanding the rhythm of the day.'
                },
                { 
                  id: '02', 
                  title: 'Shoot', 
                  short: 'Minimal intervention. Maximum presence. Natural shadows.',
                  long: 'On the day of the shoot, we become silent narrators. Our presence is felt, not seen. We prioritize organic interactions over directed poses, capturing the fleeting glances and quiet pauses that usually go unnoticed. Utilizing natural light and high-speed primes, we create a soft, cinematic texture that feels like a still from a lost film.'
                },
                { 
                  id: '03', 
                  title: 'Deliver', 
                  short: 'Precision grading in our digital darkroom. Timeless texture.',
                  long: 'The "Digital Darkroom" is where the final narrative is bound. Our post-production is a labor of precision. We apply custom cinematic color grading that enhances the natural depth and filmic grain of each shot. The result is a cohesive editorial archive—a series of timeless frames delivered in a bespoke gallery designed for longevity.'
                },
              ].map((step, idx) => {
                const isActive = activeProcessStep === step.id;
                const isAnyActive = activeProcessStep !== null;
                return (
                  <motion.div 
                    key={step.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: isAnyActive ? 0 : idx * 0.2,
                      layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                    }}
                    onClick={() => setActiveProcessStep(isActive ? null : step.id)}
                    className={`relative cursor-pointer transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? 'flex-[2] md:flex-[3] bg-base/40 p-8 border border-gold/20' 
                        : (isAnyActive ? 'flex-1 opacity-20 hover:opacity-40 grayscale pointer-events-auto' : 'flex-1 md:flex-1 p-0')
                    }`}
                  >
                    <motion.div layout className="flex items-center gap-6 mb-6">
                      <span className="font-mono text-xs opacity-40">0{step.id}</span>
                      <span className={`font-display italic text-3xl transition-colors duration-500 ${isActive ? 'text-gold' : 'group-hover:text-gold'}`}>
                        {step.title}
                      </span>
                    </motion.div>
                    <AnimatePresence mode="wait">
                      {!isActive ? (
                        <motion.p 
                          key="short"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-mono text-[10px] leading-relaxed text-[#F2EDE6]/50 tracking-wider max-w-[200px]"
                        >
                          {step.short}
                        </motion.p>
                      ) : (
                        <motion.div
                          key="long"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col gap-6"
                        >
                          <p className="font-mono text-[11px] leading-relaxed text-[#F2EDE6]/80 tracking-wider">
                            {step.long}
                          </p>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="pt-6 border-t border-gold/10"
                          >
                            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/40">{t('process.subtitle')}</span>
                            <p className="font-display italic text-xl mt-2">{t('process.deliverable')}</p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 right-4 text-white/20 hover:text-gold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProcessStep(null);
                        }}
                      >
                        <X size={16} />
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <section id="about" ref={aboutSectionRef} className="py-24 sm:py-40 px-6 sm:px-10 bg-base border-y border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            <div 
              className="relative w-full max-w-md aspect-[3/4] cursor-ew-resize select-none overflow-hidden border border-[#2A2A2A] touch-none"
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setBeforeAfterProgress(x / rect.width);
                }
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                setBeforeAfterProgress(x / rect.width);
              }}
              onMouseUp={() => setBeforeAfterProgress(1)}
              onMouseLeave={() => setBeforeAfterProgress(1)}
              onTouchEnd={() => setBeforeAfterProgress(1)}
            >
              <motion.img 
                src={resolveAsset("/src/assets/images/about_section_portrait_1779019597653.png")} 
                className="absolute inset-x-0 -inset-y-16 w-full h-[calc(100%+128px)] object-cover grayscale sepia brightness-50"
                alt={t('about.reveal.bg')}
                referrerPolicy="no-referrer"
                loading="lazy"
                style={{ y: bgY }}
              />
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - beforeAfterProgress * 100}% 0 0)` }}
              >
                <motion.img 
                  src={resolveAsset("/src/assets/images/about_section_portrait_1779019597653.png")}
                  className="absolute inset-x-0 -inset-y-16 w-full h-[calc(100%+128px)] object-cover"
                  alt={t('about.reveal.fg')}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  style={{ y: fgY }}
                />
              </div>
              <div 
                className="absolute top-0 bottom-0 w-px bg-gold z-10"
                style={{ left: `${beforeAfterProgress * 100}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-base border border-gold rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-10 font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 bg-base border border-gold text-gold">
                {language === 'IT' ? 'RIVELA FOTO GREZZA' : 'HOLD TO REVEAL RAW'}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left text-white">
              <span className="font-mono text-gold text-[10px] sm:text-[11px] uppercase tracking-[0.4em] mb-6 block">{t('about.ethos')}</span>
              <h2 className="font-display text-4xl sm:text-6xl mb-8 sm:mb-10 uppercase leading-[1.1] tracking-tighter">
                {language === 'IT' ? <>Il Sottofondo Romantico.<br className="hidden sm:block" />L'Osservatore Meccanico.</> : <>The Romantic Subject.<br className="hidden sm:block" />The Mechanical Observer.</>}
              </h2>
              <p className="font-mono text-xs sm:text-[13px] text-white/50 leading-relaxed max-w-md mb-8 mx-auto md:mx-0">
                {language === 'IT' 
                  ? 'Respingiamo le convenzioni. Ogni commissione è un evento cinematografico, che sfrutta le ombre per narrare vicende che la luce tenta di celare. Il nostro approccio è silenzioso, intimo e radicato nella tradizione noir.' 
                  : 'We reject the standard. Every commission is a cinematic event, utilizing shadows to tell stories that light often hides. Our process is quiet, intentional, and rooted in the traditions of film noir.'}
              </p>

              {/* Expand Button */}
              <div className="mb-10 flex justify-center md:justify-start">
                <button
                  id="about-expand-btn"
                  onClick={() => setAboutExpanded(!aboutExpanded)}
                  className="group flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-gold bg-transparent text-white hover:text-gold transition-all duration-300 rounded-none font-mono text-[11px] uppercase tracking-[0.2em] cursor-pointer"
                >
                  <span>{aboutExpanded ? t('about.expand_btn.less') : t('about.expand_btn.more')}</span>
                  <motion.span
                    animate={{ rotate: aboutExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-gold" id="about-expand-icon" />
                  </motion.span>
                </button>
              </div>

              {/* Collapsible Storytelling Information Block */}
              <AnimatePresence>
                {aboutExpanded && (
                  <motion.div
                    id="about-expanded-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden mb-10 max-w-lg mx-auto md:mx-0 text-left border-l border-gold/40 pl-6 space-y-5"
                  >
                    <h3 className="font-display text-xl sm:text-2xl text-gold italic uppercase tracking-wider mb-2">
                      {t('about.extended_bio.title')}
                    </h3>
                    <p className="font-mono text-xs text-white/70 leading-relaxed">
                      {t('about.extended_bio.p1')}
                    </p>
                    <p className="font-mono text-xs text-white/70 leading-relaxed">
                      {t('about.extended_bio.p2')}
                    </p>
                    <p className="font-mono text-xs text-white/70 leading-relaxed">
                      {t('about.extended_bio.p3')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-10 sm:gap-16 pt-10 border-t border-[#2A2A2A] justify-center md:justify-start">
                <div>
                  <span className="block font-display text-2xl mb-2 italic text-gold">{t('about.eye.title')}</span>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">{t('about.eye.subtitle')}</span>
                </div>
                <div>
                  <span className="block font-display text-2xl mb-2 italic text-gold">{t('about.lab.title')}</span>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">{t('about.lab.subtitle')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8 text-white"
              >
                <p className="font-display text-2xl italic leading-relaxed text-paper/90">
                  "{language === 'IT' ? (
                    t.author === 'Elena Rossi' ? 'Ogni fotogramma catturato da Nep sembra un ricordo che non sapevo di avere. Pura magia cinematografica.' :
                    t.author === 'Marc Jacobs' ? "L'occhio per i dettagli e il modo in cui viene utilizzata la luce sono a dir poco maestria artistica." :
                    t.author === 'Sarah Jenkins' ? "Non scattano solo foto; creano un'atmosfera che ti rimane impressa per sempre." : t.text
                  ) : t.text}"
                </p>
                <div className="mt-auto">
                  <div className="h-px w-8 bg-gold mb-4" />
                  <span className="block font-mono text-[11px] uppercase tracking-widest">{t.author}</span>
                  <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
                    {language === 'IT' ? (
                      t.type === 'Wedding' ? 'Cliente Matrimonio' :
                      t.type === 'Editorial' ? 'Cliente Editoriale' :
                      t.type === 'Commercial' ? 'Cliente Commerciale' : `${getGenreLabel(t.type)} Cliente`
                    ) : `${t.type} Client`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="py-24 bg-base border-y border-white/5 overflow-hidden">
          <div className="flex gap-4 px-4 overflow-x-scroll pb-8 md:pb-0 hide-scrollbar scroll-smooth snap-x md:justify-center">
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
                  <img 
                    loading="lazy"
                    src={resolveAsset(src)} 
                    alt={`NEP Photography Studio Gallery Image ${i}`} 
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

        <section className="py-24 sm:py-40 px-6 sm:px-10 bg-[#111] text-center border-b border-white/5">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-7xl md:text-8xl mb-12 sm:mb-16 uppercase italic text-white"
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
            <MagneticButton primary className="w-full sm:w-auto text-base font-display normal-case italic !px-8 sm:!px-12 !py-4 sm:!py-6 text-lg sm:text-xl" onClick={() => handleScrollToSection(undefined, 'contact')}>
              {language === 'IT' ? 'Prenota una Consulenza' : 'Book a Consultation'}
            </MagneticButton>
            <Link to="/work" className="w-full sm:w-auto">
              <MagneticButton className="w-full sm:w-auto text-[11px]">
                {language === 'IT' ? 'Vedi Archivio Lavori' : 'View Full Work'}
              </MagneticButton>
            </Link>
          </motion.div>
        </section>

        <section id="contact" className="py-24 sm:py-40 px-6 sm:px-10 bg-base editorial-border-t">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
            <div className="flex-1 text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-mono text-gold text-[10px] uppercase tracking-[0.4em] mb-6 block">{t('contact.inquiries')}</span>
                <h2 className="font-display text-5xl sm:text-7xl uppercase leading-none mb-10">
                  {language === 'IT' ? <>Inizia il<br />Dialogo.</> : <>Start the<br />Dialogue.</>}
                </h2>
                <p className="font-mono text-xs sm:text-[13px] text-white/50 leading-relaxed max-w-sm mb-12">
                  {language === 'IT' 
                    ? "Il nostro archivio è curato per chi valorizza l'occhio meccanico e il soggetto romantico. Inviaci la tua visione e blocchiamo il fotogramma insieme." 
                    : "Our archive is curated for those who value the mechanical eye and the romantic subject. Send us your vision, and let's lock the frame."}
                </p>
                <div className="flex flex-col gap-8 border-t border-[#2A2A2A] pt-12">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">{t('contact.email')}</span>
                    <span className="font-display italic text-2xl hover:text-gold transition-colors cursor-pointer text-white">archive@nep.photo</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">{t('contact.location')}</span>
                    <span className="font-display italic text-2xl text-white">Milano, IT • Via Tortona 35</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-10 border border-gold/20 bg-gold/5"
                  >
                    <span className="font-display text-4xl italic text-gold mb-6">{t('contact.received')}</span>
                    <p className="font-mono text-xs text-white/50 tracking-widest max-w-[280px]">
                      {language === 'IT' 
                        ? 'La tua visione è stata archiviata. I nostri curatori risponderanno a breve.' 
                        : 'Your vision has been archived. Our curators will respond within the cycle.'}
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-gold hover:text-white transition-colors"
                    >
                      {language === 'IT' ? 'Nuovo Messaggio •' : 'New Message •'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormStatus('sending');
                      setTimeout(() => setFormStatus('success'), 1500);
                    }}
                    className="flex flex-col gap-10"
                  >
                    <div className="relative group">
                      <label htmlFor="full-identity" className="absolute -top-3 left-0 font-mono text-[9px] uppercase tracking-widest text-white/30 group-focus-within:text-gold transition-colors">
                        {language === 'IT' ? 'Identità Completa' : 'Full Identity'}
                      </label>
                      <input required id="full-identity" name="name" type="text" placeholder={language === 'IT' ? 'INSERISCI IL TUO NOME' : 'ENTER YOUR NAME'} className="w-full bg-transparent border-b border-[#2A2A2A] py-4 font-mono text-[11px] uppercase tracking-widest focus:outline-none focus:border-gold transition-colors placeholder:text-white/10 text-white" />
                    </div>
                    <div className="relative group">
                      <label htmlFor="return-address" className="absolute -top-3 left-0 font-mono text-[9px] uppercase tracking-widest text-white/30 group-focus-within:text-gold transition-colors">
                        {language === 'IT' ? 'Indirizzo di Risposta' : 'Return Address'}
                      </label>
                      <input required id="return-address" name="email" type="email" placeholder={language === 'IT' ? 'INDIRIZZO EMAIL' : 'EMAIL ADDRESS'} className="w-full bg-transparent border-b border-[#2A2A2A] py-4 font-mono text-[11px] uppercase tracking-widest focus:outline-none focus:border-gold transition-colors placeholder:text-white/10 text-white" />
                    </div>
                    <div className="relative group">
                      <label htmlFor="proposition" className="absolute -top-3 left-0 font-mono text-[9px] uppercase tracking-widest text-white/30 group-focus-within:text-gold transition-colors">
                        {language === 'IT' ? 'La Proposta' : 'The Proposition'}
                      </label>
                      <textarea required id="proposition" name="message" rows={4} placeholder={language === 'IT' ? 'DESCRIVI LA TUA VISIONE' : 'DESCRIBE YOUR VISION'} className="w-full bg-transparent border-b border-[#2A2A2A] py-4 font-mono text-[11px] uppercase tracking-widest focus:outline-none focus:border-gold transition-colors placeholder:text-white/10 resize-none text-white" />
                    </div>
                    <div className="pt-6">
                      <MagneticButton primary className="!px-16 !py-6 text-sm font-bold w-full sm:w-auto disabled:opacity-50">
                        {formStatus === 'sending' 
                          ? (language === 'IT' ? 'In Trasmissione...' : 'Transmitting...') 
                          : (language === 'IT' ? 'Invia Messaggio' : 'Transmit Message')}
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <footer className="h-24 md:h-20 w-full bg-base editorial-border-t flex flex-col md:flex-row items-center justify-between px-10 z-50 py-4 gap-6">
        <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-white">© 2026 NEP PHOTOGRAPHY STUDIO</div>
        <div className="flex gap-8 text-[10px] font-mono opacity-60 uppercase tracking-widest">
          <a href="#" className="hover:text-gold transition-colors text-white">Privacy</a>
          <a href="#" className="hover:text-gold transition-colors text-white">Terms</a>
        </div>
      </footer>

      {/* Project Modal (Keeping it in HomePage for now since it's used in the Archive section) */}
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
              <button className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-gold transition-colors" onClick={() => setSelectedProject(null)}><X size={24} /></button>
              <div 
                className="relative w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden bg-black/20 group/carousel select-none cursor-pointer"
                onClick={() => {
                  setLightboxIndex(currentImageIndex);
                  setIsLightboxOpen(true);
                }}
                title={language === 'IT' ? "Clicca per la modalità a schermo intero ad alta risoluzione" : "Click for full-screen high-fidelity lightbox"}
              >
                <AnimatePresence>
                  <motion.img 
                    key={`${selectedProject.id}-${currentImageIndex}`}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    src={resolveAsset(selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images[currentImageIndex] : selectedProject.image)} 
                    alt={`${selectedProject.title} - View ${currentImageIndex + 1}`} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/carousel:scale-102"
                  />
                </AnimatePresence>

                {/* Subtle View High-Fidelity overlay on hover */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                  <div className="border border-gold px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold bg-base/95 shadow-xl">
                    {language === 'IT' ? 'VEDI AD ALTA RISOLUZIONE ✦' : 'VIEW HIGH-FIDELITY ✦'}
                  </div>
                </div>

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-[5]" />

                {(selectedProject.images && selectedProject.images.length > 1) && (
                  <>
                    {/* Navigation Arrows */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const len = selectedProject.images.length;
                        setCurrentImageIndex((prev) => (prev - 1 + len) % len);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/45 hover:bg-gold hover:text-black hover:scale-105 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 flex items-center justify-center border border-white/5 shadow-lg cursor-pointer"
                      title="Previous Image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const len = selectedProject.images.length;
                        setCurrentImageIndex((prev) => (prev + 1) % len);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/45 hover:bg-gold hover:text-black hover:scale-105 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 flex items-center justify-center border border-white/5 shadow-lg cursor-pointer"
                      title="Next Image"
                    >
                      <ChevronRight size={16} />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/45 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
                      {selectedProject.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(i);
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentImageIndex ? 'bg-orange w-3' : 'bg-white/40 hover:bg-white/80'}`}
                          title={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Image counter pagination badge */}
                    <div className="absolute top-6 left-6 z-20 font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/80 bg-black/45 px-3 py-1.5 rounded border border-white/5 backdrop-blur-md">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </>
                )}
              </div>
              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center overflow-y-auto max-h-[50vh] md:max-h-none text-white">
                <div className="overflow-hidden">
                  <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-mono text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block">Archive / {selectedProject.type}</motion.span>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h2 key={selectedProject.title} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter">{selectedProject.title}</motion.h2>
                </div>
                <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ delay: 0.6, duration: 0.8 }} className="h-1 bg-gold mb-8" />
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="font-mono text-[13px] text-white/60 leading-relaxed mb-10 max-w-sm">A cinematic exploration into {selectedProject.title.toLowerCase()}. This project focuses on the interplay of natural highlights and the deep textures of the human condition.</motion.p>
                <div className="grid grid-cols-2 gap-8 border-t border-[#2A2A2A] pt-10">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}><span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Location</span><span className="font-display italic text-xl">International Archive</span></motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}><span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Format</span><span className="font-display italic text-xl">35mm Digital</span></motion.div>
                </div>
                <div className="mt-12 flex items-center gap-4">
                  <MagneticButton onClick={handlePrevProject} className="!p-4 flex items-center justify-center"><ChevronLeft size={18} /></MagneticButton>
                  <MagneticButton primary className="!px-10 !py-4 text-xs font-bold" onClick={() => setSelectedProject(null)}>Back to Archive</MagneticButton>
                  <MagneticButton onClick={handleNextProject} className="!p-4 flex items-center justify-center"><ChevronRight size={18} /></MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox 
        images={(selectedProject?.images || (selectedProject ? [selectedProject.image] : [])).map(resolveAsset)}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={selectedProject ? getProjectTitle(selectedProject.title) : undefined}
      />
    </div>
  );
}
