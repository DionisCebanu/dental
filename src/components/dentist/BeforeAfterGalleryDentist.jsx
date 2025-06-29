import React, { useContext, useState } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import AnimatedText from './AnimatedText';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, Maximize2 } from 'lucide-react';
    import CaseDetailModal from './CaseDetailModal';

    const BeforeAfterGalleryDentist = () => {
      const { t } = useContext(LanguageContext);
      const [selectedCase, setSelectedCase] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const cases = [
        {
          id: 1,
          titleKey: 'dentistCase1Title', defaultTitle: 'Reabilitare Orală Complexă',
          descriptionKey: 'dentistCase1Desc', defaultDescription: 'Pacientul prezenta multiple probleme dentare, inclusiv dinți lipsă, carii extinse și ocluzie incorectă. Tratamentul a inclus implanturi dentare, coroane ceramice și ajustări ocluzale pentru a restabili funcționalitatea și estetica zâmbetului.',
          beforeImageText: 'Close-up of damaged teeth before complex oral rehabilitation',
          afterImageText: 'Restored smile after complex oral rehabilitation with implants and crowns',
          beforeImageSrc: "/images/cases/case_1_before.png",
          afterImageSrc: "/images/cases/case_1_after.png",
          testimonialKey: 'dentistCase1Testimonial', defaultTestimonial: 'Sunt extrem de mulțumit de rezultat! Echipa Raden mi-a redat încrederea în zâmbetul meu. Profesionalism și atenție la detalii la superlativ.'
        },
        {
          id: 2,
          titleKey: 'dentistCase2Title', defaultTitle: 'Tratament Ortodontic Adult',
          descriptionKey: 'dentistCase2Desc', defaultDescription: 'Pacienta adultă dorea alinierea dinților și corectarea mușcăturii. S-a optat pentru un aparat dentar fix estetic. Tratamentul a durat 18 luni și a rezultat într-un zâmbet armonios și funcțional.',
          beforeImageText: 'Crowded and misaligned teeth before adult orthodontic treatment',
          afterImageText: 'Perfectly aligned smile after adult orthodontic treatment with braces',
          beforeImageSrc: "/images/cases/case_2_before.png",
          afterImageSrc: "/images/cases/case_2_after.png",
          testimonialKey: 'dentistCase2Testimonial', defaultTestimonial: 'Nu credeam că la vârsta mea mai pot avea un zâmbet perfect. Mulțumesc echipei pentru răbdare și pentru rezultatul minunat!'
        },
        {
          id: 3,
          titleKey: 'dentistCase3Title', defaultTitle: 'Fațete Dentare Estetice',
          descriptionKey: 'dentistCase3Desc', defaultDescription: 'Pacientul era nemulțumit de forma și culoarea dinților frontali. S-au aplicat fațete ceramice E-max pentru a obține un zâmbet natural, strălucitor și uniform. Procedura a fost minim invazivă.',
          beforeImageText: 'Stained and uneven frontal teeth before aesthetic dental veneers',
          afterImageText: 'Bright and uniform smile after E-max ceramic dental veneers',
          beforeImageSrc: "/images/cases/case_3_before.png",
          afterImageSrc: "/images/cases/case_3_after.png",
          testimonialKey: 'dentistCase3Testimonial', defaultTestimonial: 'Fațetele arată incredibil de natural! Zâmbetul meu este transformat. Recomand cu căldură Raden pentru servicii de estetică dentară.'
        }
      ];

      const openModal = (caseItem) => {
        setSelectedCase(caseItem);
        setIsModalOpen(true);
      };

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      };

      return (
        <>
          <section id="before-after-gallery" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                    + {t('dentistBeforeAfterTagline', {defaultText: "Rezultate Reale"})}
                </p>
                <AnimatedText 
                  text={t('dentistBeforeAfterTitle', { defaultText: "Transformări Care Vorbesc De La Sine" })} 
                  el="h2"
                  className="text-3xl sm:text-4xl text-foreground mb-4" 
                />
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('dentistBeforeAfterSubtitle', { defaultText: "Descoperiți impactul pe care tratamentele noastre îl pot avea asupra zâmbetului și încrederii dumneavoastră. Fiecare transformare este o poveste de succes." })}
                </p>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {cases.map((caseItem) => (
                  <motion.div key={caseItem.id} variants={itemVariants}>
                    <Card className="overflow-hidden shadow-xl hover:shadow-2xl dark:hover:shadow-primary/20 transition-shadow duration-300 group bg-card flex flex-col h-full">
                      <CardContent className="p-0 flex-grow flex flex-col">
                        <div className="grid grid-cols-2">
                          <div className="relative aspect-square">
                            <img   
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                              alt={t('dentistBeforeImageLabel', { defaultText: "Before" }) + ": " + t(caseItem.titleKey, caseItem.defaultTitle)} src={caseItem.beforeImageSrc} />
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                              {t('dentistBeforeImageLabel', { defaultText: "Înainte" })}
                            </div>
                          </div>
                          <div className="relative aspect-square">
                             <img   
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                              alt={t('dentistAfterImageLabel', { defaultText: "After" }) + ": " + t(caseItem.titleKey, caseItem.defaultTitle)} src={caseItem.afterImageSrc} />
                             <div className="absolute top-2 left-2 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded backdrop-blur-sm">
                              {t('dentistAfterImageLabel', { defaultText: "După" })}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold text-foreground mb-1 flex-grow">
                            {t(caseItem.titleKey, caseItem.defaultTitle)}
                          </h3>
                           <Button 
                            variant="ghost" 
                            onClick={() => openModal(caseItem)} 
                            className="mt-2 text-sm text-primary hover:text-primary/80 justify-start p-0 h-auto"
                           >
                            {t('dentistCaseViewDetails', { defaultText: "Vezi detalii caz" })} <Maximize2 size={14} className="ml-1.5"/>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
          {selectedCase && (
            <CaseDetailModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              caseDetails={selectedCase}
            />
          )}
        </>
      );
    };

    export default BeforeAfterGalleryDentist;