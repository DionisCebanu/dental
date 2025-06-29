import React, { useState, useEffect, useContext } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { ChevronLeft, Ticket, User, Mail, Phone, Armchair } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { getMovieById } from '@/data/movieData.js';
    import TheatreLayout from '@/components/movie/TheatreLayout';

    const pageVariants = {
      initial: { opacity: 0, scale: 0.95 },
      in: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
      out: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeInOut" } }
    };

    const MovieBookingPage = () => {
      const { movieId, showtimeId } = useParams();
      const navigate = useNavigate();
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();

      const movie = getMovieById(movieId);
      const showtime = movie?.showtimes.find(st => st.id === showtimeId);

      const [selectedSeats, setSelectedSeats] = useState([]);
      const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
      const [errors, setErrors] = useState({});
      const [bookedSeats, setBookedSeats] = useState([]); 

      const seatPriceStandard = 12;
      const seatPricePremium = 18;

      useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem(`movieBookings_${movieId}_${showtimeId}`)) || [];
        setBookedSeats(storedBookings.flatMap(b => b.seats));
      }, [movieId, showtimeId]);


      if (!movie || !showtime) {
        return <div className="container mx-auto py-40 text-center text-xl">Booking information not found.</div>;
      }

      const handleSeatSelect = (seatId, seatType) => {
        setSelectedSeats(prev => {
          const isSelected = prev.some(s => s.id === seatId);
          if (isSelected) {
            return prev.filter(s => s.id !== seatId);
          } else {
            return [...prev, { id: seatId, type: seatType, price: seatType === 'premium' ? seatPricePremium : seatPriceStandard }];
          }
        });
      };

      const calculateTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => total + seat.price, 0);
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('errorNameRequired');
        if (!formData.email.trim()) newErrors.email = t('errorEmailRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('errorEmailInvalid');
        if (!formData.phone.trim()) newErrors.phone = t('errorPhoneRequired');
        else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) newErrors.phone = t('errorPhoneInvalid');
        if (selectedSeats.length === 0) newErrors.seats = t('errorNoSeatsSelected');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
          toast({ variant: "destructive", title: "Validation Error", description: "Please check the form for errors." });
          return;
        }

        const bookingDetails = {
          movieId,
          showtimeId,
          movieTitle: t(movie.titleKey, movie.defaultTitle),
          showtime: showtime.time,
          seats: selectedSeats.map(s => s.id),
          totalPrice: calculateTotalPrice(),
          customer: formData,
          bookingDate: new Date().toISOString()
        };
        
        const existingBookings = JSON.parse(localStorage.getItem(`movieBookings_${movieId}_${showtimeId}`)) || [];
        localStorage.setItem(`movieBookings_${movieId}_${showtimeId}`, JSON.stringify([...existingBookings, bookingDetails]));
        
        setBookedSeats(prev => [...prev, ...selectedSeats.map(s => s.id)]);
        setSelectedSeats([]);
        setFormData({ name: '', email: '', phone: '' });

        toast({
          title: t('bookingConfirmationTitle'),
          description: t('bookingConfirmationDesc', { movieTitle: bookingDetails.movieTitle, email: formData.email }),
          className: "bg-green-600 text-white"
        });
        
      };
      
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if(errors[id]) setErrors(prev => ({...prev, [id]: null}));
      };


      return (
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 sm:py-32 sm:pt-40 min-h-screen"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex justify-between items-center"
          >
            <Button variant="outline" onClick={() => navigate(`/movie/${movieId}`)} className="text-gray-300 hover:text-accent hover:border-accent">
              <ChevronLeft size={18} className="mr-2" /> Back to Movie Details
            </Button>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('bookingPageTitle')}
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-center text-lg mb-10 sm:mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('bookingPageSubtitle', { movieTitle: t(movie.titleKey, movie.defaultTitle), showtime: `${showtime.time} (${showtime.screenType})` })}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 shadow-xl p-4 sm:p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <Armchair size={28} className="mr-3 text-accent"/>
                    Select Your Seats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <TheatreLayout 
                    onSeatSelect={handleSeatSelect} 
                    selectedSeats={selectedSeats.map(s => s.id)} 
                    bookedSeats={bookedSeats}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-slate-800/70 border-slate-700 shadow-2xl shadow-accent/20 sticky top-32">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{t('bookingDetailsTitle')}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {t(movie.titleKey, movie.defaultTitle)} - {showtime.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300 flex items-center mb-1"><User size={16} className="mr-2 text-accent"/>{t('formName')}</Label>
                      <Input id="name" type="text" placeholder={t('formPlaceholderName')} value={formData.name} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white ${errors.name ? 'border-red-500' : ''}`} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300 flex items-center mb-1"><Mail size={16} className="mr-2 text-accent"/>{t('formEmail')}</Label>
                      <Input id="email" type="email" placeholder={t('formPlaceholderEmail')} value={formData.email} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white ${errors.email ? 'border-red-500' : ''}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-300 flex items-center mb-1"><Phone size={16} className="mr-2 text-accent"/>{t('formPhone')}</Label>
                      <Input id="phone" type="tel" placeholder={t('formPlaceholderPhone')} value={formData.phone} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white ${errors.phone ? 'border-red-500' : ''}`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <AnimatePresence>
                      {selectedSeats.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <p className="text-sm text-gray-300">{t('selectedSeats')}: {selectedSeats.map(s => s.id).join(', ')}</p>
                          <p className="text-lg font-semibold text-accent">{t('totalPrice')}: ${calculateTotalPrice().toFixed(2)}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.seats && <p className="text-red-500 text-xs mt-1">{errors.seats}</p>}
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 text-lg" disabled={selectedSeats.length === 0}>
                      <Ticket size={20} className="mr-2"/> {t('proceedToPayment')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default MovieBookingPage;