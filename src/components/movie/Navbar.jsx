import React, { useState, useContext } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Film, Menu, X, Globe, Ticket } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const navLinkVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 + 0.3, type: 'spring', stiffness: 120 },
      }),
      hover: { scale: 1.1, color: 'var(--color-accent)' },
      tap: { scale: 0.95 },
    };

    const mobileMenuVariants = {
      closed: { opacity: 0, y: '-100%' },
      open: { opacity: 1, y: '0%' },
    };

    const Navbar = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { language, toggleLanguage, t } = useContext(LanguageContext);

      const navItems = [
        { name: t('navHome'), path: '/' },
      ];

      return (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 py-4 px-6 sm:px-10 bg-slate-900/80 backdrop-blur-md shadow-lg"
        >
          <div className="container mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                <Film size={32} className="text-accent" />
                <span>{t('appName')}</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.custom
                  key={item.name}
                  custom={index}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium"
                  as={NavLink}
                  to={item.path}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-accent)' : '',
                    fontWeight: isActive ? 'bold' : 'medium',
                  })}
                >
                  {item.name}
                </motion.custom>
              ))}
              <motion.custom
                custom={navItems.length + 1}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                as={Button}
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                aria-label="Change language"
                className="text-gray-300 hover:text-accent"
              >
                <Globe size={20} />
                <span className="ml-1.5 text-xs font-semibold">{language.toUpperCase()}</span>
              </motion.custom>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                aria-label="Change language"
                className="text-gray-300 hover:text-accent mr-2"
              >
                <Globe size={22} />
                 <span className="ml-1 text-xs font-semibold">{language.toUpperCase()}</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={28} className="text-accent" /> : <Menu size={28} className="text-primary" />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:hidden absolute top-full left-0 right-0 bg-slate-800 shadow-xl py-4"
              >
                <ul className="flex flex-col items-center space-y-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={navLinkVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block py-2 px-4 text-gray-200 hover:text-accent transition-colors duration-300 text-lg ${
                            isActive ? 'text-accent font-semibold' : ''
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };
    export default Navbar;