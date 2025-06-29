import React, { useState, useContext } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Home, Menu, X, Globe, Construction, ShieldCheck, LayoutGrid, Calculator } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const navLinkVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 + 0.2, type: 'spring', stiffness: 100 },
      }),
      hover: { scale: 1.05, color: 'var(--color-accent)' },
      tap: { scale: 0.98 },
    };

    const mobileMenuVariants = {
      closed: { opacity: 0, x: '-100%' },
      open: { opacity: 1, x: '0%', transition: { type: 'spring', stiffness: 260, damping: 20 } },
    };
    
    const mobileLinkVariants = {
      closed: { opacity: 0, x: -20 },
      open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05 + 0.1 } }),
    };


    const Navbar = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { language, toggleLanguage, t } = useContext(LanguageContext);

      const navItems = [
        { name: t('navHome'), path: '/', icon: <Home size={18} /> },
        { name: t('navEstimate'), path: '/estimate', icon: <Calculator size={18} /> },
        { name: t('navContact'), path: '#contact', icon: <Construction size={18}/> }
      ];
      
      const handleScrollToContact = (e) => {
        if (window.location.pathname !== '/') {
          window.location.href = '/#contact';
        } else {
          e.preventDefault();
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setIsMobileMenuOpen(false);
      };


      return (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="sticky top-0 left-0 right-0 z-50 py-3 px-4 sm:px-8 bg-background/90 backdrop-blur-lg shadow-md border-b border-border"
        >
          <div className="container mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
            >
              <Link to="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                <LayoutGrid size={28} className="text-accent" />
                <span>{t('appName')}</span>
              </Link>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-5">
              {navItems.map((item, index) => (
                item.path.startsWith('#') ? (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    custom={index}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center text-foreground/80 hover:text-accent transition-colors duration-200 font-medium"
                    onClick={item.path === '#contact' ? handleScrollToContact : () => {}}
                  >
                    {item.icon && React.cloneElement(item.icon, { className: "mr-1.5"})} {item.name}
                  </motion.a>
                ) : (
                <motion.custom
                  key={item.name}
                  custom={index}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center text-foreground/80 transition-colors duration-200 font-medium"
                  as={NavLink}
                  to={item.path}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-accent)' : '',
                  })}
                >
                   {item.icon && React.cloneElement(item.icon, { className: "mr-1.5"})} {item.name}
                </motion.custom>
                )
              ))}
             <motion.div custom={navItems.length +1} variants={navLinkVariants} initial="hidden" animate="visible">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                aria-label="Change language"
                className="text-foreground/70 hover:text-accent hover:bg-accent/10"
              >
                <Globe size={18} />
                <span className="ml-1.5 text-xs font-medium">{language.toUpperCase()}</span>
              </Button>
              </motion.div>
            </div>

            <div className="lg:hidden flex items-center">
               <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                aria-label="Change language"
                className="text-foreground/70 hover:text-accent hover:bg-accent/10 mr-1"
              >
                <Globe size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground/80 hover:text-accent">
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
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
                className="lg:hidden absolute top-full left-0 right-0 h-screen bg-background/95 backdrop-blur-xl shadow-2xl p-6 border-t border-border"
              >
                <ul className="flex flex-col space-y-5 pt-4">
                  {navItems.map((item, index) => (
                     item.path.startsWith('#') ? (
                      <motion.li
                        key={item.name}
                        custom={index}
                        variants={mobileLinkVariants}
                        initial="closed" animate="open" exit="closed"
                      >
                        <a
                          href={item.path}
                          className="flex items-center py-2.5 px-3 text-foreground/90 hover:text-accent hover:bg-accent/10 rounded-md transition-colors duration-200 text-lg font-medium"
                          onClick={item.path === '#contact' ? handleScrollToContact : () => setIsMobileMenuOpen(false)}
                        >
                           {item.icon && React.cloneElement(item.icon, { className: "mr-2.5"})} {item.name}
                        </a>
                      </motion.li>
                    ) : (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={mobileLinkVariants}
                      initial="closed" animate="open" exit="closed"
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center py-2.5 px-3 hover:bg-accent/10 rounded-md transition-colors duration-200 text-lg font-medium ${
                            isActive ? 'text-accent bg-accent/5 font-semibold' : 'text-foreground/90'
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                         {item.icon && React.cloneElement(item.icon, { className: "mr-2.5"})} {item.name}
                      </NavLink>
                    </motion.li>
                    )
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };

    export default Navbar;