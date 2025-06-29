import React, { useState, useContext, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { CalendarDays, Clock, XCircle, PlusCircle, Save } from 'lucide-react';

    const defaultOperatingHours = {
      monday: { isOpen: true, open: '11:00', close: '22:30' },
      tuesday: { isOpen: true, open: '11:00', close: '22:30' },
      wednesday: { isOpen: true, open: '11:00', close: '22:30' },
      thursday: { isOpen: true, open: '11:00', close: '22:30' },
      friday: { isOpen: true, open: '11:00', close: '23:00' },
      saturday: { isOpen: true, open: '10:00', close: '23:30' },
      sunday: { isOpen: false, open: '12:00', close: '21:00' },
    };

    const AdminAvailabilityPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [operatingHours, setOperatingHours] = useState(defaultOperatingHours);
      const [blockedDates, setBlockedDates] = useState([]);
      const [newBlockedDate, setNewBlockedDate] = useState('');

      useEffect(() => {
        const savedHours = JSON.parse(localStorage.getItem('restaurantOperatingHours'));
        if (savedHours) setOperatingHours(savedHours);
        const savedBlockedDates = JSON.parse(localStorage.getItem('restaurantBlockedDates'));
        if (savedBlockedDates) setBlockedDates(savedBlockedDates);
      }, []);

      const handleDayToggle = (day) => {
        setOperatingHours(prev => ({
          ...prev,
          [day]: { ...prev[day], isOpen: !prev[day].isOpen }
        }));
      };

      const handleTimeChange = (day, type, value) => {
        setOperatingHours(prev => ({
          ...prev,
          [day]: { ...prev[day], [type]: value }
        }));
      };

      const handleAddBlockedDate = () => {
        if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
          setBlockedDates(prev => [...prev, newBlockedDate].sort());
          setNewBlockedDate('');
        } else if (blockedDates.includes(newBlockedDate)) {
          toast({ title: t('adminAvailabilityErrorDateExistsTitle'), description: t('adminAvailabilityErrorDateExistsDesc', {date: newBlockedDate}), variant: "destructive" });
        }
      };

      const handleRemoveBlockedDate = (dateToRemove) => {
        setBlockedDates(prev => prev.filter(date => date !== dateToRemove));
      };

      const handleSaveAvailability = () => {
        localStorage.setItem('restaurantOperatingHours', JSON.stringify(operatingHours));
        localStorage.setItem('restaurantBlockedDates', JSON.stringify(blockedDates));
        toast({ title: t('adminAvailabilitySavedTitle'), description: t('adminAvailabilitySavedDesc') });
      };
      
      const dayKeys = Object.keys(defaultOperatingHours);

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">{t('adminNavAvailability', { defaultText: "Configure Availability"})}</h1>
            <Button onClick={handleSaveAvailability} className="bg-primary hover:bg-primary/90">
              <Save size={18} className="mr-2" /> {t('adminAvailabilitySaveAll', { defaultText: "Save All Settings"})}
            </Button>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-accent flex items-center">
                <Clock size={22} className="mr-3" /> {t('adminAvailabilityOperatingHoursTitle', { defaultText: "Operating Hours"})}
              </CardTitle>
              <CardDescription className="text-slate-400">{t('adminAvailabilityOperatingHoursDesc', { defaultText: "Set the weekly opening and closing times for the restaurant."})}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dayKeys.map(day => (
                <div key={day} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-3 bg-slate-700/50 rounded-md">
                  <div className="flex items-center col-span-1 md:col-span-1">
                    <Checkbox
                      id={`isOpen-${day}`}
                      checked={operatingHours[day]?.isOpen || false}
                      onCheckedChange={() => handleDayToggle(day)}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground mr-3"
                    />
                    <Label htmlFor={`isOpen-${day}`} className="text-lg font-medium text-slate-200 capitalize">
                      {t(`day${day.charAt(0).toUpperCase() + day.slice(1)}`, { defaultText: day })}
                    </Label>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <Label htmlFor={`open-${day}`} className="text-sm text-slate-400">{t('adminAvailabilityOpenTime', { defaultText: "Open Time"})}</Label>
                    <Input
                      type="time"
                      id={`open-${day}`}
                      value={operatingHours[day]?.open || '00:00'}
                      onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                      disabled={!operatingHours[day]?.isOpen}
                      className="bg-slate-600 border-slate-500 text-slate-100 disabled:opacity-60"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <Label htmlFor={`close-${day}`} className="text-sm text-slate-400">{t('adminAvailabilityCloseTime', { defaultText: "Close Time"})}</Label>
                    <Input
                      type="time"
                      id={`close-${day}`}
                      value={operatingHours[day]?.close || '00:00'}
                      onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                      disabled={!operatingHours[day]?.isOpen}
                      className="bg-slate-600 border-slate-500 text-slate-100 disabled:opacity-60"
                    />
                  </div>
                   <div className="col-span-1 md:col-span-1 text-right">
                    {!operatingHours[day]?.isOpen && <span className="text-sm text-red-400 italic">{t('adminAvailabilityClosed', { defaultText: "Closed"})}</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-accent flex items-center">
                <CalendarDays size={22} className="mr-3" /> {t('adminAvailabilityBlockedDatesTitle', { defaultText: "Blocked Dates"})}
              </CardTitle>
              <CardDescription className="text-slate-400">{t('adminAvailabilityBlockedDatesDesc', { defaultText: "Specify dates when the restaurant will be closed (e.g., holidays, special events)."})}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
                <Button onClick={handleAddBlockedDate} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <PlusCircle size={18} className="mr-2" /> {t('adminAvailabilityAddDate', { defaultText: "Add Date"})}
                </Button>
              </div>
              {blockedDates.length > 0 ? (
                <ul className="space-y-2">
                  {blockedDates.map(date => (
                    <li key={date} className="flex justify-between items-center p-2 bg-slate-700/50 rounded-md">
                      <span className="text-slate-200">{date}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveBlockedDate(date)} className="text-red-400 hover:text-red-300">
                        <XCircle size={18} />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 text-center py-4">{t('adminAvailabilityNoBlockedDates', { defaultText: "No dates are currently blocked."})}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default AdminAvailabilityPage;