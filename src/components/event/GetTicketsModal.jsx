import React, { useState, useContext } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Progress } from '@/components/ui/progress';
    import { LanguageContext } from '@/context/LanguageContext';
    import { useToast } from '@/components/ui/use-toast';
    import { X, Ticket, User, Mail, CheckCircle, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';

    const stepVariants = {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    };

    const GetTicketsModal = ({ isOpen, setIsOpen, event }) => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [currentStep, setCurrentStep] = useState(1);
      const [ticketCount, setTicketCount] = useState(1);
      const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
      const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
      const [errors, setErrors] = useState({});

      const maxTickets = event.capacity - event.ticketsSold;

      const handleNextStep = () => {
        if (validateStep()) {
          setCurrentStep(prev => prev + 1);
        }
      };
      const handlePrevStep = () => setCurrentStep(prev => prev - 1);

      const validateStep = () => {
        const newErrors = {};
        if (currentStep === 1) {
          if (ticketCount <= 0) newErrors.ticketCount = t('errorTicketsMin');
          if (ticketCount > maxTickets) newErrors.ticketCount = t('errorTicketsMax', { max: maxTickets });
        } else if (currentStep === 2) {
          if (!contactInfo.name.trim()) newErrors.name = t('errorRequired');
          if (!contactInfo.email.trim()) newErrors.email = t('errorRequired');
          else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) newErrors.email = t('errorEmailInvalid');
        } else if (currentStep === 3 && event.price > 0) {
          if (!paymentInfo.cardNumber.trim() || !/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = t('errorCardNumberInvalid');
          if (!paymentInfo.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) newErrors.expiryDate = t('errorExpiryDateInvalid');
          if (!paymentInfo.cvv.trim() || !/^\d{3,4}$/.test(paymentInfo.cvv)) newErrors.cvv = t('errorCvvInvalid');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleTicketCountChange = (e) => {
        let count = parseInt(e.target.value, 10);
        if (isNaN(count)) count = 0;
        if (count < 1 && e.target.value !== '') count = 1;
        if (count > maxTickets) count = maxTickets;
        setTicketCount(count);
        if (errors.ticketCount) setErrors(prev => ({...prev, ticketCount: null}));
      };
      
      const handleInputChange = (stepKey, field, value) => {
        if (stepKey === 'contact') {
          setContactInfo(prev => ({ ...prev, [field]: value }));
        } else if (stepKey === 'payment') {
          setPaymentInfo(prev => ({ ...prev, [field]: value }));
        }
        if (errors[field]) setErrors(prev => ({...prev, [field]: null}));
      };

      const handleSubmit = () => {
        if (validateStep()) {
          console.log("Ticket Purchase Data:", { eventId: event.id, ticketCount, contactInfo, paymentInfo: event.price > 0 ? paymentInfo : "N/A (Free Event)" });
          toast({
            title: t('ticketPurchaseSuccessTitle'),
            description: t('ticketPurchaseSuccessMessage'),
            variant: "default",
          });
          setCurrentStep(event.price > 0 ? 4 : 3); // Skip payment for free events
        }
      };
      
      const totalSteps = event.price > 0 ? 4 : 3;
      const progress = (currentStep / totalSteps) * 100;

      const resetForm = () => {
        setCurrentStep(1);
        setTicketCount(1);
        setContactInfo({ name: '', email: '' });
        setPaymentInfo({ cardNumber: '', expiryDate: '', cvv: '' });
        setErrors({});
      };

      return (
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogContent className="sm:max-w-md bg-card border-border shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary flex items-center">
                <Ticket size={28} className="mr-3 text-accent" /> {t('getTicketsFor')} "{event.name}"
              </DialogTitle>
              <DialogDescription>{t('getTicketsSubtitle', { step: currentStep, totalSteps: totalSteps })}</DialogDescription>
            </DialogHeader>
            
            <Progress value={progress} className="w-full h-2 my-4" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4 min-h-[200px]"
              >
                {currentStep === 1 && (
                  <div>
                    <Label htmlFor="ticketCount" className="text-foreground/90">{t('numberOfTickets')}</Label>
                    <Input 
                      id="ticketCount" 
                      type="number" 
                      value={ticketCount} 
                      onChange={handleTicketCountChange} 
                      min="1" 
                      max={maxTickets}
                      className={`bg-input border-border focus:ring-primary ${errors.ticketCount ? 'border-destructive ring-destructive ring-1' : ''}`}
                    />
                    {errors.ticketCount && <p className="text-destructive text-xs mt-1">{errors.ticketCount}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{t('ticketsAvailable', { count: maxTickets })}</p>
                    {event.price > 0 && <p className="text-lg font-semibold mt-3 text-accent">{t('totalPrice')}: ${(ticketCount * event.price).toFixed(2)}</p>}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="flex items-center text-foreground/90"><User size={16} className="mr-2 text-accent" />{t('contactName')}</Label>
                      <Input id="name" value={contactInfo.name} onChange={(e) => handleInputChange('contact', 'name', e.target.value)} placeholder={t('contactNamePlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.name ? 'border-destructive ring-destructive ring-1' : ''}`} />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="flex items-center text-foreground/90"><Mail size={16} className="mr-2 text-accent" />{t('contactEmail')}</Label>
                      <Input id="email" type="email" value={contactInfo.email} onChange={(e) => handleInputChange('contact', 'email', e.target.value)} placeholder={t('contactEmailPlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.email ? 'border-destructive ring-destructive ring-1' : ''}`} />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && event.price > 0 && (
                   <div className="space-y-3">
                    <div>
                      <Label htmlFor="cardNumber" className="flex items-center text-foreground/90"><CreditCard size={16} className="mr-2 text-accent" />{t('paymentCardNumber')}</Label>
                      <Input id="cardNumber" value={paymentInfo.cardNumber} onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)} placeholder="0000 0000 0000 0000" className={`bg-input border-border focus:ring-primary ${errors.cardNumber ? 'border-destructive ring-destructive ring-1' : ''}`} />
                      {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiryDate" className="text-foreground/90">{t('paymentExpiryDate')}</Label>
                        <Input id="expiryDate" value={paymentInfo.expiryDate} onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)} placeholder="MM/YY" className={`bg-input border-border focus:ring-primary ${errors.expiryDate ? 'border-destructive ring-destructive ring-1' : ''}`} />
                        {errors.expiryDate && <p className="text-destructive text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-foreground/90">{t('paymentCVV')}</Label>
                        <Input id="cvv" value={paymentInfo.cvv} onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)} placeholder="123" className={`bg-input border-border focus:ring-primary ${errors.cvv ? 'border-destructive ring-destructive ring-1' : ''}`} />
                        {errors.cvv && <p className="text-destructive text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {(currentStep === 3 && event.price === 0) && (
                  <div className="text-center py-8">
                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-2xl font-semibold text-foreground">{t('ticketConfirmationTitleFree')}</h3>
                    <p className="text-muted-foreground mt-2">{t('ticketConfirmationSubtitleFree', { eventName: event.name, count: ticketCount })}</p>
                    <p className="text-muted-foreground mt-1">{t('checkYourEmail')}</p>
                  </div>
                )}

                {currentStep === 4 && event.price > 0 && (
                  <div className="text-center py-8">
                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-2xl font-semibold text-foreground">{t('ticketConfirmationTitlePaid')}</h3>
                    <p className="text-muted-foreground mt-2">{t('ticketConfirmationSubtitlePaid', { eventName: event.name, count: ticketCount, price: (ticketCount * event.price).toFixed(2) })}</p>
                    <p className="text-muted-foreground mt-1">{t('checkYourEmail')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <DialogFooter className="mt-6 pt-4 border-t border-border">
              {currentStep > 1 && currentStep < totalSteps && (
                <Button variant="outline" onClick={handlePrevStep} className="border-border hover:bg-muted/50">
                  <ArrowLeft size={16} className="mr-2" /> {t('previousButton')}
                </Button>
              )}
              {currentStep < (event.price > 0 ? 3 : 2) && (
                <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t('nextButton')} <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
              {((currentStep === 3 && event.price > 0) || (currentStep === 2 && event.price === 0)) && (
                 <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle size={16} className="mr-2" /> {event.price > 0 ? t('confirmPaymentButton') : t('confirmFreeTicketsButton')}
                </Button>
              )}
              {currentStep >= totalSteps && (
                <DialogClose asChild>
                  <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsOpen(false)}>{t('closeButton')}</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default GetTicketsModal;