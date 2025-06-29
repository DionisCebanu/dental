
    import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Helmet } from 'react-helmet-async';
    import ContactDentist from '@/components/dentist/ContactDentist';
    import NavbarDentist from '@/components/dentist/NavbarDentist';
    import { LanguageContext } from '@/context/LanguageContext';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
      out: { opacity: 0, transition: { duration: 0.3 } }
    };

    const DentistContactPage = () => {
      const { t, language } = useContext(LanguageContext);

      return (
        <motion.div
          key={`dentist-contact-${language}`}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="bg-background text-foreground"
        >
          <Helmet>
            <title>{t('dentistContactPageTitle', { defaultText: 'Contact si Programari - RaDen Chisinau' })}</title>
            <meta name="description" content={t('dentistContactPageMetaDescription', { defaultText: 'Contacteaza-ne pentru programari si informatii. Clinica RaDen din Chisinau - telefon, email, adresa si program de lucru.' })} />
          </Helmet>
          <NavbarDentist />
          <div className="pt-20">
            <ContactDentist />
          </div>
        </motion.div>
      );
    };

    export default DentistContactPage;
  