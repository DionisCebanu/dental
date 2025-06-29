import React from 'react';
    import { Soup, Cake, Coffee, Wheat, Drumstick } from 'lucide-react';

    export const categoriesData = [
      { id: 'supe', nameKey: 'categorySupe', defaultName: 'Soups', icon: <Soup size={24} />, type: 'appetizer' },
      { id: 'feluriPrincipale', nameKey: 'categoryFeluriPrincipale', defaultName: 'Main Courses', icon: <Drumstick size={24} />, type: 'main' },
      { id: 'placintePatiserii', nameKey: 'categoryPlacintePatiserii', defaultName: 'Pies & Pastries', icon: <Wheat size={24} />, type: 'main' },
      { id: 'deserturi', nameKey: 'categoryDeserturi', defaultName: 'Desserts', icon: <Cake size={24} />, type: 'dessert' },
      { id: 'bauturi', nameKey: 'categoryBauturi', defaultName: 'Drinks', icon: <Coffee size={24} />, type: 'drink' },
    ];