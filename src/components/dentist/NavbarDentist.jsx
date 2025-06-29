
import React, { useState, useContext } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Link, useLocation } from 'react-router-dom';
    import { LanguageContext } from '@/context/LanguageContext';
    import { AppContext } from '@/App';
    import { Button } from '@/components/ui/button';
    import { Menu, X, Sun, Moon, CalendarCheck, Sparkles, Globe } from 'lucide-react';

    const NavbarDentist = () => {
      const [isOpen, setIsOpen] = useState(false);
      const { language, setLanguage, t } = useContext(LanguageContext);
      const { theme, setTheme } = useContext(AppContext);
      const location = useLocation();

      const dentistLanguages = ['ro', 'ru'];
      const languageNames = {
        ro: 'RO',
        ru: 'RU'
      };

      const navLinks = [
        { nameKey: 'dentistNavHome', path: '/' },
        { nameKey: 'dentistNavAbout', path: '/despre' },
        { nameKey: 'dentistNavServices', path: '/servicii' },
        { nameKey: 'dentistNavContact', path: '/contact' },
      ];

      const toggleNavbar = () => setIsOpen(!isOpen);

      const handleLanguageCycleDentist = () => {
        const currentIndex = dentistLanguages.indexOf(language);
        const nextIndex = (currentIndex + 1) % dentistLanguages.length;
        setLanguage(dentistLanguages[nextIndex]);
      };

      const scrollToContact = () => {
        if (location.pathname === '/contact') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = '/contact';
        }
      };
      
      return (
        <motion.nav 
          className="fixed w-full z-50 bg-background/80 backdrop-blur-md shadow-sm"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center"
              >
                <Link to="/" className="flex items-center">
                  <Sparkles size={32} className="text-primary" />
                  <span className="ml-2 text-xl font-bold text-foreground">{t('dentistClinicNameShort', { defaultText: "RaDen" })}</span>
                </Link>
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.nameKey}
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors duration-300 hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {t(link.nameKey)}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.button
                  onClick={handleLanguageCycleDentist}
                  className="p-2 rounded-full hover:bg-muted"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={t('languageTooltip', { defaultText: 'Change language' })}
                >
                  <Globe size={20} className="text-primary" />
                  <span className="ml-1.5 text-xs font-semibold text-primary">{languageNames[language] || language.toUpperCase()}</span>
                </motion.button>

                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-muted"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={t('themeTooltip', { defaultText: 'Toggle theme' })}
                >
                  {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-foreground" />}
                </motion.button>
                
                <Button 
                  onClick={scrollToContact} 
                  className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <CalendarCheck size={18} className="mr-2" />
                  {t('dentistHeroButton', { defaultText: "Programează-te"})}
                </Button>

                <div className="md:hidden">
                  <motion.button
                    onClick={toggleNavbar}
                    className="p-2 rounded-md text-foreground focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-background/95 backdrop-blur-sm shadow-xl absolute w-full"
              >
                <div className="px-5 pt-2 pb-6 space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.nameKey}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-muted hover:text-primary ${
                        location.pathname === link.path ? 'text-primary bg-muted' : 'text-muted-foreground'
                      }`}
                    >
                      {t(link.nameKey)}
                    </Link>
                  ))}
                  <Button 
                    onClick={scrollToContact} 
                    className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <CalendarCheck size={18} className="mr-2" />
                    {t('dentistHeroButton', { defaultText: "Programează-te"})}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };

    export default NavbarDentist;
