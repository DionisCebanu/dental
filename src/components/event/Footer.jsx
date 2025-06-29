import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Ticket, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      const { t } = useContext(LanguageContext);

      const socialLinks = [
        { icon: <Facebook size={22} />, href: "#", label: "Facebook" },
        { icon: <Instagram size={22} />, href: "#", label: "Instagram" },
        { icon: <Twitter size={22} />, href: "#", label: "Twitter" },
        { icon: <Linkedin size={22} />, href: "#", label: "LinkedIn" },
      ];

      return (
        <motion.footer 
          className="bg-card border-t border-border py-10 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
            <div className="flex justify-center items-center mb-5">
              <Ticket size={32} className="text-accent mr-2" />
              <span className="text-xl font-bold text-primary">{t('appName')}</span>
            </div>
            <p className="mb-5 text-sm max-w-md mx-auto">
              {t('footerSlogan')}
            </p>
            <div className="flex justify-center space-x-5 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={link.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-xs">
              &copy; {currentYear} {t('appName')}. {t('footerRights')}
            </p>
             <p className="text-xs mt-1">
              {t('footerDesignedBy', { heart: '<span class="text-red-500">&hearts;</span>' }).split('<span class="text-red-500">&hearts;</span>')[0]}
              <span className="text-red-500">&hearts;</span>
              {t('footerDesignedBy', { heart: '<span class="text-red-500">&hearts;</span>' }).split('<span class="text-red-500">&hearts;</span>')[1]}
            </p>
          </div>
        </motion.footer>
      );
    };

    export default Footer;