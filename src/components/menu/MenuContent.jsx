import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import CategorySelector from '@/components/menu/CategorySelector';
    import MenuItemCard from '@/components/menu/MenuItemCard';

    const MenuContent = ({ 
      categoriesData, 
      selectedCategory, 
      setSelectedCategory, 
      menuItems, 
      language,
      t,
      hasMadeInitialSelection
    }) => {
      return (
        <>
          <CategorySelector 
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {hasMadeInitialSelection && selectedCategory && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              key={selectedCategory + language} 
            >
              <AnimatePresence>
                {menuItems.map((item, index) => (
                  <MenuItemCard key={item.id + language} item={item} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {hasMadeInitialSelection && selectedCategory && menuItems.length === 0 && (
            <motion.p 
              className="text-center text-gray-400 text-lg mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('menuNoItems')}
            </motion.p>
          )}
        </>
      );
    };

    export default MenuContent;