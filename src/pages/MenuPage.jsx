import React, { useState, useEffect, useContext } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useLocation, useNavigate } from 'react-router-dom';
    import MenuConstructorModal from '@/components/menu/MenuConstructorModal';
    import MenuContent from '@/components/menu/MenuContent';
    import EventMenuDetailView from '@/components/menu/EventMenuDetailView';
    import EventMenuVariantListView from '@/components/menu/EventMenuVariantListView'; 
    import { LanguageContext } from '@/context/LanguageContext';
    import { AppContext } from '@/App';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { ChefHat, ListChecks, CalendarHeart, ArrowLeft, LayoutGrid, Rows } from 'lucide-react';
    import { getAllMenuItems as rawGetAllMenuItems } from '@/data/menu/items';
    import { categoriesData as rawCategoriesData } from '@/data/menu/categories';
    import { eventMenusData as rawEventMenusData } from '@/data/menu/eventMenus';
    import { initialMenuDataFiltered } from '@/data/menu/items';

    const pageVariants = {
      initial: { opacity: 0, x: "100vw" },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: "-100vw" }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5
    };

    const MenuPage = () => {
      const { t, language } = useContext(LanguageContext);
      const { isAuthenticated } = useContext(AppContext);
      const location = useLocation();
      const navigate = useNavigate();
      
      const [menuSelectionMode, setMenuSelectionMode] = useState('initial'); 
      const [categoriesData, setCategoriesData] = useState([]);
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [menuItems, setMenuItems] = useState([]);
      const [isConstructorOpen, setIsConstructorOpen] = useState(false);
      const [allMenuItems, setAllMenuItems] = useState([]);
      const [hasMadeInitialSelection, setHasMadeInitialSelection] = useState(false);
      const [currentBookingId, setCurrentBookingId] = useState(null);
      
      const [eventMenuTypes, setEventMenuTypes] = useState([]); 
      const [selectedEventType, setSelectedEventType] = useState(null); 
      const [selectedEventVariant, setSelectedEventVariant] = useState(null);

      useEffect(() => {
        if (location.state?.fromBooking && location.state?.bookingId) {
          setCurrentBookingId(location.state.bookingId);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, [location.state, navigate]);

      useEffect(() => {
        const translatedCategories = rawCategoriesData.map(cat => ({
          ...cat,
          name: t(cat.nameKey, cat.defaultName)
        }));
        setCategoriesData(translatedCategories);

        const translatedEventMenuTypes = rawEventMenusData.map(emt => ({
          ...emt,
          title: t(emt.titleKey, emt.defaultTitle),
          variants: emt.variants.map(variant => ({
            ...variant,
            variantName: t(variant.variantNameKey, variant.defaultVariantName),
            groups: variant.groups.map(group => ({
              ...group,
              groupTitle: t(group.groupTitleKey, group.defaultGroupTitle),
              categories: group.categories?.map(cat => ({
                ...cat,
                categoryName: t(cat.categoryNameKey, cat.defaultCategoryName)
              }))
            }))
          }))
        }));
        setEventMenuTypes(translatedEventMenuTypes);
        
        const allRawItems = rawGetAllMenuItems();
        const translatedAllItems = allRawItems.map(item => ({
          ...item,
          name: t(item.nameKey, item.defaultName),
          description: t(item.descriptionKey, item.defaultDescription),
        }));
        setAllMenuItems(translatedAllItems);

        const lastSelectedCat = localStorage.getItem('lastSelectedCategory');
        if (lastSelectedCat && translatedCategories.some(cat => cat.id === lastSelectedCat)) {
          setSelectedCategory(lastSelectedCat);
        }
      }, [t, language]);

      useEffect(() => {
        if (selectedCategory && menuSelectionMode === 'customCategory') {
          localStorage.setItem('lastSelectedCategory', selectedCategory);
          const itemsForCategory = initialMenuDataFiltered[selectedCategory] || [];
          const translatedItems = itemsForCategory.map(item => ({
            ...item,
            name: t(item.nameKey, item.defaultName),
            description: t(item.descriptionKey, item.defaultDescription),
          }));
          setMenuItems(translatedItems);
          setHasMadeInitialSelection(true);
        } else if (menuSelectionMode !== 'customCategory') {
          setMenuItems([]);
        }
      }, [selectedCategory, t, language, menuSelectionMode]);

      const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setMenuSelectionMode('customCategory');
      };

      const handleSelectEventType = (eventType) => {
        setSelectedEventType(eventType);
        setMenuSelectionMode('eventVariantList');
      };

      const handleSelectEventVariant = (variant) => {
        setSelectedEventVariant(variant);
        setMenuSelectionMode('eventDetail');
      };
      
      const renderInitialChoice = () => (
        <motion.div 
          key="initialChoice"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          <Card 
            className="bg-slate-800/70 border-slate-700 hover:border-primary transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-primary/30"
            onClick={() => setMenuSelectionMode('eventTypeList')}
          >
            <CardHeader className="items-center text-center">
              <CalendarHeart size={48} className="text-primary mb-3" />
              <CardTitle className="text-3xl text-primary">{t('menuPageChooseEventMenuTitle', { defaultText: "Event Menus" })}</CardTitle>
              <CardDescription className="text-slate-400">{t('menuPageChooseEventMenuDesc', { defaultText: "Select from our curated menus for special occasions." })}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="secondary" className="mt-2">{t('menuPageExploreEventMenusButton', { defaultText: "Explore Event Menus" })}</Button>
            </CardContent>
          </Card>
          <Card 
            className="bg-slate-800/70 border-slate-700 hover:border-accent transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-accent/30"
            onClick={() => setMenuSelectionMode('customCategory')}
          >
            <CardHeader className="items-center text-center">
              <ChefHat size={48} className="text-accent mb-3" />
              <CardTitle className="text-3xl text-accent">{t('menuPageBuildCustomMenuTitle', { defaultText: "Custom Menu" })}</CardTitle>
              <CardDescription className="text-slate-400">{t('menuPageBuildCustomMenuDesc', { defaultText: "Create your own personalized dining experience." })}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="mt-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">{t('menuPageBuildYourOwnButton', { defaultText: "Build Your Own" })}</Button>
            </CardContent>
          </Card>
        </motion.div>
      );

      const renderEventTypeList = () => (
        <motion.div
          key="eventTypeList"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Button variant="outline" onClick={() => setMenuSelectionMode('initial')} className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700">
            <ArrowLeft size={18} className="mr-2" /> {t('backButtonText', { defaultText: "Back to Menu Types" })}
          </Button>
          <h2 className="text-3xl font-bold text-center text-primary mb-8">{t('menuPageEventMenusListTitle', { defaultText: "Our Event Menu Types" })}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {eventMenuTypes.map(eventType => (
              <Card 
                key={eventType.id}
                className="bg-slate-800/70 border-slate-700 hover:border-secondary transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-secondary/30"
                onClick={() => handleSelectEventType(eventType)}
              >
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {React.cloneElement(eventType.icon, { className: "text-secondary mr-3"})}
                    <CardTitle className="text-2xl text-secondary">{eventType.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">{t(eventType.descriptionKey, eventType.defaultDescription)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img  alt={eventType.title} className="rounded-md aspect-video object-cover" src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      );

      const renderCustomMenuBuilder = () => (
        <motion.div
          key="customMenuBuilder"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Button variant="outline" onClick={() => { setMenuSelectionMode('initial'); setSelectedCategory(null); setHasMadeInitialSelection(false); }} className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700">
            <ArrowLeft size={18} className="mr-2" /> {t('backButtonText', { defaultText: "Back to Menu Types" })}
          </Button>
          <h2 className="text-3xl font-bold text-center text-accent mb-4">{t('menuPageCustomMenuBuilderTitle', { defaultText: "Build Your Custom Menu" })}</h2>
          {(isAuthenticated || currentBookingId) && (
            <motion.div 
              className="text-center mb-10 sm:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button 
                onClick={() => setIsConstructorOpen(true)} 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 text-lg"
                aria-label={t('customizeYourMealButton')}
              >
                <ListChecks size={22} className="mr-2.5" />
                {t('menuPageOpenCustomizerButton', { defaultText: "Open Meal Customizer" })}
              </Button>
            </motion.div>
          )}
          <MenuContent
            categoriesData={categoriesData}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleSelectCategory}
            menuItems={menuItems}
            language={language}
            t={t}
            hasMadeInitialSelection={hasMadeInitialSelection}
          />
          {!hasMadeInitialSelection && categoriesData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mt-12 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-primary/30"
            >
              <ChefHat size={48} className="mx-auto mb-4 text-primary" />
              <p className="text-xl text-gray-300 font-semibold">
                {t('menuPageSelectCategoryPrompt', { defaultText: "Please select a category above to view our delicious offerings!" })}
              </p>
            </motion.div>
          )}
        </motion.div>
      );

      return (
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 sm:py-32 sm:pt-40"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl font-extrabold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('menuPageTitle')}
          </motion.h1>

          <AnimatePresence mode="wait">
            {menuSelectionMode === 'initial' && renderInitialChoice()}
            {menuSelectionMode === 'eventTypeList' && renderEventTypeList()}
            {menuSelectionMode === 'eventVariantList' && selectedEventType && (
              <EventMenuVariantListView 
                eventType={selectedEventType}
                onSelectVariant={handleSelectEventVariant}
                onBack={() => { setMenuSelectionMode('eventTypeList'); setSelectedEventType(null);}}
                t={t}
              />
            )}
            {menuSelectionMode === 'eventDetail' && selectedEventVariant && selectedEventType && (
              <EventMenuDetailView 
                menuTypeTitle={selectedEventType.title}
                menuVariant={selectedEventVariant} 
                allMenuItems={allMenuItems} 
                onBack={() => { setMenuSelectionMode('eventVariantList'); setSelectedEventVariant(null); }}
                bookingId={currentBookingId}
                categoriesData={categoriesData}
              />
            )}
            {menuSelectionMode === 'customCategory' && renderCustomMenuBuilder()}
          </AnimatePresence>
          
          <MenuConstructorModal 
            isOpen={isConstructorOpen} 
            setIsOpen={setIsConstructorOpen} 
            menuItems={allMenuItems} 
            bookingId={currentBookingId}
          />
        </motion.div>
      );
    };

    export default MenuPage;