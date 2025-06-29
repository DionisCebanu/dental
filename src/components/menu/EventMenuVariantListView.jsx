import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { ArrowLeft, DollarSign } from 'lucide-react';

    const EventMenuVariantListView = ({ eventType, onSelectVariant, onBack, t }) => {
      return (
        <motion.div
          key="eventVariantList"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Button variant="outline" onClick={onBack} className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700">
            <ArrowLeft size={18} className="mr-2" /> {t('backToEventTypesButton', { defaultText: "Back to Event Types" })}
          </Button>
          <h2 className="text-3xl font-bold text-center text-primary mb-2">{eventType.title}</h2>
          <p className="text-center text-slate-400 mb-8">{t('menuPageSelectPriceVariantPrompt', { defaultText: "Select a price option for your event."})}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventType.variants.map(variant => (
              <Card 
                key={variant.id}
                className="bg-slate-800/70 border-slate-700 hover:border-accent transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-accent/30"
                onClick={() => onSelectVariant(variant)}
              >
                <CardHeader className="items-center text-center">
                  <DollarSign size={32} className="text-accent mb-2" />
                  <CardTitle className="text-2xl text-accent">{variant.variantName}</CardTitle>
                  <CardDescription className="text-slate-300 font-semibold">
                    ${variant.pricePerPerson.toFixed(2)} {t('perPersonSuffix', { defaultText: "per person"})}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {variant.descriptionKey && (
                     <p className="text-sm text-slate-400 text-center">{t(variant.descriptionKey, variant.defaultDescription)}</p>
                  )}
                   <img  alt={variant.variantName} className="rounded-md aspect-video object-cover mt-4" src="https://images.unsplash.com/photo-1600891964092-4316c288032e" />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      );
    };

    export default EventMenuVariantListView;