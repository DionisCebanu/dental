import React, { forwardRef } from 'react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Utensils, DollarSign } from 'lucide-react';
    import { courseTypes } from '@/data/menuData';

    const MealSummaryCard = forwardRef(({ selectedCourses, totalPrice, t }, ref) => {
      return (
        <div id="meal-summary-card" ref={ref} className="bg-slate-700 p-1">
          <Card className="bg-slate-700/80 border-slate-600">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary flex items-center">
                <Utensils size={24} className="mr-3" />{t('menuConstructorSelectedMeal')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary/70 scrollbar-track-slate-600/50">
              {Object.entries(selectedCourses).map(([courseId, items]) => {
                if (items.length > 0) {
                  const courseInfo = courseTypes.find(ct => ct.id === courseId);
                  return (
                    <div key={courseId}>
                      <p className="font-semibold text-gray-300 mb-1">{t(courseInfo.nameKey, courseInfo.defaultName)}:</p>
                      <ul className="list-disc list-inside pl-2 space-y-1">
                        {items.map(item => (
                          <li key={`${item.id}-${item.quantity}`} className="flex justify-between items-center text-gray-400">
                            <span>{item.name} (x{item.quantity})</span>
                            <span className="font-medium text-primary/80">${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
              {Object.values(selectedCourses).every(arr => arr.length === 0) && (
                <p className="text-gray-500 italic text-center py-4">{t('menuConstructorNoItemsSelectedYet', { defaultText: "No items selected yet."})}</p>
              )}
              <div className="border-t border-slate-600 pt-3 mt-3 flex justify-between items-center text-lg font-bold">
                <span className="text-gray-200">{t('menuConstructorTotalPrice')}:</span>
                <span className="text-accent flex items-center"><DollarSign size={18} className="mr-1" />{totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    });
    MealSummaryCard.displayName = "MealSummaryCard";
    export default MealSummaryCard;