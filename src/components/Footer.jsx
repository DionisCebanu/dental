import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Utensils, MapPin, Phone, Mail } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const Footer = () => {
      const { t } = useContext(LanguageContext);
      const currentYear = new Date().getFullYear();

      const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
        })
      };

      return (
        <motion.footer 
          className="bg-gradient-to-b from-slate-900 to-background text-gray-300 py-12 sm:py-16 border-t-2 border-primary/30"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={itemVariants} custom={0}>
              <div className="flex items-center space-x-3 mb-4">
                <Utensils size={36} className="text-primary" />
                <span className="text-2xl font-bold font-display text-primary">{t('appName')}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t('footerSlogan')}</p>
            </motion.div>

            <motion.div variants={itemVariants} custom={1}>
              <h3 className="text-xl font-semibold text-accent mb-4 font-display">{t('contactTitle')}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 mt-1 text-secondary flex-shrink-0" />
                  <span className="text-gray-400">{t('contactInfoAddress')}</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-3 text-secondary flex-shrink-0" />
                  <a href={`tel:${t('contactInfoPhone')}`} className="text-gray-400 hover:text-primary transition-colors">{t('contactInfoPhone')}</a>
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-3 text-secondary flex-shrink-0" />
                  <a href={`mailto:${t('contactInfoEmail')}`} className="text-gray-400 hover:text-primary transition-colors">{t('contactInfoEmail')}</a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} custom={2}>
              <h3 className="text-xl font-semibold text-accent mb-4 font-display">{t('navBooking')}</h3>
              <p className="text-sm text-gray-400 mb-4">{t('heroSubtitle').substring(0,50) + "..."}</p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px hsl(var(--primary))" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md"
                onClick={() => window.location.href = '/booking'}
              >
                {t('navBooking')}
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            className="text-center text-xs text-gray-500 mt-12 pt-8 border-t border-slate-700"
            variants={itemVariants}
            custom={3}
          >
            <p>{t('footerRights', { year: currentYear })}</p>
            <p className="mt-1">{t('footerDesignedBy', { heart: '❤️' })}</p>
          </motion.div>
        </motion.footer>
      );
    };

    export default Footer;