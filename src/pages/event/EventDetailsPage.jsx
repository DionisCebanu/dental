import React, { useState, useContext } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { CalendarDays, Clock, MapPin, Users, Tag, ArrowLeft, Ticket as TicketIcon } from 'lucide-react';
    import { events as allEventsData, categories as allCategories } from '@/data/eventData';
    import GetTicketsModal from '@/components/event/GetTicketsModal';

    const pageVariants = {
      initial: { opacity: 0, scale: 0.95 },
      in: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "circOut" } },
      out: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "circIn" } }
    };

    const EventDetailsPage = () => {
      const { eventId } = useParams();
      const { t, language } = useContext(LanguageContext);
      const navigate = useNavigate();
      const event = allEventsData.find(e => e.id === eventId);
      const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

      if (!event) {
        return (
          <motion.div 
            variants={pageVariants} initial="initial" animate="in" exit="out"
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]"
          >
            <TicketIcon className="mx-auto h-20 w-20 text-destructive mb-6" />
            <h1 className="text-4xl font-bold text-destructive mb-3">{t('errorEventNotFound')}</h1>
            <p className="text-lg text-muted-foreground mb-8">{t('errorEventNotFoundSubtitle')}</p>
            <Button onClick={() => navigate('/')} variant="default" size="lg" className="bg-primary hover:bg-primary/90">
              <ArrowLeft size={20} className="mr-2" /> {t('errorGoHome')}
            </Button>
          </motion.div>
        );
      }
      
      const availability = event.capacity - event.ticketsSold;
      let availabilityText = t('getTicketsButton');
      let availabilityColor = 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground';

      if (availability <= 0) {
        availabilityText = t('ticketsSoldOut');
        availabilityColor = 'bg-destructive hover:bg-destructive/90 text-destructive-foreground';
      } else if (availability < event.capacity * 0.1 && event.price > 0) {
        availabilityText = t('ticketsFewLeft');
        availabilityColor = 'bg-orange-500 hover:bg-orange-600 text-white';
      }


      const eventDate = new Date(event.date).toLocaleDateString(language, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });

      return (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="container mx-auto px-2 sm:px-4 lg:px-6 py-8"
        >
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 text-sm border-border hover:bg-muted/50">
            <ArrowLeft size={16} className="mr-2 text-accent" /> {t('backToEvents')}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="overflow-hidden bg-card shadow-xl border border-border">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                  <img 
                    className="w-full h-full object-cover"
                    alt={event.name}
                   src="https://images.unsplash.com/photo-1597911026894-f77d8df9071c" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <CardHeader className="absolute bottom-0 left-0 p-6 w-full">
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                      {event.name}
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-4 border-b-2 border-primary/30 pb-2">{t('eventDetailsAbout')}</h2>
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{event.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-card shadow-lg border border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-accent flex items-center"><CalendarDays size={20} className="mr-3 text-secondary" /> {t('eventDetailsDate')} & {t('eventDetailsTime')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm pl-10">
                  <p>{eventDate}</p>
                  <p>{event.time}</p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg border border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-accent flex items-center"><MapPin size={20} className="mr-3 text-secondary" /> {t('eventDetailsLocation')}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm pl-10">
                  <p>{event.location}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card shadow-lg border border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-accent flex items-center"><Users size={20} className="mr-3 text-secondary" /> {t('eventDetailsOrganizer')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm pl-10">
                  <p>{event.organizer}</p>
                   <div className="flex items-center">
                    <Tag size={16} className="mr-2 text-secondary/80" />
                    <span>{t(allCategories.find(c => c.id === event.category)?.name || event.category)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg p-6 text-center sticky top-24 border border-border">
                <div className={`text-3xl font-bold mb-2 ${event.price === 0 ? 'text-secondary' : 'text-accent'}`}>
                  {event.price > 0 ? `$${event.price.toFixed(2)}` : t('freeEvent')}
                </div>
                <p className={`text-sm mb-4 ${availability <= 0 ? 'text-red-500 font-semibold' : availability < event.capacity * 0.1 && event.price > 0 ? 'text-orange-400 font-semibold' : 'text-muted-foreground'}`}>
                  {availability > 0 ? t('ticketsRemaining', { count: availability }) : t('ticketsSoldOut')}
                </p>
                <Button 
                  size="lg" 
                  className={`w-full font-semibold text-lg ${availabilityColor}`}
                  disabled={availability <= 0}
                  onClick={() => setIsTicketModalOpen(true)}
                >
                  <TicketIcon size={20} className="mr-2" /> {availabilityText}
                </Button>
              </Card>
            </motion.div>
          </div>
          {event && <GetTicketsModal isOpen={isTicketModalOpen} setIsOpen={setIsTicketModalOpen} event={event} />}
        </motion.div>
      );
    };

    export default EventDetailsPage;