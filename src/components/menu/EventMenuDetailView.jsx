import React, { useState, useContext, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
    import { ArrowLeft, CheckCircle, Info, LayoutGrid, Rows, HelpCircle as CircleHelp } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { useNavigate } from 'react-router-dom';
    import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 },
      }),
    };
    
    const EventMenuItemCard = ({ item, isSelected, onSelect, layoutMode }) => {
      return (
        <motion.div
          variants={itemVariants}
          layout
          className={`cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-primary/30 transition-all duration-300 border-2 ${isSelected ? 'border-primary scale-105 bg-primary/10' : 'border-slate-700 bg-slate-800 hover:border-primary/50'} ${layoutMode === 'vertical' ? 'flex flex-col' : ''}`}
          onClick={onSelect}
        >
          {item.imageText && (
            <div className={`w-full overflow-hidden ${layoutMode === 'vertical' ? 'h-48' : 'h-40'}`}>
              <img  
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" 
              />
            </div>
          )}
          <div className="p-4 flex-grow flex flex-col">
            <h4 className={`text-lg font-semibold mb-1 ${isSelected ? 'text-primary' : 'text-slate-100'}`}>{item.name}</h4>
            <p className={`text-xs text-slate-400 ${layoutMode === 'vertical' ? 'line-clamp-3 flex-grow' : 'line-clamp-2'}`}>{item.description}</p>
          </div>
          {isSelected && (
            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
              <CheckCircle size={16} />
            </div>
          )}
        </motion.div>
      );
    };

    const EventMenuDetailView = ({ menuTypeTitle, menuVariant, allMenuItems, onBack, bookingId, categoriesData }) => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const navigate = useNavigate();
      const [selectedItems, setSelectedItems] = useState({});
      const [layoutMode, setLayoutMode] = useState('grid'); 
      const [showGuidance, setShowGuidance] = useState(false);

      useEffect(() => {
        const initialSelections = {};
        menuVariant.groups.forEach(group => {
          initialSelections[group.groupId] = null; 
        });
        setSelectedItems(initialSelections);

        const guidanceShown = localStorage.getItem('eventMenuGuidanceShown');
        if (!guidanceShown) {
          setShowGuidance(true);
        }
      }, [menuVariant]);

      const handleGuidanceDismiss = () => {
        setShowGuidance(false);
        localStorage.setItem('eventMenuGuidanceShown', 'true');
      };

      const handleItemSelection = (groupId, itemId) => {
        setSelectedItems(prev => ({
          ...prev,
          [groupId]: itemId
        }));
      };

      const getMenuItemDetails = (itemId) => {
        return allMenuItems.find(item => item.id === itemId);
      };

      const getCategoryName = (categoryId) => {
        const category = categoriesData.find(cat => cat.id === categoryId);
        return category ? category.name : t('unknownCategory', { defaultText: "Unknown Category"});
      }

      const handleConfirmSelection = () => {
        const allGroupsSelected = menuVariant.groups.every(group => selectedItems[group.groupId] !== null);
        if (!allGroupsSelected) {
          toast({
            title: t('eventMenuErrorTitle', { defaultText: "Selection Incomplete" }),
            description: t('eventMenuErrorDesc', { defaultText: "Please select one item from each group." }),
            variant: "destructive",
          });
          return;
        }

        const finalSelectionDetails = {
          eventMenuTypeTitle: menuTypeTitle,
          eventMenuVariantName: menuVariant.variantName,
          pricePerPerson: menuVariant.pricePerPerson,
          choices: menuVariant.groups.map(group => {
            const selectedItemId = selectedItems[group.groupId];
            const itemDetails = getMenuItemDetails(selectedItemId);
            return {
              groupTitle: group.groupTitle,
              selectedItemName: itemDetails ? itemDetails.name : 'N/A',
              selectedItemId: selectedItemId,
            };
          })
        };
        
        const storageKey = bookingId ? `eventMenuSelection_${bookingId}` : `eventMenuSelection_${menuVariant.id}`;
        localStorage.setItem(storageKey, JSON.stringify(finalSelectionDetails));

        toast({
          title: t('eventMenuSuccessTitle', { defaultText: "Menu Selected!" }),
          description: t('eventMenuSuccessDesc', { menuTitle: `${menuTypeTitle} - ${menuVariant.variantName}`, defaultText: `You've selected the ${menuTypeTitle} - ${menuVariant.variantName}.` }),
        });

        if (bookingId) {
          navigate('/booking', { state: { bookingId: bookingId, eventMenuSelection: finalSelectionDetails } });
        } else {
          onBack(); 
        }
      };

      return (
        <motion.div
          key="eventMenuDetail"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          {showGuidance && (
             <AlertDialog open={showGuidance} onOpenChange={setShowGuidance}>
              <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-100">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-primary flex items-center">
                    <CircleHelp size={22} className="mr-2"/> {t('eventMenuGuidanceTitle', {defaultText: "How to Select Your Event Menu"})}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-300">
                    {t('eventMenuGuidanceDesc', {price: menuVariant.pricePerPerson.toFixed(2), defaultText: `For this event menu, please select one item from each section (e.g., one appetizer, one main course). The total price per person remains fixed at $${menuVariant.pricePerPerson.toFixed(2)}.`})}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleGuidanceDismiss} className="bg-primary hover:bg-primary/90">{t('gotItButtonText', {defaultText: "Got it!"})}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button variant="outline" onClick={onBack} className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700">
            <ArrowLeft size={18} className="mr-2" /> {t('backToEventVariantsButton', { defaultText: "Back to Price Options" })}
          </Button>

          <Card className="bg-slate-850 border-slate-700 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">{menuTypeTitle} - {menuVariant.variantName}</CardTitle>
              <CardDescription className="text-xl text-accent">
                {t('pricePerPersonLabel', { defaultText: "Price per person" })}: ${menuVariant.pricePerPerson.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 py-6">
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="icon" onClick={() => setLayoutMode(layoutMode === 'grid' ? 'list' : 'grid')} className="border-slate-500 text-slate-300 hover:bg-slate-700">
                  {layoutMode === 'grid' ? <Rows size={20} /> : <LayoutGrid size={20} />}
                </Button>
              </div>
              {menuVariant.groups.map(group => (
                <div key={group.groupId} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                  <h3 className="text-xl font-semibold text-secondary mb-6 text-center">{group.groupTitle}</h3>
                  {group.categories && group.categories.length > 1 ? (
                    <Tabs defaultValue={group.categories[0].categoryId} className="w-full mb-4">
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-slate-700/80">
                        {group.categories.map(cat => (
                           <TabsTrigger key={cat.categoryId} value={cat.categoryId} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            {getCategoryName(cat.categoryId)}
                           </TabsTrigger>
                        ))}
                      </TabsList>
                      {group.categories.map(cat => (
                        <TabsContent key={cat.categoryId} value={cat.categoryId}>
                          <div className={`grid gap-4 mt-4 ${layoutMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {cat.itemIds.map((itemId) => {
                              const item = getMenuItemDetails(itemId);
                              if (!item) return null;
                              return (
                                <EventMenuItemCard
                                  key={itemId}
                                  item={item}
                                  isSelected={selectedItems[group.groupId] === itemId}
                                  onSelect={() => handleItemSelection(group.groupId, itemId)}
                                  layoutMode={layoutMode}
                                />
                              );
                            })}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  ) : (
                     <div className={`grid gap-4 mt-4 ${layoutMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {(group.categories && group.categories[0] ? group.categories[0].itemIds : group.itemIds || []).map((itemId) => {
                          const item = getMenuItemDetails(itemId);
                          if (!item) return null;
                          return (
                            <EventMenuItemCard
                              key={itemId}
                              item={item}
                              isSelected={selectedItems[group.groupId] === itemId}
                              onSelect={() => handleItemSelection(group.groupId, itemId)}
                              layoutMode={layoutMode}
                            />
                          );
                        })}
                      </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end pt-6 border-t border-slate-700">
              <Button 
                size="lg" 
                onClick={handleConfirmSelection}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <CheckCircle size={20} className="mr-2" /> {t('eventMenuConfirmButton', { defaultText: "Confirm Selection" })}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default EventMenuDetailView;