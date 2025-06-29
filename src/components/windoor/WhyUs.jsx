import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
    import { ShieldCheck, Zap, Users, Award } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const cardVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: i * 0.15,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    };

    const WhyUs = () => {
      const { t } = useContext(LanguageContext);

      const whyUsData = [
        {
          icon: <ShieldCheck size={36} className="text-primary" />,
          titleKey: 'whyUsQualityTitle',
          descriptionKey: 'whyUsQualityDesc',
        },
        {
          icon: <Users size={36} className="text-primary" />,
          titleKey: 'whyUsExpertiseTitle',
          descriptionKey: 'whyUsExpertiseDesc',
        },
        {
          icon: <Zap size={36} className="text-primary" />,
          titleKey: 'whyUsEnergyTitle',
          descriptionKey: 'whyUsEnergyDesc',
        },
        {
          icon: <Award size={36} className="text-primary" />,
          titleKey: 'whyUsWarrantyTitle',
          descriptionKey: 'whyUsWarrantyDesc',
        },
      ];

      return (
        <section id="why-us" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">{t('whyUsTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">We are dedicated to providing the best value and service for your home.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {whyUsData.map((item, index) => (
                <motion.div
                  key={item.titleKey}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="h-full"
                >
                  <Card className="h-full bg-card border-border/50 hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center p-6">
                    <div className="p-4 bg-primary/10 rounded-full mb-5 inline-block ring-4 ring-primary/5">
                      {item.icon}
                    </div>
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-xl font-semibold text-primary">{t(item.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                      <CardDescription className="text-foreground/80 text-sm leading-relaxed">{t(item.descriptionKey)}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default WhyUs;