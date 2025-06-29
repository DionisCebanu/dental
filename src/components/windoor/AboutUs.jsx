import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Building, Users, Award } from 'lucide-react';

    const AboutUs = () => {
      const { t } = useContext(LanguageContext);

      const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
      };

      return (
        <section id="about-us" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <Building size={48} className="mx-auto text-primary mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">{t('aboutUsTitle')}</h2>
              <p className="text-lg text-muted-foreground font-medium">{t('aboutUsSubtitle')}</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={contentVariants}
              >
                 <img  
                  className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video" 
                  alt="Team of window and door installers working on a house"
                 src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 }}}}
              >
                <motion.p 
                  variants={contentVariants}
                  className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6"
                >
                  {t('aboutUsDescription')}
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={contentVariants} className="flex items-center p-4 bg-card rounded-lg shadow">
                    <Users size={24} className="text-accent mr-3" />
                    <span className="font-medium text-foreground">Certified Professionals</span>
                  </motion.div>
                  <motion.div variants={contentVariants} className="flex items-center p-4 bg-card rounded-lg shadow">
                    <Award size={24} className="text-accent mr-3" />
                    <span className="font-medium text-foreground">15+ Years Experience</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default AboutUs;