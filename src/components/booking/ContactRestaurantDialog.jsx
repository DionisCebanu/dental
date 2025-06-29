import React, { useContext, useRef } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { Phone, Mail, Info, Download } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import DownloadButtons from '@/components/menu/constructor/DownloadButtons';
    import { useToast } from '@/components/ui/use-toast';

    const ContactRestaurantDialog = ({ isOpen, onOpenChange, bookingDetails, mealDetailsRef }) => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();

      if (!bookingDetails) return null;

      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-lg bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <div className="flex flex-col items-center text-center">
                <Info className="w-16 h-16 text-accent mb-4" />
                <DialogTitle className="text-2xl font-bold text-primary mb-2">
                  {t('contactRestaurantDialogTitle', { defaultText: "Meal Preference Saved!"})}
                </DialogTitle>
                <DialogDescription className="text-slate-300">
                  {t('contactRestaurantDialogSubtitle', { bookingId: bookingDetails.bookingId, defaultText: `Your meal preference for booking ${bookingDetails.bookingId} is saved. Please contact us to confirm any special arrangements.` })}
                </DialogDescription>
              </div>
            </DialogHeader>
            
            <div className="my-6 space-y-4 text-slate-200">
              <p className="text-sm text-slate-300">
                {t('contactRestaurantDialogInstructions', { defaultText: "You can download your meal summary below. When contacting us, please mention your Booking ID."})}
              </p>
              
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">{t('contactRestaurantDialogBookingIdLabel', { defaultText: "Your Booking ID:"})}</h3>
                <p className="text-lg font-mono bg-slate-600 px-3 py-1 rounded inline-block">{bookingDetails.bookingId}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-primary mb-3">{t('contactRestaurantDialogDownloadLabel', { defaultText: "Download Your Meal Summary:"})}</h3>
                <DownloadButtons mealSummaryRef={mealDetailsRef} t={t} toast={toast} />
              </div>
            </div>

            <div className="mt-6 border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-primary mb-3 text-center">{t('contactRestaurantDialogContactInfoTitle', { defaultText: "Our Contact Information"})}</h3>
              <div className="space-y-3 text-center">
                <a href={`tel:${t('contactInfoPhone')}`} className="flex items-center justify-center text-accent hover:text-primary transition-colors">
                  <Phone size={18} className="mr-2" />
                  <span>{t('contactInfoPhone')}</span>
                </a>
                <a href={`mailto:${t('contactInfoEmail')}`} className="flex items-center justify-center text-accent hover:text-primary transition-colors">
                  <Mail size={18} className="mr-2" />
                  <span>{t('contactInfoEmail')}</span>
                </a>
              </div>
            </div>

            <DialogFooter className="sm:justify-center mt-8">
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
              >
                {t('contactRestaurantDialogClose', { defaultText: "Close"})}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default ContactRestaurantDialog;