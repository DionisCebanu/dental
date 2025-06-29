import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import AnimatedText from './AnimatedText';
    import { Users, Award, MonitorSmartphone, Coins as HandCoins, Smile, Heart } from 'lucide-react';

    const WhyChooseUsDentist = () => {
      const { t } = useContext(LanguageContext);

      const reasons = [
        {
          icon: <Award size={28} className="text-primary" />,
          titleKey: 'dentistWhyChoose1Title', defaultTitle: 'Medici Experimentați',
          descriptionKey: 'dentistWhyChoose1Desc', defaultDescription: 'Echipa noastră este formată din specialiști cu vastă experiență și dedicare pentru excelență în stomatologie.'
        },
        {
          icon: <Heart size={28} className="text-primary" />,
          titleKey: 'dentistWhyChoose2Title', defaultTitle: 'Îngrijire Personalizată',
          descriptionKey: 'dentistWhyChoose2Desc', defaultDescription: 'Fiecare pacient primește un plan de tratament adaptat nevoilor și dorințelor sale specifice.'
        },
        {
          icon: <HandCoins size={28} className="text-primary" />,
          titleKey: 'dentistWhyChoose3Title', defaultTitle: 'Opțiuni Flexibile de Plată',
          descriptionKey: 'dentistWhyChoose3Desc', defaultDescription: 'Oferim soluții financiare adaptate pentru a face tratamentele accesibile tuturor pacienților noștri.'
        },
        {
          icon: <MonitorSmartphone size={28} className="text-primary" />,
          titleKey: 'dentistWhyChoose4Title', defaultTitle: 'Tehnologie de Ultimă Generație',
          descriptionKey: 'dentistWhyChoose4Desc', defaultDescription: 'Utilizăm echipamente moderne pentru diagnostic precis și tratamente eficiente și confortabile.'
        },
        {
          icon: <Smile size={28} className="text-primary" />,
          titleKey: 'dentistWhyChoose5Title', defaultTitle: 'Recenzii Pozitive de la Pacienți',
          descriptionKey: 'dentistWhyChoose5Desc', defaultDescription: 'Satisfacția pacienților noștri este cea mai bună recomandare. Ne mândrim cu feedback-ul pozitiv primit.'
        },
        {
          icon: <Users size={28} className="text-primary" />,
          titleKey: 'dentistWhyChoose6Title', defaultTitle: 'Servicii de Urgență',
          descriptionKey: 'dentistWhyChoose6Desc', defaultDescription: 'Suntem disponibili pentru urgențe dentare, oferind îngrijire promptă atunci când aveți cea mai mare nevoie.'
        }
      ];

      const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      };

      const reasonVariants = (index) => ({
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { delay: index * 0.1, type: "spring", stiffness: 100 } 
        }
      });
      
      const toothVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -15 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            transition: { delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }
        }
      };

      return (
        <section id="why-choose-us" className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                    + {t('dentistWhyChooseTagline', {defaultText: "De Ce Să Ne Alegi"})}
              </p>
              <AnimatedText 
                text={t('dentistWhyChooseTitle', { defaultText: "Diagnosticul și Tratamentul Afecțiunilor Dentare" })} 
                el="h2"
                className="text-3xl sm:text-4xl text-foreground mb-4" 
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('dentistWhyChooseSubtitle', { defaultText: "Ne angajăm să oferim îngrijire dentară prietenoasă, plină de compasiune și la cele mai înalte standarde. Clinica noastră practică inițiative ecologice." })}
              </p>
            </div>

            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
              <div className="space-y-8">
                {reasons.slice(0, 3).map((reason, index) => (
                  <motion.div 
                    key={reason.titleKey} 
                    className="flex items-start text-left"
                    custom={index}
                    variants={reasonVariants(index)}
                   >
                    <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full mr-4">{reason.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{t(reason.titleKey, reason.defaultTitle)}</h3>
                      <p className="text-sm text-muted-foreground">{t(reason.descriptionKey, reason.defaultDescription)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex justify-center items-center my-8 lg:my-0"
                variants={toothVariants}
                >
                  <img  
                    className="w-48 h-48 sm:w-64 sm:h-64 object-contain" 
                    alt={t('dentistWhyChooseToothAlt', { defaultText: "Dinte 3D curat și sănătos" })} src="https://res.cloudinary.com/dfrcw7ngp/image/upload/v1751049048/whyus_ykka85.png" />
              </motion.div>

              <div className="space-y-8">
                {reasons.slice(3, 6).map((reason, index) => (
                  <motion.div 
                    key={reason.titleKey} 
                    className="flex items-start text-left"
                    custom={index + 3}
                    variants={reasonVariants(index + 3)}
                    >
                    <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full mr-4">{reason.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{t(reason.titleKey, reason.defaultTitle)}</h3>
                      <p className="text-sm text-muted-foreground">{t(reason.descriptionKey, reason.defaultDescription)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      );
    };

    export default WhyChooseUsDentist;