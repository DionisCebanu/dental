import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Users, Award, BookOpen, Coffee, ChefHat, Smile } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const pageVariants = {
      initial: { opacity: 0, filter: "blur(5px)" },
      in: { opacity: 1, filter: "blur(0px)" },
      out: { opacity: 0, filter: "blur(5px)" }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.8
    };

    const sectionVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } }
    };

    const itemVariants = {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "circOut" } }
    };
    
    const teamMemberVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: { delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 100 }
        })
    };

    const teamMembers = [
      { nameKey: 'aboutTeamMember1Name', roleKey: 'aboutTeamMember1Role', icon: <ChefHat size={36} className="text-primary" />, imageText: "Executive Chef Isabella Rossi" },
      { nameKey: 'aboutTeamMember2Name', roleKey: 'aboutTeamMember2Role', icon: <Smile size={36} className="text-primary" />, imageText: "General Manager Jean-Luc Moreau" },
      { nameKey: 'aboutTeamMember3Name', roleKey: 'aboutTeamMember3Role', icon: <Coffee size={36} className="text-primary" />, imageText: "Pastry Chef Sofia Chen" }
    ];

    const AboutPage = () => {
      const { t } = useContext(LanguageContext);

      return (
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 sm:py-32 sm:pt-40"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <motion.div className="text-center mb-16 sm:mb-20">
            <motion.h1 
              className="text-5xl sm:text-7xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-secondary"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "circOut" }}
            >
              {t('aboutPageTitle')}
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl text-gray-400 font-serif italic"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            >
              {t('aboutPageSubtitle')}
            </motion.p>
          </motion.div>

          <motion.section 
            className="mb-16 sm:mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
              <div className="flex items-center mb-4">
                <BookOpen size={32} className="mr-3 text-accent" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary !mb-0">{t('aboutSection1Title')}</h2>
              </div>
              <p>{t('aboutSection1Content')}</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <img  
                className="rounded-xl shadow-2xl shadow-primary/20 object-cover w-full h-80 md:h-96 transform hover:scale-105 transition-transform duration-500" 
                alt="Restaurant ambiance"
               src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" />
            </motion.div>
          </motion.section>

          <motion.section 
            className="mb-16 sm:mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="md:order-2 prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
              <div className="flex items-center mb-4">
                <Award size={32} className="mr-3 text-accent" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary !mb-0">{t('aboutSection2Title')}</h2>
              </div>
              <p>{t('aboutSection2Content')}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="md:order-1">
              <img  
                className="rounded-xl shadow-2xl shadow-accent/20 object-cover w-full h-80 md:h-96 transform hover:scale-105 transition-transform duration-500" 
                alt="Fresh ingredients"
               src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" />
            </motion.div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Users size={36} className="mr-3 text-accent" />
                <h2 className="text-4xl sm:text-5xl font-bold text-primary">{t('aboutSection3Title')}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.nameKey} 
                  custom={index}
                  variants={teamMemberVariants}
                  className="bg-slate-800/70 p-8 rounded-xl shadow-xl border border-slate-700 text-center hover:shadow-primary/30 transition-shadow duration-300"
                >
                  <div className="mb-5 inline-block p-4 bg-primary/10 rounded-full">
                    {member.icon}
                  </div>
                  <img  
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-5 border-4 border-accent shadow-lg" 
                    alt={t(member.nameKey)}
                   src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=60" />
                  <h3 className="text-2xl font-semibold text-accent mb-1">{t(member.nameKey)}</h3>
                  <p className="text-primary font-medium">{t(member.roleKey)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      );
    };

    export default AboutPage;