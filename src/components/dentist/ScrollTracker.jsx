
    import React, { useState, useEffect, useContext } from 'react';
    import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';

    const ScrollTracker = ({ sectionIds, pageNameKey }) => {
      const { t } = useContext(LanguageContext);
      const { scrollY } = useScroll();
      const [currentSection, setCurrentSection] = useState(0);
      const [isVisible, setIsVisible] = useState(false);
      const [progress, setProgress] = useState(0);

      useEffect(() => {
        const handleScroll = () => {
          const offsets = sectionIds.map(id => {
            const el = document.getElementById(id);
            return el ? el.offsetTop : 0;
          });

          const currentScroll = window.scrollY + window.innerHeight / 2;
          
          let activeSection = 0;
          for (let i = offsets.length - 1; i >= 0; i--) {
            if (currentScroll >= offsets[i]) {
              activeSection = i + 1;
              break;
            }
          }
          setCurrentSection(activeSection);
          
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          setProgress(window.scrollY / totalHeight);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      }, [sectionIds]);
      
      useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 200);
      });

      const totalSections = sectionIds.length;
      const radius = 30;
      const circumference = 2 * Math.PI * radius;

      return (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-20 h-20"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius + 4}
                  fill="none"
                  className="stroke-card/70"
                  strokeWidth="8"
                />
                 <motion.circle
                  cx="50"
                  cy="50"
                  r={radius + 4}
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  transform="rotate(-90 50 50)"
                  style={{ strokeLinecap: 'round' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-primary">{currentSection}/{totalSections}</span>
                <span className="text-xs text-muted-foreground -mt-1">{t(pageNameKey, {defaultText: 'Page'})}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default ScrollTracker;
  