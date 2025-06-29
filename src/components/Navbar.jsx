import React, { useState, useContext, useEffect } from 'react';
    import { Link, NavLink, useLocation } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { AppContext } from '@/App';
    import { Button } from '@/components/ui/button';
    import { Globe, Menu, X, Sun, Moon, UserCircle, LogOut, Settings, LayoutDashboard } from 'lucide-react';

    const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const { language, setLanguage, t, availableLanguages: allLangs } = useContext(LanguageContext);
      const { isAuthenticated, setIsAuthenticated, isAdminAuthenticated, setIsAdminAuthenticated, theme, setTheme } = useContext(AppContext); 
      
      const restaurantLanguages = ['en', 'fr', 'ro'];
      const languageNames = {
        en: 'EN',
        fr: 'FR',
        ro: 'RO',
        ru: 'RU' 
      };
      const location = useLocation();

      const navLinks = [
        { nameKey: 'navHome', path: '/' },
        { nameKey: 'navMenu', path: '/menu' },
        { nameKey: 'navOurServices', path: '/our-services'},
        { nameKey: 'navBooking', path: '/booking' },
        { nameKey: 'navEvents', path: '/events' },
        { nameKey: 'navAbout', path: '/about' },
      ];

      const toggleNavbar = () => {
        setIsOpen(!isOpen);
      };

      const handleLanguageCycle = () => {
        const currentIndex = restaurantLanguages.indexOf(language);
        const nextIndex = (currentIndex + 1) % restaurantLanguages.length;
        setLanguage(restaurantLanguages[nextIndex]);
      };

      const handleLogout = () => {
        setIsAuthenticated(false); 
        setIsAdminAuthenticated(false); 
      };
      
      const ActiveLinkIndicator = ({isActive}) => (
        isActive && (
          <motion.div
            layoutId="activeLinkIndicatorRestaurant"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )
      );

      return (
        <motion.nav 
          className="fixed w-full z-50 bg-background/80 backdrop-blur-md shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 sm:h-24">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/" className="flex items-center space-x-2">
                  <img  alt={t('appName', { defaultText: "The Golden Spoon Logo"})} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md border-2 border-primary/50" src="https://images.unsplash.com/photo-1677664565035-94710c3eff39" />
                  <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('appName', { defaultText: "The Golden Spoon"})}</span>
                </Link>
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.nameKey}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-sm font-medium transition-colors duration-300 hover:text-primary 
                      ${isActive ? 'text-primary' : 'text-foreground/80'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(link.nameKey)}
                        <ActiveLinkIndicator isActive={isActive} />
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.button
                  onClick={handleLanguageCycle}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={t('languageTooltip', { defaultText: 'Change language' })}
                >
                  <Globe size={20} className="text-primary" />
                  <span className="ml-1.5 text-xs font-semibold text-primary">{languageNames[language] || language.toUpperCase()}</span>
                </motion.button>

                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={t('themeTooltip', { defaultText: 'Toggle theme' })}
                >
                  {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-400" />}
                </motion.button>
                
                {isAdminAuthenticated && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link to="/admin/dashboard" className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors duration-300" title={t('navAdminPanel')}>
                      <LayoutDashboard size={20} />
                    </Link>
                  </motion.div>
                )}

                {isAuthenticated ? (
                   <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-500/10 hover:text-red-400 px-3 py-2">
                      <LogOut size={18} className="mr-1.5" />
                      {t('logoutButtonText', { defaultText: "Logout"})}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                  </motion.div>
                )}

                <div className="md:hidden">
                  <motion.button
                    onClick={toggleNavbar}
                    className="p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
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
                    <NavLink
                      key={link.nameKey}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out
                        ${isActive ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-sm' : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'}`
                      }
                    >
                      {t(link.nameKey)}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };

    export default Navbar;