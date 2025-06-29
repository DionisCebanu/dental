import React, { useState, useEffect, useContext } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { User, Phone, Mail, Users, UtensilsCrossed, CalendarDays, AlarmClock as ClockIcon } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
    import { Calendar } from '@/components/ui/calendar';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { format } from 'date-fns';
    import { enUS, fr, ro } from 'date-fns/locale';

    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 11; hour <= 22; hour++) {
        slots.push(`${String(hour).padStart(2, '0')}:00`);
        if (hour < 22) { 
          slots.push(`${String(hour).padStart(2, '0')}:30`);
        }
      }
      return slots;
    };

    const dateLocales = {
      en: enUS,
      fr: fr,
      ro: ro,
    };

    const BookingForm = ({ initialFormData, onFormDataChange, onSubmit, errors, setErrors, showFullForm, selectedTableDetails }) => {
      const { t, language } = useContext(LanguageContext);
      const [localFormData, setLocalFormData] = useState(initialFormData);
      const [isCalendarOpen, setIsCalendarOpen] = useState(false);
      const timeSlots = generateTimeSlots();
      const [currentDateLocale, setCurrentDateLocale] = useState(dateLocales.en);

      useEffect(() => {
        setCurrentDateLocale(dateLocales[language] || dateLocales.en);
      }, [language]);

      useEffect(() => {
        setLocalFormData(initialFormData);
      }, [initialFormData]);

      const handleChange = (e) => {
        const { id, value } = e.target;
        const updatedLocalData = { ...localFormData, [id]: value };
        setLocalFormData(updatedLocalData);
        onFormDataChange(updatedLocalData); 

        if (errors[id]) {
          setErrors((prev) => ({ ...prev, [id]: null }));
        }
      };

      const handleDateSelect = (date) => {
        const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
        const updatedLocalData = { ...localFormData, date: formattedDate };
        setLocalFormData(updatedLocalData);
        onFormDataChange(updatedLocalData);
        setIsCalendarOpen(false);
        if (errors.date) {
          setErrors((prev) => ({ ...prev, date: null }));
        }
      };

      const handleTimeChange = (value) => {
        const updatedLocalData = { ...localFormData, time: value };
        setLocalFormData(updatedLocalData);
        onFormDataChange(updatedLocalData);
        if (errors.time) {
          setErrors((prev) => ({ ...prev, time: null }));
        }
      };

      const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(localFormData);
      };

      const today = new Date();
      today.setHours(0,0,0,0); 

      return (
        <Card className="bg-slate-800/70 border-slate-700 shadow-2xl shadow-primary/30">
          <CardHeader className="text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-3 bg-accent/20 rounded-full mb-3"
            >
              <UtensilsCrossed size={36} className="text-accent" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-primary">
              {t('bookingDetailsTitle')}
            </CardTitle>
            {selectedTableDetails && (
              <CardDescription className="text-accent font-semibold mt-1">
                  {t('bookingDetailsSelectedTable', { tableId: selectedTableDetails.id, capacity: selectedTableDetails.capacity })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="date" className="text-gray-300 flex items-center mb-1"><CalendarDays size={16} className="mr-2 text-accent" />{t('bookingFormDate')}</Label>
                      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:text-white ${!localFormData.date && "text-slate-400"} ${errors.date ? 'border-red-500' : ''}`}
                          >
                            <CalendarDays className="mr-2 h-4 w-4 text-accent" />
                            {localFormData.date ? format(new Date(localFormData.date), "PPP", { locale: currentDateLocale }) : <span>{t('bookingFormPickDate', { defaultText: "Pick a date"})}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                          <Calendar
                            mode="single"
                            selected={localFormData.date ? new Date(localFormData.date) : undefined}
                            onSelect={handleDateSelect}
                            disabled={(date) => date < today}
                            initialFocus
                            className="text-white"
                            locale={currentDateLocale}
                            classNames={{
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary focus:bg-primary",
                                day_today: "bg-accent text-accent-foreground",
                                head_cell: "text-slate-400",
                                day: "text-slate-200 hover:bg-slate-700",
                                day_disabled: "text-slate-500 opacity-50",
                                nav_button: "text-slate-300 hover:bg-slate-700",
                                caption_label: "text-primary",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                      <Label htmlFor="time" className="text-gray-300 flex items-center mb-1"><ClockIcon size={16} className="mr-2 text-accent" />{t('bookingFormTime')}</Label>
                      <Select value={localFormData.time} onValueChange={handleTimeChange}>
                        <SelectTrigger className={`w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.time ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder={t('bookingFormSelectTime', { defaultText: "Select a time"})} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot} className="hover:bg-slate-700 focus:bg-slate-600 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                  </div>
              </div>
                <div>
                  <Label htmlFor="guests" className="text-gray-300 flex items-center mb-1"><Users size={16} className="mr-2 text-accent" />{t('bookingFormGuests')}</Label>
                  <Input id="guests" type="number" placeholder={t('bookingFormGuestsPlaceholder')} min="1" max="20" value={localFormData.guests} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.guests ? 'border-red-500' : ''}`} />
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
              </div>
              
              <AnimatePresence>
              {showFullForm && localFormData.date && localFormData.time && localFormData.guests && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden space-y-5"
                  >
                      <div>
                          <Label htmlFor="name" className="text-gray-300 flex items-center mb-1"><User size={16} className="mr-2 text-accent" />{t('contactFormFullName')}</Label>
                          <Input id="name" type="text" placeholder={t('contactFormFullNamePlaceholder')} value={localFormData.name} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.name ? 'border-red-500' : ''}`} />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                          <Label htmlFor="phone" className="text-gray-300 flex items-center mb-1"><Phone size={16} className="mr-2 text-accent" />{t('contactFormPhone').replace(' (Optional)','').replace(' (Optionnel)','')}</Label>
                          <Input id="phone" type="tel" placeholder={t('contactFormPhonePlaceholder')} value={localFormData.phone} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.phone ? 'border-red-500' : ''}`} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                
                      <div>
                          <Label htmlFor="email" className="text-gray-300 flex items-center mb-1"><Mail size={16} className="mr-2 text-accent" />{t('contactFormEmail')}</Label>
                          <Input id="email" type="email" placeholder={t('contactFormEmailPlaceholder')} value={localFormData.email} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.email ? 'border-red-500' : ''}`} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                  </motion.div>
              )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/50 disabled:opacity-70"
                  disabled={!(localFormData.selectedTableId && localFormData.date && localFormData.time && localFormData.guests && localFormData.name && localFormData.phone && localFormData.email)}
                >
                  {t('bookingFormSubmit')}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      );
    };

    export default BookingForm;