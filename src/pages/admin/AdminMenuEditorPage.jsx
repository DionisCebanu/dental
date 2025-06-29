import React, { useState, useEffect, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { useToast } from '@/components/ui/use-toast';
    import { initialMenuDataFiltered as defaultMenuData } from '@/data/menu/items';
    import { categoriesData as defaultCategoriesData } from '@/data/menu/categories';
    import { PlusCircle, Edit3, Trash2, Save, Utensils, Tag, Soup, Cake, Coffee, Wheat, Drumstick } from 'lucide-react';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
    } from "@/components/ui/dialog";

    const AdminMenuEditorPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      
      const [menuData, setMenuData] = useState({});
      const [categories, setCategories] = useState([]);
      const [isItemModalOpen, setIsItemModalOpen] = useState(false);
      const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
      const [currentItem, setCurrentItem] = useState(null); 
      const [currentCategory, setCurrentCategory] = useState(null); 
      
      const [itemFormData, setItemFormData] = useState({
        id: '', nameKey: '', defaultName: '', descriptionKey: '', defaultDescription: '', price: '', imageText: '', categoryId: ''
      });
      const [categoryFormData, setCategoryFormData] = useState({
        id: '', nameKey: '', defaultName: '', iconName: 'Utensils' 
      });

      useEffect(() => {
        const storedMenu = JSON.parse(localStorage.getItem('adminRestaurantMenu')) || defaultMenuData;
        const storedCategories = JSON.parse(localStorage.getItem('adminRestaurantCategories')) || defaultCategoriesData.map(cat => ({...cat, iconName: cat.icon.type.displayName || 'Utensils'}));
        setMenuData(storedMenu);
        setCategories(storedCategories);
      }, []);

      const handleSaveAllMenuData = () => {
        localStorage.setItem('adminRestaurantMenu', JSON.stringify(menuData));
        localStorage.setItem('adminRestaurantCategories', JSON.stringify(categories.map(c => ({...c, icon: undefined}))));
        toast({ title: t('adminMenuEditorSavedAllTitle'), description: t('adminMenuEditorSavedAllDesc') });
      };

      
      const openNewItemModal = (categoryId) => {
        setCurrentItem(null);
        const newItemId = `item_${Date.now()}`;
        setItemFormData({ 
          id: newItemId, 
          nameKey: `custom_${newItemId}_name`, 
          defaultName: '', 
          descriptionKey: `custom_${newItemId}_desc`, 
          defaultDescription: '', 
          price: '', 
          imageText: '', 
          categoryId: categoryId 
        });
        setIsItemModalOpen(true);
      };

      const openEditItemModal = (item, categoryId) => {
        setCurrentItem(item);
        setItemFormData({ ...item, categoryId });
        setIsItemModalOpen(true);
      };

      const handleItemFormChange = (e) => {
        const { name, value } = e.target;
        setItemFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || '' : value }));
      };
      
      const handleItemFormSelectChange = (name, value) => {
        setItemFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSaveItem = () => {
        const { categoryId, ...newItemData } = itemFormData;
        
        setMenuData(prevMenu => {
          const updatedCategoryItems = prevMenu[categoryId] ? [...prevMenu[categoryId]] : [];
          if (currentItem) { 
            const itemIndex = updatedCategoryItems.findIndex(item => item.id === currentItem.id);
            if (itemIndex > -1) updatedCategoryItems[itemIndex] = newItemData;
          } else { 
            updatedCategoryItems.push(newItemData);
          }
          return { ...prevMenu, [categoryId]: updatedCategoryItems };
        });
        setIsItemModalOpen(false);
        toast({ title: currentItem ? t('adminMenuEditorItemUpdatedTitle') : t('adminMenuEditorItemAddedTitle'), description: `${newItemData.defaultName} ${currentItem ? t('adminMenuEditorItemUpdatedDesc') : t('adminMenuEditorItemAddedDesc')}` });
      };

      const handleDeleteItem = (itemId, categoryId) => {
        setMenuData(prevMenu => ({
          ...prevMenu,
          [categoryId]: prevMenu[categoryId].filter(item => item.id !== itemId)
        }));
        toast({ title: t('adminMenuEditorItemDeletedTitle'), description: t('adminMenuEditorItemDeletedDesc', {itemId}), variant: "destructive" });
      };

      
      const openNewCategoryModal = () => {
        setCurrentCategory(null);
        const newCatId = `cat_${Date.now()}`;
        setCategoryFormData({ id: newCatId, nameKey: `custom_cat_${newCatId}_name`, defaultName: '', iconName: 'Utensils' });
        setIsCategoryModalOpen(true);
      };
      
      const openEditCategoryModal = (category) => {
        setCurrentCategory(category);
        setCategoryFormData({ ...category });
        setIsCategoryModalOpen(true);
      };

      const handleCategoryFormChange = (e) => {
        const { name, value } = e.target;
        setCategoryFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleCategoryFormSelectChange = (name, value) => {
        setCategoryFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSaveCategory = () => {
        if (currentCategory) { 
          setCategories(prev => prev.map(cat => cat.id === currentCategory.id ? categoryFormData : cat));
        } else { 
          setCategories(prev => [...prev, categoryFormData]);
          setMenuData(prevMenu => ({ ...prevMenu, [categoryFormData.id]: [] })); 
        }
        setIsCategoryModalOpen(false);
        toast({ title: currentCategory ? t('adminMenuEditorCategoryUpdatedTitle') : t('adminMenuEditorCategoryAddedTitle'), description: `${categoryFormData.defaultName} ${currentCategory ? t('adminMenuEditorCategoryUpdatedDesc') : t('adminMenuEditorCategoryAddedDesc')}` });
      };
      
      const handleDeleteCategory = (categoryId) => {
        setMenuData(prevMenu => {
          const { [categoryId]: _, ...rest } = prevMenu;
          return rest;
        });
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        toast({ title: t('adminMenuEditorCategoryDeletedTitle'), description: t('adminMenuEditorCategoryDeletedDesc', {categoryId}), variant: "destructive" });
      };
      
      const LucideIcons = { Utensils, Soup, Cake, Coffee, Wheat, Drumstick, Tag }; 

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-primary">{t('adminNavMenuEditor', { defaultText: "Menu Editor"})}</h1>
            <div className="flex gap-2">
              <Button onClick={openNewCategoryModal} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Tag size={18} className="mr-2" /> {t('adminMenuEditorAddCategory', { defaultText: "Add Category"})}
              </Button>
              <Button onClick={handleSaveAllMenuData} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save size={18} className="mr-2" /> {t('adminMenuEditorSaveAll', { defaultText: "Save All Changes"})}
              </Button>
            </div>
          </div>

          {categories.map(category => {
            const CategoryIcon = LucideIcons[category.iconName] || Utensils;
            return (
            <Card key={category.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <CategoryIcon size={24} className="mr-3 text-primary" />
                  <CardTitle className="text-2xl text-primary">{t(category.nameKey, { defaultText: category.defaultName })}</CardTitle>
                </div>
                <div className="space-x-2">
                   <Button variant="outline" size="sm" onClick={() => openEditCategoryModal(category)} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900">
                    <Edit3 size={16} className="mr-1" /> {t('editButtonText')}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 size={16} className="mr-1" /> {t('deleteButtonText')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(menuData[category.id] || []).map(item => (
                  <Card key={item.id} className="bg-slate-700/50 border-slate-600 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100">{t(item.nameKey, { defaultText: item.defaultName })}</h4>
                        <p className="text-sm text-slate-400 max-w-md">{t(item.descriptionKey, { defaultText: item.defaultDescription })}</p>
                        <p className="text-md font-bold text-accent mt-1">${item.price ? item.price.toFixed(2) : '0.00'}</p>
                      </div>
                      <div className="flex-shrink-0 space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openEditItemModal(item, category.id)} className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                          <Edit3 size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id, category.id)} className="text-red-500 hover:bg-red-500/20">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button onClick={() => openNewItemModal(category.id)} variant="outline" className="w-full border-dashed border-primary text-primary hover:bg-primary/10">
                  <PlusCircle size={18} className="mr-2" /> {t('adminMenuEditorAddItemToCategory', { defaultText: "Add Item to " + (t(category.nameKey) || category.defaultName)})}
                </Button>
              </CardContent>
            </Card>
          )})}

          
          {isItemModalOpen && (
            <Dialog open={isItemModalOpen} onOpenChange={setIsItemModalOpen}>
              <DialogContent className="bg-slate-850 border-slate-700 text-slate-100">
                <DialogHeader>
                  <DialogTitle className="text-primary text-2xl">{currentItem ? t('adminMenuEditorEditItemTitle') : t('adminMenuEditorAddItemTitle')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-3 max-h-[70vh] overflow-y-auto pr-2">
                  <input type="hidden" name="id" value={itemFormData.id} />
                  <input type="hidden" name="nameKey" value={itemFormData.nameKey} />
                  <input type="hidden" name="descriptionKey" value={itemFormData.descriptionKey} />
                  <div>
                    <Label htmlFor="defaultName" className="text-slate-300">{t('adminMenuEditorFormItemName')}</Label>
                    <Input id="defaultName" name="defaultName" value={itemFormData.defaultName} onChange={handleItemFormChange} className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="defaultDescription" className="text-slate-300">{t('adminMenuEditorFormItemDesc')}</Label>
                    <Textarea id="defaultDescription" name="defaultDescription" value={itemFormData.defaultDescription} onChange={handleItemFormChange} className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-slate-300">{t('adminMenuEditorFormItemPrice')}</Label>
                    <Input id="price" name="price" type="number" step="0.01" value={itemFormData.price} onChange={handleItemFormChange} className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="imageText" className="text-slate-300">{t('adminMenuEditorFormItemImgText')}</Label>
                    <Input id="imageText" name="imageText" value={itemFormData.imageText} onChange={handleItemFormChange} className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="categoryId" className="text-slate-300">{t('adminMenuEditorFormItemCategory')}</Label>
                    <Select name="categoryId" value={itemFormData.categoryId} onValueChange={(value) => handleItemFormSelectChange('categoryId', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder={t('adminMenuEditorFormItemCategoryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{t(cat.nameKey, { defaultText: cat.defaultName })}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">{t('cancelButtonText')}</Button></DialogClose>
                  <Button onClick={handleSaveItem} className="bg-primary hover:bg-primary/90">{t('saveChangesButtonText')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          
          {isCategoryModalOpen && (
             <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
              <DialogContent className="bg-slate-850 border-slate-700 text-slate-100">
                <DialogHeader>
                  <DialogTitle className="text-primary text-2xl">{currentCategory ? t('adminMenuEditorEditCategoryTitle') : t('adminMenuEditorAddCategoryTitle')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-3">
                  <input type="hidden" name="id" value={categoryFormData.id} />
                  <input type="hidden" name="nameKey" value={categoryFormData.nameKey} />
                  <div>
                    <Label htmlFor="catDefaultName" className="text-slate-300">{t('adminMenuEditorFormCategoryName')}</Label>
                    <Input id="catDefaultName" name="defaultName" value={categoryFormData.defaultName} onChange={handleCategoryFormChange} className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="catIconName" className="text-slate-300">{t('adminMenuEditorFormCategoryIcon')}</Label>
                    <Select name="iconName" value={categoryFormData.iconName} onValueChange={(value) => handleCategoryFormSelectChange('iconName', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder={t('adminMenuEditorFormCategoryIconPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        {Object.keys(LucideIcons).map(iconKey => (
                          <SelectItem key={iconKey} value={iconKey}>{iconKey}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">{t('cancelButtonText')}</Button></DialogClose>
                  <Button onClick={handleSaveCategory} className="bg-primary hover:bg-primary/90">{t('saveChangesButtonText')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      );
    };

    export default AdminMenuEditorPage;