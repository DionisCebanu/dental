import React, { useContext } from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Tag, Percent, Sparkles, ArrowRight } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const promotionsData = [
      {
        id: 1,
        titleKey: 'promo1Title',
        descriptionKey: 'promo1Desc',
        imageText: "Modern vinyl windows installed in a sunlit room",
        tagKey: 'promo1Tag',
        icon: <Percent size={24} className="text-white" />
      },
      {
        id: 2,
        titleKey: 'promo2Title',
        descriptionKey: 'promo2Desc',
        imageText: "Elegant new entry door on a beautiful house",
        tagKey: 'promo2Tag',
        icon: <Sparkles size={24} className="text-white" />
      },
    ];

    const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
      })
    };

    const Promotions = () => {
      const { t } = useContext(LanguageContext);

      return (
        <section id="promotions" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">{t('promotionsTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t('promotionsDesc')}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {promotionsData.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                >
                  <Card className="bg-card border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-full flex flex-col">
                    <div className="relative h-60 w-full overflow-hidden">
                       <img  
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out" 
                        alt={t(promo.titleKey)} 
                       src={index === 0 ? "https://images.unsplash.com/photo-1567016432779-1721670bf3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" : "https://images.unsplash.com/photo-1600585152225-0c9ace968960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"} />
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-md">
                        <Tag size={14} className="mr-1.5" /> {t(promo.tagKey)}
                      </div>
                       <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <CardHeader className="pt-5 pb-3">
                      <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors">{t(promo.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pb-4">
                      <CardDescription className="text-foreground/80 text-sm leading-relaxed">
                        {t(promo.descriptionKey)}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pb-5 px-6">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full group-hover:border-primary/80" asChild>
                         <Link to="/estimate" className="group/link">
                          {t('viewDetails')} <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform"/>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Promotions;