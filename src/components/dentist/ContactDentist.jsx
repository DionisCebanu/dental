import React, { useContext, useState } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Phone, Mail, MapPin, Send } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import AnimatedText from './AnimatedText';
    import emailjs from '@emailjs/browser';

    const SERVICE_ID = 'service_566kca7';
    const TEMPLATE_ADMIN_ID = 'template_6j1ssuo';
    const TEMPLATE_CLIENT_ID = "template_ex6qv5n";
    const PUBLIC_KEY = 'TxNNcraQ9-gmEhy9C';

    const ContactDentist = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
        }
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('dentistContactErrorName', { defaultText: 'Numele este obligatoriu.' });
        if (!formData.phone.trim()) newErrors.phone = t('dentistContactErrorPhone', { defaultText: 'Telefonul este obligatoriu.' });
        else if (!/^\+?[0-9\s-()]{7,}$/.test(formData.phone)) newErrors.phone = t('dentistContactErrorPhoneInvalid', { defaultText: 'Număr de telefon invalid.' });
        if (!formData.email.trim()) newErrors.email = t('dentistContactErrorEmail', { defaultText: 'Emailul este obligatoriu.' });
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('dentistContactErrorEmailInvalid', { defaultText: 'Adresă de email invalidă.' });
        if (!formData.message.trim()) newErrors.message = t('dentistContactErrorMessage', { defaultText: 'Mesajul este obligatoriu.' });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
          toast({
            title: t('dentistContactErrorFormTitle', { defaultText: "Eroare Formular" }),
            description: t('dentistContactErrorFormDesc', { defaultText: "Vă rugăm corectați erorile din formular." }),
            variant: "destructive"
          });
          return;
        }

        setIsSubmitting(true);

        try {
          const templateParams = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          };

          // 1) Email către CLINICĂ / ADMIN
          await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ADMIN_ID,
            templateParams,
            PUBLIC_KEY
          );

          // 2) Email de CONFIRMARE către CLIENT
          await emailjs.send(
            SERVICE_ID,
            TEMPLATE_CLIENT_ID,
            {
              ...templateParams,
              to_email: formData.email, // 👈 trebuie să existe {{to_email}} în template
            },
            PUBLIC_KEY
          );

          toast({
            title: t('dentistContactSuccessTitle', { defaultText: "Mesaj Trimis!" }),
            description: t('dentistContactSuccessDesc', { defaultText: "Vă mulțumim! Vă vom contacta în cel mai scurt timp." }),
            className: "bg-green-500 text-white"
          });

          setFormData({ name: '', phone: '', email: '', message: '' });
          setErrors({});
        } catch (error) {
          console.error('EmailJS error:', error);
          toast({
            title: t('dentistContactErrorFormTitle', { defaultText: "Eroare la trimitere" }),
            description: t('dentistContactSendErrorDesc', { defaultText: "Mesajul nu a fost trimis. Încercați din nou." }),
            variant: "destructive"
          });
        } finally {
          setIsSubmitting(false);
        }
      };


      return (
        <section id="contact" className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedText 
                  text={t('dentistContactTitle', { defaultText: "Contact & Programări" })} 
                  el="h2"
                  className="text-3xl sm:text-4xl text-foreground mb-4" 
                />
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {t('dentistContactSubtitle', { defaultText: "Suntem aici pentru dumneavoastră! Contactați-ne pentru orice întrebare sau pentru a programa o consultație." })}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="bg-card p-8 rounded-lg shadow-xl"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6">{t('dentistContactFormTitle', { defaultText: "Trimiteți-ne un Mesaj" })}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t('dentistContactNameLabel', { defaultText: "Nume Complet" })}</Label>
                    <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`mt-1 ${errors.name ? 'border-red-500' : ''}`} />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">{t('dentistContactPhoneLabel', { defaultText: "Telefon" })}</Label>
                      <Input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`} />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">{t('dentistContactEmailLabel', { defaultText: "Adresă Email" })}</Label>
                      <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 ${errors.email ? 'border-red-500' : ''}`} />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">{t('dentistContactMessageLabel', { defaultText: "Mesajul Dvs." })}</Label>
                    <Textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className={`mt-1 ${errors.message ? 'border-red-500' : ''}`} />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    <Send size={18} className="mr-2" /> {t('dentistContactSendButton', { defaultText: "Trimite Mesajul" })}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-8"
              >
                <div className="bg-card p-8 rounded-lg shadow-xl">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">{t('dentistContactInfoTitle', { defaultText: "Informații de Contact" })}</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="flex items-start"><MapPin size={20} className="mr-3 mt-1 text-primary flex-shrink-0" /> {t('dentistContactAddress', { defaultText: "Strada București 77, Chișinău, Moldova" })}</p>
                    <p className="flex items-center"><Phone size={20} className="mr-3 text-primary flex-shrink-0" /> <a href="tel:+37378067111" className="hover:text-primary transition-colors">078067111</a></p>
                    <p className="flex items-center"><Mail size={20} className="mr-3 text-primary flex-shrink-0" /> <a href="mailto:alinatrafaila@gmail.com" className="hover:text-primary transition-colors">alinatrafaila@gmail.com</a></p>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">{t('dentistContactHoursTitle', { defaultText: "Program" })}:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>{t('dentistContactHoursMondayFriday', { defaultText: "Luni - Vineri: 09:00 - 20:00" })}</li>
                    <li>{t('dentistContactHoursSaturday', { defaultText: "Sâmbătă: 09:00 - 14:00 (Programări)" })}</li>
                    <li>{t('dentistContactHoursSunday', { defaultText: "Duminică: Închis" })}</li>
                  </ul>
                </div>
                <div className="bg-card h-72 rounded-lg shadow-xl overflow-hidden">
                   <iframe 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=28.8183969%2C47.0112686%2C28.8383969%2C47.0312686&layer=mapnik&marker=47.0212686%2C28.8283969" 
                    className="w-full h-full border-0"
                    title={t('dentistContactMapTitle', { defaultText: "Locația Clinicii RaDen"})}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default ContactDentist;