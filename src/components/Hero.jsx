import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { ArrowRight } from 'lucide-react';

    const Hero = ({ title, subtitle, buttonText, buttonLink }) => {
      const heroVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.8, ease: "easeInOut", staggerChildren: 0.3 }
        }
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "circOut" }}
      };

      return (
        <motion.section 
          className="relative h-[calc(100vh-5rem)] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 z-0">
            <img  
              className="w-full h-full object-cover opacity-40" 
              alt="Elegant restaurant interior"
             src="https://images.unsplash.com/photo-1552566626-52f8b828add9" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-background"></div>
          </div>
          
          <motion.div className="relative z-10 p-6 max-w-3xl mx-auto" variants={itemVariants}>
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight font-display shadow-text-hard"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 font-serif italic shadow-text-soft"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg font-semibold text-primary-foreground py-3 px-8 rounded-lg shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105"
              >
                <Link to={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      );
    };

    export default Hero;