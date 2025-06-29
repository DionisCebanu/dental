import React, { useContext } from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Home, Zap, ShieldCheck, ExternalLink } from 'lucide-react';

    const Hero = () => {
      const { t } = useContext(LanguageContext);

      const features = [
        { textKey: "featureQuality", defaultText: "Premium Quality Materials", icon: <ShieldCheck size={20} className="text-accent" /> },
        { textKey: "featureEnergy", defaultText: "Energy Efficient Solutions", icon: <Zap size={20} className="text-accent" /> },
        { textKey: "featureExpert", defaultText: "Expert Installation", icon: <Home size={20} className="text-accent" /> },
      ];

      return (
        <section className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20 sm:py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <img  className="w-full h-full object-cover" alt="Abstract background pattern of windows and doors" src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl text-center mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
              >
                {t('heroTitle')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                className="text-lg sm:text-xl text-slate-300 mb-10"
              >
                {t('heroSubtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness:100 }}
              >
                <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group" asChild>
                   <Link to="/estimate">
                    {t('heroCTA')}
                    <ExternalLink size={20} className="ml-2.5 group-hover:translate-x-1 transition-transform"/>
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease:"easeOut" } }
                  }}
                  className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-md hover:bg-white/20 transition-colors"
                >
                  {feature.icon}
                  <span className="ml-3 text-sm font-medium text-slate-200">{feature.defaultText}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
           <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
        </section>
      );
    };

    export default Hero;