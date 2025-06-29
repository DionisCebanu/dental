import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Film } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      const { t } = useContext(LanguageContext);

      return (
        <motion.footer 
          className="bg-slate-950 border-t border-slate-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <div className="flex justify-center items-center mb-4">
              <Film size={28} className="text-accent mr-2" />
              <span className="text-xl font-bold text-primary">{t('appName')}</span>
            </div>
            <p className="text-xs">
              &copy; {currentYear} {t('appName')}. {t('footerRights')}
            </p>
            <p className="text-xs mt-1">
              {t('footerBy')}
            </p>
          </div>
        </motion.footer>
      );
    };

    export default Footer;