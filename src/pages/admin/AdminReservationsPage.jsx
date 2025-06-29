import React, { useState, useEffect, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
    import { Card, CardContent } from '@/components/ui/card';
    import { Eye, Edit3, Trash2, Filter, Search, CalendarDays } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
    } from "@/components/ui/dialog";

    const mockReservations = [
      { id: 'BK-20250523-AB1CD', date: '2025-05-23', time: '19:00', guests: 4, name: 'John Doe', phone: '555-1234', email: 'john@example.com', tableId: 'T2', status: 'Confirmed' },
      { id: 'BK-20250523-EF2GH', date: '2025-05-23', time: '20:30', guests: 2, name: 'Jane Smith', phone: '555-5678', email: 'jane@example.com', tableId: 'T1', status: 'Pending' },
      { id: 'BK-20250524-IJ3KL', date: '2025-05-24', time: '18:00', guests: 6, name: 'Alice Brown', phone: '555-9012', email: 'alice@example.com', tableId: 'B1', status: 'Cancelled' },
    ];

    const AdminReservationsPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [reservations, setReservations] = useState([]);
      const [filteredReservations, setFilteredReservations] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [filterDate, setFilterDate] = useState('');
      const [selectedReservation, setSelectedReservation] = useState(null);
      const [isViewModalOpen, setIsViewModalOpen] = useState(false);

      useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('restaurantBookings')) || mockReservations;
        setReservations(storedReservations);
        setFilteredReservations(storedReservations);
      }, []);

      useEffect(() => {
        let tempReservations = reservations;
        if (searchTerm) {
          tempReservations = tempReservations.filter(res =>
            res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.phone.includes(searchTerm) ||
            res.id.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        if (filterDate) {
          tempReservations = tempReservations.filter(res => res.date === filterDate);
        }
        setFilteredReservations(tempReservations);
      }, [searchTerm, filterDate, reservations]);

      const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
        setIsViewModalOpen(true);
      };

      const handleEditReservation = (reservationId) => {
        toast({ title: t('adminActionInProgressTitle', {defaultText: "Action in Progress"}), description: t('adminReservationsEditDesc', {defaultText: `Editing reservation ${reservationId} (placeholder).`}) });
      };

      const handleDeleteReservation = (reservationId) => {
        toast({ title: t('adminActionInProgressTitle', {defaultText: "Action in Progress"}), description: t('adminReservationsDeleteDesc', {defaultText: `Deleting reservation ${reservationId} (placeholder).`}), variant: "destructive" });
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-primary">{t('adminNavReservations', { defaultText: "Manage Reservations"})}</h1>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <CalendarDays size={18} className="mr-2" /> {t('adminReservationsAddNew', { defaultText: "Add New Reservation"})}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-800 rounded-lg shadow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder={t('adminReservationsSearchPlaceholder', { defaultText: "Search by name, email, phone, ID..."})}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-slate-100 focus:ring-primary"
              />
            </div>
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-100 focus:ring-primary"
            />
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterDate(''); }} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Filter size={18} className="mr-2" /> {t('adminReservationsClearFilters', { defaultText: "Clear Filters"})}
            </Button>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <Table>
                <TableCaption className="text-slate-400 py-4">{t('adminReservationsTableCaption', { defaultText: "A list of current and past reservations."})}</TableCaption>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300">{t('adminReservationsTableID', { defaultText: "ID"})}</TableHead>
                    <TableHead className="text-slate-300">{t('adminReservationsTableName', { defaultText: "Name"})}</TableHead>
                    <TableHead className="text-slate-300">{t('adminReservationsTableDate', { defaultText: "Date"})}</TableHead>
                    <TableHead className="text-slate-300">{t('adminReservationsTableTime', { defaultText: "Time"})}</TableHead>
                    <TableHead className="text-slate-300 text-center">{t('adminReservationsTableGuests', { defaultText: "Guests"})}</TableHead>
                    <TableHead className="text-slate-300">{t('adminReservationsTableStatus', { defaultText: "Status"})}</TableHead>
                    <TableHead className="text-slate-300 text-right">{t('adminReservationsTableActions', { defaultText: "Actions"})}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((res) => (
                    <TableRow key={res.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell className="font-medium text-primary">{res.id.substring(0,12)}...</TableCell>
                      <TableCell className="text-slate-200">{res.name}</TableCell>
                      <TableCell className="text-slate-300">{res.date}</TableCell>
                      <TableCell className="text-slate-300">{res.time}</TableCell>
                      <TableCell className="text-slate-300 text-center">{res.guests}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                          ${res.status === 'Confirmed' ? 'bg-green-600/30 text-green-300' : 
                            res.status === 'Pending' ? 'bg-yellow-600/30 text-yellow-300' : 
                            'bg-red-600/30 text-red-300'}`}>
                          {t(`adminReservationStatus${res.status}`, { defaultText: res.status})}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetails(res)} className="text-blue-400 hover:text-blue-300">
                          <Eye size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditReservation(res.id)} className="text-yellow-400 hover:text-yellow-300">
                          <Edit3 size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteReservation(res.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedReservation && (
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="bg-slate-850 border-slate-700 text-slate-100">
                <DialogHeader>
                  <DialogTitle className="text-primary text-2xl">{t('adminReservationsViewTitle', { defaultText: "Reservation Details"})}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {t('adminReservationsViewSubtitle', { defaultText: "Viewing details for booking ID:"})} {selectedReservation.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4 text-sm">
                  <div><strong className="text-slate-400">{t('adminReservationsTableName', { defaultText: "Name"})}:</strong> {selectedReservation.name}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTableEmail', { defaultText: "Email"})}:</strong> {selectedReservation.email}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTablePhone', { defaultText: "Phone"})}:</strong> {selectedReservation.phone}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTableDate', { defaultText: "Date"})}:</strong> {selectedReservation.date}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTableTime', { defaultText: "Time"})}:</strong> {selectedReservation.time}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTableGuests', { defaultText: "Guests"})}:</strong> {selectedReservation.guests}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTableTableID', { defaultText: "Table ID"})}:</strong> {selectedReservation.tableId}</div>
                  <div><strong className="text-slate-400">{t('adminReservationsTableStatus', { defaultText: "Status"})}:</strong> 
                    <span className={`px-2 py-0.5 ml-1 text-xs font-semibold rounded-full
                      ${selectedReservation.status === 'Confirmed' ? 'bg-green-600/30 text-green-300' : 
                        selectedReservation.status === 'Pending' ? 'bg-yellow-600/30 text-yellow-300' : 
                        'bg-red-600/30 text-red-300'}`}>
                      {t(`adminReservationStatus${selectedReservation.status}`, { defaultText: selectedReservation.status})}
                    </span>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      {t('closeButtonText', { defaultText: "Close"})}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      );
    };

    export default AdminReservationsPage;