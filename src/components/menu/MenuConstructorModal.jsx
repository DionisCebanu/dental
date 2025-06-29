import React, { useState, useContext, useEffect, useRef } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { LanguageContext } from '@/context/LanguageContext';
    import { useToast } from '@/components/ui/use-toast';
    import { courseTypes as rawCourseTypes } from '@/data/menu/courseTypes';
    import { categoriesData as rawCategoriesData } from '@/data/menu/categories';
    import { ChefHat, Save, XCircle, DollarSign } from 'lucide-react';
    import CourseSection from '@/components/menu/constructor/CourseSection';
    import MealSummaryCard from '@/components/menu/constructor/MealSummaryCard';
    import DownloadButtons from '@/components/menu/constructor/DownloadButtons';
    import ContactRestaurantDialog from '@/components/booking/ContactRestaurantDialog';
    import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


    const modalVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
    };

    const MenuConstructorModal = ({ isOpen, setIsOpen, menuItems, bookingId = null }) => {
      const { t, language } = useContext(LanguageContext);
      const { toast } = useToast();
      const mealSummaryRef = useRef(null);
      const [isContactRestaurantDialogOpen, setIsContactRestaurantDialogOpen] = useState(false);
      const [currentBookingDetailsForContact, setCurrentBookingDetailsForContact] = useState(null);
      const [courseTypes, setCourseTypes] = useState([]);
      const [categoriesData, setCategoriesData] = useState([]);

      const [selectedCourses, setSelectedCourses] = useState({});
      const [totalPrice, setTotalPrice] = useState(0);
      const [activeCourseTab, setActiveCourseTab] = useState('');

      useEffect(() => {
        const translatedCourseTypes = rawCourseTypes.map(ct => ({...ct, name: t(ct.nameKey, ct.defaultName)}));
        setCourseTypes(translatedCourseTypes);
        if (translatedCourseTypes.length > 0) {
          setActiveCourseTab(translatedCourseTypes[0].id);
        }
        const translatedCategories = rawCategoriesData.map(cat => ({...cat, name: t(cat.nameKey, cat.defaultName)}));
        setCategoriesData(translatedCategories);

        const initialSelections = translatedCourseTypes.reduce((acc, course) => {
          acc[course.id] = []; 
          return acc;
        }, {});
        setSelectedCourses(initialSelections);

      }, [t, language]);


      useEffect(() => {
        if (!isOpen || courseTypes.length === 0) return;

        const initialSelections = courseTypes.reduce((acc, course) => {
          acc[course.id] = []; 
          return acc;
        }, {});

        const storageKey = bookingId ? `personalizedMenu_${bookingId}` : 'personalizedMenu';
        const savedMeal = localStorage.getItem(storageKey);
        if (savedMeal) {
          const parsedMeal = JSON.parse(savedMeal);
          const fullSelections = { ...initialSelections };
          for (const courseId in parsedMeal) {
            if (Array.isArray(parsedMeal[courseId]) && courseTypes.some(ct => ct.id === courseId)) {
              fullSelections[courseId] = parsedMeal[courseId].map(item => ({ ...item, quantity: item.quantity || 1 }));
            }
          }
          setSelectedCourses(fullSelections);
        } else {
          setSelectedCourses(initialSelections); 
        }
        
        if (courseTypes.length > 0 && !activeCourseTab) {
            setActiveCourseTab(courseTypes[0].id);
        }

      }, [bookingId, isOpen, courseTypes, t]); 

      useEffect(() => {
        let currentTotal = 0;
        Object.values(selectedCourses).forEach(itemsArray => {
          if (Array.isArray(itemsArray)) {
            itemsArray.forEach(item => {
              if (item && item.price && item.quantity) {
                currentTotal += item.price * item.quantity;
              }
            });
          }
        });
        setTotalPrice(currentTotal);
      }, [selectedCourses]);

      const handleItemSelectionChange = (courseId, item, isSelected) => {
        setSelectedCourses(prev => {
          const currentSelectionsForCourse = prev[courseId] || [];
          const existingItemIndex = currentSelectionsForCourse.findIndex(i => i.id === item.id);

          if (isSelected) {
            if (existingItemIndex === -1) { 
              return {
                ...prev,
                [courseId]: [...currentSelectionsForCourse, { ...item, quantity: 1 }]
              };
            } else { 
              const updatedCourse = [...currentSelectionsForCourse];
              if (updatedCourse[existingItemIndex].quantity < 1) {
                updatedCourse[existingItemIndex] = { ...updatedCourse[existingItemIndex], quantity: 1 };
              }
              return { ...prev, [courseId]: updatedCourse };
            }
          } else { 
            return {
              ...prev,
              [courseId]: currentSelectionsForCourse.filter(i => i.id !== item.id)
            };
          }
        });
      };

      const handleQuantityChange = (courseId, itemId, newQuantity) => {
        const quantity = Math.max(0, parseInt(newQuantity, 10) || 0); 

        setSelectedCourses(prev => {
          const currentSelectionsForCourse = prev[courseId] || [];
          const itemIndex = currentSelectionsForCourse.findIndex(i => i.id === itemId);

          if (itemIndex === -1 && quantity > 0) { 
            const itemToAdd = menuItems.find(mi => mi.id === itemId);
            if (itemToAdd) {
              return {
                ...prev,
                [courseId]: [...currentSelectionsForCourse, { ...itemToAdd, quantity }]
              };
            }
            return prev;
          }
          
          if (itemIndex > -1) {
            if (quantity === 0) { 
              return {
                ...prev,
                [courseId]: currentSelectionsForCourse.filter(i => i.id !== itemId)
              };
            } else { 
              const updatedCourse = [...currentSelectionsForCourse];
              updatedCourse[itemIndex] = { ...updatedCourse[itemIndex], quantity };
              return { ...prev, [courseId]: updatedCourse };
            }
          }
          return prev; 
        });
      };
      
      const handleSaveMeal = () => {
        const hasSelection = Object.values(selectedCourses).some(itemsArray => itemsArray.length > 0);
        if (!hasSelection) {
          toast({
            title: t('menuConstructorErrorSaving'),
            description: t('menuConstructorSelectAtLeastOnePrompt', {defaultText: "Please select at least one item for your meal."}),
            variant: "destructive",
          });
          return;
        }

        const storageKey = bookingId ? `personalizedMenu_${bookingId}` : 'personalizedMenu';
        localStorage.setItem(storageKey, JSON.stringify(selectedCourses));
        
        toast({
          title: t('menuConstructorMealSaved'),
          description: `${t('menuConstructorTotalPrice')}: $${totalPrice.toFixed(2)}`,
        });

        if (bookingId) {
          setCurrentBookingDetailsForContact({ bookingId });
          setIsContactRestaurantDialogOpen(true);
          setIsOpen(false); 
        } else {
          setIsOpen(false); 
        }
      };

      const handleModalOpenChange = (openState) => {
        setIsOpen(openState);
      };

      if (courseTypes.length === 0) return null;


      return (
        <>
          <AnimatePresence>
            {isOpen && (
              <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
                <DialogContent 
                  className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-[90vh] flex flex-col bg-slate-800 border-slate-700 text-gray-200 shadow-2xl shadow-primary/40 p-0"
                  as={motion.div}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <DialogHeader className="text-center sm:text-left p-6 border-b border-slate-700">
                    <div className="flex justify-center sm:justify-start items-center mb-2">
                      <ChefHat size={28} className="text-primary mr-3" />
                      <DialogTitle className="text-2xl font-bold text-primary">{t('menuConstructorTitle')}</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400 text-sm">{t('menuConstructorSubtitle')}</DialogDescription>
                  </DialogHeader>

                  <Tabs value={activeCourseTab} onValueChange={setActiveCourseTab} className="flex-grow flex flex-col overflow-hidden p-6 pb-0">
                    <TabsList className="bg-slate-700 p-1 rounded-lg mb-4 self-start">
                      {courseTypes.map(course => (
                        <TabsTrigger 
                          key={course.id} 
                          value={course.id}
                          className="px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md"
                        >
                          {course.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-slate-700/50 pr-3 -mr-3">
                      {courseTypes.map(course => (
                        <TabsContent key={course.id} value={course.id} className="outline-none ring-0 focus:ring-0">
                            <CourseSection
                                course={course}
                                menuItems={menuItems}
                                categoriesData={categoriesData}
                                selectedItemsForCourse={selectedCourses[course.id] || []}
                                onItemSelectionChange={handleItemSelectionChange}
                                onQuantityChange={handleQuantityChange}
                                t={t}
                            />
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                  
                  <DialogFooter className="p-6 border-t border-slate-700 mt-auto flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <div className="flex items-center justify-center sm:justify-start text-lg font-bold">
                            <span className="text-gray-200 mr-2">{t('menuConstructorTotalPrice')}:</span>
                            <span className="text-accent flex items-center"><DollarSign size={18} className="mr-1" />{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <DownloadButtons mealSummaryRef={mealSummaryRef} t={t} toast={toast} />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        onClick={() => handleModalOpenChange(false)}
                        className="border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-gray-100 w-full sm:w-auto">
                           <XCircle size={18} className="mr-2"/> {t('closeButtonText', { defaultText: "Close"})}
                      </Button>
                      <Button 
                        onClick={handleSaveMeal} 
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold w-full sm:w-auto"
                      >
                        <Save size={18} className="mr-2"/> {t('menuConstructorSaveMeal')}
                      </Button>
                    </div>
                  </DialogFooter>
                  <div className="hidden">
                     <MealSummaryCard
                        ref={mealSummaryRef}
                        selectedCourses={selectedCourses}
                        totalPrice={totalPrice}
                        t={t}
                      />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>
          <ContactRestaurantDialog
            isOpen={isContactRestaurantDialogOpen}
            onOpenChange={setIsContactRestaurantDialogOpen}
            bookingDetails={currentBookingDetailsForContact}
            mealDetailsRef={mealSummaryRef} 
          />
        </>
      );
    };

    export default MenuConstructorModal;