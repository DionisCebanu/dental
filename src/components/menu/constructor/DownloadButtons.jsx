import React from 'react';
    import { Button } from '@/components/ui/button';
    import { FileImage, FileText } from 'lucide-react';
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';

    const DownloadButtons = ({ mealSummaryRef, t, toast }) => {
      const handleDownloadPNG = () => {
        if (mealSummaryRef.current) {
          html2canvas(mealSummaryRef.current, { 
            backgroundColor: '#334155', 
            scale: 2,
            useCORS: true 
          }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'personalized-meal.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            toast({ title: t('downloadPNGSuccessTitle', { defaultText: 'PNG Downloaded' }), description: t('downloadPNGSuccessDesc', { defaultText: 'Your personalized meal image has been downloaded.' }) });
          }).catch(err => {
            console.error("Error generating PNG:", err);
            toast({ title: t('downloadErrorTitle', { defaultText: 'Download Error' }), description: t('downloadPNGErrorDesc', { defaultText: 'Could not generate PNG. Please try again.' }), variant: 'destructive'});
          });
        }
      };

      const handleDownloadPDF = () => {
        if (mealSummaryRef.current) {
          html2canvas(mealSummaryRef.current, { 
            backgroundColor: '#334155',
            scale: 2,
            useCORS: true 
          }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('personalized-meal.pdf');
            toast({ title: t('downloadPDFSuccessTitle', { defaultText: 'PDF Downloaded' }), description: t('downloadPDFSuccessDesc', { defaultText: 'Your personalized meal PDF has been downloaded.' }) });
          }).catch(err => {
            console.error("Error generating PDF:", err);
            toast({ title: t('downloadErrorTitle', { defaultText: 'Download Error' }), description: t('downloadPDFErrorDesc', { defaultText: 'Could not generate PDF. Please try again.' }), variant: 'destructive'});
          });
        }
      };

      return (
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button onClick={handleDownloadPNG} variant="outline" className="border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 w-full">
            <FileImage size={18} className="mr-2"/> {t('downloadPNG', { defaultText: 'Save as PNG' })}
          </Button>
          <Button onClick={handleDownloadPDF} variant="outline" className="border-rose-500 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 w-full">
            <FileText size={18} className="mr-2"/> {t('downloadPDF', { defaultText: 'Save as PDF' })}
          </Button>
        </div>
      );
    };

    export default DownloadButtons;