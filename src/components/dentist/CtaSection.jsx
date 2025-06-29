
    import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { Phone, Clock, Mail, ArrowRight } from 'lucide-react';

    const CtaSection = () => {
        const { t } = useContext(LanguageContext);

        const infoItems = [
            {
                icon: <Phone className="text-background" size={24} />,
                titleKey: "dentistCtaPhoneTitle", defaultTitle: "Sunați-ne Acum",
                infoKey: "dentistContactPhoneNumber", defaultInfo: "0722 000 000",
                href: `tel:${t('dentistContactPhoneNumber', '0722000000')}`
            },
            {
                icon: <Clock className="text-background" size={24} />,
                titleKey: "dentistContactHoursTitle", defaultTitle: "Program",
                infoKey: "dentistContactHoursMondayFriday", defaultInfo: "Luni - Vineri: 09:00 - 20:00"
            },
            {
                icon: <Mail className="text-background" size={24} />,
                titleKey: "dentistCtaEmailTitle", defaultTitle: "Trimiteți-ne un Email",
                infoKey: "dentistContactEmailAddress", defaultInfo: "contact@dentalcare.ro",
                href: `mailto:${t('dentistContactEmailAddress', 'contact@dentalcare.ro')}`
            }
        ];

        return (
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-primary text-primary-foreground"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {infoItems.map((item, index) => (
                                    <div key={index} className={`flex items-center gap-4 ${index < 2 ? 'sm:border-r border-primary-foreground/30' : ''} pr-4`}>
                                        <div className="p-3 bg-primary-foreground/20 rounded-full">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{t(item.titleKey, item.defaultTitle)}</h3>
                                            {item.href ? (
                                                <a href={item.href} className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                                                    {t(item.infoKey, item.defaultInfo)}
                                                </a>
                                            ) : (
                                                <p className="text-sm opacity-90">{t(item.infoKey, item.defaultInfo)}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                           <Button asChild variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90 font-bold">
                               <Link to="/dentist/contact">
                                   {t('dentistCtaButton', {defaultText: "Contactează-ne"})}
                                   <ArrowRight className="ml-2 h-5 w-5"/>
                               </Link>
                           </Button>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    };

    export default CtaSection;
  