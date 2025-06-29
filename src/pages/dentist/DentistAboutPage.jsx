
    import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Helmet } from 'react-helmet-async';
    import AboutClinic from '@/components/dentist/AboutClinic';
    import FaqDentist from '@/components/dentist/FaqDentist';
    import TeamDentist from '@/components/dentist/TeamDentist';
    import GalleryDentist from '@/components/dentist/GalleryDentist';
    import NavbarDentist from '@/components/dentist/NavbarDentist';
    import CtaSection from '@/components/dentist/CtaSection';
    import ScrollTracker from '@/components/dentist/ScrollTracker';
    import { LanguageContext } from '@/context/LanguageContext';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
      out: { opacity: 0, transition: { duration: 0.3 } }
    };
    
    const sectionIds = ['about-clinic', 'faq', 'team', 'gallery'];

    const DentistAboutPage = () => {
      const { t, language } = useContext(LanguageContext);

      return (
        <>
          <motion.div
            key={`dentist-about-${language}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="bg-background text-foreground"
          >
            <Helmet>
              <title>{t('dentistAboutPageTitle', { defaultText: 'Despre Clinica DentalCare - Echipa si Facilitati' })}</title>
              <meta name="description" content={t('dentistAboutPageMetaDescription', { defaultText: 'Afla mai multe despre echipa noastra de specialisti, facilitatile moderne si abordarea centrata pe pacient la DentalCare.' })} />
            </Helmet>
            <NavbarDentist />
            <div className="pt-20">
              <AboutClinic />
              <CtaSection />
              <div id="faq"><FaqDentist /></div>
              <div id="team"><TeamDentist /></div>
              <div id="gallery"><GalleryDentist /></div>
            </div>
          </motion.div>
          <ScrollTracker sectionIds={sectionIds} pageNameKey="dentistNavAbout" />
        </>
      );
    };

    export default DentistAboutPage;
  