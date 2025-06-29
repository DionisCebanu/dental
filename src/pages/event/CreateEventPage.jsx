import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
    import { PlusCircle, Calendar, Clock, MapPin, Tag, AlignLeft, Image as ImageIcon, User, CheckCircle, PartyPopper } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { categories as allCategories } from '@/data/eventData';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "circOut" } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "circIn" } }
    };

    const CreateEventPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const initialFormData = {
        name: '', date: '', time: '', location: '', category: '', description: '', imageUrl: '', organizer: '', price: ''
      };
      const [formData, setFormData] = useState(initialFormData);
      const [errors, setErrors] = useState({});
      const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
      const [submittedData, setSubmittedData] = useState(null);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
        }
      };

      const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
         if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
        }
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('errorRequired');
        if (!formData.date) newErrors.date = t('errorRequired');
        if (!formData.time) newErrors.time = t('errorRequired');
        if (!formData.location.trim()) newErrors.location = t('errorRequired');
        if (!formData.category) newErrors.category = t('errorRequired');
        if (!formData.description.trim()) newErrors.description = t('errorRequired');
        else if (formData.description.trim().length < 20) newErrors.description = t('errorMinLength', {length: 20});
        if (!formData.organizer.trim()) newErrors.organizer = t('errorRequired');
        if (formData.price === '' || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) newErrors.price = t('errorPriceInvalid');
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          setSubmittedData(formData);
          setIsConfirmationOpen(true);
        } else {
           toast({
            title: t('validationErrorTitle'),
            description: t('validationErrorDescription'),
            variant: "destructive",
          });
        }
      };
      
      const handleConfirmSubmit = () => {
        console.log('Event Data Confirmed:', submittedData);
        toast({
          title: t('eventCreatedSuccessTitle'),
          description: t('eventCreatedSuccessMessage', { eventName: submittedData.name }),
          variant: "default", 
        });
        setFormData(initialFormData);
        setSubmittedData(null);
        setIsConfirmationOpen(false);
      };

      const today = new Date().toISOString().split('T')[0];

      return (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <Card className="max-w-3xl mx-auto bg-card shadow-2xl border border-border">
            <CardHeader className="text-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="inline-block p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-3"
              >
                <PartyPopper size={40} className="text-primary" />
              </motion.div>
              <CardTitle className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('createEventTitle')}</CardTitle>
              <CardDescription className="text-muted-foreground text-base">{t('createEventSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="flex items-center mb-1.5 text-foreground/90"><User size={16} className="mr-2 text-accent" />{t('createEventFormName')}</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t('createEventFormNamePlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.name ? 'border-destructive ring-destructive ring-1' : ''}`} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="organizer" className="flex items-center mb-1.5 text-foreground/90"><User size={16} className="mr-2 text-accent" />{t('createEventFormOrganizer')}</Label>
                    <Input id="organizer" name="organizer" value={formData.organizer} onChange={handleChange} placeholder={t('createEventFormOrganizerPlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.organizer ? 'border-destructive ring-destructive ring-1' : ''}`} />
                    {errors.organizer && <p className="text-destructive text-xs mt-1">{errors.organizer}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="date" className="flex items-center mb-1.5 text-foreground/90"><Calendar size={16} className="mr-2 text-accent" />{t('createEventFormDate')}</Label>
                    <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} min={today} className={`bg-input border-border focus:ring-primary ${errors.date ? 'border-destructive ring-destructive ring-1' : ''}`} />
                    {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <Label htmlFor="time" className="flex items-center mb-1.5 text-foreground/90"><Clock size={16} className="mr-2 text-accent" />{t('createEventFormTime')}</Label>
                    <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} className={`bg-input border-border focus:ring-primary ${errors.time ? 'border-destructive ring-destructive ring-1' : ''}`} />
                    {errors.time && <p className="text-destructive text-xs mt-1">{errors.time}</p>}
                  </div>
                  <div>
                    <Label htmlFor="price" className="flex items-center mb-1.5 text-foreground/90"><User size={16} className="mr-2 text-accent" />{t('createEventFormPrice')}</Label>
                    <Input id="price" name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} placeholder={t('createEventFormPricePlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.price ? 'border-destructive ring-destructive ring-1' : ''}`} />
                    {errors.price && <p className="text-destructive text-xs mt-1">{errors.price}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center mb-1.5 text-foreground/90"><MapPin size={16} className="mr-2 text-accent" />{t('createEventFormLocation')}</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder={t('createEventFormLocationPlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.location ? 'border-destructive ring-destructive ring-1' : ''}`} />
                  {errors.location && <p className="text-destructive text-xs mt-1">{errors.location}</p>}
                </div>

                <div>
                  <Label htmlFor="category" className="flex items-center mb-1.5 text-foreground/90"><Tag size={16} className="mr-2 text-accent" />{t('createEventFormCategory')}</Label>
                  <Select name="category" onValueChange={(value) => handleSelectChange('category', value)} value={formData.category}>
                    <SelectTrigger className={`w-full bg-input border-border focus:ring-primary ${errors.category ? 'border-destructive ring-destructive ring-1' : ''}`}>
                      <SelectValue placeholder={t('createEventFormCategoryPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategories.filter(c => c.id !== 'all').map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{t(cat.name)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-destructive text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="description" className="flex items-center mb-1.5 text-foreground/90"><AlignLeft size={16} className="mr-2 text-accent" />{t('createEventFormDescription')}</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder={t('createEventFormDescriptionPlaceholder')} rows={5} className={`bg-input border-border focus:ring-primary ${errors.description ? 'border-destructive ring-destructive ring-1' : ''}`} />
                  {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
                </div>
                
                <div>
                  <Label htmlFor="imageUrl" className="flex items-center mb-1.5 text-foreground/90"><ImageIcon size={16} className="mr-2 text-accent" />{t('createEventFormImageURL')}</Label>
                  <Input id="imageUrl" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} placeholder={t('createEventFormImageURLPlaceholder')} className="bg-input border-border focus:ring-primary" />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 text-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/50">
                    <PlusCircle size={20} className="mr-2" /> {t('createEventSubmitButton')}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>

          <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex justify-center mb-4">
                    <CheckCircle size={48} className="text-green-500" />
                </div>
                <AlertDialogTitle className="text-center text-2xl text-primary">{t('eventConfirmationTitle')}</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-muted-foreground">
                  {t('eventConfirmationSubtitle')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {submittedData && (
                <div className="mt-4 space-y-2 text-sm bg-muted/30 p-4 rounded-md border border-border">
                  <p><strong>{t('createEventFormName')}:</strong> {submittedData.name}</p>
                  <p><strong>{t('createEventFormDate')}:</strong> {new Date(submittedData.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>{t('createEventFormTime')}:</strong> {submittedData.time}</p>
                  <p><strong>{t('createEventFormLocation')}:</strong> {submittedData.location}</p>
                  <p><strong>{t('createEventFormCategory')}:</strong> {t(allCategories.find(c => c.id === submittedData.category)?.name || submittedData.category)}</p>
                  <p><strong>{t('createEventFormPrice')}:</strong> ${parseFloat(submittedData.price).toFixed(2)}</p>
                </div>
              )}
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel onClick={() => setIsConfirmationOpen(false)}>{t('cancelButton')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                  {t('confirmSubmitButton')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </motion.div>
      );
    };

    export default CreateEventPage;