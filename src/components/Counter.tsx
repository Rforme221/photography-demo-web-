import React, { useEffect, useRef, useState } from 'react';

export const Counter = ({ target, suffix, decimals = 0 }: { target: number, suffix: string, decimals?: number }) => {
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
