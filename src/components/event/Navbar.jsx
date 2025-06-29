import React, { useState, useContext } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Ticket, Menu, X, Globe, PlusCircle, UserCircle, User } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const navLinkVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05 + 0.2,
          type: 'spring',
          stiffness: 120,
        },
      }),
      hover: { scale: 1.05, color: 'hsl(var(--accent))' },
      tap: { scale: 0.95 },
    };

    const mobileMenuVariants = {
      closed: { opacity: 0, x: '-100%' },
      open: { opacity: 1, x: '0%' },
    };

    const mobileLinkVariants = {
      closed: { opacity: 0, x: -20 },
      open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05 } }),
    };

    const Navbar = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { language, toggleLanguage, t } = useContext(LanguageContext);

      const navItems = [
        { name: t('navHome'), path: '/' },
        { name: t('navCreateEvent'), path: '/create-event' },
        { name: t('navProfile'), path: '/profile' },
      ];

      return (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-8 bg-background/80 backdrop-blur-lg shadow-md border-b border-border"
        >
          <div className="container mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
            >
              <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                <Ticket size={28} className="text-accent" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('appName')}</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
              {navItems.map((item, index) => (
                <motion.custom
                  key={item.name}
                  custom={index}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-foreground/80 hover:text-accent transition-colors duration-300 font-medium text-sm"
                  as={NavLink}
                  to={item.path}
                  style={({ isActive }) => ({
                    color: isActive ? 'hsl(var(--accent))' : '',
                    fontWeight: isActive ? '600' : '500',
                  })}
                >
                  {item.name}
                </motion.custom>
              ))}
              <motion.custom
                custom={navItems.length}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                as={Button}
                variant="ghost"
                size="sm"
                className="text-foreground/80 hover:text-accent hover:bg-accent/10"
                onClick={toggleLanguage}
                aria-label={t('language')}
              >
                <Globe size={18} className="mr-1.5" />
                <span className="text-xs font-semibold">{language.toUpperCase()}</span>
              </motion.custom>
               <motion.custom
                custom={navItems.length + 1}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                as={Button}
                variant="outline"
                size="sm"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary"
                asChild
              >
                <Link to="/auth">
                  <UserCircle size={18} className="mr-1.5" /> {t('navConnect')}
                </Link>
              </motion.custom>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                aria-label={t('language')}
                className="text-foreground/80 hover:text-accent mr-1"
              >
                <Globe size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground/80 hover:text-accent">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                className="md:hidden absolute top-full left-0 right-0 bg-background shadow-xl py-3 border-t border-border"
              >
                <ul className="flex flex-col items-start space-y-1 px-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={mobileLinkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="w-full"
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block py-2.5 px-3 rounded-md text-foreground/90 hover:bg-primary/10 hover:text-accent transition-all duration-200 text-base font-medium ${
                            isActive ? 'bg-primary/10 text-accent font-semibold' : ''
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    </motion.li>
                  ))}
                  <motion.li variants={mobileLinkVariants} custom={navItems.length} initial="closed" animate="open" exit="closed" className="w-full pt-2">
                     <Button asChild variant="secondary" className="w-full text-secondary-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link to="/auth">
                            <UserCircle size={20} className="mr-2" /> {t('navConnect')}
                        </Link>
                     </Button>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };

    export default Navbar;