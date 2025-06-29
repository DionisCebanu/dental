import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Gift, Heart, Users, MessageSquare, Image as ImageIcon, ArrowRight } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const sectionVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const AnniversariesPage = () => {
      const { t } = useContext(LanguageContext);

      const galleryImages = [
        { id: 1, altKey: 'anniversariesPageGalleryAlt1', defaultAlt: 'Romantic anniversary dinner setup', description: 'Intimate table for two with candles' },
        { id: 2, altKey: 'anniversariesPageGalleryAlt2', defaultAlt: 'Couple celebrating anniversary', description: 'Happy couple toasting with champagne' },
        { id: 3, altKey: 'anniversariesPageGalleryAlt3', defaultAlt: 'Special anniversary dessert', description: 'Beautifully plated anniversary dessert' },
        { id: 4, altKey: 'anniversariesPageGalleryAlt4', defaultAlt: 'Group anniversary celebration', description: 'Friends and family celebrating an anniversary' },
      ];

      const testimonials = [
        { id: 1, quoteKey: 'anniversariesPageTestimonial1Quote', defaultQuote: "The Golden Spoon made our 10th anniversary so special. The private dining room was perfect, and the food was exceptional!", nameKey: 'anniversariesPageTestimonial1Name', defaultName: "Emily & John S." },
        { id: 2, quoteKey: 'anniversariesPageTestimonial2Quote', defaultQuote: "We celebrated our parents' 50th here, and it was a night to remember. The staff went above and beyond. Thank you!", nameKey: 'anniversariesPageTestimonial2Name', defaultName: "The Miller Family" },
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
            className="relative rounded-xl overflow-hidden text-center py-20 sm:py-32 bg-gradient-to-br from-accent/30 via-slate-800 to-secondary/30 mb-16"
          >
            <div className="absolute inset-0">
              <img  
                alt={t('anniversariesPageHeroAlt', { defaultText: 'Elegant anniversary celebration background' })} 
                className="w-full h-full object-cover opacity-30"
               src="https://images.unsplash.com/photo-1647296020397-a79cd5127090" />
            </div>
            <div className="relative z-10">
              <motion.h1 
                className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('anniversariesPageTitle', { defaultText: "Cherished Anniversaries" })}
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {t('anniversariesPageSubtitle', { defaultText: "Celebrate your milestones with elegance and unforgettable flavors at The Golden Spoon." })}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-3">
                  <Link to="/booking">
                    <Gift size={20} className="mr-2" /> {t('anniversariesPageCTAButton', { defaultText: "Book Your Anniversary Dinner" })}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Details Section */}
          <motion.section variants={sectionVariants} className="mb-16 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-accent">{t('anniversariesPageDetailsTitle', { defaultText: "Mark Your Milestones in Style" })}</h2>
              <p className="text-slate-300 leading-relaxed">
                {t('anniversariesPageDetailsPara1', { defaultText: "Every anniversary is a testament to enduring love and partnership. At The Golden Spoon, we provide the perfect setting to honor these special moments. Whether you're planning an intimate dinner for two or a larger gathering with family and friends, our team is here to make your celebration exceptional." })}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {t('anniversariesPageDetailsPara2', { defaultText: "Enjoy personalized service, a curated selection of fine wines, and a menu that can be tailored to your preferences. Our elegant private dining options offer exclusivity and comfort, ensuring your anniversary is both memorable and magical." })}
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center"><Heart size={18} className="mr-2 text-primary" />{t('anniversariesPageFeature1', { defaultText: "Romantic and private dining options" })}</li>
                <li className="flex items-center"><Users size={18} className="mr-2 text-primary" />{t('anniversariesPageFeature2', { defaultText: "Menus adaptable for couples or groups" })}</li>
                <li className="flex items-center"><Gift size={18} className="mr-2 text-primary" />{t('anniversariesPageFeature3', { defaultText: "Special touches to personalize your celebration" })}</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img  alt={t('anniversariesPageDetailsImageAlt', { defaultText: 'Couple enjoying a romantic anniversary meal' })} className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1585953834310-d2ba41c5fe25" />
            </div>
          </motion.section>

          {/* Gallery Section */}
          <motion.section variants={sectionVariants} className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-accent mb-10">{t('anniversariesPageGalleryTitle', { defaultText: "Celebrated Moments" })}</h2>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-accent mb-10">{t('anniversariesPageTestimonialsTitle', { defaultText: "Happy Couples, Lasting Memories" })}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map(testimonial => (
                <motion.div 
                  key={testimonial.id} 
                  className="bg-slate-800/60 p-6 rounded-lg shadow-lg border border-slate-700"
                  whileHover={{ borderColor: 'var(--accent)' }}
                >
                  <MessageSquare size={24} className="text-primary mb-3" />
                  <p className="text-slate-300 italic mb-4">"{t(testimonial.quoteKey, testimonial.defaultQuote)}"</p>
                  <p className="text-right font-semibold text-accent">- {t(testimonial.nameKey, testimonial.defaultName)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section variants={sectionVariants} className="text-center py-12 bg-slate-800/50 rounded-lg shadow-xl border border-accent/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-4">{t('anniversariesPageFinalCTATitle', { defaultText: "Make Your Next Anniversary Unforgettable" })}</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">{t('anniversariesPageFinalCTASubtitle', { defaultText: "Let us help you create the perfect atmosphere for your special anniversary. Contact us to plan your celebration." })}</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-semibold px-8 py-3">
              <Link to="/contact">
                {t('anniversariesPageFinalCTAButton', { defaultText: "Plan Your Anniversary" })} <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.section>
        </motion.div>
      );
    };

    export default AnniversariesPage;