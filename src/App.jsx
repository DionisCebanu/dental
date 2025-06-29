
import React, { useState, useContext, useMemo, useEffect } from 'react';
    import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';

    import DentistLandingPage from '@/pages/dentist/DentistLandingPage';
    import DentistAboutPage from '@/pages/dentist/DentistAboutPage';
    import DentistServicesPage from '@/pages/dentist/DentistServicesPage';
    import DentistContactPage from '@/pages/dentist/DentistContactPage';
    import { AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';

    import FooterDentist from '@/components/dentist/FooterDentist';


    export const AppContext = React.createContext();

    function App() {
      const location = useLocation();
      const { language, setLanguage, isLoaded, availableLanguages } = useContext(LanguageContext);
      const [isAuthenticated, setIsAuthenticated] = useState(true); 
      const [hasReservation, setHasReservation] = useState(true); 
      const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); 
      const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem("theme") || "light";
        }
        return "light";
      });

      const appContextValue = useMemo(() => ({
        isAuthenticated,
        setIsAuthenticated,
        hasReservation,
        setHasReservation,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        theme, 
        setTheme
      }), [isAuthenticated, hasReservation, isAdminAuthenticated, theme]);

      const isDentistRoute = location.pathname.startsWith('/');

      useEffect(() => {
        document.documentElement.classList.remove('dark', 'light', 'theme-dentist-dark', 'theme-restaurant-dark');
        document.body.classList.remove('theme-dentist', 'theme-restaurant');

        if (isDentistRoute) {
          document.body.classList.add('theme-dentist');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.add('theme-dentist-dark');
          } else {
            document.documentElement.classList.add('light');
          }
          if (language !== 'ro' && language !== 'ru') {
            setLanguage('ro');
          }
        } else {
          document.body.classList.add('theme-restaurant');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.add('theme-restaurant-dark');
          } else {
            document.documentElement.classList.add('light');
          }
          if (!['en', 'fr', 'ro'].includes(language)) {
            setLanguage('en');
          }
        }
      }, [isDentistRoute, theme, language, setLanguage]);


      if (!isLoaded) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
      }

     return (
    <AppContext.Provider value={appContextValue}>
      <div className="min-h-screen text-foreground bg-background overflow-x-hidden flex flex-col" lang={language}>
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<DentistLandingPage />} />
              <Route path="/despre" element={<DentistAboutPage />} />
              <Route path="/servicii" element={<DentistServicesPage />} />
              <Route path="/contact" element={<DentistContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <FooterDentist />
        <Toaster />
      </div>
    </AppContext.Provider>
  );
    }

    export default App;
