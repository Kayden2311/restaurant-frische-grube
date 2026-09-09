export interface VideoBeat {
  id: string;
  startProgress: number; // 0.0 to 1.0
  endProgress: number;
  dishIds: number[];
  de: {
    badgeLabel: string;
    title: string;
    subtitle: string;
    winePairing?: string;
    note?: string;
  };
  en: {
    badgeLabel: string;
    title: string;
    subtitle: string;
    winePairing?: string;
    note?: string;
  };
}

// Calibrated to the exact 6 clips / 60 seconds (1,440 frames) created by Google Veo
// Covering exact dishes from Data & public/dishes: 1, 2, 3, 5, 6, 9, 13
export const VIDEO_BEATS: VideoBeat[] = [
  // Clip 1: Entrance & Historic Brick Cellar (0s - 10s)
  {
    id: 'entrance-vault',
    startProgress: 0.0,
    endProgress: 0.16,
    dishIds: [],
    de: {
      badgeLabel: 'Eingang · Wismar Altstadt',
      title: 'Scheuerstraße & Das Gewölbe',
      subtitle: 'Kopfsteinpflaster vor dem Backsteinhaus aus dem Jahr 1350. Kerzenschein strömt durch die geöffnete Holztür in die historische Grube.',
      note: 'Historisches Backsteingewölbe anno 1350',
    },
    en: {
      badgeLabel: 'Entrance · Wismar Old Town',
      title: 'Scheuerstraße & Historic Vaults',
      subtitle: 'Cobblestone streets before the Gothic brick house dating to 1350. Candlelight radiates through the open timber door into the historic cellar.',
      note: 'Historic Gothic brick cellar anno 1350',
    },
  },

  // Clip 2: Table 1 · Dish 1 - Duck Breast (10s - 20s)
  {
    id: 't1-duck',
    startProgress: 0.16,
    endProgress: 0.32,
    dishIds: [1],
    de: {
      badgeLabel: 'Tisch 1 · Hauptgang (1)',
      title: 'Entenbrust',
      subtitle: 'Rosa gebratene Entenbrust mit fruchtiger Brombeerreduktion, Daikon-Rettich und frischen Microgreens auf mecklenburgischem Eichenholz.',
      winePairing: 'Spätburgunder trocken, Weingut Salwey',
      note: 'Serviert mit ofenfrischem Sauerteigbrot',
    },
    en: {
      badgeLabel: 'Table 1 · Main Course (1)',
      title: 'Duck Breast',
      subtitle: 'Pan-roasted tender pink duck breast with blackberry reduction, daikon radish, and microgreens on rustic oak.',
      winePairing: 'Spätburgunder dry, Salwey Estate',
      note: 'Served with oven-fresh sourdough bread',
    },
  },

  // Clip 3: Table 2 · Dish 2 - Cod Fillet (20s - 30s)
  {
    id: 't2-cod',
    startProgress: 0.32,
    endProgress: 0.48,
    dishIds: [2],
    de: {
      badgeLabel: 'Tisch 2 · Fangfrisch (2)',
      title: 'Kabeljaufilet',
      subtitle: 'Auf der Haut kross gebratenes Edelfischfilet der Ostsee, geschmorte Rote Bete, Belugalinsen und knackiger Feldsalat.',
      winePairing: 'Riesling Alte Reben, Mosel',
      note: 'Mit Meersalzflocken und Kräuterbutter',
    },
    en: {
      badgeLabel: 'Table 2 · Fresh Catch (2)',
      title: 'Cod Fillet',
      subtitle: 'Crispy skin-seared Baltic cod fillet with braised beetroot, beluga lentils, and garden lamb lettuce.',
      winePairing: 'Riesling Old Vines, Mosel',
      note: 'Flaked sea salt and herb butter',
    },
  },

  // Clip 4: Table 3 · Dish 3 - Lamb Hip (30s - 40s)
  {
    id: 't3-lamb',
    startProgress: 0.48,
    endProgress: 0.64,
    dishIds: [3],
    de: {
      badgeLabel: 'Tisch 3 · Regionale Weide (3)',
      title: 'Hüfte Vom Salzwiesenlamm',
      subtitle: 'Zartrosa gebratene Lammhüfte mit kräftigem Rosmarinjus, glasierten Rübchen und handgemachten Salbeignocchi.',
      winePairing: 'Cabernet Dorsa, Pfalz',
      note: 'Kaminatmosphäre & vollmundiger Rotwein',
    },
    en: {
      badgeLabel: 'Table 3 · Regional Pasture (3)',
      title: 'Salt Meadow Lamb Hip',
      subtitle: 'Tender roasted lamb hip with savory rosemary jus, glazed turnips, and handmade sage gnocchi.',
      winePairing: 'Cabernet Dorsa, Palatinate',
      note: 'Fireplace warmth and full-bodied red wine',
    },
  },

  // Clip 5: Table 5 & 6 · Dishes 5 & 6 - Salmon & Gnocchi (40s - 50s)
  {
    id: 't5-t6-salmon-gnocchi',
    startProgress: 0.64,
    endProgress: 0.78,
    dishIds: [5, 6],
    de: {
      badgeLabel: 'Tisch 5 & 6 · Menüfolge (5 & 6)',
      title: 'Hausgebeizter Bio Lachs & Gnocchi Mit Linsen',
      subtitle: 'Hausgebeizter Bio-Lachs mit Orangenzesten und Radieschen, gefolgt von handgerollten Süßkartoffelgnocchi mit Salbeibutter und Parmesan.',
      winePairing: 'Grauburgunder, Rheinhessen',
      note: 'Bio Lachs & Süßkartoffelgnocchi',
    },
    en: {
      badgeLabel: 'Table 5 & 6 · Course (5 & 6)',
      title: 'Organic Cured Salmon & Lentil Gnocchi',
      subtitle: 'Home-cured organic salmon with citrus zest and radish, followed by handmade sweet potato gnocchi with sage butter and aged parmesan.',
      winePairing: 'Pinot Gris, Rheinhessen',
      note: 'Organic salmon and sweet potato gnocchi',
    },
  },

  // Clip 6: Table 9 & 13 · Dishes 9 & 13 - Dessert Finale & Farewell (50s - 60s)
  {
    id: 't9-t13-desserts',
    startProgress: 0.78,
    endProgress: 0.92,
    dishIds: [9, 13],
    de: {
      badgeLabel: 'Tisch 9 & 13 · Patisserie Finale (9 & 13)',
      title: 'Postre & Mousse Au Chocolat',
      subtitle: 'Spiegelglasur-Mousse mit Knusperboden und Johannisbeeren, vollendet durch 70% Valrhona Schokoladenmousse und Waldbeerenkompott.',
      winePairing: 'Portwein Tawny 10 Jahre',
      note: 'Postre & Valrhona Schokolade',
    },
    en: {
      badgeLabel: 'Table 9 & 13 · Patisserie Finale (9 & 13)',
      title: 'Postre & Mousse Au Chocolat',
      subtitle: 'Mirror-glazed chocolate tart with crisp base and currants, crowned with 70% Valrhona dark chocolate mousse and wild berry coulis.',
      winePairing: 'Tawny Port 10 Years',
      note: 'Postre and Valrhona chocolate mousse',
    },
  },
];
