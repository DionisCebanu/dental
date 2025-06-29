import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
    import { DollarSign, Info } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const cardVariants = {
      hidden: { opacity: 0, scale: 0.9, y: 30 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    };

    const MenuItemCard = ({ item, index }) => {
      const { t } = useContext(LanguageContext);
      return (
        <motion.div
          custom={index}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.3 } }}
          variants={cardVariants}
          layout
        >
          <Card className="h-full flex flex-col bg-slate-800/60 border-slate-700 hover:shadow-2xl hover:border-primary transition-all duration-300 overflow-hidden group">
            <div className="relative h-56 w-full overflow-hidden">
              <img   
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" 
                alt={item.name}
                src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors duration-300">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center text-gray-400 mb-2">
                <Info size={16} className="mr-2 text-secondary" />
                <span className="font-semibold">{t('menuItemDescription')}:</span>
              </div>
              <CardDescription className="text-gray-400 text-sm leading-relaxed">{item.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-xl font-bold text-accent">
                <DollarSign size={20} className="mr-1" />
                <span>{item.price.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default MenuItemCard;