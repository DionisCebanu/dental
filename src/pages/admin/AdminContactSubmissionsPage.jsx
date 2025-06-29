import React, { useState, useEffect, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
    import { Eye, Trash2, MailCheck, Search } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Input } from '@/components/ui/input';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
    } from "@/components/ui/dialog";

    const mockSubmissions = [
      { id: 'SUB001', name: 'Elena Voyager', email: 'elena@example.com', message: 'Inquiring about private event hosting for a birthday party of 20 people.', date: '2025-05-20', status: 'New' },
      { id: 'SUB002', name: 'Marcus Aurelius', email: 'marcus@stoic.com', message: 'Loved the Zeamă! Will be back soon. Any gluten-free options for sarmale?', date: '2025-05-18', status: 'Read' },
      { id: 'SUB003', name: 'Ada Lovelace', email: 'ada@analytics.dev', message: 'Feedback on website: The booking form date picker is excellent.', date: '2025-05-15', status: 'Archived' },
    ];

    const AdminContactSubmissionsPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [submissions, setSubmissions] = useState([]);
      const [filteredSubmissions, setFilteredSubmissions] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedSubmission, setSelectedSubmission] = useState(null);
      const [isViewModalOpen, setIsViewModalOpen] = useState(false);

      useEffect(() => {
        const storedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || mockSubmissions;
        setSubmissions(storedSubmissions);
        setFilteredSubmissions(storedSubmissions);
      }, []);

      useEffect(() => {
        let tempSubmissions = submissions;
        if (searchTerm) {
          tempSubmissions = tempSubmissions.filter(sub =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.message.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setFilteredSubmissions(tempSubmissions);
      }, [searchTerm, submissions]);

      const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission);
        setIsViewModalOpen(true);
        if (submission.status === 'New') {
          // Mark as read (placeholder)
          setSubmissions(prev => prev.map(s => s.id === submission.id ? { ...s, status: 'Read' } : s));
        }
      };

      const handleMarkAsRead = (submissionId) => {
        setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'Read' } : s));
        toast({ title: t('adminSubmissionsMarkReadTitle'), description: t('adminSubmissionsMarkReadDesc', { submissionId }) });
      };
      
      const handleDeleteSubmission = (submissionId) => {
        setSubmissions(prev => prev.filter(s => s.id !== submissionId));
        toast({ title: t('adminSubmissionsDeletedTitle'), description: t('adminSubmissionsDeletedDesc', { submissionId }), variant: "destructive" });
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-primary">{t('adminNavContactSubmissions', { defaultText: "Contact Form Submissions"})}</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder={t('adminSubmissionsSearchPlaceholder', { defaultText: "Search submissions..."})}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-slate-100 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map(sub => (
              <Card key={sub.id} className={`bg-slate-800 border-slate-700 hover:shadow-primary/20 transition-shadow ${sub.status === 'New' ? 'border-l-4 border-l-accent' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-primary">{sub.name}</CardTitle>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full
                      ${sub.status === 'New' ? 'bg-accent/20 text-accent' : 
                        sub.status === 'Read' ? 'bg-blue-600/30 text-blue-300' : 
                        'bg-slate-600/30 text-slate-400'}`}>
                      {t(`adminSubmissionStatus${sub.status}`, { defaultText: sub.status})}
                    </span>
                  </div>
                  <CardDescription className="text-xs text-slate-400">{sub.email} - {sub.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 line-clamp-3">{sub.message}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleViewSubmission(sub)} className="text-blue-400 hover:text-blue-300">
                    <Eye size={16} className="mr-1" /> {t('viewButtonText')}
                  </Button>
                  {sub.status === 'New' && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(sub.id)} className="text-green-400 hover:text-green-300">
                      <MailCheck size={16} className="mr-1" /> {t('adminSubmissionsMarkReadButton')}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteSubmission(sub.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} className="mr-1" /> {t('deleteButtonText')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {filteredSubmissions.length === 0 && (
              <p className="text-slate-400 col-span-full text-center py-8">{t('adminSubmissionsNoResults', { defaultText: "No submissions found matching your criteria."})}</p>
            )}
          </div>

          {selectedSubmission && (
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="bg-slate-850 border-slate-700 text-slate-100 max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-primary text-2xl">{t('adminSubmissionsViewTitle', { defaultText: "Submission Details"})}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {t('adminSubmissionsViewFrom', { defaultText: "From:"})} {selectedSubmission.name} ({selectedSubmission.email})
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <p><strong className="text-slate-400">{t('adminSubmissionsViewDate', { defaultText: "Date:"})}</strong> {selectedSubmission.date}</p>
                  <p><strong className="text-slate-400">{t('adminSubmissionsViewStatus', { defaultText: "Status:"})}</strong> {selectedSubmission.status}</p>
                  <div>
                    <strong className="text-slate-400 block mb-1">{t('adminSubmissionsViewMessage', { defaultText: "Message:"})}</strong>
                    <p className="p-3 bg-slate-700/50 rounded-md text-slate-200 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      {t('closeButtonText')}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      );
    };

    export default AdminContactSubmissionsPage;