import React from 'react';
import { motion, MotionValue } from 'motion/react';

export const FadingVideo = ({ src, fallbackImage, opacity }: { src?: string, fallbackImage: string, opacity: MotionValue<number> | number | any }) => {
  if (!src) {
    return (
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        className="h-full w-full opacity-40 overflow-hidden"
        style={{ opacity }}
      >
        <img 
          src={fallbackImage} 
          alt="NEP Photography Studio Atmospheric Background" 
          className="hero-media w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </motion.div>
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
        title="NEP Photography Studio Cinematic Loop"
        className="hero-media w-full h-full min-h-full min-w-full object-cover object-center opacity-40 select-none pointer-events-none"
      >
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  );
};
