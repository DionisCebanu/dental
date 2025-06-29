import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import Hero from '@/components/Hero';
    import Services from '@/components/Services';
    import Promotions from '@/components/Promotions';
    import Contact from '@/components/Contact';
    import { LanguageContext } from '@/context/LanguageContext';

    const pageVariants = {
      initial: { opacity: 0, scale: 0.98 },
      in: { opacity: 1, scale: 1 },
      out: { opacity: 0, scale: 0.98 }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.6
    };

    const LandingPage = () => {
      const { t } = useContext(LanguageContext);

      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="overflow-x-hidden"
        >
          <Hero 
            title={t('heroTitle')}
            subtitle={t('heroSubtitle')}
            buttonText={t('heroButton')}
            buttonLink="/menu"
          />
          <Services title={t('servicesTitle')} />
          <Promotions title={t('promotionsTitle')} />
          <Contact title={t('contactTitle')} subtitle={t('contactSubtitle')} />
        </motion.div>
      );
    };

    export default LandingPage;