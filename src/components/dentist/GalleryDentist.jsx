import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import AnimatedText from './AnimatedText';

    const GalleryDentist = () => {
      const { t } = useContext(LanguageContext);

      const galleryItems = [
        { id: 1, imageText: 'Cabinet stomatologic modern și luminos', altKey: 'dentistGalleryAlt1', imageSrc: '/images/gallery/clinic_interior.jpg' },
        { id: 2, imageText: 'Echipament dentar de ultimă generație', altKey: 'dentistGalleryAlt2', imageSrc: '/images/gallery/clinic_salon.jpg' },
        { id: 3, imageText: 'Recepție primitoare a clinicii Raden', altKey: 'dentistGalleryAlt3', imageSrc: '/images/gallery/clinic_table.jpg' },
        { id: 4, imageText: 'Zâmbetul unui pacient mulțumit', altKey: 'dentistGalleryAlt4', imageSrc: '/images/gallery/clinic_salon.jpg' },
        { id: 5, imageText: 'Detaliu unit dentar modern', altKey: 'dentistGalleryAlt5', imageSrc: '/images/gallery/clinic_table.jpg' },
        { id: 6, imageText: 'Copil fericit în cabinetul de pedodonție', altKey: 'dentistGalleryAlt6', imageSrc: '/images/gallery/clinic_interior.jpg' }
      ];

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
      };

      const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      };

      return (
        <section id="galerie" className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedText 
                text={t('dentistGalleryTitle', { defaultText: "Galerie Foto" })} 
                el="h2"
                className="text-3xl sm:text-4xl text-foreground mb-4" 
              />
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {t('dentistGallerySubtitle', { defaultText: "Descoperiți mediul modern și prietenos al clinicii noastre." })}
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="overflow-hidden rounded-lg shadow-lg group aspect-w-1 aspect-h-1"
                >
                  <img  
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                    alt={t(item.altKey, item.imageText)} src={item.imageSrc}/>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default GalleryDentist;