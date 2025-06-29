import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import Hero from '@/components/windoor/Hero';
    import AboutUs from '@/components/windoor/AboutUs';
    import WhyUs from '@/components/windoor/WhyUs';
    import Promotions from '@/components/windoor/Promotions';
    import Contact from '@/components/windoor/Contact';
    import { Calculator } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
      out: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
    };
    
    const sectionVariants = {
      initial: { opacity: 0, y: 50 },
      in: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, 0.01, -0.05, 0.95] } }
    };


    const WinDoorLandingPage = () => {
      return (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <motion.section 
            variants={sectionVariants} 
            initial="initial" 
            whileInView="in" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <Hero />
          </motion.section>
          <motion.section 
            variants={sectionVariants} 
            initial="initial" 
            whileInView="in" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <AboutUs />
          </motion.section>
          <motion.section 
            variants={sectionVariants} 
            initial="initial" 
            whileInView="in" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <WhyUs />
          </motion.section>
          <motion.section 
            variants={sectionVariants} 
            initial="initial" 
            whileInView="in" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <Promotions />
          </motion.section>
          
          <motion.section 
            variants={sectionVariants} 
            initial="initial" 
            whileInView="in" 
            viewport={{ once: true, amount: 0.1 }}
            className="py-16 sm:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Upgrade Your Home?</h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Get a personalized estimate for your window and door installation project today. It's fast, free, and no obligation!
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link to="/estimate">
                  <Calculator size={20} className="mr-2.5" /> Estimate Your Order
                </Link>
              </Button>
            </div>
          </motion.section>
          
          <motion.section 
            variants={sectionVariants} 
            initial="initial" 
            whileInView="in" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <Contact />
          </motion.section>
        </motion.div>
      );
    };

    export default WinDoorLandingPage;