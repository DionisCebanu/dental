import React from 'react';
    import { motion } from 'framer-motion';

    const AnimatedText = ({ text, className = '', el: Wrapper = 'h2' }) => {
      const words = text.split(' ');

      const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
        }),
      };

      const child = {
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
          },
        },
        hidden: {
          opacity: 0,
          y: 20,
          transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
          },
        },
      };

      return (
        <Wrapper
          className={`overflow-hidden ${className}`}
        >
           <motion.span
             variants={container}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.5 }}
           >
              {words.map((word, index) => (
                <motion.span
                  variants={child}
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
                  key={index}
                >
                  {word}
                </motion.span>
              ))}
           </motion.span>
        </Wrapper>
      );
    };

    export default AnimatedText;