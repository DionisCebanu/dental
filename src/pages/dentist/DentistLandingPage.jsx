
    import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Helmet } from 'react-helmet-async';
    import HeroDentist from '@/components/dentist/HeroDentist';
    import StatsDentist from '@/components/dentist/StatsDentist';
    import WhyChooseUsDentist from '@/components/dentist/WhyChooseUsDentist';
    import BeforeAfterGalleryDentist from '@/components/dentist/BeforeAfterGalleryDentist';
    import ReviewsDentist from '@/components/dentist/ReviewsDentist';
    import NavbarDentist from '@/components/dentist/NavbarDentist';
    import CtaSection from '@/components/dentist/CtaSection';
    import ServicesDentist from '../../components/dentist/ServicesDentist';
    import ServicePricesDentist from '../../components/dentist/ServicePricesDentist';
    import ScrollTracker from '@/components/dentist/ScrollTracker';
    import { LanguageContext } from '@/context/LanguageContext';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
      out: { opacity: 0, transition: { duration: 0.3 } }
    };

    const sectionIds = ['stats', 'why-us', 'before-after', 'reviews'];

    const DentistLandingPage = () => {
      const { t, language } = useContext(LanguageContext);

      return (
        <>
          <motion.div
            key={`dentist-landing-${language}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="bg-background text-foreground"
          >
            <Helmet>
              <title>{t('dentistPageTitle', { defaultText: 'RaDen - Clinica Stomatologica Moderna in Chisinau' })}</title>
              <meta name="description" content={t('dentistPageMetaDescription', { defaultText: 'Servicii stomatologice complete in Chisinau. Tehnologie moderna, echipa de experti si ingrijire personalizata pentru un zambet sanatos.' })} />
            </Helmet>
            <NavbarDentist />
            <HeroDentist />
            <CtaSection />
            <div id="stats"><StatsDentist /></div>
            {/* <div id="why-us"><WhyChooseUsDentist /></div> */}
            <div id="why-us"><ServicesDentist /></div>
            <div><ServicePricesDentist /></div>
            <div id="before-after"><BeforeAfterGalleryDentist /></div>
            <div id="reviews"><ReviewsDentist /></div>
          </motion.div>
          <ScrollTracker sectionIds={sectionIds} pageNameKey="dentistNavHome" />
        </>
      );
    };

    export default DentistLandingPage;
  