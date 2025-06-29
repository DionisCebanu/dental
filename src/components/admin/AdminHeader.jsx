import React, { useContext } from 'react';
    import { Bell, UserCircle, Sun, Moon } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';

    const AdminHeader = () => {
      const { t, language, toggleLanguage } = useContext(LanguageContext);
      const [darkMode, setDarkMode] = React.useState(true); 

      const handleLanguageCycle = () => {
        if (language === 'en') toggleLanguage('fr');
        else if (language === 'fr') toggleLanguage('ro');
        else toggleLanguage('en');
      };
      
      const getNextLanguageFlag = () => {
        if (language === 'en') return '🇫🇷';
        if (language === 'fr') return '🇷🇴';
        return '🇬🇧';
      };


      return (
        <header className="h-20 bg-slate-950 shadow-md flex items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-200">{t('adminHeaderWelcome', { defaultText: "Welcome, Admin!"})}</h2>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" onClick={handleLanguageCycle} className="text-slate-400 hover:text-slate-100">
              <span className="text-xl">{getNextLanguageFlag()}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="text-slate-400 hover:text-slate-100">
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </Button>
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
              <Bell size={22} />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-slate-950" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
              <UserCircle size={24} />
            </Button>
          </div>
        </header>
      );
    };

    export default AdminHeader;