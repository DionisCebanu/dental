import React, { useEffect, useRef } from 'react';
    import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Users, Droplet, Smile, Award } from 'lucide-react';

    const AnimatedNumber = ({ value }) => {
      const ref = useRef(null);
      const motionValue = useMotionValue(0);
      const springValue = useSpring(motionValue, { duration: 3000, damping: 50, stiffness: 100 });
      const isInView = useInView(ref, { once: true, margin: "-100px" });

      useEffect(() => {
        if (isInView) {
          motionValue.set(value);
        }
      }, [motionValue, isInView, value]);

      useEffect(() => 
        springValue.on("change", (latest) => {
          if (ref.current) {
            ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0));
          }
        }),
        [springValue]
      );
      
      return <span ref={ref} />;
    };

    const StatCard = ({ icon, value, suffix, label }) => (
      <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-lg">
        <div className="mb-3 text-primary">{icon}</div>
        <p className="text-4xl font-extrabold text-foreground">
          <AnimatedNumber value={value} />
          {suffix}
        </p>
        <p className="text-sm font-medium text-muted-foreground mt-1">{label}</p>
      </div>
    );

    const StatsDentist = () => {
      const { t } = React.useContext(LanguageContext);

      const stats = [
        {
          icon: <Users size={36} />,
          value: 2200,
          suffix: '+',
          label: t('dentistStatHappyPatients', { defaultText: "Pacienți Fericiți" }),
        },
        {
          icon: <Award size={36} />,
          value: 15,
          suffix: '+',
          label: t('dentistStatYearsExperience', { defaultText: "Ani de Experiență" }),
        },
        {
          icon: <Smile size={36} />,
          value: 3000,
          suffix: '+',
          label: t('dentistStatSuccessfulProcedures', { defaultText: "Proceduri Reușite" }),
        },
        {
          icon: <Droplet size={36} />,
          value: 500,
          suffix: '+',
          label: t('dentistStatPositiveReviews', { defaultText: "Recenzii Pozitive" }),
        },
      ];

      return (
        <section className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default StatsDentist;