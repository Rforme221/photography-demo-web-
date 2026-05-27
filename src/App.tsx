import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FullWorkPage from './pages/FullWorkPage';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    // 1. Scroll progress bar
    const handleScroll = () => {
      const progressEl = document.getElementById('scroll-progress');
      if (progressEl) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        progressEl.style.transform = `scaleX(${pct})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Custom cursor
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    const handleMouseMove = (e: MouseEvent) => {
      if (dot && ring) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        ring.style.left = `${e.clientX}px`;
        ring.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isImg = target.tagName === 'IMG' || target.closest('img') || target.closest('.cursor-image-trigger');
      if (isImg) {
        document.body.classList.add('cursor-on-image');
      } else {
        document.body.classList.remove('cursor-on-image');
      }

      const isBtn = target.tagName === 'BUTTON' || 
                    target.tagName === 'A' || 
                    target.closest('button') || 
                    target.closest('a') || 
                    target.closest('[role="button"]');
      if (isBtn) {
        document.body.classList.add('cursor-on-btn');
      } else {
        document.body.classList.remove('cursor-on-btn');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    // 3. Intersection observer for scroll entrance reveals
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const observeReveals = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        io.observe(el);
      });
    };

    observeReveals();
    const interval = setInterval(observeReveals, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      io.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <LanguageProvider>
      <div id="scroll-progress"></div>
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<FullWorkPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
