import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, CalendarHeart, Utensils, Image as ImageIcon, MessageSquare } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const sectionVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const WeddingsPage = () => {
      const { t } = useContext(LanguageContext);

      const galleryImages = [
        { id: 1, altKey: 'weddingsPageGalleryAlt1', defaultAlt: 'Elegant wedding table setting', description: 'Beautifully decorated wedding hall' },
        { id: 2, altKey: 'weddingsPageGalleryAlt2', defaultAlt: 'Bride and groom dancing', description: 'Joyful wedding celebration moment' },
        { id: 3, altKey: 'weddingsPageGalleryAlt3', defaultAlt: 'Wedding cake display', description: 'Stunning multi-tiered wedding cake' },
        { id: 4, altKey: 'weddingsPageGalleryAlt4', defaultAlt: 'Outdoor wedding ceremony setup', description: 'Romantic outdoor wedding venue' },
      ];

      const testimonials = [
        { id: 1, quoteKey: 'weddingsPageTestimonial1Quote', defaultQuote: "Our wedding at The Golden Spoon was a dream come true! The food, service, and ambiance were beyond perfect. Highly recommended!", nameKey: 'weddingsPageTestimonial1Name', defaultName: "Anna & Mark T." },
        { id: 2, quoteKey: 'weddingsPageTestimonial2Quote', defaultQuote: "The team handled every detail flawlessly. Our guests are still raving about the delicious menu. Thank you for making our day so special!", nameKey: 'weddingsPageTestimonial2Name', defaultName: "Sophia & David L." },
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
            className="relative rounded-xl overflow-hidden text-center py-20 sm:py-32 bg-gradient-to-br from-primary/30 via-slate-800 to-accent/30 mb-16"
          >
            <div className="absolute inset-0">
              <img  
                alt={t('weddingsPageHeroAlt', { defaultText: 'Romantic wedding reception background' })} 
                className="w-full h-full object-cover opacity-30"
               src="https://images.unsplash.com/photo-1624067078399-be29c52a2b12" />
            </div>
            <div className="relative z-10">
              <motion.h1 
                className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-red-500 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('weddingsPageTitle', { defaultText: "Unforgettable Weddings" })}
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {t('weddingsPageSubtitle', { defaultText: "Crafting your perfect day with elegance, exquisite cuisine, and impeccable service at The Golden Spoon." })}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold px-8 py-3">
                  <Link to="/menu" state={{ menuSelectionMode: 'eventTypeList', eventTypeId: 'weddingEventType' }}>
                    <CalendarHeart size={20} className="mr-2" /> {t('weddingsPageCTAButton', { defaultText: "Explore Wedding Menus" })}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Details Section */}
          <motion.section variants={sectionVariants} className="mb-16 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t('weddingsPageDetailsTitle', { defaultText: "Your Dream Wedding, Our Expertise" })}</h2>
              <p className="text-slate-300 leading-relaxed">
                {t('weddingsPageDetailsPara1', { defaultText: "At The Golden Spoon, we understand that your wedding day is one of the most important moments of your life. Our dedicated event planning team works closely with you to bring your vision to life, ensuring every detail is meticulously arranged, from custom menus to stunning decor." })}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {t('weddingsPageDetailsPara2', { defaultText: "Choose from our elegant event spaces, each offering a unique ambiance. Our chefs specialize in creating memorable culinary experiences, using the freshest ingredients to craft dishes that will delight your guests. Let us handle the complexities, so you can focus on celebrating your love." })}
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center"><Utensils size={18} className="mr-2 text-accent" />{t('weddingsPageFeature1', { defaultText: "Customizable gourmet menus" })}</li>
                <li className="flex items-center"><CalendarHeart size={18} className="mr-2 text-accent" />{t('weddingsPageFeature2', { defaultText: "Elegant and versatile event spaces" })}</li>
                <li className="flex items-center"><ImageIcon size={18} className="mr-2 text-accent" />{t('weddingsPageFeature3', { defaultText: "Professional event planning & coordination" })}</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img  alt={t('weddingsPageDetailsImageAlt', { defaultText: 'Happy couple at their wedding reception' })} className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1695494939637-bc98c2df6d8e" />
            </div>
          </motion.section>

          {/* Gallery Section */}
          <motion.section variants={sectionVariants} className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-10">{t('weddingsPageGalleryTitle', { defaultText: "Moments We've Created" })}</h2>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-10">{t('weddingsPageTestimonialsTitle', { defaultText: "What Our Couples Say" })}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map(testimonial => (
                <motion.div 
                  key={testimonial.id} 
                  className="bg-slate-800/60 p-6 rounded-lg shadow-lg border border-slate-700"
                  whileHover={{ borderColor: 'var(--primary)' }}
                >
                  <MessageSquare size={24} className="text-accent mb-3" />
                  <p className="text-slate-300 italic mb-4">"{t(testimonial.quoteKey, testimonial.defaultQuote)}"</p>
                  <p className="text-right font-semibold text-primary">- {t(testimonial.nameKey, testimonial.defaultName)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section variants={sectionVariants} className="text-center py-12 bg-slate-800/50 rounded-lg shadow-xl border border-primary/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{t('weddingsPageFinalCTATitle', { defaultText: "Ready to Plan Your Perfect Wedding?" })}</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">{t('weddingsPageFinalCTASubtitle', { defaultText: "Contact us today to discuss your dream wedding and let our experts help you create an unforgettable celebration." })}</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3">
              <Link to="/booking">
                {t('weddingsPageFinalCTAButton', { defaultText: "Inquire About Your Wedding" })} <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.section>
        </motion.div>
      );
    };

    export default WeddingsPage;