import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from '@/components/ui/use-toast';
    import { MapPin, Phone, Mail, Send } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const Contact = () => {
      const { toast } = useToast();
      const { t } = useContext(LanguageContext);
      const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: '',
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('errorFieldRequired');
        if (!formData.email.trim()) newErrors.email = t('errorFieldRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('errorEmailInvalid');
        if (!formData.message.trim()) newErrors.message = t('errorFieldRequired');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateForm()) {
          toast({ variant: "destructive", title: "Validation Error", description: "Please fill all required fields." });
          return;
        }
        setIsSubmitting(true);
        
        console.log('Contact form data submitted:', formData);
        localStorage.setItem(`contactMessage_${Date.now()}`, JSON.stringify(formData));
        
        setTimeout(() => {
          toast({
            title: t('contactToastSuccessTitle'),
            description: t('contactToastSuccessDesc'),
            className: "bg-secondary text-secondary-foreground"
          });
          setFormData({ name: '', email: '', phone: '', message: '' });
          setErrors({});
          setIsSubmitting(false);
        }, 1000);
      };
      
      const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
      };
      
      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      };


      return (
        <section id="contact" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <Mail size={48} className="mx-auto text-primary mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">{t('contactTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">We're here to help! Reach out for any inquiries or to start your project.</p>
            </motion.div>
            
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
              <motion.div 
                className="lg:col-span-2 space-y-8"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={itemVariants} className="p-6 bg-card rounded-lg shadow-md border border-border/50">
                  <h3 className="text-xl font-semibold text-primary mb-3">{t('contactInfoTitle')}</h3>
                  <div className="space-y-2.5 text-sm text-foreground/90">
                    <p className="flex items-center"><MapPin size={18} className="mr-2.5 text-accent" /> {t('contactAddress')}</p>
                    <p className="flex items-center"><Phone size={18} className="mr-2.5 text-accent" /><a href={`tel:${t('contactPhone')}`} className="hover:text-accent transition-colors">{t('contactPhone')}</a></p>
                    <p className="flex items-center"><Mail size={18} className="mr-2.5 text-accent" /><a href={`mailto:${t('contactEmail')}`} className="hover:text-accent transition-colors">{t('contactEmail')}</a></p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 w-full border border-border/50"
                >
                   <img  
                    className="w-full h-full object-cover" 
                    alt="Map showing company location"
                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" />
                </motion.div>
              </motion.div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="lg:col-span-3 space-y-5 p-6 sm:p-8 bg-card rounded-lg shadow-xl border border-border/50"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={itemVariants}>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground/90">{t('contactFormFullName')}</Label>
                  <Input id="name" name="name" placeholder={t('contactFormFullNamePlaceholder')} value={formData.name} onChange={handleChange} className={`mt-1.5 focus:ring-primary ${errors.name ? 'border-destructive' : ''}`} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground/90">{t('contactFormEmail')}</Label>
                  <Input id="email" name="email" type="email" placeholder={t('contactFormEmailPlaceholder')} value={formData.email} onChange={handleChange} className={`mt-1.5 focus:ring-primary ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground/90">{t('contactFormPhone')} (Optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder={t('contactFormPhonePlaceholder')} value={formData.phone} onChange={handleChange} className="mt-1.5 focus:ring-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="message" className="text-sm font-medium text-foreground/90">{t('contactFormMessage')}</Label>
                  <Textarea id="message" name="message" placeholder={t('contactFormMessagePlaceholder')} value={formData.message} onChange={handleChange} rows={4} className={`mt-1.5 focus:ring-primary ${errors.message ? 'border-destructive' : ''}`} />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </motion.div>
                <motion.div variants={itemVariants} className="pt-1">
                  <Button type="submit" variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold group" disabled={isSubmitting}>
                    {isSubmitting ? t('contactFormSending') : t('contactFormSend')}
                    {!isSubmitting && <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform"/>}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </section>
      );
    };

    export default Contact;