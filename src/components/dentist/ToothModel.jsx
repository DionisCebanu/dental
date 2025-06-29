import React, { useRef } from 'react';
    import { motion } from 'framer-motion';
    import { Sparkles } from 'lucide-react'; // Using Sparkles as a placeholder for a tooth icon

    const ToothModel = ({ delay = 0 }) => {
      const constraintsRef = useRef(null);

      // Randomize initial position and movement pattern for each tooth
      const randomX = Math.random() * 100 - 50; // -50 to 50
      const randomY = Math.random() * 100 - 50; // -50 to 50
      const randomDuration = Math.random() * 5 + 8; // 8s to 13s
      const randomAngle = Math.random() * 360;
      
      const size = Math.random() * 20 + 20; // Size between 20px and 40px

      return (
        <motion.div
          ref={constraintsRef}
          className="absolute"
          style={{ 
            x: randomX, 
            y: randomY,
            // Simulating a 3D effect with perspective and rotation
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.7, 0.7, 0], scale: 1 }}
          transition={{ 
            delay, 
            duration: randomDuration / 2, // Fade in and out within the movement cycle
            repeat: Infinity, 
            repeatDelay: randomDuration / 2,
            ease: "linear"
          }}
        >
          <motion.div
            animate={{
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
              rotateX: [0, randomAngle, 0, -randomAngle, 0],
              rotateY: [0, -randomAngle, 0, randomAngle, 0],
              rotateZ: [0, randomAngle / 2, 0, -randomAngle / 2, 0],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay
            }}
          >
            <Sparkles // Placeholder for a 3D tooth. Use an actual 3D model or SVG for better effect
                size={size} 
                className="text-primary/70" 
                style={{
                    filter: `drop-shadow(0 0 ${size/5}px hsl(var(--primary)/0.5))`,
                }}
            />
          </motion.div>
        </motion.div>
      );
    };

    export default ToothModel;