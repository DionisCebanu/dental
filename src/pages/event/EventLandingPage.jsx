import React, { useState, useContext, useMemo } from 'react';
    import { Link } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { MapPin, Search, CalendarDays, Tag, Ticket as TicketIcon, Building, Sparkles } from 'lucide-react';
    import { events as allEventsData, categories as allCategories } from '@/data/eventData';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
      out: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' },
      }),
    };
    
    const EventCard = ({ event, index }) => {
      const { t } = useContext(LanguageContext);
      const availability = event.capacity - event.ticketsSold;

      return (
        <motion.div variants={itemVariants} custom={index} initial="hidden" animate="visible" exit="hidden" layout>
          <Card className="h-full flex flex-col overflow-hidden bg-card hover:shadow-2xl hover:border-primary/60 transition-all duration-300 group border border-border transform hover:-translate-y-1">
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
              <img 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out"
                alt={event.name}
               src="https://images.unsplash.com/photo-1509930854872-0f61005b282e" />
              {event.price === 0 && (
                 <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-bold rounded-full shadow-lg tracking-wide">
                   {t('freeEvent')}
                 </div>
              )}
               <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-lg lg:text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300 truncate">
                {event.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground flex items-center pt-1">
                <CalendarDays size={14} className="mr-1.5 text-secondary" /> {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} - {event.time}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pb-3">
              <p className="text-sm text-foreground/80 line-clamp-2 mb-2.5">{event.description}</p>
              <div className="text-xs text-muted-foreground flex items-center mb-1">
                <MapPin size={14} className="mr-1.5 text-secondary" /> {event.location}
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Tag size={14} className="mr-1.5 text-secondary" /> {t(allCategories.find(c => c.id === event.category)?.name || event.category)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2 pb-4 border-t border-border/50 mt-auto">
              <div className={`text-xl font-bold ${event.price === 0 ? 'text-secondary' : 'text-accent'}`}>
                {event.price > 0 ? `$${event.price.toFixed(2)}` : t('freeEvent')}
              </div>
              <Button asChild size="sm" variant={availability <=0 ? "destructive" : "default"} className={`font-semibold ${availability <=0 ? '' : 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30'}`}>
                <Link to={`/event/${event.id}`}>
                  <TicketIcon size={16} className="mr-1.5" /> 
                  {availability <= 0 ? t('ticketsSoldOut') : t('getTicketsButton')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    const EventLandingPage = () => {
      const { t } = useContext(LanguageContext);
      const [searchTerm, setSearchTerm] = useState('');
      const [locationTerm, setLocationTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('all');

      const filteredEvents = useMemo(() => {
        return allEventsData.filter(event => {
          const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                event.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
          const matchesLocation = event.location.toLowerCase().includes(locationTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
          return matchesSearch && matchesLocation && matchesCategory;
        });
      }, [searchTerm, locationTerm, selectedCategory, allEventsData]);

      return (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <motion.section 
            className="relative text-center mb-16 sm:mb-20 py-16 sm:py-24 rounded-xl overflow-hidden shadow-2xl border border-border"
            initial={{ opacity:0, y: -30 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.7, ease: "circOut" }}
          >
            <div className="absolute inset-0 z-0">
              <img   
                class="w-full h-full object-cover opacity-20" 
                alt="Abstract background for hero section"
               src="https://images.unsplash.com/photo-1549441386-2b99fd8c114e" />
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background/70 to-background/50"></div>
            </div>

            <div className="relative z-10 px-4">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  {t('discoverEventsTitle')}
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {t('discoverEventsSubtitle')}
              </motion.p>
              <motion.div 
                className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 sm:p-6 rounded-lg bg-card/80 backdrop-blur-sm border border-border shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholderEvent')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 h-12 text-base bg-input border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholderLocation')}
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    className="pl-10 pr-4 h-12 text-base bg-input border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <Button size="lg" className="md:col-span-2 h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/40">
                  <Search className="mr-2 h-5 w-5" /> {t('searchButton')}
                </Button>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="mb-10 sm:mb-12"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              {allCategories.map((category, idx) => (
                <motion.div key={category.id} custom={idx} variants={itemVariants} initial="hidden" animate="visible">
                  <Button
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md
                      ${selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent ring-2 ring-offset-2 ring-offset-background ring-accent' 
                        : 'bg-card border-border text-foreground/80 hover:bg-primary/10 hover:border-primary/50 hover:text-primary'
                      }`
                    }
                  >
                    {React.cloneElement(category.icon, { 
                      size: 16, 
                      className: `mr-1.5 ${selectedCategory === category.id ? 'text-primary-foreground' : 'text-accent'}` 
                    })}
                    <span>{t(category.name)}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {filteredEvents.length > 0 ? (
              <AnimatePresence>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
                  layout
                >
                  {filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TicketIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">{t('errorEventNotFound')}</h3>
                <p className="text-muted-foreground">{t('errorEventNotFoundSubtitle')}</p>
              </motion.div>
            )}
          </motion.section>
        </motion.div>
      );
    };

    export default EventLandingPage;