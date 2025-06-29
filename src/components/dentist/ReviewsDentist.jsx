import React, { useContext, useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import AnimatedText from './AnimatedText';

    const ReviewsDentist = () => {
      const { t } = useContext(LanguageContext);
      const [currentIndex, setCurrentIndex] = useState(0);

       const reviews = [
        {
          id: 1,
          nameKey: 'dentistReview1Name', defaultName: 'Ana M.',
          roleKey: 'dentistReview1Role', defaultRole: 'Pacient Ortodonție',
          reviewKey: 'dentistReview1Text', defaultText: 'O experiență excelentă! Medicii sunt foarte profesioniști și atenți la nevoile pacientului. Rezultatele tratamentului ortodontic au depășit așteptările. Recomand cu încredere!',
          rating: 5,
          imageText: "Pacientă zâmbind după tratament ortodontic",
          imageSrc: "https://res.cloudinary.com/dfrcw7ngp/image/upload/v1751227784/review_girl_v5zmmn.png"
        },
        {
          id: 2,
          nameKey: 'dentistReview2Name', defaultName: 'Radu P.',
          roleKey: 'dentistReview2Role', defaultRole: 'Pacient Implantologie',
          reviewKey: 'dentistReview2Text', defaultText: 'Am fost impresionat de tehnologia modernă și de curățenia impecabilă. Procedura de implant a fost nedureroasă, iar personalul este foarte amabil și explică fiecare pas.',
          rating: 5,
          imageText: "Pacient mulțumit după implant dentar",
          imageSrc: "https://res.cloudinary.com/dfrcw7ngp/image/upload/v1751227784/review_boy_bby30w.png"
        },
        {
          id: 3,
          nameKey: 'dentistReview3Name', defaultName: 'Gabriela I.',
          roleKey: 'dentistReview3Role', defaultRole: 'Mamă Pacient Pedodonție',
          reviewKey: 'dentistReview3Text', defaultText: 'Copilul meu a depășit frica de dentist datorită doamnei doctor pedodont. Atmosferă prietenoasă și multă răbdare. Acum vine cu drag la control!',
          rating: 5,
          imageText: "Copil fericit în cabinetul stomatologic",
          imageSrc: "/images/reviews/review_girl.png"
        },
         {
          id: 4,
          nameKey: 'dentistReview4Name', defaultName: 'Mihai S.',
          roleKey: 'dentistReview4Role', defaultRole: 'Pacient Estetică Dentară',
          reviewKey: 'dentistReview4Text', defaultText: 'Servicii de estetică dentară de top! Albirea profesională mi-a transformat zâmbetul. Personalul este extrem de calificat și prietenos.',
          rating: 5,
          imageText: "Zâmbet strălucitor după albire dentară",
          imageSrc: "/images/reviews/review_boy.png"
        }
      ];

      const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

      const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      };

      const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      };
      
      useEffect(() => {
        const timer = setTimeout(nextReview, 7000); // Auto-cycle every 7 seconds
        return () => clearTimeout(timer);
      }, [currentIndex]);


      const currentReview = reviews[currentIndex];

      return (
        <section id="recenzii" className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-12">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                    + {t('dentistReviewsTagline', {defaultText: "Testimoniale"})}
                </p>
              <AnimatedText 
                text={t('dentistReviewsTitle', { defaultText: "Ce Spun Pacienții Noștri" })} 
                el="h2"
                className="text-3xl sm:text-4xl text-foreground mb-4" 
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <motion.div 
                    className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
                    key={currentReview.id + "-image"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img  
                        className="w-full h-full object-cover"
                        alt={t(currentReview.nameKey, currentReview.defaultName) + " - " + t(currentReview.roleKey, currentReview.defaultRole)}
                     src={currentReview.imageSrc}/>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/70 via-primary/50 to-transparent p-6 text-primary-foreground">
                        <h3 className="text-2xl font-bold">{averageRating}/5</h3>
                        <p className="text-sm">{t('dentistReviewsAvgRatingText', {defaultText: "Evaluare oferită de pacienți după vizită."})}</p>
                        <div className="flex mt-2">
                            {[...Array(Math.floor(parseFloat(averageRating)))].map((_, i) => (
                                <Star key={`full-${i}`} size={20} className="text-yellow-300 fill-yellow-300" />
                            ))}
                            {parseFloat(averageRating) % 1 >= 0.5 && <Star key="half" size={20} className="text-yellow-300 fill-yellow-300" style={{clipPath: "inset(0 50% 0 0)"}}/>}
                            {[...Array(5 - Math.ceil(parseFloat(averageRating)))].map((_, i) => (
                                <Star key={`empty-${i}`} size={20} className="text-yellow-300/40" />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentReview.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="bg-card p-8 rounded-lg shadow-xl flex flex-col min-h-[300px]"
                        >
                            <MessageCircle size={40} className="text-primary mb-6 opacity-60" />
                            <p className="text-muted-foreground italic text-base md:text-lg leading-relaxed flex-grow">
                                "{t(currentReview.reviewKey, currentReview.defaultText)}"
                            </p>
                            <div className="mt-6 pt-6 border-t border-border">
                                <h4 className="text-lg font-semibold text-foreground">
                                    {t(currentReview.nameKey, currentReview.defaultName)}
                                </h4>
                                <p className="text-sm text-primary">
                                    {t(currentReview.roleKey, currentReview.defaultRole)}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-start space-x-3 mt-6">
                        <Button variant="outline" size="icon" onClick={prevReview} className="bg-background hover:bg-muted-foreground/10 border-border text-foreground">
                            <ChevronLeft size={20} />
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextReview} className="bg-background hover:bg-muted-foreground/10 border-border text-foreground">
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            </div>
          </div>
        </section>
      );
    };

    export default ReviewsDentist;