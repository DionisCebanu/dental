import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { PartyPopper, Gift, Baby, ArrowRight } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const cardVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
      })
    };

    const OurServicesPage = () => {
      const { t } = useContext(LanguageContext);

      const services = [
        {
          id: 'weddings',
          titleKey: 'ourServicesWeddingsTitle',
          defaultTitle: 'Weddings',
          descriptionKey: 'ourServicesWeddingsDesc',
          defaultDescription: 'Celebrate your most special day in an ambiance of elegance and charm. Our team is dedicated to creating unforgettable wedding receptions with exquisite menus and impeccable service. Let us turn your dream wedding into a reality.',
          icon: <PartyPopper size={40} className="text-primary" />,
          imageText: 'Elegant wedding reception setup with flowers and lighting',
          linkTo: '/our-services/weddings'
        },
        {
          id: 'anniversaries',
          titleKey: 'ourServicesAnniversariesTitle',
          defaultTitle: 'Anniversaries',
          descriptionKey: 'ourServicesAnniversariesDesc',
          defaultDescription: 'Mark your milestones with a memorable dining experience. Whether it’s an intimate dinner or a grand celebration, we offer personalized service and delectable cuisine to make your anniversary truly special.',
          icon: <Gift size={40} className="text-accent" />,
          imageText: 'Cozy anniversary dinner setting with champagne',
          linkTo: '/our-services/anniversaries'
        },
        {
          id: 'christenings',
          titleKey: 'ourServicesChristeningsTitle',
          defaultTitle: 'Christenings (Cumătrii)',
          descriptionKey: 'ourServicesChristeningsDesc',
          defaultDescription: 'Welcome your little one with a heartwarming celebration. Our versatile spaces and family-friendly atmosphere are perfect for christenings, providing a delightful experience for all your guests with traditional and modern culinary delights.',
          icon: <Baby size={40} className="text-secondary" />,
          imageText: 'Joyful christening party table with decorations',
          linkTo: '/our-services/christenings'
        }
      ];

      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8 sm:py-16 sm:pt-32"
        >
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              {t('ourServicesMainTitle', { defaultText: "Celebrate Your Moments With Us" })}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              {t('ourServicesMainSubtitle', { defaultText: "At The Golden Spoon, we specialize in turning your special occasions into cherished memories. Explore our tailored services designed for elegance, joy, and unforgettable culinary experiences." })}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="flex"
              >
                <Card className="w-full flex flex-col bg-slate-800/70 border-slate-700 shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1.5 group">
                  <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                    <img   
                      alt={service.imageText} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1594024687935-aeb653eb0012" />
                  </div>
                  <CardHeader className="items-center text-center pt-6">
                    <div className="p-3 bg-slate-700/50 rounded-full mb-3 inline-block">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                      {t(service.titleKey, service.defaultTitle)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <CardDescription className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-4">
                      {t(service.descriptionKey, service.defaultDescription)}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="justify-center pt-4 pb-6">
                    <Button asChild variant="secondary" size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold">
                      <Link to={service.linkTo}>
                        {t('ourServicesLearnMoreButton', { defaultText: "Learn More" })} <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default OurServicesPage;