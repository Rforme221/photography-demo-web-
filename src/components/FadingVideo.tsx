import React from 'react';
import { motion } from 'motion/react';

export const FadingVideo = ({ src, fallbackImage, opacity }: { src?: string, fallbackImage: string, opacity: any }) => {
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
