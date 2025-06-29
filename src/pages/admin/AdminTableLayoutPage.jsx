import React, { useState, useContext, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import TableLayout from '@/components/booking/TableLayout'; 
    import { initialTablesData } from '@/hooks/useBookingManagement'; 
    import { PlusCircle, Save, RotateCcw } from 'lucide-react';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
    } from "@/components/ui/dialog";
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

    const AdminTableLayoutPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [tables, setTables] = useState([]);
      const [selectedTableForEdit, setSelectedTableForEdit] = useState(null);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [editFormData, setEditFormData] = useState({ id: '', capacity: '', type: '', position: { x: '50%', y: '50%' }, status: 'available' });

      useEffect(() => {
        const storedLayout = JSON.parse(localStorage.getItem('adminRestaurantTableLayout')) || initialTablesData;
        setTables(storedLayout);
      }, []);

      const handleTableClickForEdit = (table) => {
        setSelectedTableForEdit(table);
        setEditFormData({ ...table });
        setIsEditModalOpen(true);
      };

      const handleSaveLayout = () => {
        localStorage.setItem('adminRestaurantTableLayout', JSON.stringify(tables));
        toast({ title: t('adminTableLayoutSavedTitle', { defaultText: "Layout Saved"}), description: t('adminTableLayoutSavedDesc', { defaultText: "Table layout has been successfully saved."}) });
      };

      const handleResetLayout = () => {
        setTables(initialTablesData);
        localStorage.removeItem('adminRestaurantTableLayout');
        toast({ title: t('adminTableLayoutResetTitle', { defaultText: "Layout Reset"}), description: t('adminTableLayoutResetDesc', { defaultText: "Table layout has been reset to default."}) });
      };
      
      const handleAddNewTable = () => {
        const newTableId = `NT${tables.length + 1}`;
        setSelectedTableForEdit(null); 
        setEditFormData({ id: newTableId, capacity: 2, type: '2-seater', position: { x: '50%', y: '50%' }, status: 'available' });
        setIsEditModalOpen(true);
      };

      const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: name === 'capacity' ? parseInt(value) || '' : value }));
      };
      
      const handleEditFormSelectChange = (name, value) => {
         setEditFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleEditFormPositionChange = (axis, value) => {
        setEditFormData(prev => ({
          ...prev,
          position: { ...prev.position, [axis]: value }
        }));
      };

      const handleSaveTableEdits = () => {
        if (selectedTableForEdit) { 
          setTables(prevTables => prevTables.map(t => t.id === selectedTableForEdit.id ? { ...editFormData } : t));
        } else { 
          setTables(prevTables => [...prevTables, { ...editFormData }]);
        }
        setIsEditModalOpen(false);
        toast({ title: selectedTableForEdit ? t('adminTableUpdatedTitle') : t('adminTableAddedTitle'), description: selectedTableForEdit ? t('adminTableUpdatedDesc', {tableId: editFormData.id}) : t('adminTableAddedDesc', {tableId: editFormData.id}) });
      };


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-primary">{t('adminNavTableLayout', { defaultText: "Manage Table Layout"})}</h1>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleAddNewTable} className="bg-green-600 hover:bg-green-700 text-white">
                <PlusCircle size={18} className="mr-2" /> {t('adminTableLayoutAddTable', { defaultText: "Add Table"})}
              </Button>
              <Button onClick={handleSaveLayout} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save size={18} className="mr-2" /> {t('adminTableLayoutSave', { defaultText: "Save Layout"})}
              </Button>
              <Button onClick={handleResetLayout} variant="destructive">
                <RotateCcw size={18} className="mr-2" /> {t('adminTableLayoutReset', { defaultText: "Reset Layout"})}
              </Button>
            </div>
          </div>
          
          <p className="text-slate-400">{t('adminTableLayoutDesc', { defaultText: "Click on a table to edit its properties. Drag and drop functionality is a placeholder."})}</p>

          <div className="p-4 bg-slate-800 rounded-lg shadow-inner min-h-[400px] md:min-h-[500px] overflow-auto">
            <TableLayout 
              tables={tables} 
              onTableSelect={handleTableClickForEdit} 
              selectedTableId={selectedTableForEdit?.id}
              guestCount={0} 
              disabled={false} 
              isAdminView={true}
            />
          </div>

          {isEditModalOpen && (
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent className="bg-slate-850 border-slate-700 text-slate-100">
                <DialogHeader>
                  <DialogTitle className="text-primary text-2xl">
                    {selectedTableForEdit ? t('adminTableLayoutEditTitle', { defaultText: "Edit Table"}) : t('adminTableLayoutAddTitle', { defaultText: "Add New Table"})}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {selectedTableForEdit ? t('adminTableLayoutEditDesc', { tableId: selectedTableForEdit.id }) : t('adminTableLayoutAddDesc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="tableId" className="text-slate-300">{t('adminTableLayoutFormId', { defaultText: "Table ID"})}</Label>
                    <Input id="tableId" name="id" value={editFormData.id} onChange={handleEditFormChange} className="bg-slate-700 border-slate-600" disabled={!!selectedTableForEdit} />
                  </div>
                  <div>
                    <Label htmlFor="capacity" className="text-slate-300">{t('adminTableLayoutFormCapacity', { defaultText: "Capacity"})}</Label>
                    <Input id="capacity" name="capacity" type="number" value={editFormData.capacity} onChange={handleEditFormChange} className="bg-slate-700 border-slate-600" min="1" />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-slate-300">{t('adminTableLayoutFormType', { defaultText: "Type"})}</Label>
                    <Select name="type" value={editFormData.type} onValueChange={(value) => handleEditFormSelectChange('type', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder={t('adminTableLayoutFormTypePlaceholder', { defaultText: "Select type"})} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="2-seater">2-Seater</SelectItem>
                        <SelectItem value="4-seater">4-Seater</SelectItem>
                        <SelectItem value="6-seater-round">6-Seater Round</SelectItem>
                        <SelectItem value="booth">Booth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="positionX" className="text-slate-300">{t('adminTableLayoutFormPosX', { defaultText: "Position X (%)"})}</Label>
                      <Input id="positionX" name="positionX" value={editFormData.position.x} onChange={(e) => handleEditFormPositionChange('x', e.target.value)} className="bg-slate-700 border-slate-600" />
                    </div>
                    <div>
                      <Label htmlFor="positionY" className="text-slate-300">{t('adminTableLayoutFormPosY', { defaultText: "Position Y (%)"})}</Label>
                      <Input id="positionY" name="positionY" value={editFormData.position.y} onChange={(e) => handleEditFormPositionChange('y', e.target.value)} className="bg-slate-700 border-slate-600" />
                    </div>
                  </div>
                   <div>
                    <Label htmlFor="status" className="text-slate-300">{t('adminTableLayoutFormStatus', { defaultText: "Status"})}</Label>
                    <Select name="status" value={editFormData.status} onValueChange={(value) => handleEditFormSelectChange('status', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder={t('adminTableLayoutFormStatusPlaceholder', { defaultText: "Select status"})} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="booked">Booked (Manual Override)</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      {t('cancelButtonText', { defaultText: "Cancel"})}
                    </Button>
                  </DialogClose>
                  <Button onClick={handleSaveTableEdits} className="bg-primary hover:bg-primary/90">
                    {t('saveChangesButtonText', { defaultText: "Save Changes"})}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      );
    };

    export default AdminTableLayoutPage;