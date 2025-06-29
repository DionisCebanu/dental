import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { ShieldCheck, Users, HeartHandshake, Microscope, Clock } from 'lucide-react';
    import AnimatedText from './AnimatedText';

    const AboutClinic = () => {
      const { t } = useContext(LanguageContext);

      const features = [
        {
          icon: <ShieldCheck size={24} className="text-primary" />,
          titleKey: 'dentistAboutFeature1Title',
          defaultTitle: 'Tehnologie Modernă și Siguranță',
          descriptionKey: 'dentistAboutFeature1Desc',
          defaultDescription: 'Folosim echipamente de ultimă generație și respectăm cele mai înalte standarde de sterilizare pentru siguranța dumneavoastră.'
        },
        {
          icon: <Users size={24} className="text-primary" />,
          titleKey: 'dentistAboutFeature2Title',
          defaultTitle: 'Echipă Experimentată și Empatică',
          descriptionKey: 'dentistAboutFeature2Desc',
          defaultDescription: 'Medicii noștri sunt dedicați excelenței și oferă o abordare caldă și prietenoasă fiecărui pacient.'
        },
        {
          icon: <HeartHandshake size={24} className="text-primary" />,
          titleKey: 'dentistAboutFeature3Title',
          defaultTitle: 'Abordare Centrată pe Pacient',
          descriptionKey: 'dentistAboutFeature3Desc',
          defaultDescription: 'Planurile de tratament sunt personalizate, discutate în detaliu și adaptate nevoilor și dorințelor dumneavoastră.'
        },
        {
          icon: <Microscope size={24} className="text-primary" />,
          titleKey: 'dentistAboutFeature4Title',
          defaultTitle: 'Diagnostic Precis',
          descriptionKey: 'dentistAboutFeature4Desc',
          defaultDescription: 'Investigații amănunțite și tehnologie avansată pentru un diagnostic corect și complet.'
        },
        {
          icon: <Clock size={24} className="text-primary" />,
          titleKey: 'dentistAboutFeature5Title',
          defaultTitle: 'Flexibilitate și Accesibilitate',
          descriptionKey: 'dentistAboutFeature5Desc',
          defaultDescription: 'Program flexibil, locație accesibilă și opțiuni de plată variate pentru confortul dumneavoastră.'
        }
      ];

      return (
        <section id="despre-clinica" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative order-2 md:order-1"
              >
                <p className="text-primary font-semibold mb-2 uppercase tracking-wider">{t('dentistAboutSectionLabel', { defaultText: 'Despre RaDen' })}</p>
                <AnimatedText 
                  text={t('dentistAboutTitle', { defaultText: "Călătoria Spre un Zâmbet Sănătos și Strălucitor Începe Aici" })}
                  el="h2"
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-6" 
                />
                <p className="text-lg text-muted-foreground mb-6">
                  {t('dentistAboutSubtitle', { defaultText: "La RaDen, misiunea noastră este să oferim servicii stomatologice de excepție, combinând expertiza medicală cu tehnologia avansată și o abordare profund umană. Ne dedicăm sănătății și frumuseții zâmbetului dumneavoastră, într-un mediu sigur, modern și primitor." })}
                </p>
                 <p className="text-muted-foreground mb-8">
                  {t('dentistAboutSubtitle2', { defaultText: "Fiecare membru al echipei noastre împărtășește pasiunea pentru stomatologie și angajamentul față de bunăstarea pacienților. Vă invităm să descoperiți o experiență dentară diferită, unde confortul și încrederea dumneavoastră sunt prioritare." })}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="relative order-1 md:order-2"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/4 w-24 h-24 bg-secondary/10 rounded-lg transform rotate-12 animate-blob animation-delay-4000"></div>
                 <img   
                  className="rounded-lg shadow-xl w-full h-auto object-cover relative z-10" 
                  alt={t('dentistAboutImageAlt', { defaultText: "Interior modern al clinicii stomatologice RaDen cu echipamente de ultimă generație" })} src="https://images.unsplash.com/photo-1629909615957-be38d48fbbe6" />
              </motion.div>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 bg-card rounded-lg shadow-lg flex items-start space-x-4"
                    >
                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{t(feature.titleKey, feature.defaultTitle)}</h3>
                            <p className="text-sm text-muted-foreground">{t(feature.descriptionKey, feature.defaultDescription)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

          </div>
        </section>
      );
    };

    export default AboutClinic;