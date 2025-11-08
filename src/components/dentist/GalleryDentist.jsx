import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import AnimatedText from './AnimatedText';

    const GalleryDentist = () => {
      const { t } = useContext(LanguageContext);

      const galleryItems = [
      { id: 1, imageText: 'Cabinet stomatologic modern și luminos', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-1.JPG' },
      { id: 2, imageText: 'Echipament dentar de ultimă generație', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-2.JPG' },
      { id: 3, imageText: 'Recepție primitoare a clinicii Raden', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-3.JPG' },
      { id: 4, imageText: 'Zâmbetul unui pacient mulțumit', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-4.JPG' },
      { id: 5, imageText: 'Detaliu unit dentar modern', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-5.JPG' },
      { id: 6, imageText: 'Copil fericit în cabinetul de pedodonție', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-6.JPG' },
      /* { id: 7, imageText: 'Spațiu confortabil în sala de tratamente', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-7.JPG' }, */
      /* { id: 8, imageText: 'Consult medical profesionist', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-8.JPG' }, */
      { id: 9, imageText: 'Cabinet dentar modern', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-9.JPG' },
      { id: 10, imageText: 'Zâmbet sănătos al pacientului', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-10.JPG' },
      { id: 11, imageText: 'Recepție clinică prietenoasă', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-11.JPG' },
      { id: 12, imageText: 'Relație de încredere între medic și pacient', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-12.JPG' },
      { id: 13, imageText: 'Echipamente de ultimă generație', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-13.JPG' },
      { id: 14, imageText: 'Sistem de sterilizare avansat', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-14.JPG' },
      { id: 15, imageText: 'Cabinet de ortodonție', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-15.JPG' },
      { id: 16, imageText: 'Tratament de albire dentară', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-16.JPG' },
      { id: 17, imageText: 'Clinică dentară modernă', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-17.JPG' },
      { id: 18, imageText: 'Interior clinică dentară', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-18.JPG' },
      { id: 19, imageText: 'Tratament stomatologic complet', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-19.JPG' },
      { id: 20, imageText: 'Dentist la lucru', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-20.JPG' },
      { id: 21, imageText: 'Zâmbetul perfect', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-21.JPG' },
      { id: 22, imageText: 'Cabinet dentar confortabil', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-22.JPG' },
      { id: 23, imageText: 'Începutul unui tratament dentar', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-23.JPG' },
      { id: 24, imageText: 'Consultatie de rutină', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-24.JPG' },
      { id: 25, imageText: 'Echipament dentar de înaltă precizie', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-25.JPG' },
      { id: 26, imageText: 'Cabinet stomatologic pentru întreaga familie', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-26.JPG' },
      { id: 27, imageText: 'Medic stomatolog cu experiență', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-27.JPG' },
      { id: 28, imageText: 'Sistem de protecție a pacienților', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-28.JPG' },
      { id: 29, imageText: 'Consult stomatologic rapid și eficient', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-29.JPG' },
      /* { id: 30, imageText: 'Un zâmbet sănătos pentru întreaga familie', altKey: 'clinicWebsiteImage', imageSrc: 'images/gallery/image-30.JPG' } */
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