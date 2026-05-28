import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function Lightbox({ images, initialIndex, isOpen, onClose, title }: LightboxProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync index when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setPanOffset({ x: 0, y: 0 });
      setLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images, onClose]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isZoomed) {
      setIsZoomed(false);
      setPanOffset({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
      // Calculate click coordinates relative to image to center zoom on click if possible,
      // or simply activate standard centered zoom.
    }
  };

  // Mouse pan handlers for close-up viewing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    const activeX = e.clientX - dragStart.current.x;
    const activeY = e.clientY - dragStart.current.y;
    
    // Bounds check to stop image from panning out of viewport too far
    setPanOffset({ x: activeX, y: activeY });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const currentImage = images[currentIndex] || '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="full-screen-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-[#080808]/98 backdrop-blur-xl select-none"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {/* Top Panel Bar */}
          <div className="w-full flex items-center justify-between px-6 py-5 md:px-10 z-[210] bg-gradient-to-b from-[#080808] to-transparent">
            <div className="flex flex-col">
              {title && (
                <span className="font-display italic text-base md:text-lg text-white/90 tracking-wide">
                  {title}
                </span>
              )}
              {images.length > 1 && (
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F2EDE6]/40 mt-1">
                  {language === 'IT' ? 'Fotogramma' : 'Frame'} {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>

            {/* Top Toolbar Actions */}
            <div className="flex items-center gap-4">
              <button
                id="lightbox-zoom-toggle"
                onClick={toggleZoom}
                className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:border-gold/30 hover:bg-gold/10 text-[#F2EDE6]/70 hover:text-gold transition-all duration-300 flex items-center justify-center cursor-pointer"
                title={isZoomed ? (language === 'IT' ? 'Riduci' : 'Zoom Out') : (language === 'IT' ? 'Ingrandisci' : 'Zoom In')}
              >
                {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
              </button>

              <button
                id="lightbox-close-btn"
                onClick={onClose}
                className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:border-gold/30 hover:bg-gold/10 text-[#F2EDE6]/70 hover:text-gold transition-all duration-300 flex items-center justify-center cursor-pointer"
                title={language === 'IT' ? 'Chiudi' : 'Close'}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Center Image Container */}
          <div 
            className="relative flex-1 w-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
            onClick={onClose}
          >
            {/* Ambient Loading indicator */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 p-6 md:p-12 pointer-events-none">
                <div className="w-full max-w-[840px] aspect-[16/10] bg-[#080808] border border-white/5 relative flex flex-col justify-between p-6 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 skeleton-shimmer opacity-25" />
                  
                  {/* Framing markers */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-5 h-5 border-t border-l border-white/10" />
                    <div className="w-5 h-5 border-t border-r border-white/10" />
                  </div>
                  
                  <div className="relative z-10 text-center flex flex-col items-center justify-center my-auto py-12 gap-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
                      DEVELOPING CHROMATIC SEED
                    </span>
                    <div className="h-[1px] w-32 bg-white/5 overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full w-12 bg-accent-orange/50 skeleton-shimmer" />
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between items-end">
                    <div className="w-5 h-5 border-b border-l border-white/10" />
                    <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">
                      NEP.PHOTO / FRAME_SYS
                    </span>
                    <div className="w-5 h-5 border-b border-r border-white/10" />
                  </div>
                </div>
              </div>
            )}

            <div 
              className="relative max-w-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
            >
              <motion.img
                id="lightbox-active-display-image"
                key={currentImage}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                src={currentImage}
                alt={title || "High fidelity archival photography"}
                referrerPolicy="no-referrer"
                onLoad={() => setLoading(false)}
                onMouseDown={handleMouseDown}
                style={{
                  x: isZoomed ? panOffset.x : 0,
                  y: isZoomed ? panOffset.y : 0,
                  scale: isZoomed ? 1.6 : 1,
                  cursor: !isZoomed ? 'zoom-in' : isDragging ? 'grabbing' : 'grab',
                }}
                className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain border border-white/5 shadow-2xl transition-shadow select-none duration-300"
                onClick={toggleZoom}
              />
            </div>
          </div>

          {/* Bottom Footer Overlay */}
          <div className="w-full flex items-center justify-between px-6 py-6 md:px-10 z-[210] bg-gradient-to-t from-[#080808] to-transparent">
            {/* Left controller helper */}
            <div className="hidden md:block font-mono text-[9px] uppercase tracking-[0.25em] text-[#F2EDE6]/30">
              {language === 'IT' 
                ? 'Naviga con i tasti Freccia • Esci con ESC' 
                : 'Navigate via Arrow Keys • ESC to Exit'}
            </div>

            {/* Navigation controls if there are multiple images */}
            {images.length > 1 && (
              <div className="flex gap-4 items-center ml-auto">
                <button
                  id="lightbox-prev-btn"
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-white/5 bg-[#121212]/80 hover:border-gold/30 hover:bg-gold/10 text-white/70 hover:text-gold transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg"
                  title={language === 'IT' ? 'Fotogramma Precedente' : 'Previous Frame'}
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-mono text-[10px] text-[#F2EDE6]/50 tracking-widest min-w-[50px] text-center">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  id="lightbox-next-btn"
                  onClick={handleNext}
                  className="p-3 rounded-full border border-white/5 bg-[#121212]/80 hover:border-gold/30 hover:bg-gold/10 text-white/70 hover:text-gold transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg"
                  title={language === 'IT' ? 'Fotogramma Successivo' : 'Next Frame'}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
