import React from 'react';
    import { PartyPopper, Gift, GlassWater } from 'lucide-react';
    
    export const eventMenusData = [
      {
        id: 'weddingEventType',
        titleKey: 'eventMenuWeddingTitle',
        defaultTitle: 'Wedding Celebration',
        descriptionKey: 'eventMenuWeddingDesc',
        defaultDescription: 'Curated menus designed to make your special day unforgettable. Choose a package that suits your taste and budget.',
        icon: <PartyPopper size={24} />,
        variants: [
          {
            id: 'weddingSilver',
            variantNameKey: 'eventMenuWeddingSilverName',
            defaultVariantName: 'Silver Package',
            pricePerPerson: 90,
            descriptionKey: 'eventMenuWeddingSilverDesc',
            defaultDescription: 'An elegant selection of classic dishes, perfect for a memorable celebration.',
            groups: [
              {
                groupId: 'appetizer',
                groupTitleKey: 'eventMenuGroupAppetizer',
                defaultGroupTitle: 'Choose Your Appetizer',
                itemIds: ['supa1', 'supa4'] 
              },
              {
                groupId: 'mainCourse',
                groupTitleKey: 'eventMenuGroupMainCourse',
                defaultGroupTitle: 'Select Your Main Course',
                itemIds: ['fp1', 'fp2']
              },
              {
                groupId: 'dessert',
                groupTitleKey: 'eventMenuGroupDessert',
                defaultGroupTitle: 'Pick Your Dessert',
                itemIds: ['des1', 'des3']
              }
            ]
          },
          {
            id: 'weddingGold',
            variantNameKey: 'eventMenuWeddingGoldName',
            defaultVariantName: 'Gold Package',
            pricePerPerson: 120,
            descriptionKey: 'eventMenuWeddingGoldDesc',
            defaultDescription: 'A premium offering with expanded choices and gourmet preparations for an exquisite experience.',
            groups: [
              {
                groupId: 'appetizerEnhanced',
                groupTitleKey: 'eventMenuGroupAppetizerEnhanced',
                defaultGroupTitle: 'Choose Your Enhanced Appetizer',
                categories: [
                  { categoryId: 'supe', categoryNameKey: 'categorySupe', defaultCategoryName: "Soups", itemIds: ['supa1', 'supa2', 'supa4'] },
                  { categoryId: 'placintePatiserii', categoryNameKey: 'categoryPlacintePatiserii', defaultCategoryName: "Pies", itemIds: ['pp1'] }
                ]
              },
              {
                groupId: 'mainCourseEnhanced',
                groupTitleKey: 'eventMenuGroupMainCourseEnhanced',
                defaultGroupTitle: 'Select Your Gourmet Main Course',
                itemIds: ['fp2', 'fp5', 'fp6']
              },
              {
                groupId: 'dessertEnhanced',
                groupTitleKey: 'eventMenuGroupDessertEnhanced',
                defaultGroupTitle: 'Pick Your Premium Dessert',
                itemIds: ['des1', 'des2', 'des4']
              },
              {
                groupId: 'drinksSelection',
                groupTitleKey: 'eventMenuGroupDrinks',
                defaultGroupTitle: 'Select a Beverage',
                itemIds: ['btr1', 'btr2']
              }
            ]
          }
        ]
      },
      {
        id: 'birthdayEventType',
        titleKey: 'eventMenuBirthdayTitle',
        defaultTitle: 'Birthday Bash',
        descriptionKey: 'eventMenuBirthdayDesc',
        defaultDescription: 'Celebrate another year with our festive and delicious birthday menu packages.',
        icon: <Gift size={24} />,
        variants: [
          {
            id: 'birthdayClassic',
            variantNameKey: 'eventMenuBirthdayClassicName',
            defaultVariantName: 'Classic Celebration',
            pricePerPerson: 75,
            descriptionKey: 'eventMenuBirthdayClassicDesc',
            defaultDescription: 'A joyful mix of popular dishes to make any birthday special.',
            groups: [
              {
                groupId: 'starter',
                groupTitleKey: 'eventMenuGroupStarter',
                defaultGroupTitle: 'Choose Your Starter',
                categories: [
                   { categoryId: 'supe', categoryNameKey: 'categorySupe', defaultCategoryName: "Soups", itemIds: ['supa2', 'supa3'] },
                   { categoryId: 'placintePatiserii', categoryNameKey: 'categoryPlacintePatiserii', defaultCategoryName: "Pies", itemIds: ['pp2'] }
                ]
              },
              {
                groupId: 'mainDish',
                groupTitleKey: 'eventMenuGroupMainDish',
                defaultGroupTitle: 'Select Your Main Dish',
                itemIds: ['fp1', 'fp3', 'fp4']
              },
              {
                groupId: 'sweetTreat',
                groupTitleKey: 'eventMenuGroupSweetTreat',
                defaultGroupTitle: 'Pick Your Sweet Treat',
                itemIds: ['des2', 'des4']
              }
            ]
          }
        ]
      },
      {
        id: 'corporateEventType',
        titleKey: 'eventMenuCorporateTitle',
        defaultTitle: 'Corporate Gathering',
        descriptionKey: 'eventMenuCorporateDesc',
        defaultDescription: 'Professional and refined menus for your business meetings, conferences, or corporate events.',
        icon: <GlassWater size={24} />,
        variants: [
          {
            id: 'corporateLunch',
            variantNameKey: 'eventMenuCorporateLunchName',
            defaultVariantName: 'Business Lunch',
            pricePerPerson: 65,
            descriptionKey: 'eventMenuCorporateLunchDesc',
            defaultDescription: 'A balanced and sophisticated lunch menu perfect for productive meetings.',
            groups: [
              {
                groupId: 'corpAppetizer',
                groupTitleKey: 'eventMenuGroupAppetizer',
                defaultGroupTitle: 'Select an Appetizer',
                itemIds: ['supa4', 'pp3']
              },
              {
                groupId: 'corpMain',
                groupTitleKey: 'eventMenuGroupMainCourse',
                defaultGroupTitle: 'Choose a Main Course',
                itemIds: ['fp1', 'fp4']
              },
              {
                groupId: 'corpDessert',
                groupTitleKey: 'eventMenuGroupDessert',
                defaultGroupTitle: 'Select a Dessert',
                itemIds: ['des3']
              }
            ]
          }
        ]
      }
    ];