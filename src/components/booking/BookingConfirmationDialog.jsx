import React, { useContext } from 'react';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
    } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { CheckCircle, CalendarDays, Clock, Users, MapPin } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const BookingConfirmationDialog = ({ isOpen, onOpenChange, bookingDetails, language }) => {
      const { t } = useContext(LanguageContext);

      if (!bookingDetails) return null;

      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <DialogTitle className="text-2xl font-bold text-primary mb-2">
                  {t('bookingConfirmationTitle')}
                </DialogTitle>
                <DialogDescription className="text-slate-300">
                  {t('bookingConfirmationDialogSubtitle')}
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="my-6 space-y-3 text-slate-200">
              <div className="flex items-center">
                <CalendarDays size={20} className="mr-3 text-accent" />
                <span>
                  {t('bookingFormDate')}: {new Date(bookingDetails.date).toLocaleDateString(language)}
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="mr-3 text-accent" />
                <span>
                  {t('bookingFormTime')}: {bookingDetails.time}
                </span>
              </div>
              <div className="flex items-center">
                <Users size={20} className="mr-3 text-accent" />
                <span>
                  {t('bookingFormGuests')}: {bookingDetails.guests}
                </span>
              </div>
              {bookingDetails.selectedTableId && (
                <div className="flex items-center">
                  <MapPin size={20} className="mr-3 text-accent" />
                  <span>
                    {t('bookingDetailsSelectedTableShort')}: {bookingDetails.selectedTableId}
                  </span>
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-center">
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
              >
                {t('bookingConfirmationDialogClose')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default BookingConfirmationDialog;