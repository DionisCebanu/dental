import React, { useContext } from 'react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Sparkles, Facebook, Instagram, Twitter } from 'lucide-react';
    import { motion } from 'framer-motion';

    const FooterDentist = () => {
      const { t } = useContext(LanguageContext);
      
      const socialLinks = [
        { icon: <Facebook size={20} />, href: '#' },
        { icon: <Instagram size={20} />, href: '#' },
        { icon: <Twitter size={20} />, href: '#' },
      ];

      return (
        <footer className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center">
                <Sparkles size={28} className="text-primary" />
                <span className="ml-2 text-lg font-bold text-foreground">{t('dentistClinicNameShort', { defaultText: "DentalCare" })}</span>
              </div>
              <div className="flex items-center space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm">
              <p>&copy; {new Date().getFullYear()} {t('dentistClinicName', { defaultText: "Clinica Dentară DentalCare" })}. {t('dentistAllRightsReserved', { defaultText: "Toate drepturile rezervate."})}</p>
              <p className="text-xs mt-1 opacity-75">{t('dentistDesignedBy', { defaultText: "Proiectat de Hostinger Horizons" })}</p>
            </div>
          </div>
        </footer>
      );
    };

    export default FooterDentist;