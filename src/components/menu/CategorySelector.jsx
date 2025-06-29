import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';

    const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
      return (
        <motion.div 
          className="mb-10 sm:mb-12 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex space-x-3 sm:space-x-4 justify-center">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button
                  variant={selectedCategory === category.id ? 'secondary' : 'outline'}
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ease-in-out shadow-md hover:shadow-lg
                    ${selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent' 
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-600/70 hover:border-accent'
                    }`
                  }
                >
                  {React.cloneElement(category.icon, { 
                    size: 18, 
                    className: `mr-1.5 ${selectedCategory === category.id ? 'text-white' : 'text-accent'}` 
                  })}
                  <span>{category.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default CategorySelector;