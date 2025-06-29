import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
    import { User, Mail, CalendarDays, Ticket, QrCode, MapPin, Search } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "circOut" } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "circIn" } }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
      }),
    };

    const staticUser = {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      joinedDate: "2024-01-15",
      profilePictureUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=150&q=80"
    };

    const staticBookings = [
      {
        id: 'booking1',
        eventId: '1',
        eventName: 'Summer Music Festival',
        eventDate: '2025-07-20',
        eventTime: '14:00',
        eventLocation: 'Parc Jean-Drapeau, Montreal',
        tickets: 2,
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EventID:1-BookingID:booking1-UserID:alex.johnson'
      },
      {
        id: 'booking2',
        eventId: '5',
        eventName: 'Tech Innovators Conference',
        eventDate: '2025-10-22',
        eventTime: '09:00',
        eventLocation: 'Palais des congrès, Montreal',
        tickets: 1,
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EventID:5-BookingID:booking2-UserID:alex.johnson'
      }
    ];
    
    const ProfilePage = () => {
      const { t, language } = useContext(LanguageContext);
      const [selectedBookingQR, setSelectedBookingQR] = useState(null);

      return (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {t('profilePageTitle')}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="md:col-span-1"
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-card shadow-xl border border-border sticky top-28">
                <CardHeader className="items-center text-center">
                  <div className="relative mb-4">
                    <img  
                      class="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg" 
                      alt={staticUser.name}
                     src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
                    <div className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-card">
                       <User size={14} className="text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-primary">{staticUser.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t('profileUserDetails')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Mail size={16} className="mr-3 text-accent" />
                    <span>{staticUser.email}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays size={16} className="mr-3 text-accent" />
                    <span>{t('profileUserJoined')}: {new Date(staticUser.joinedDate).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="md:col-span-2"
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-semibold mb-6 text-foreground flex items-center">
                <Ticket size={28} className="mr-3 text-secondary" /> {t('profileMyBookings')}
              </h2>
              {staticBookings.length > 0 ? (
                <div className="space-y-6">
                  {staticBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Card className="bg-card shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50">
                        <CardHeader>
                          <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                            {booking.eventName}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            {new Date(booking.eventDate).toLocaleDateString(language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {booking.eventTime}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin size={14} className="mr-2 text-secondary" /> {booking.eventLocation}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Ticket size={14} className="mr-2 text-secondary" /> {t('bookingTickets', { count: booking.tickets })}
                          </div>
                        </CardContent>
                        <div className="p-6 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent"
                                onClick={() => setSelectedBookingQR(booking)}
                              >
                                <QrCode size={18} className="mr-2" /> {t('bookingViewQRCode')}
                              </Button>
                            </DialogTrigger>
                            {selectedBookingQR && selectedBookingQR.id === booking.id && (
                               <DialogContent className="sm:max-w-xs bg-card border-border">
                                <DialogHeader>
                                  <DialogTitle className="text-center text-primary">{t('qrCodeModalTitle')}</DialogTitle>
                                  <DialogDescription className="text-center text-muted-foreground">
                                    {t('qrCodeModalDescription', { eventName: selectedBookingQR.eventName })}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-center p-4 bg-white rounded-md my-4">
                                  <img  
                                    src={selectedBookingQR.qrCodeUrl} 
                                    alt={t('qrCodeForEvent', { eventName: selectedBookingQR.eventName })} 
                                    class="w-48 h-48 object-contain"
                                   src="https://images.unsplash.com/photo-1693496489980-73ea9e8a75f1" />
                                </div>
                              </DialogContent>
                            )}
                          </Dialog>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="text-center py-12 bg-card rounded-lg shadow-md border border-border"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Ticket size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('profileNoBookings')}</h3>
                  <Button asChild variant="default" className="mt-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    <Link to="/">
                      <Search size={18} className="mr-2" /> {t('profileNoBookingsAction')}
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default ProfilePage;