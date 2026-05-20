import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PORTFOLIO_ITEMS, GENRES } from '../constants';
import { MagneticButton } from '../components/MagneticButton';

interface FullWorkPortfolioItemProps {
  item: typeof PORTFOLIO_ITEMS[0];
  idx: number;
  setSelectedProject: (p: typeof PORTFOLIO_ITEMS[0] | null) => void;
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

const STYLE_PRESETS = [
  { 
    name: 'Cinematic Film', 
    suffix: 'cinematic direction, 35mm color film photograph, warm ambient tones, gold highlights, authentic grain, luxury editorial composition' 
  },
  { 
    name: 'Vogue Studio', 
    suffix: 'famous high-fashion campaign photo shoot, studio strobes, rich textured dark studio background, soft contrast, designer garment drape' 
  },
  { 
    name: 'Silver Halide', 
    suffix: 'vintage black and white archival print, silver halide film processing, dramatic high contrast shadows, noir fashion aesthetics' 
  },
  { 
    name: 'Ethereal Haze', 
    suffix: 'dreamlike soft focus lens, golden rear light leak filters, gentle light halos, ambient dust particles, warm organic mood' 
  }
];

const MOOD_PRESETS = [
  { name: 'Sultry Sunset', phrase: 'rendered in soft voluptuous golden hour sun-drenched rays, ambient amber flares' },
  { name: 'Atmospheric Noir', phrase: 'stark dramatic deep chiaroscuro cast shadows, black and white archival tone' },
  { name: 'Muted Editorial', phrase: 'subtle desaturated luxury fog haze, minimalist editorial matte finish' },
  { name: 'Warm Twilight', phrase: 'ethereal deep twilight glow, cinematic light leak filters, soft warm highlights' },
  { name: 'Hyper-Minimal', phrase: 'exceptionally clean diffused high-key studio light, crisp shadow outline' }
];

const COMPOSITION_PRESETS = [
  { name: 'Detail Close-Up', phrase: 'macro focus on intricate material textures, organic shapes, and fine details' },
  { name: 'Cinema Wide', phrase: 'expansive architectural landscape framing with balanced perspective and deep space feel' },
  { name: 'Symmetrical', phrase: 'classical center-weighted symmetrical master study composition' },
  { name: 'Dynamic Low-Angle', phrase: 'dramatic low-angle luxury perspective emphasizing majestic poise' }
];

const PROMPT_SUGGESTIONS_BY_GENRE: Record<string, string[]> = {
  WEDDINGS: [
    'Amalfi coastal villa courtyard champagne toast, delicate string lights',
    'Chic couple hands with minimalist gold bands, soft silk drapery background',
    'Lake Como terrace wedding altar overlooking sapphire waters under sunset'
  ],
  CULTURE: [
    'Avant-garde haute couture drape close up, stark architectural shadows',
    'A high-fashion studio portrait, classical styling with a modernist pose',
    'Minimalist editorial silk scarf detail fluttering in clean white room breeze'
  ],
  FESTIVALS: [
    'Backlit runway gaze of a model, heavy atmospheric strobe lights',
    'Motion blur capture of silk dress movement on a dark stage',
    'Industrial high-ceiling fashion event with glowing golden ambient neon lines'
  ],
  WILDLIFE: [
    'Foggy pine trees peak outline reflected in a glass-like alpine mountain lake',
    'Spotted sun rays piercing through heavy tree leaves in misty forest canopy',
    'A pristine minimalist cold mountain range outline against a soft peach sky'
  ]
};

export default function FullWorkPage() {
  const [activeFilter, setActiveFilter] = useState('WEDDINGS');
  const [portfolioItems, setPortfolioItems] = useState(() => PORTFOLIO_ITEMS);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // AI Image generation states
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic Film');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedComposition, setSelectedComposition] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('CALIBRATING FILM SEED...');
  const [newImageNotification, setNewImageNotification] = useState<string | null>(null);

  // Derive the active project from our reactive state database
  const selectedProject = useMemo(() => {
    return portfolioItems.find(item => item.id === selectedProjectId) || null;
  }, [portfolioItems, selectedProjectId]);

  // Compute related projects of the same genre, backfilling if needed for layout balance
  const relatedProjects = useMemo(() => {
    if (!selectedProject) return [];
    
    // First, select other items sharing the exact same genre
    let sameGenre = portfolioItems.filter(
      item => item.type === selectedProject.type && item.id !== selectedProject.id
    );
    
    // Backfill with other genres if we have fewer than 4 to preserve symmetry
    if (sameGenre.length < 4) {
      const fallback = portfolioItems.filter(
        item => item.type !== selectedProject.type && item.id !== selectedProject.id
      );
      sameGenre = [...sameGenre, ...fallback];
    }
    
    return sameGenre.slice(0, 4);
  }, [portfolioItems, selectedProject?.id, selectedProject?.type]);

  const setSelectedProject = (item: typeof PORTFOLIO_ITEMS[0] | null) => {
    setSelectedProjectId(item ? item.id : null);
  };

  // Reset indices and clear panels when selected project transitions
  React.useEffect(() => {
    setCurrentImageIndex(0);
    setPrompt('');
    setSelectedMood('');
    setSelectedComposition('');
    setNewImageNotification(null);
  }, [selectedProjectId]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'ALL') return portfolioItems;
    return portfolioItems.filter(item => item.type === activeFilter);
  }, [activeFilter, portfolioItems]);

  const handlePrevProject = () => {
    if (!selectedProjectId) return;
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedProjectId);
    const prevIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    setSelectedProjectId(portfolioItems[prevIndex].id);
  };

  const handleNextProject = () => {
    if (!selectedProjectId) return;
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedProjectId);
    const nextIndex = (currentIndex + 1) % portfolioItems.length;
    setSelectedProjectId(portfolioItems[nextIndex].id);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim() || !selectedProject) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setNewImageNotification(null);
    
    // Smooth cinematic progress sequence
    const interval = setInterval(() => {
      setGenerationProgress((p) => {
        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(p + increment, 98);
        
        if (next < 25) {
          setLoadingText('CALIBRATING FILM SEED...');
        } else if (next < 50) {
          setLoadingText('COMPOSING VECTOR GRID...');
        } else if (next < 75) {
          setLoadingText('EXPOSING CELLULOSE MATRIX...');
        } else if (next < 90) {
          setLoadingText('STABILIZING LIGHT GRAINS...');
        } else {
          setLoadingText('DEVELOPING ARCHIVE GLOSS...');
        }
        return next;
      });
    }, 150);

    try {
      const styleSuffix = STYLE_PRESETS.find(s => s.name === selectedStyle)?.suffix || '';
      
      // Dynamic prompt combination logic with composition and mood selections
      let constructedPrompt = prompt.trim();
      if (selectedComposition) {
        constructedPrompt += `, ${selectedComposition}`;
      }
      if (selectedMood) {
        constructedPrompt += `, ${selectedMood}`;
      }
      const fullPrompt = `${constructedPrompt}, ${styleSuffix}, premium luxury editorial aesthetics, photorealistic, elegant`;
      
      const seed = Math.floor(Math.random() * 1000000);
      const encodedPrompt = encodeURIComponent(fullPrompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1080&nologo=true&private=true&enhance=false&seed=${seed}`;

      // Prefetch frame to local cache to ensure immediate fluid loading in the component frame
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.src = imageUrl;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Latency during celluloid rendering. Please try again."));
      });

      clearInterval(interval);
      setGenerationProgress(100);
      setLoadingText('DEVELOPMENT COMPLETE');

      // Catalog the new frame to the state
      setPortfolioItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === selectedProject.id) {
            const existingImages = item.images || [item.image];
            const updatedImages = [...existingImages, imageUrl];
            
            // Adjust Carousel index to show newly processed frame
            setTimeout(() => {
              setCurrentImageIndex(updatedImages.length - 1);
            }, 50);

            return {
              ...item,
              images: updatedImages
            };
          }
          return item;
        });
      });

      setNewImageNotification("SUCCESS: Captured frame integrated into project roll.");
      setPrompt('');

      // Auto clear dialog after timeout
      setTimeout(() => {
        setNewImageNotification(null);
      }, 5000);

      setTimeout(() => {
        setIsGenerating(false);
      }, 600);

    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      setNewImageNotification(`ERROR: ${err.message || "Failed to render visual stream."}`);
    }
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
            {GENRES.map(filter => (
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
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-base/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 8, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#111] border border-[#2A2A2A] flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
              <button 
                className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-gold transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="relative w-full md:w-3/5 h-[40vh] md:h-full overflow-hidden bg-black/20 group/carousel select-none">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`${selectedProject.id}-${currentImageIndex}`}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    src={selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images[currentImageIndex] : selectedProject.image} 
                    alt={`${selectedProject.title} - View ${currentImageIndex + 1}`} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

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
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentImageIndex ? 'bg-gold w-3' : 'bg-white/40 hover:bg-white/80'}`}
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
                
                {/* AI Image Generation Suite */}
                <div className="mt-8 pt-8 border-t border-[#2A2A2A]">
                  <h3 className="font-mono text-gold text-[10px] uppercase tracking-[0.35em] mb-4 flex items-center gap-1.5">
                    <span className="animate-pulse">✦</span> AI Imagine Studio
                  </h3>
                  
                  {newImageNotification && (
                    <div className={`mb-4 px-3 py-2 border rounded font-mono text-[9px] tracking-wider uppercase ${
                      newImageNotification.startsWith('ERROR') 
                      ? 'border-red-500/30 bg-red-500/5 text-red-400' 
                      : 'border-gold/30 bg-gold/5 text-gold'
                    }`}>
                      {newImageNotification}
                    </div>
                  )}

                  {!isGenerating ? (
                    <div className="space-y-4">
                      {/* Dynamic Editorial Suggestions */}
                      {selectedProject && PROMPT_SUGGESTIONS_BY_GENRE[selectedProject.type] && (
                        <div>
                          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-2 flex items-center gap-1">
                            <span>✦</span> Dynamic Recommendations ({selectedProject.type})
                          </span>
                          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                            {PROMPT_SUGGESTIONS_BY_GENRE[selectedProject.type].map((suggestedPrompt, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setPrompt(suggestedPrompt)}
                                className={`text-[9px] text-left px-3 py-2 font-mono uppercase tracking-wider rounded border text-[#F2EDE6]/80 transition-all cursor-pointer block truncate w-full group/chip ${
                                  prompt === suggestedPrompt
                                    ? 'border-gold bg-gold/5 text-gold'
                                    : 'border-[#2A2A2A] bg-transparent hover:border-gold/30 hover:text-white'
                                }`}
                                title={suggestedPrompt}
                              >
                                <span className={`mr-2 group-hover/chip:text-gold transition-colors ${prompt === suggestedPrompt ? 'text-gold' : 'text-[#F2EDE6]/20'}`}>▶</span>
                                {suggestedPrompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40 mb-2">Prompt Description</label>
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Describe your subject scene or click a recommendation above..."
                          className="w-full bg-[#161616] border border-[#2A2A2A] rounded p-3 font-mono text-[10px] text-white focus:outline-none focus:border-gold placeholder:text-white/20 transition-colors uppercase resize-none h-16"
                        />
                      </div>

                      {/* Structured Assistant: Moods & Compositions */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40 mb-2">Aesthetic Mood</label>
                          <select
                            value={selectedMood}
                            onChange={(e) => setSelectedMood(e.target.value)}
                            className="w-full bg-[#161616] border border-[#2A2A2A] rounded px-2.5 py-1.5 font-mono text-[9px] text-[#F2EDE6] focus:outline-none focus:border-gold transition-colors uppercase cursor-pointer"
                          >
                            <option value="">Default (Neutral Preset)</option>
                            {MOOD_PRESETS.map((m) => (
                              <option key={m.name} value={m.phrase}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40 mb-2 font-medium">Composition</label>
                          <select
                            value={selectedComposition}
                            onChange={(e) => setSelectedComposition(e.target.value)}
                            className="w-full bg-[#161616] border border-[#2A2A2A] rounded px-2.5 py-1.5 font-mono text-[9px] text-[#F2EDE6] focus:outline-none focus:border-gold transition-colors uppercase cursor-pointer"
                          >
                            <option value="">Default (Neutral Preset)</option>
                            {COMPOSITION_PRESETS.map((c) => (
                              <option key={c.name} value={c.phrase}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#F2EDE6]/40 mb-2">Visual Rendering Preset</span>
                        <div className="grid grid-cols-2 gap-2">
                          {STYLE_PRESETS.map((style) => (
                            <button
                              key={style.name}
                              type="button"
                              onClick={() => setSelectedStyle(style.name)}
                              className={`px-2 py-1.5 rounded font-mono text-[8px] tracking-wider uppercase border text-left transition-all cursor-pointer ${
                                selectedStyle === style.name
                                  ? 'border-gold bg-gold/10 text-gold'
                                  : 'border-[#2A2A2A] bg-transparent text-white/40 hover:border-white/20'
                              }`}
                            >
                              {style.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Combined Formula Preview */}
                      {(prompt.trim() || selectedMood || selectedComposition) && (
                        <div className="bg-[#0e0e0e]/60 border border-[#2A2A2A] rounded p-2.5 font-mono text-[8.5px] text-[#F2EDE6]/50 uppercase tracking-widest leading-relaxed">
                          <span className="text-gold font-bold">Formula Preview:</span>{' '}
                          <span>{prompt.trim() || '[Empty subject description]'}</span>
                          {selectedComposition && (
                            <span className="text-white">
                              , {COMPOSITION_PRESETS.find((c) => c.phrase === selectedComposition)?.name}
                            </span>
                          )}
                          {selectedMood && (
                            <span className="text-white">
                              , {MOOD_PRESETS.find((m) => m.phrase === selectedMood)?.name}
                            </span>
                          )}
                          <span className="text-gold/60">, {selectedStyle}</span>
                        </div>
                      )}

                      <button
                        onClick={handleGenerateImage}
                        disabled={!prompt.trim()}
                        className="w-full text-center font-mono text-[9px] leading-none uppercase tracking-widest border border-gold hover:bg-gold hover:text-black transition-all duration-300 py-3 rounded text-gold bg-transparent font-medium disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold cursor-pointer flex items-center justify-center gap-2 animate-[fadeIn_0.5s_ease-out]"
                      >
                        Capture & Add Frame
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 bg-[#141414] border border-gold/20 rounded p-5 relative overflow-hidden animate-pulse">
                      <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-white">
                        <span className="text-gold">{loadingText}</span>
                        <span className="text-gold font-bold">{generationProgress}%</span>
                      </div>
                      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gold transition-all duration-200" 
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-[#F2EDE6]/30 text-center">
                        Sensing depth parameters · Simulating camera lens
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Related Narrative Archive */}
                {relatedProjects.length > 0 && selectedProject && (
                  <div className="mt-12 pt-8 border-t border-[#2A2A2A] animate-[fadeIn_0.6s_ease-out]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-mono text-gold text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
                        <span>✦</span> Related Narratives
                      </h4>
                      <span className="font-mono text-[8px] text-[#F2EDE6]/30 uppercase tracking-widest leading-none">
                        Category: {selectedProject.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {relatedProjects.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedProjectId(item.id);
                          }}
                          className="group text-left focus:outline-none cursor-pointer w-full"
                          title={`Navigate to ${item.title}`}
                        >
                          <div className="relative aspect-square overflow-hidden border border-[#2A2A2A] group-hover:border-gold/50 transition-colors duration-500 bg-[#0d0d0d]">
                            <img 
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-base/40 group-hover:bg-transparent transition-colors duration-500" />
                            
                            {/* Subtle view indicator overlay on hover */}
                            <div className="absolute inset-x-0 bottom-0 bg-black/80 py-1 px-1.5 border-t border-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="font-mono text-[7.5px] text-gold uppercase tracking-[0.2em] text-center">
                                VIEW ARCHIVE
                              </p>
                            </div>
                          </div>
                          <div className="mt-2.5">
                            <p className="font-mono text-[8.5px] text-white/50 group-hover:text-gold transition-colors uppercase tracking-widest truncate leading-tight">
                              {item.title}
                            </p>
                            <p className="font-mono text-[7px] text-white/20 uppercase tracking-widest mt-0.5">
                              {item.type}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
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
