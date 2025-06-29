import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { MapPin, Phone, Mail, Send, User, MailCheck } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { useToast } from '@/components/ui/use-toast';
    import { validateContactForm } from '@/utils/validation';

    const sectionVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.7, ease: "easeInOut", staggerChildren: 0.2 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" }}
    };

    const Contact = ({ title, subtitle }) => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [formData, setFormData] = useState({ name: '', email: '', message: '' });
      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
          setErrors(prev => ({ ...prev, [id]: null }));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateContactForm(formData, t);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        
        // Simulate API call
        try {
          console.log("Form submitted:", formData);
          // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
          toast({
            title: t('messageSentSuccess'),
            description: `${t('contactFormFullName')}: ${formData.name}`,
            variant: "default",
          });
          setFormData({ name: '', email: '', message: '' }); // Reset form
          setErrors({});
        } catch (error) {
          toast({
            title: t('messageSentError'),
            description: error.message,
            variant: "destructive",
          });
        }
      };


      return (
        <motion.section 
          className="py-16 sm:py-24 bg-slate-900/50"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
              <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary">
                {title}
              </h2>
              <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div 
                className="bg-slate-800/60 p-8 rounded-xl shadow-2xl border border-slate-700"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">{t('contactInfoAddress').split(',')[1]}</h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-4 mt-1 text-accent flex-shrink-0" />
                    <span className="text-gray-300">{t('contactInfoAddress')}</span>
                  </li>
                  <li className="flex items-center">
                    <Phone size={18} className="mr-4 text-accent flex-shrink-0" />
                    <a href={`tel:${t('contactInfoPhone')}`} className="text-gray-300 hover:text-primary transition-colors">{t('contactInfoPhone')}</a>
                  </li>
                  <li className="flex items-center">
                    <MailCheck size={18} className="mr-4 text-accent flex-shrink-0" />
                    <a href={`mailto:${t('contactInfoEmail')}`} className="text-gray-300 hover:text-primary transition-colors">{t('contactInfoEmail')}</a>
                  </li>
                </ul>
                 <div className="mt-8 h-64 rounded-lg overflow-hidden shadow-lg">
                    <img  
                        className="w-full h-full object-cover" 
                        alt="Restaurant location map placeholder" 
                       src="https://images.unsplash.com/photo-1568952433726-63670a609517" />
                 </div>
              </motion.div>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6 bg-slate-800/60 p-8 rounded-xl shadow-2xl border border-slate-700"
                variants={itemVariants}
              >
                <div>
                  <Label htmlFor="name" className="text-gray-300 flex items-center mb-1.5"><User size={16} className="mr-2 text-secondary" />{t('contactFormFullName')}</Label>
                  <Input id="name" type="text" placeholder={t('contactFormFullNamePlaceholder')} value={formData.name} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.name ? 'border-red-500 ring-red-500' : ''}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300 flex items-center mb-1.5"><Mail size={16} className="mr-2 text-secondary" />{t('contactFormEmail')}</Label>
                  <Input id="email" type="email" placeholder={t('contactFormEmailPlaceholder')} value={formData.email} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.email ? 'border-red-500 ring-red-500' : ''}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-300 flex items-center mb-1.5">{t('contactFormMessage')}</Label>
                  <Textarea id="message" placeholder={t('contactFormMessagePlaceholder')} value={formData.message} onChange={handleChange} rows={5} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.message ? 'border-red-500 ring-red-500' : ''}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 text-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/50">
                    <Send size={18} className="mr-2.5" />{t('contactFormSend')}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.section>
      );
    };

    export default Contact;