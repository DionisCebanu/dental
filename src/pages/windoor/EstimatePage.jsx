import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { useToast } from '@/components/ui/use-toast';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Calculator, User, Mail, Phone, Layers, Home, Edit3 } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
      out: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } }
    };

    const formItemVariants = {
      initial: { opacity: 0, x: -20 },
      in: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "circOut" } }
    };

    const EstimatePage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '', email: '', phone: '',
        serviceType: '', material: '', numUnits: '', projectDetails: ''
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
      };
      
      const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
         if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('errorFieldRequired');
        if (!formData.email.trim()) newErrors.email = t('errorFieldRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('errorEmailInvalid');
        if (!formData.phone.trim()) newErrors.phone = t('errorFieldRequired');
        else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) newErrors.phone = t('errorPhoneInvalid');
        if (!formData.serviceType) newErrors.serviceType = t('errorFieldRequired');
        if (!formData.numUnits.trim()) newErrors.numUnits = t('errorFieldRequired');
        else if (isNaN(formData.numUnits) || Number(formData.numUnits) <= 0) newErrors.numUnits = t('errorNumUnitsPositive');
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
          toast({ variant: "destructive", title: "Validation Error", description: "Please fill all required fields correctly." });
          return;
        }
        setIsSubmitting(true);
        
        console.log("Estimate Form Data:", formData);
        localStorage.setItem(`estimateRequest_${Date.now()}`, JSON.stringify(formData));

        setTimeout(() => {
          toast({
            title: t('estimateToastSuccessTitle'),
            description: t('estimateToastSuccessDesc', { name: formData.name }),
            className: "bg-secondary text-secondary-foreground"
          });
          setFormData({ name: '', email: '', phone: '', serviceType: '', material: '', numUnits: '', projectDetails: '' });
          setErrors({});
          setIsSubmitting(false);
        }, 1000);
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
            className="max-w-3xl mx-auto"
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: 0.1, staggerChildren: 0.15}}}
          >
            <motion.div variants={formItemVariants} className="text-center mb-10">
              <Calculator size={48} className="mx-auto text-primary mb-3" />
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-primary">
                {t('estimatePageTitle')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {t('estimatePageSubtitle')}
              </p>
            </motion.div>

            <Card className="bg-card shadow-xl border-border/50">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants}>
                      <Label htmlFor="name" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><User size={16} className="mr-2 text-primary"/>{t('contactFormFullName')}</Label>
                      <Input id="name" name="name" placeholder={t('contactFormFullNamePlaceholder')} value={formData.name} onChange={handleChange} className={`focus:ring-primary ${errors.name ? 'border-destructive' : ''}`} />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </motion.div>
                    <motion.div variants={formItemVariants}>
                      <Label htmlFor="email" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><Mail size={16} className="mr-2 text-primary"/>{t('contactFormEmail')}</Label>
                      <Input id="email" name="email" type="email" placeholder={t('contactFormEmailPlaceholder')} value={formData.email} onChange={handleChange} className={`focus:ring-primary ${errors.email ? 'border-destructive' : ''}`} />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </motion.div>
                  </div>
                  
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="phone" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><Phone size={16} className="mr-2 text-primary"/>{t('contactFormPhone')}</Label>
                    <Input id="phone" name="phone" type="tel" placeholder={t('contactFormPhonePlaceholder')} value={formData.phone} onChange={handleChange} className={`focus:ring-primary ${errors.phone ? 'border-destructive' : ''}`} />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants}>
                      <Label htmlFor="serviceType" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><Home size={16} className="mr-2 text-primary"/>{t('estimateFormServiceType')}</Label>
                      <Select name="serviceType" onValueChange={(value) => handleSelectChange('serviceType', value)} value={formData.serviceType} >
                        <SelectTrigger className={`w-full focus:ring-primary ${errors.serviceType ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder={t('estimateFormServiceType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="windows">{t('estimateFormServiceWindows')}</SelectItem>
                          <SelectItem value="doors">{t('estimateFormServiceDoors')}</SelectItem>
                          <SelectItem value="both">{t('estimateFormServiceBoth')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.serviceType && <p className="text-destructive text-xs mt-1">{errors.serviceType}</p>}
                    </motion.div>
                    <motion.div variants={formItemVariants}>
                      <Label htmlFor="material" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><Layers size={16} className="mr-2 text-primary"/>{t('estimateFormMaterial')}</Label>
                      <Select name="material" onValueChange={(value) => handleSelectChange('material', value)} value={formData.material}>
                        <SelectTrigger className="w-full focus:ring-primary">
                          <SelectValue placeholder={t('estimateFormMaterial')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vinyl">{t('estimateFormMaterialVinyl')}</SelectItem>
                          <SelectItem value="wood">{t('estimateFormMaterialWood')}</SelectItem>
                          <SelectItem value="aluminum">{t('estimateFormMaterialAluminum')}</SelectItem>
                          <SelectItem value="fiberglass">{t('estimateFormMaterialFiberglass')}</SelectItem>
                          <SelectItem value="notsure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                  
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="numUnits" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><Edit3 size={16} className="mr-2 text-primary"/>{t('estimateFormNumUnits')}</Label>
                    <Input id="numUnits" name="numUnits" type="number" placeholder={t('estimateFormNumUnitsPlaceholder')} value={formData.numUnits} onChange={handleChange} min="1" className={`focus:ring-primary ${errors.numUnits ? 'border-destructive' : ''}`} />
                    {errors.numUnits && <p className="text-destructive text-xs mt-1">{errors.numUnits}</p>}
                  </motion.div>
                  
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="projectDetails" className="flex items-center mb-1.5 text-sm font-medium text-foreground/90"><Edit3 size={16} className="mr-2 text-primary"/>{t('estimateFormProjectDetails')}</Label>
                    <Textarea id="projectDetails" name="projectDetails" placeholder={t('estimateFormProjectDetailsPlaceholder')} value={formData.projectDetails} onChange={handleChange} rows={4} className="focus:ring-primary" />
                  </motion.div>

                  <motion.div variants={formItemVariants} className="pt-2">
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 text-lg" disabled={isSubmitting}>
                      {isSubmitting ? t('contactFormSending') : t('estimateFormSubmit')}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      );
    };
    export default EstimatePage;