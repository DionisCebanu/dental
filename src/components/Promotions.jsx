import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { Tag, CalendarClock } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const sectionVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.7, ease: "easeInOut", staggerChildren: 0.25 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "circOut" }}
    };

    const Promotions = ({ title }) => {
      const { t } = useContext(LanguageContext);

      const promotionsData = [
        {
          imageText: "Pasta dish for Pasta Night Tuesdays",
          titleKey: "promotionPastaNightTitle",
          descriptionKey: "promotionPastaNightDesc",
          defaultTitle: "Pasta Night Tuesdays",
          defaultDescription: "Enjoy 2-for-1 on all pasta dishes every Tuesday!",
          icon: <CalendarClock size={36} className="text-accent" />,
        },
        {
          imageText: "Wine bottles for Wine Wednesdays",
          titleKey: "promotionWineWednesdayTitle",
          descriptionKey: "promotionWineWednesdayDesc",
          defaultTitle: "Wine Wednesdays",
          defaultDescription: "50% off select bottles of wine.",
          icon: <Tag size={36} className="text-accent" />,
        },
      ];

      return (
        <motion.section 
          className="py-16 sm:py-24 bg-background"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl sm:text-5xl font-extrabold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {promotionsData.map((promo, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="overflow-hidden bg-slate-800/60 border-slate-700 shadow-xl hover:shadow-accent/25 transition-all duration-300 group">
                    <div className="relative h-64 w-full">
                      <img  
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
                        alt={promo.defaultTitle}
                       src={index === 0 ? "https://images.unsplash.com/photo-1551183053-bf91a1d8735a" : "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 p-3 bg-primary/20 rounded-full backdrop-blur-sm">
                        {promo.icon}
                      </div>
                    </div>
                    <CardHeader className="pt-5">
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-primary group-hover:text-accent transition-colors">
                        {t(promo.titleKey, promo.defaultTitle)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 text-base leading-relaxed">
                        {t(promo.descriptionKey, promo.defaultDescription)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      );
    };

    export default Promotions;