import React, { useContext } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { LanguageContext } from '@/context/LanguageContext';
    import { motion } from 'framer-motion';
    import { CheckCircle, MessageSquare } from 'lucide-react';

    const CaseDetailModal = ({ isOpen, onClose, caseDetails }) => {
      const { t } = useContext(LanguageContext);

      if (!caseDetails) return null;

      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-3xl bg-card text-foreground border-border shadow-2xl p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-bold text-primary">
                {t(caseDetails.titleKey, caseDetails.defaultTitle)}
              </DialogTitle>
            </DialogHeader>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-h-[80vh] overflow-y-auto p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-muted-foreground">{t('dentistModalBeforeLabel', { defaultText: "Situația Inițială (Înainte)" })}</h4>
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <img  
                      className="w-full h-full object-cover" 
                      alt={t('dentistBeforeImageLabel', { defaultText: "Before" }) + ": " + t(caseDetails.titleKey, caseDetails.defaultTitle)}
                     src={caseDetails.beforeImageSrc}  />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-muted-foreground">{t('dentistModalAfterLabel', { defaultText: "Rezultat Obținut (După)" })}</h4>
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <img  
                      className="w-full h-full object-cover" 
                      alt={t('dentistAfterImageLabel', { defaultText: "After" }) + ": " + t(caseDetails.titleKey, caseDetails.defaultTitle)}
                     src={caseDetails.afterImageSrc}/>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">{t('dentistModalDescLabel', { defaultText: "Descrierea Cazului și Tratamentului" })}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {t(caseDetails.descriptionKey, caseDetails.defaultDescription)}
                </p>
              </div>

              {caseDetails.testimonialKey && (
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                    <MessageSquare size={22} className="mr-2 text-primary"/>
                    {t('dentistModalTestimonialLabel', { defaultText: "Părerea Pacientului" })}
                  </h4>
                  <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4">
                    "{t(caseDetails.testimonialKey, caseDetails.defaultTestimonial)}"
                  </blockquote>
                </div>
              )}
            </motion.div>
            
            <DialogFooter className="p-6 pt-0 border-t border-border mt-auto">
              <DialogClose asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  {t('dentistModalCloseButton', { defaultText: "Închide" })}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default CaseDetailModal;