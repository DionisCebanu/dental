import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Baby, Cake, Users, MessageSquare, Image as ImageIcon, ArrowRight } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const sectionVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const ChristeningsPage = () => {
      const { t } = useContext(LanguageContext);

      const galleryImages = [
        { id: 1, altKey: 'christeningsPageGalleryAlt1', defaultAlt: 'Beautifully decorated christening venue', description: 'Elegant hall setup for a christening' },
        { id: 2, altKey: 'christeningsPageGalleryAlt2', defaultAlt: 'Christening cake and dessert table', description: 'Adorable christening cake and sweets' },
        { id: 3, altKey: 'christeningsPageGalleryAlt3', defaultAlt: 'Family celebrating a christening', description: 'Happy family at a christening celebration' },
        { id: 4, altKey: 'christeningsPageGalleryAlt4', defaultAlt: 'Kids enjoying christening party', description: 'Children having fun at a christening event' },
      ];

      const testimonials = [
        { id: 1, quoteKey: 'christeningsPageTestimonial1Quote', defaultQuote: "The Golden Spoon hosted our son's christening, and it was wonderful. The space was perfect for families, and the food was loved by all ages!", nameKey: 'christeningsPageTestimonial1Name', defaultName: "Maria & Alex P." },
        { id: 2, quoteKey: 'christeningsPageTestimonial2Quote', defaultQuote: "We couldn't have asked for a better place for our daughter's cumătrie. The staff were so accommodating and helpful. Everything was perfect.", nameKey: 'christeningsPageTestimonial2Name', defaultName: "Elena & Andrei V." },
      ];

      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8 sm:py-16 sm:pt-32"
        >
          {/* Hero Section */}
          <motion.section 
            variants={sectionVariants}
            className="relative rounded-xl overflow-hidden text-center py-20 sm:py-32 bg-gradient-to-br from-secondary/30 via-slate-800 to-blue-500/30 mb-16"
          >
            <div className="absolute inset-0">
              <img  
                alt={t('christeningsPageHeroAlt', { defaultText: 'Joyful christening celebration background' })} 
                className="w-full h-full object-cover opacity-30"
               src="https://images.unsplash.com/photo-1627307920017-a1c34a01b7ac" />
            </div>
            <div className="relative z-10">
              <motion.h1 
                className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-500 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('christeningsPageTitle', { defaultText: "Joyful Christenings & Cumătrii" })}
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {t('christeningsPageSubtitle', { defaultText: "Celebrate your little one's special day with a heartwarming gathering at The Golden Spoon." })}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3">
                  <Link to="/menu" state={{ menuSelectionMode: 'eventTypeList', eventTypeId: 'birthdayEventType' }}>
                    <Baby size={20} className="mr-2" /> {t('christeningsPageCTAButton', { defaultText: "Explore Christening Menus" })}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Details Section */}
          <motion.section variants={sectionVariants} className="mb-16 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary">{t('christeningsPageDetailsTitle', { defaultText: "A Warm Welcome for Your Little One" })}</h2>
              <p className="text-slate-300 leading-relaxed">
                {t('christeningsPageDetailsPara1', { defaultText: "A christening or cumătrie is a cherished family occasion. At The Golden Spoon, we offer a warm, welcoming atmosphere perfect for celebrating this significant milestone. Our versatile event spaces can be adapted to suit your party size and style, ensuring a comfortable and joyous gathering for all your loved ones." })}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {t('christeningsPageDetailsPara2', { defaultText: "Our culinary team can create delightful menus that appeal to both adults and children, incorporating traditional flavors or contemporary dishes as you prefer. We pay attention to every detail, from decorations to entertainment options, to make your child's christening a beautiful and stress-free event." })}
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center"><Users size={18} className="mr-2 text-blue-400" />{t('christeningsPageFeature1', { defaultText: "Family-friendly environment and spaces" })}</li>
                <li className="flex items-center"><Cake size={18} className="mr-2 text-blue-400" />{t('christeningsPageFeature2', { defaultText: "Customizable menus for all ages" })}</li>
                <li className="flex items-center"><ImageIcon size={18} className="mr-2 text-blue-400" />{t('christeningsPageFeature3', { defaultText: "Assistance with decor and arrangements" })}</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img  alt={t('christeningsPageDetailsImageAlt', { defaultText: 'Family gathered for a christening celebration' })} className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1662441896519-503693c5f92a" />
            </div>
          </motion.section>

          {/* Gallery Section */}
          <motion.section variants={sectionVariants} className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-secondary mb-10">{t('christeningsPageGalleryTitle', { defaultText: "Precious Beginnings" })}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map(image => (
                <motion.div 
                  key={image.id} 
                  className="rounded-lg overflow-hidden shadow-lg group relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img  alt={t(image.altKey, image.defaultAlt)} className="w-full h-60 object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-center text-sm">{t(image.altKey, image.defaultAlt)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section variants={sectionVariants} className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-secondary mb-10">{t('christeningsPageTestimonialsTitle', { defaultText: "Happy Families Share Their Joy" })}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map(testimonial => (
                <motion.div 
                  key={testimonial.id} 
                  className="bg-slate-800/60 p-6 rounded-lg shadow-lg border border-slate-700"
                  whileHover={{ borderColor: 'var(--secondary)' }}
                >
                  <MessageSquare size={24} className="text-blue-400 mb-3" />
                  <p className="text-slate-300 italic mb-4">"{t(testimonial.quoteKey, testimonial.defaultQuote)}"</p>
                  <p className="text-right font-semibold text-secondary">- {t(testimonial.nameKey, testimonial.defaultName)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section variants={sectionVariants} className="text-center py-12 bg-slate-800/50 rounded-lg shadow-xl border border-secondary/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">{t('christeningsPageFinalCTATitle', { defaultText: "Plan a Beautiful Christening" })}</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">{t('christeningsPageFinalCTASubtitle', { defaultText: "Let us help you celebrate this special milestone. Contact us to learn more about our christening and cumătrie packages." })}</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-secondary to-blue-600 hover:from-secondary/90 hover:to-blue-700 text-white font-semibold px-8 py-3">
              <Link to="/contact">
                {t('christeningsPageFinalCTAButton', { defaultText: "Inquire About Your Christening" })} <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.section>
        </motion.div>
      );
    };

    export default ChristeningsPage;