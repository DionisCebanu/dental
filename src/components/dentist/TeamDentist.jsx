import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import AnimatedText from './AnimatedText';

    const TeamDentist = () => {
      const { t } = useContext(LanguageContext);

      const teamMembers = [
        {
          nameKey: 'dentistTeamMember1Name', defaultName: 'Dr. Marcela Popescu',
          specialtyKey: 'dentistTeamMember1Specialty', defaultSpecialty: 'Medic Stomatolog Generalist, Specialist Ortodonție',
          imageText: 'Dr. Elena Popescu, medic ortodont zambind',
          imageSrc: '/images/team/marcela.png',
        },
        {
          nameKey: 'dentistTeamMember2Name', defaultName: 'Dr. Andrei Ionescu',
          specialtyKey: 'dentistTeamMember2Specialty', defaultSpecialty: 'Medic Stomatolog, Specialist Implantologie',
          imageText: 'Dr. Andrei Ionescu, specialist implantologie dentara',
          imageSrc: '/images/team/andrei.png',
        },
        {
          nameKey: 'dentistTeamMember3Name', defaultName: 'Dr. Maria Vasilescu',
          specialtyKey: 'dentistTeamMember3Specialty', defaultSpecialty: 'Medic Stomatolog Pedodont',
          imageText: 'Dr. Maria Vasilescu, medic stomatolog pediatru',
          imageSrc: '/images/team/maria.png',
        }
      ];
      
      const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (i) => ({
          opacity: 1,
          scale: 1,
          transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
        })
      };

      return (
        <section id="echipa" className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <AnimatedText 
                text={t('dentistTeamTitle', { defaultText: "Echipa Noastră de Specialiști" })} 
                el="h2"
                className="text-3xl sm:text-4xl text-foreground mb-4" 
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('dentistTeamSubtitle', { defaultText: "Medici stomatologi pasionați și experimentați, gata să vă ofere cele mai bune îngrijiri dentare." })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.custom
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  elementType={Card}
                  component={Card}
                >
                  <Card className="w-full bg-card shadow-lg hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col text-center overflow-hidden">
                    <div className="h-64 w-full">
                       <img  
                        className="w-full h-full object-cover object-top" 
                        alt={t(member.nameKey, member.defaultName) + " - " + t(member.specialtyKey, member.defaultSpecialty)} src={member.imageSrc} />
                    </div>
                    <CardHeader className="pt-6">
                      <CardTitle className="text-xl font-bold text-foreground">
                        {t(member.nameKey, member.defaultName)}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium text-sm">
                        {t(member.specialtyKey, member.defaultSpecialty)}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.custom>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default TeamDentist;