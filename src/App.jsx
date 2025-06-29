
import React, { useState, useContext, useMemo, useEffect } from 'react';
    import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import { Toaster } from '@/components/ui/toaster';
    import LandingPage from '@/pages/LandingPage';
    import MenuPage from '@/pages/MenuPage';
    import BookingPage from '@/pages/BookingPage';
    import AboutPage from '@/pages/AboutPage';
    import EventsPage from '@/pages/EventsPage'; 
    import OurServicesPage from '@/pages/OurServicesPage'; 
    import WeddingsPage from '@/pages/services/WeddingsPage';
    import AnniversariesPage from '@/pages/services/AnniversariesPage';
    import ChristeningsPage from '@/pages/services/ChristeningsPage';
    import DentistLandingPage from '@/pages/dentist/DentistLandingPage';
    import DentistAboutPage from '@/pages/dentist/DentistAboutPage';
    import DentistServicesPage from '@/pages/dentist/DentistServicesPage';
    import DentistContactPage from '@/pages/dentist/DentistContactPage';
    import { AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';

    import AdminLayout from '@/components/admin/AdminLayout';
    import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
    import AdminReservationsPage from '@/pages/admin/AdminReservationsPage';
    import AdminTableLayoutPage from '@/pages/admin/AdminTableLayoutPage';
    import AdminAvailabilityPage from '@/pages/admin/AdminAvailabilityPage';
    import AdminMenuEditorPage from '@/pages/admin/AdminMenuEditorPage';
    import AdminContactSubmissionsPage from '@/pages/admin/AdminContactSubmissionsPage';
    import AdminBlogEventPage from '@/pages/admin/AdminBlogEventPage';
    import AdminLoginPage from '@/pages/admin/AdminLoginPage';
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

      const isDentistRoute = location.pathname.startsWith('/dentist');
      const isAdminRoute = location.pathname.startsWith('/admin');

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
            {!isAdminRoute && !isDentistRoute && <Navbar />}
            
            <main className={`flex-grow ${!isAdminRoute && !isDentistRoute ? 'pt-20 sm:pt-24' : ''}`}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                 {/*  <Route path="/" element={<LandingPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/our-services" element={<OurServicesPage />} />
                  <Route path="/our-services/weddings" element={<WeddingsPage />} />
                  <Route path="/our-services/anniversaries" element={<AnniversariesPage />} />
                  <Route path="/our-services/christenings" element={<ChristeningsPage />} /> */}
                  
                  <Route path="/dentist" element={<DentistLandingPage />} />
                  <Route path="/dentist/despre" element={<DentistAboutPage />} />
                  <Route path="/dentist/servicii" element={<DentistServicesPage />} />
                  <Route path="/dentist/contact" element={<DentistContactPage />} />

                  <Route path="/admin/login" element={<AdminLoginPage />} />

                  <Route 
                    path="/admin" 
                    element={
                      isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" replace />
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="reservations" element={<AdminReservationsPage />} />
                    <Route path="table-layout" element={<AdminTableLayoutPage />} />
                    <Route path="availability" element={<AdminAvailabilityPage />} />
                    <Route path="menu-editor" element={<AdminMenuEditorPage />} />
                    <Route path="blog-events" element={<AdminBlogEventPage />} />
                    <Route path="contact-submissions" element={<AdminContactSubmissionsPage />} />
                  </Route>
                </Routes>
              </AnimatePresence>
            </main>
            {!isAdminRoute && !isDentistRoute && <Footer />}
            {isDentistRoute && <FooterDentist />}
            <Toaster />
          </div>
        </AppContext.Provider>
      );
    }

    export default App;
