import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LayoutGrid, Mail, Phone, MapPin } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      const { t } = useContext(LanguageContext);

      return (
        <motion.footer 
          className="bg-slate-800 text-slate-300 border-t border-slate-700 py-10 sm:py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
              <div className="md:col-span-1">
                <div className="flex justify-center md:justify-start items-center mb-3">
                  <LayoutGrid size={32} className="text-accent mr-2.5" />
                  <span className="text-2xl font-bold text-white">{t('appName')}</span>
                </div>
                <p className="text-sm text-slate-400">
                  {t('footerSlogan')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('navContact')}</h3>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center justify-center md:justify-start text-slate-400 hover:text-accent transition-colors">
                    <MapPin size={16} className="mr-2 " /> {t('contactAddress')}
                  </li>
                  <li className="flex items-center justify-center md:justify-start text-slate-400 hover:text-accent transition-colors">
                    <Phone size={16} className="mr-2 " /> <a href={`tel:${t('contactPhone')}`}>{t('contactPhone')}</a>
                  </li>
                  <li className="flex items-center justify-center md:justify-start text-slate-400 hover:text-accent transition-colors">
                    <Mail size={16} className="mr-2 " /> <a href={`mailto:${t('contactEmail')}`}>{t('contactEmail')}</a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('navServices')}</h3>
                 <ul className="space-y-1.5 text-sm">
                  <li className="text-slate-400 hover:text-accent transition-colors cursor-pointer">{t('estimateFormServiceWindows')}</li>
                  <li className="text-slate-400 hover:text-accent transition-colors cursor-pointer">{t('estimateFormServiceDoors')}</li>
                  <li className="text-slate-400 hover:text-accent transition-colors cursor-pointer">Custom Solutions</li>
                  <li className="text-slate-400 hover:text-accent transition-colors cursor-pointer">Repair Services</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center">
              <p className="text-xs text-slate-500">
                &copy; {currentYear} {t('appName')}. {t('footerRights')} {t('footerBy')}
              </p>
            </div>
          </div>
        </motion.footer>
      );
    };

    export default Footer;