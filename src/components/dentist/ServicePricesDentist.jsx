
    import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import AnimatedText from './AnimatedText';
    import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
    import { DollarSign, AlertTriangle } from 'lucide-react';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';

    const ServicePricesDentist = () => {
      const { t } = useContext(LanguageContext);

      const priceList = [
        { serviceKey: 'dentistPriceServiceConsultation', defaultService: 'Consultație Inițială & Plan Tratament', priceKey: 'dentistPriceConsultationRange', defaultPrice: '150 - 250 RON' },
        { serviceKey: 'dentistPriceServiceHygiene', defaultService: 'Pachet Igienizare Profesională', priceKey: 'dentistPriceHygieneRange', defaultPrice: '350 - 500 RON' },
        { serviceKey: 'dentistPriceServiceFilling', defaultService: 'Obturație Fotopolimerizabilă', priceKey: 'dentistPriceFillingRange', defaultPrice: '250 - 450 RON / dinte' },
        { serviceKey: 'dentistPriceServiceEndo', defaultService: 'Tratament Endodontic', priceKey: 'dentistPriceEndoRange', defaultPrice: '400 - 800 RON / canal' },
        { serviceKey: 'dentistPriceServiceCrown', defaultService: 'Coroană Ceramică E-max', priceKey: 'dentistPriceCrownRange', defaultPrice: '1200 - 1800 RON' },
        { serviceKey: 'dentistPriceServiceImplant', defaultService: 'Implant Dentar (Fază Chirurgicală)', priceKey: 'dentistPriceImplantRange', defaultPrice: '2500 - 4000 RON' },
        { serviceKey: 'dentistPriceServiceWhitening', defaultService: 'Albire Profesională', priceKey: 'dentistPriceWhiteningRange', defaultPrice: '800 - 1500 RON' },
        { serviceKey: 'dentistPriceServiceOrtho', defaultService: 'Aparat Ortodontic Fix', priceKey: 'dentistPriceOrthoRange', defaultPrice: '3000 - 6000 RON / arcadă' },
      ];

      const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
      };

      const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      };

      return (
        <motion.section 
          id="preturi-servicii" 
          className="py-16 sm:py-24 bg-muted/50"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                + {t('dentistPricesTagline', {defaultText: "Transparență"})}
              </p>
              <AnimatedText 
                text={t('dentistPricesTitle', { defaultText: "Listă de Prețuri Estimative" })} 
                el="h2"
                className="text-3xl sm:text-4xl text-foreground mb-4" 
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('dentistPricesSubtitle', { defaultText: "Oferim o gamă completă de servicii stomatologice. Prețurile de mai jos sunt orientative și pot varia în funcție de complexitatea cazului." })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {priceList.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col text-center bg-card shadow-lg hover:shadow-primary/20 hover:-translate-y-1.5 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {t(item.serviceKey, {defaultText: item.defaultService})}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center">
                      <p className="text-3xl font-bold text-primary flex items-center">
                        <FontAwesomeIcon icon={faMoneyBill} className="mr-1 opacity-70" style={{ fontSize: '28px' }} />

                        {t(item.priceKey, {defaultText: item.defaultPrice}).split(' ')[0]}
                      </p>
                    </CardContent>
                     <CardFooter className="justify-center">
                       <p className="text-xs text-muted-foreground -mt-2">
                        {t(item.priceKey, {defaultText: item.defaultPrice}).split(' ').slice(1).join(' ')}
                       </p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12 max-w-3xl mx-auto"
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.3}}
            >
              <div className="flex items-start text-sm text-muted-foreground bg-card p-6 rounded-lg shadow-md border border-border">
                <AlertTriangle size={32} className="mr-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <p>
                  <strong>{t('dentistPricesNoteLabel', { defaultText: "Notă Importantă:" })}</strong> {t('dentistPricesNoteText', { defaultText: "Prețul este cu titlu aproximativ. Prețul final se stabilește în urma consultației, în funcție de particularitățile fiecărui caz clinic și planul de tratament individualizat." })}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      );
    };

    export default ServicePricesDentist;
  