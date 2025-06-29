import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Stethoscope, ShieldPlus, Smile, HeartPulse, Bone, Sparkles as SparklesIcon } from 'lucide-react';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
    import AnimatedText from './AnimatedText';


    const ServicesDentist = () => {
      const { t } = useContext(LanguageContext);

      const services = [
        {
          icon: <Stethoscope size={36} className="text-primary" />,
          titleKey: 'dentistService1Title', defaultTitle: 'Consultații & Diagnostic',
          descriptionKey: 'dentistService1Desc', defaultDescription: 'Evaluare completă a sănătății orale, planuri de tratament personalizate și radiografii digitale.'
        },
        {
          icon: <ShieldPlus size={36} className="text-primary" />,
          titleKey: 'dentistService2Title', defaultTitle: 'Profilaxie Dentară',
          descriptionKey: 'dentistService2Desc', defaultDescription: 'Detartraj profesional, periaj, airflow, fluorizări și sigilări pentru prevenirea afecțiunilor dentare.'
        },
        {
          icon: <HeartPulse size={36} className="text-primary" />,
          titleKey: 'dentistService3Title', defaultTitle: 'Tratamente Odontale',
          descriptionKey: 'dentistService3Desc', defaultDescription: 'Obturații fizionomice (plombe), tratamente de canal moderne și nedureroase, extracții dentare.'
        },
        {
          icon: <Smile size={36} className="text-primary" />,
          titleKey: 'dentistService4Title', defaultTitle: 'Ortodonție',
          descriptionKey: 'dentistService4Desc', defaultDescription: 'Aparate dentare fixe și mobile pentru copii și adulți, alinierea dinților și corectarea mușcăturii.'
        },
        {
          icon: <Bone size={36} className="text-primary" />,
          titleKey: 'dentistService5Title', defaultTitle: 'Implantologie Orală',
          descriptionKey: 'dentistService5Desc', defaultDescription: 'Soluții moderne de înlocuire a dinților lipsă cu implanturi dentare de înaltă calitate.'
        },
        {
          icon: <SparklesIcon size={36} className="text-primary" />,
          titleKey: 'dentistService6Title', defaultTitle: 'Estetică Dentară',
          descriptionKey: 'dentistService6Desc', defaultDescription: 'Albire profesională, fațete dentare, coroane integral ceramice pentru un zâmbet strălucitor.'
        }
      ];

      const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
        })
      };

      return (
        <section id="servicii" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedText 
                text={t('dentistServicesTitle', { defaultText: "Serviciile Noastre" })} 
                el="h2"
                className="text-3xl sm:text-4xl text-foreground mb-4" 
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('dentistServicesSubtitle', { defaultText: "Oferim o gamă largă de tratamente stomatologice pentru a satisface nevoile fiecărui pacient, de la proceduri de rutină la intervenții complexe." })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.custom
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="flex"
                  elementType={Card} 
                  component={Card}
                >
                <Card className="w-full bg-card shadow-lg hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                    <CardHeader className="items-start">
                      <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {t(service.titleKey, service.defaultTitle)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(service.descriptionKey, service.defaultDescription)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.custom>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default ServicesDentist;