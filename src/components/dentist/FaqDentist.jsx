import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
    import AnimatedText from './AnimatedText';
    import { HelpCircle, CalendarClock, ShieldQuestion, SmilePlus } from 'lucide-react';

    const FaqDentist = () => {
      const { t } = useContext(LanguageContext);

      const faqItems = [
        {
          id: 'faq1',
          icon: <CalendarClock className="text-primary mr-3" size={24}/>,
          questionKey: 'dentistFaq1Question', defaultQuestion: 'Cum mă programez pentru o consultație?',
          answerKey: 'dentistFaq1Answer', defaultAnswer: 'Programările se pot face telefonic la numărul afișat pe site, prin formularul de contact online sau direct la recepția clinicii. Vă recomandăm să ne contactați pentru a stabili împreună cea mai potrivită dată și oră.'
        },
        {
          id: 'faq2',
          icon: <HelpCircle className="text-primary mr-3" size={24}/>,
          questionKey: 'dentistFaq2Question', defaultQuestion: 'Ce trebuie să aduc la prima vizită?',
          answerKey: 'dentistFaq2Answer', defaultAnswer: 'La prima vizită, vă rugăm să aduceți cartea de identitate și, dacă aveți, orice documente medicale relevante (radiografii anterioare, istoric medical). Cel mai important este să veniți cu o listă a întrebărilor sau preocupărilor dumneavoastră legate de sănătatea orală.'
        },
        {
          id: 'faq3',
          icon: <ShieldQuestion className="text-primary mr-3" size={24}/>,
          questionKey: 'dentistFaq3Question', defaultQuestion: 'Tratamentele sunt dureroase?',
          answerKey: 'dentistFaq3Answer', defaultAnswer: 'Ne angajăm să oferim tratamente cât mai confortabile și nedureroase. Folosim tehnici moderne de anestezie și suntem atenți la confortul dumneavoastră pe parcursul fiecărei proceduri. Comunicarea deschisă cu medicul stomatolog este esențială pentru a gestiona orice anxietate.'
        },
        {
          id: 'faq4',
          icon: <SmilePlus className="text-primary mr-3" size={24}/>,
          questionKey: 'dentistFaq4Question', defaultQuestion: 'Ce opțiuni de plată acceptați?',
          answerKey: 'dentistFaq4Answer', defaultAnswer: 'Acceptăm plata numerar, cu cardul bancar (Visa, Mastercard) și, pentru anumite tratamente, oferim și posibilitatea de plată în rate. Vă rugăm să discutați cu personalul nostru despre opțiunile de finanțare disponibile.'
        }
      ];

      return (
        <section id="faq" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                 <img   
                  className="rounded-lg shadow-xl w-full h-auto object-cover" 
                  alt={t('dentistFaqImageAlt', { defaultText: "Pacientă discutând cu medicul stomatolog" })} src="/images/questions/questions.png"  />
              </motion.div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                    + {t('dentistFaqTagline', {defaultText: "Cum funcționează"})}
                </p>
                <AnimatedText 
                  text={t('dentistFaqTitle', { defaultText: "Întrebări Frecvente" })} 
                  el="h2"
                  className="text-3xl sm:text-4xl text-foreground mb-4" 
                />
                <p className="text-lg text-muted-foreground mb-8">
                  {t('dentistFaqSubtitle', { defaultText: "Găsiți răspunsuri la cele mai comune întrebări despre serviciile și procedurile noastre. Suntem aici pentru a vă clarifica orice nelămurire."})}
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b-border/50">
                      <AccordionTrigger className="text-base sm:text-lg font-medium text-foreground hover:no-underline py-4 text-left">
                        <span className="flex items-center">{item.icon} {t(item.questionKey, item.defaultQuestion)}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-4 pl-10">
                        {t(item.answerKey, item.defaultAnswer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      );
    };

    export default FaqDentist;