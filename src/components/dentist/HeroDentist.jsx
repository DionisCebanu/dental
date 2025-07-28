import React, { useState, useEffect, useContext } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { LanguageContext } from '@/context/LanguageContext';

    const slides = [
      {
        imageDescription: "Happy family showing their healthy smiles in a bright, modern dental clinic with a dark overlay",
        alt: "Happy family showing their healthy smiles",
        taglineKey: "dentistHeroTagline1",
        defaultTagline: "Family Dental Care",
        titleKey: "dentistHeroTitle1",
        defaultTitle: "Elevating Smiles with Expert Care",
        imageSrc: "images/hero/hero_image.png"
      },
      {
        imageDescription: "Elderly couple with bright, confident smiles, showcasing successful dental work with a dark overlay",
        alt: "Senior couple with bright, confident smiles",
        taglineKey: "dentistHeroTagline2",
        defaultTagline: "Restorative Dentistry",
        titleKey: "dentistHeroTitle2",
        defaultTitle: "Rediscover Your Confidence to Smile",
        imageSrc: "images/hero/hero_image.png"
      },
      {
        imageDescription: "Young woman with a perfect white smile after cosmetic dentistry procedure with a dark overlay",
        alt: "Young woman with a perfect white smile",
        taglineKey: "dentistHeroTagline3",
        defaultTagline: "Cosmetic Dental Services",
        titleKey: "dentistHeroTitle3",
        defaultTitle: "Designing Your Perfect Smile",
        imageSrc: "images/hero/hero_image.png"
      }
    ];

    const HeroDentist = () => {
      const { t } = useContext(LanguageContext);
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        const timer = setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 7000);
        return () => clearTimeout(timer);
      }, [currentIndex]);

      const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      };

      const { taglineKey, defaultTagline, titleKey, defaultTitle } = slides[currentIndex];

      return (
        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white">
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <img  className="w-full h-full object-cover" alt={slides[currentIndex].alt} src={slides[currentIndex].imageSrc} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-950/60 to-blue-950/20" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="max-w-xl text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <p className="text-lg font-semibold text-primary mb-2 sm:mb-4">
                    {t(taglineKey, { defaultText: defaultTagline })}
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-shadow-md">
                    {t(titleKey, { defaultText: defaultTitle })}
                  </h1>
                  <p className="max-w-2xl text-lg text-gray-200 mb-8 text-shadow">
                    {t('dentistHeroSubtitle', { defaultText: 'Comprehensive dental services, modern technology, and a dedicated team for the health and beauty of your smile.' })}
                  </p>
                  <Link to="/contact" size="lg" onClick={scrollToContact} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 py-4 text-lg shadow-lg rounded-sm transform transition-all duration-300 hover:scale-105">
                    {t('dentistHeroButton', { defaultText: "Programează-te Acum" })}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default HeroDentist;