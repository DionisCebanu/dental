import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { ChefHat, CalendarDays, Truck } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const sectionVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, scale: 0.8, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "circOut" }}
    };

    const Services = ({ title }) => {
      const { t } = useContext(LanguageContext);

      const servicesData = [
        { 
          icon: <ChefHat size={48} className="text-primary" />, 
          titleKey: 'serviceFineDiningTitle',
          descriptionKey: 'serviceFineDiningDesc',
          defaultTitle: 'Fine Dining',
          defaultDescription: 'Exquisite dishes prepared by world-class chefs.'
        },
        { 
          icon: <CalendarDays size={48} className="text-primary" />, 
          titleKey: 'servicePrivateEventsTitle',
          descriptionKey: 'servicePrivateEventsDesc',
          defaultTitle: 'Private Events',
          defaultDescription: 'Host your special occasions in our elegant spaces.'
        },
        { 
          icon: <Truck size={48} className="text-primary" />, 
          titleKey: 'serviceCateringTitle',
          descriptionKey: 'serviceCateringDesc',
          defaultTitle: 'Gourmet Catering',
          defaultDescription: 'Bring The Golden Spoon experience to your location.'
        },
      ];

      return (
        <motion.section 
          className="py-16 sm:py-24 bg-slate-900/50"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full text-center bg-slate-800/70 border-slate-700 shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader>
                      <div className="mx-auto mb-5 inline-block p-4 bg-primary/10 rounded-full">
                        {service.icon}
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-accent">
                        {t(service.titleKey, service.defaultTitle)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 text-base leading-relaxed">
                        {t(service.descriptionKey, service.defaultDescription)}
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

    export default Services;