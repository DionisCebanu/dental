import React, { createContext, useState, useEffect, useCallback } from 'react';

    export const LanguageContext = createContext();

    const availableLanguages = ['en', 'fr', 'ro', 'ru'];

    const safeImport = async (importer) => {
      try {
        const module = await importer();
        return module.default;
      } catch (error) {
        console.error("Failed to import language file:", error);
        return {}; 
      }
    };
    
    const loadMessages = async (lang) => {
      let messagesArray;
      switch (lang) {
        case 'en':
          messagesArray = await Promise.all([
            safeImport(() => import('@/lang/en/common.json')),
            safeImport(() => import('@/lang/en/restaurant.json')),
            safeImport(() => import('@/lang/en/admin.json')),
            safeImport(() => import('@/lang/en/dentist.json')),
          ]);
          break;
        case 'fr':
          messagesArray = await Promise.all([
            safeImport(() => import('@/lang/fr/common.json')),
            safeImport(() => import('@/lang/fr/restaurant.json')),
            safeImport(() => import('@/lang/fr/admin.json')),
            safeImport(() => import('@/lang/fr/dentist.json')),
          ]);
          break;
        case 'ro':
          messagesArray = await Promise.all([
            safeImport(() => import('@/lang/ro/common.json')),
            safeImport(() => import('@/lang/ro/restaurant.json')),
            safeImport(() => import('@/lang/ro/admin.json')),
            safeImport(() => import('@/lang/ro/dentist.json')),
          ]);
          break;
        case 'ru':
          messagesArray = await Promise.all([
            safeImport(() => import('@/lang/ru/common.json')),
            safeImport(() => import('@/lang/ru/restaurant.json')),
            safeImport(() => import('@/lang/ru/admin.json')),
            safeImport(() => import('@/lang/ru/dentist.json')),
          ]);
          break;
        default: // Fallback to English
          messagesArray = await Promise.all([
            safeImport(() => import('@/lang/en/common.json')),
            safeImport(() => import('@/lang/en/restaurant.json')),
            safeImport(() => import('@/lang/en/admin.json')),
            safeImport(() => import('@/lang/en/dentist.json')),
          ]);
          break;
      }
      return Object.assign({}, ...messagesArray.filter(m => Object.keys(m).length > 0));
    };

    export const LanguageProvider = ({ children }) => {
      const [language, setLanguageState] = useState(() => {
        try {
          const storedLang = localStorage.getItem('appLanguage');
          return storedLang && availableLanguages.includes(storedLang) ? storedLang : 'en';
        } catch (error) {
          return 'en';
        }
      });
      const [messages, setMessages] = useState({});
      const [isLoaded, setIsLoaded] = useState(false);

      const fetchMessages = useCallback(async (langToLoad) => {
        setIsLoaded(false);
        try {
          const loadedMessages = await loadMessages(langToLoad);
          setMessages(loadedMessages);
          localStorage.setItem('appLanguage', langToLoad);
          document.documentElement.lang = langToLoad;
        } catch (error) {
          console.error(`Could not load messages for language: ${langToLoad}`, error);
          // Attempt to load fallback English messages if current load fails
          if (langToLoad !== 'en') {
            const fallbackMessages = await loadMessages('en');
            setMessages(fallbackMessages);
            localStorage.setItem('appLanguage', 'en');
            document.documentElement.lang = 'en';
          } else {
            setMessages({}); // No messages if English fails
          }
        } finally {
          setIsLoaded(true);
        }
      }, []);
      
      const setLanguage = useCallback((newLang) => {
        if (availableLanguages.includes(newLang)) {
          setLanguageState(newLang);
        } else {
          console.warn(`Language ${newLang} is not available. Defaulting to 'en'.`);
          setLanguageState('en');
        }
      }, []);


      useEffect(() => {
        fetchMessages(language);
      }, [language, fetchMessages]);
      
      const t = useCallback((key, options = {}) => {
        const { defaultText, ...replacements } = options;
        let message = messages[key];

        if (message === undefined || message === null) {
          return defaultText !== undefined ? defaultText : key;
        }
        
        if (typeof message !== 'string') {
            return defaultText !== undefined ? defaultText : key;
        }

        Object.keys(replacements).forEach(placeholder => {
          const regex = new RegExp(`{{${placeholder}}}`, 'g');
          message = message.replace(regex, replacements[placeholder]);
        });
        
        return message;
      }, [messages]);

      return (
        <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages, isLoaded }}>
          {children}
        </LanguageContext.Provider>
      );
    };