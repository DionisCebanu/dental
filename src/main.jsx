import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter as Router } from 'react-router-dom';
    import App from '@/App';
    import '@/index.css';
    import { LanguageProvider } from '@/context/LanguageContext';
    import { HelmetProvider } from 'react-helmet-async';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <HelmetProvider>
          <Router>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </Router>
        </HelmetProvider>
      </React.StrictMode>
    );