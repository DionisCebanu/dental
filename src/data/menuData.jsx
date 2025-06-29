import React from 'react';
    import { Soup, Utensils, Cake, Coffee, Wheat, Drumstick, PartyPopper, Gift } from 'lucide-react';

    export const categoriesData = [
      { id: 'supe', nameKey: 'categorySupe', defaultName: 'Soups', icon: <Soup size={24} />, type: 'appetizer' },
      { id: 'feluriPrincipale', nameKey: 'categoryFeluriPrincipale', defaultName: 'Main Courses', icon: <Drumstick size={24} />, type: 'main' },
      { id: 'placintePatiserii', nameKey: 'categoryPlacintePatiserii', defaultName: 'Pies & Pastries', icon: <Wheat size={24} />, type: 'main' },
      { id: 'deserturi', nameKey: 'categoryDeserturi', defaultName: 'Desserts', icon: <Cake size={24} />, type: 'dessert' },
      { id: 'bauturi', nameKey: 'categoryBauturi', defaultName: 'Drinks', icon: <Coffee size={24} />, type: 'drink' },
    ];
    
    export const initialMenuData = {
      supe: [
        { 
          id: 'supa1', 
          nameKey: 'supaZeamaName', defaultName: 'Zeamă de pui', 
          descriptionKey: 'supaZeamaDesc', defaultDescription: 'Traditional Moldovan chicken noodle soup, light and flavorful.', 
          price: 9.50, 
          imageText: "Bowl of traditional Moldovan Zeama soup with chicken and noodles" 
        },
        { 
          id: 'supa2', 
          nameKey: 'supaCiorbaBurtaName', defaultName: 'Ciorbă de burtă', 
          descriptionKey: 'supaCiorbaBurtaDesc', defaultDescription: 'Hearty and sour tripe soup, a beloved classic.', 
          price: 11.00, 
          imageText: "Rich Ciorba de burta (tripe soup) with sour cream"
        },
        { 
          id: 'supa3', 
          nameKey: 'supaGalusteName', defaultName: 'Supă cu găluște', 
          descriptionKey: 'supaGalusteDesc', defaultDescription: 'Clear soup with fluffy semolina dumplings.', 
          price: 8.75, 
          imageText: "Comforting Supa cu galuste (dumpling soup) in a bowl"
        },
        {
          id: 'supa4',
          nameKey: 'supaCiuperciName', defaultName: 'Supă de ciuperci',
          descriptionKey: 'supaCiuperciDesc', defaultDescription: 'Creamy mushroom soup with fresh herbs.',
          price: 9.00,
          imageText: "Creamy mushroom soup with croutons"
        }
      ],
      feluriPrincipale: [
        { 
          id: 'fp1', 
          nameKey: 'mainMamaligaName', defaultName: 'Mămăligă cu brânză și smântână', 
          descriptionKey: 'mainMamaligaDesc', defaultDescription: 'Warm polenta served with traditional sheep cheese and sour cream.', 
          price: 15.00, 
          imageText: "Plate of Mamaliga with Moldovan cheese and sour cream"
        },
        { 
          id: 'fp2', 
          nameKey: 'mainSarmaleName', defaultName: 'Sarmale', 
          descriptionKey: 'mainSarmaleDesc', defaultDescription: 'Cabbage rolls stuffed with minced meat and rice, served with sour cream.', 
          price: 17.50, 
          imageText: "Traditional Moldovan Sarmale (cabbage rolls) with a side of polenta"
        },
        { 
          id: 'fp3', 
          nameKey: 'mainChifteleName', defaultName: 'Chifteluțe cu piure', 
          descriptionKey: 'mainChifteleDesc', defaultDescription: 'Flavorful meatballs served with creamy mashed potatoes.', 
          price: 16.00, 
          imageText: "Juicy Chiftele (meatballs) with mashed potatoes and gravy"
        },
        {
          id: 'fp4',
          nameKey: 'mainArdeiUmplutiName', defaultName: 'Ardei umpluți',
          descriptionKey: 'mainArdeiUmplutiDesc', defaultDescription: 'Bell peppers stuffed with a savory mixture of rice and meat.',
          price: 16.50,
          imageText: "Baked Ardei umpluti (stuffed peppers) in tomato sauce"
        },
        {
          id: 'fp5',
          nameKey: 'mainPestePrajitName', defaultName: 'Pește prăjit cu mămăliguță',
          descriptionKey: 'mainPestePrajitDesc', defaultDescription: 'Crispy fried fish (carp or trout) served with polenta and garlic sauce (mujdei).',
          price: 19.00,
          imageText: "Crispy fried fish with a side of mamaliga and mujdei"
        },
        {
          id: 'fp6',
          nameKey: 'mainTocanaName', defaultName: 'Tocană de porc',
          descriptionKey: 'mainTocanaDesc', defaultDescription: 'Slow-cooked pork stew with onions, garlic, and a rich sauce, often served with mămăligă.',
          price: 18.00,
          imageText: "Hearty Tocana de porc (pork stew) with mamaliga"
        }
      ],
      placintePatiserii: [
        { 
          id: 'pp1', 
          nameKey: 'placinteBranzaName', defaultName: 'Plăcinte cu brânză', 
          descriptionKey: 'placinteBranzaDesc', defaultDescription: 'Traditional Moldovan pies filled with salty or sweet cheese.', 
          price: 7.00, 
          imageText: "Golden Placinte cu branza (cheese pies)"
        },
        { 
          id: 'pp2', 
          nameKey: 'placinteCartofiName', defaultName: 'Plăcinte cu cartofi', 
          descriptionKey: 'placinteCartofiDesc', defaultDescription: 'Savory pies filled with mashed potatoes and onions.', 
          price: 6.50, 
          imageText: "Warm Placinte cu cartofi (potato pies)"
        },
        { 
          id: 'pp3', 
          nameKey: 'placinteVarzaName', defaultName: 'Plăcinte cu varză', 
          descriptionKey: 'placinteVarzaDesc', defaultDescription: 'Delicious pies filled with sautéed cabbage.', 
          price: 6.75, 
          imageText: "Flaky Placinte cu varza (cabbage pies)"
        },
        {
          id: 'pp4',
          nameKey: 'placinteDovleacName', defaultName: 'Plăcinte cu dovleac',
          descriptionKey: 'placinteDovleacDesc', defaultDescription: 'Sweet pies filled with spiced pumpkin puree.',
          price: 7.25,
          imageText: "Sweet Placinte cu dovleac (pumpkin pies)"
        }
      ],
      deserturi: [
        {
          id: 'des1',
          nameKey: 'desertCusmaGugutaName', defaultName: 'Cușma lui Guguță',
          descriptionKey: 'desertCusmaGugutaDesc', defaultDescription: 'Iconic Moldovan crepe cake layered with sour cherry filling and cream.',
          price: 10.00,
          imageText: "Slice of Cusma lui Guguta cake with sour cherries"
        },
        {
          id: 'des2',
          nameKey: 'desertPruneUmpluteName', defaultName: 'Prune uscate umplute cu nuci',
          descriptionKey: 'desertPruneUmpluteDesc', defaultDescription: 'Dried plums stuffed with walnuts, often served with cream or honey.',
          price: 8.50,
          imageText: "Elegant Prune uscate umplute cu nuci (stuffed dried plums)"
        },
        {
          id: 'des3',
          nameKey: 'desertCozonacName', defaultName: 'Cozonac Moldovenesc',
          descriptionKey: 'desertCozonacDesc', defaultDescription: 'Traditional sweet bread with walnut, poppy seed, or cocoa filling.',
          price: 9.00,
          imageText: "Slice of Moldovan Cozonac sweet bread"
        },
        {
          id: 'des4',
          nameKey: 'desertBabaNeagraName', defaultName: 'Babă Neagră',
          descriptionKey: 'desertBabaNeagraDesc', defaultDescription: 'A unique, dark, moist cake made with kefir and soda, a traditional delight.',
          price: 9.50,
          imageText: "Slice of traditional Moldovan Baba Neagra cake"
        }
      ],
      bauturi: [
        { 
          id: 'btr1', 
          nameKey: 'bauturaCompotName', defaultName: 'Compot de casă', 
          descriptionKey: 'bauturaCompotDesc', defaultDescription: 'Homemade fruit compote, served chilled or warm.', 
          price: 4.00, 
          imageText: "Glass of homemade fruit compot"
        },
        { 
          id: 'btr2', 
          nameKey: 'bauturaVinCasaName', defaultName: 'Vin de casă (roșu/alb)', 
          descriptionKey: 'bauturaVinCasaDesc', defaultDescription: 'Traditional homemade red or white wine.', 
          price: 6.00, 
          imageText: "Carafe of Moldovan homemade wine"
        },
        { 
          id: 'btr3', 
          nameKey: 'bauturaMustName', defaultName: 'Must proaspăt', 
          descriptionKey: 'bauturaMustDesc', defaultDescription: 'Freshly pressed grape juice (seasonal).', 
          price: 5.00, 
          imageText: "Glass of fresh Moldovan must (grape juice)"
        },
        {
          id: 'btr4',
          nameKey: 'bauturaCeaiPlanteName', defaultName: 'Ceai de plante medicinale',
          descriptionKey: 'bauturaCeaiPlanteDesc', defaultDescription: 'Herbal tea made from local medicinal plants like linden, mint, or chamomile.',
          price: 3.50,
          imageText: "Cup of aromatic herbal tea"
        }
      ],
    };

    export const getAllMenuItems = () => {
      let allItems = [];
      for (const categoryKey in initialMenuData) {
        allItems = allItems.concat(initialMenuData[categoryKey].map(item => ({ ...item, categoryId: categoryKey })));
      }
      return allItems;
    };
    
    export const courseTypes = [
      { id: 'appetizer', nameKey: 'menuConstructorCourseAppetizer', defaultName: 'Appetizer' },
      { id: 'main', nameKey: 'menuConstructorCourseMain', defaultName: 'Main Course' },
      { id: 'dessert', nameKey: 'menuConstructorCourseDessert', defaultName: 'Dessert' },
      { id: 'drink', nameKey: 'menuConstructorCourseDrink', defaultName: 'Drink' },
    ];

    export const eventMenusData = [
      {
        id: 'weddingMenu',
        titleKey: 'eventMenuWeddingTitle',
        defaultTitle: 'Wedding Celebration Menu',
        pricePerPerson: 90,
        imageText: 'Elegant wedding dinner setup',
        icon: <PartyPopper size={24} />,
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
            itemIds: ['fp2', 'fp5', 'fp6']
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
        id: 'birthdayMenu',
        titleKey: 'eventMenuBirthdayTitle',
        defaultTitle: 'Birthday Bash Menu',
        pricePerPerson: 75,
        imageText: 'Festive birthday table with cake',
        icon: <Gift size={24} />,
        groups: [
          {
            groupId: 'starter',
            groupTitleKey: 'eventMenuGroupStarter',
            defaultGroupTitle: 'Choose Your Starter',
            itemIds: ['supa2', 'pp1']
          },
          {
            groupId: 'mainDish',
            groupTitleKey: 'eventMenuGroupMainDish',
            defaultGroupTitle: 'Select Your Main Dish',
            itemIds: ['fp1', 'fp3', 'pp2']
          },
          {
            groupId: 'sweetTreat',
            groupTitleKey: 'eventMenuGroupSweetTreat',
            defaultGroupTitle: 'Pick Your Sweet Treat',
            itemIds: ['des2', 'des4']
          }
        ]
      }
    ];