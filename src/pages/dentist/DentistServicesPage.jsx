
    import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Helmet } from 'react-helmet-async';
    import ServicesDentist from '@/components/dentist/ServicesDentist';
    import ServicePricesDentist from '@/components/dentist/ServicePricesDentist';
    import NavbarDentist from '@/components/dentist/NavbarDentist';
    import CtaSection from '@/components/dentist/CtaSection';
    import ScrollTracker from '@/components/dentist/ScrollTracker';
    import { LanguageContext } from '@/context/LanguageContext';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
      out: { opacity: 0, transition: { duration: 0.3 } }
    };

    const sectionIds = ['servicii', 'preturi-servicii'];

    const DentistServicesPage = () => {
      const { t, language } = useContext(LanguageContext);

      return (
        <>
          <motion.div
            key={`dentist-services-${language}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="bg-background text-foreground"
          >
            <Helmet>
              <title>{t('dentistServicesPageTitle', { defaultText: 'Servicii Stomatologice si Preturi - RaDen' })}</title>
              <meta name="description" content={t('dentistServicesPageMetaDescription', { defaultText: 'Descopera gama completa de servicii stomatologice oferite de RaDen: consultatie, profilaxie, tratamente, ortodontie, implantologie si estetica dentara.' })} />
            </Helmet>
            <NavbarDentist />
            <div className="pt-20">
              <ServicesDentist />
              <CtaSection />
              <ServicePricesDentist />
            </div>
          </motion.div>
          <ScrollTracker sectionIds={sectionIds} pageNameKey="dentistNavServices" />
        </>
      );
    };

    export default DentistServicesPage;
  