export interface NarrativeBeat {
  id: string;
  type: 'exterior' | 'threshold' | 'panoramic' | 'diners' | 'dish-primary' | 'dish-secondary';
  tableIndex: number;
  badgeLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  bgSrc: string;
  winePairing?: string;
  companionNote?: string;
  // 3D camera spatial coordinates for real depth and angle transitions
  camera: {
    z: number; // translateZ in px (-60 to +85)
    scale: number; // 1.0 to 1.35
    x: number; // pan offset in %
    y: number; // crane/tilt offset in %
    rotX: number; // pitch angle in deg (tilt down 18-20 deg for dishes)
    rotY: number; // yaw angle in deg (pan left/right for companion dishes)
  };
}

export const NARRATIVE_BEATS: NarrativeBeat[] = [
  // 1. ENTRANCE CHAPTER
  {
    id: 'exterior-night',
    type: 'exterior',
    tableIndex: -1,
    badgeLabel: 'Wismar Altstadt',
    title: 'Scheuerstraße bei Nacht',
    subtitle: 'Kopfsteinpflaster im warmen Glanz der Straßenlaternen vor dem historischen Backsteinhaus.',
    imageSrc: '/frames/frame_00_exterior.jpg',
    bgSrc: '/frames/frame_00_exterior.jpg',
    camera: { z: -80, scale: 1.0, x: 0, y: 0, rotX: 0, rotY: 0 },
  },
  {
    id: 'door-threshold',
    type: 'threshold',
    tableIndex: -1,
    badgeLabel: 'Eingang',
    title: 'Die Schwelle',
    subtitle: 'Goldenes Kerzenlicht strömt durch die geöffnete Holztür auf den Bürgersteig.',
    imageSrc: '/diners/exterior_door_threshold.jpg',
    bgSrc: '/frames/frame_00_exterior.jpg',
    camera: { z: -30, scale: 1.12, x: 0, y: -4, rotX: 2, rotY: 0 },
  },
  {
    id: 'hall-panoramic',
    type: 'panoramic',
    tableIndex: -1,
    badgeLabel: 'Gastraum',
    title: 'Gewölbe & Atmosphäre',
    subtitle: 'Historische Backsteingewölbe aus dem Jahr 1350, flackernder Kerzenschein und leises Gläserklirren.',
    imageSrc: '/diners/interior_hall_panoramic.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: 0, scale: 1.04, x: -6, y: 0, rotX: 0, rotY: -3 },
  },

  // =========================================================================
  // TABLE 1 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't1-diners',
    type: 'diners',
    tableIndex: 0,
    badgeLabel: 'Tisch 1 von 13 · Die Gäste',
    title: 'Momente des Genusses',
    subtitle: 'Ein junges Paar im angeregten Gespräch bei einem Glas Mecklenburger Landwein.',
    imageSrc: '/diners/diners_couple_candid.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't1-crane',
    type: 'dish-primary',
    tableIndex: 0,
    badgeLabel: 'Tisch 1 von 13 · Kranfahrt',
    title: 'Blick zum Tisch',
    subtitle: 'Kamera senkt sich vom Paar hinab zum rustikalen Holztisch mit der Entenbrust.',
    imageSrc: '/dishes/t1_crane_down.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: 15, scale: 1.18, x: 0, y: -10, rotX: 12, rotY: 0 },
  },
  {
    id: 't1-dish1',
    type: 'dish-primary',
    tableIndex: 0,
    badgeLabel: 'Tisch 1 von 13 · Hauptgang',
    title: 'Entenbrust',
    subtitle: 'Rosa gebratene Entenbrust mit Brombeerreduktion, Daikon-Rettich und zarten Microgreens.',
    imageSrc: '/dishes/dish_01_duck_breast.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Spätburgunder trocken, Weingut Salwey',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't1-dish2',
    type: 'dish-secondary',
    tableIndex: 0,
    badgeLabel: 'Tisch 1 von 13 · Tischschwenk',
    title: 'Brotkorb & Weinbegleitung',
    subtitle: 'Kamera schwenkt über den Holztisch zum knusprigen Sauerteigbrot mit geschlagener Kräuterbutter.',
    imageSrc: '/dishes/dish_01_angle_overhead.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Warmes Sauerteigbrot mit Kräuterbutter',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // =========================================================================
  // TABLE 2 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't2-diners',
    type: 'diners',
    tableIndex: 1,
    badgeLabel: 'Tisch 2 von 13 · Die Gäste',
    title: 'Stille Einkehr',
    subtitle: 'Eine Dame mit Lesebrille genießt die Ruhe und das Ambiente bei Kerzenschein.',
    imageSrc: '/diners/diners_woman_solo.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: -5, y: 0, rotX: 0, rotY: -4 },
  },
  {
    id: 't2-dish1',
    type: 'dish-primary',
    tableIndex: 1,
    badgeLabel: 'Tisch 2 von 13 · Hauptgang',
    title: 'Kabeljaufilet',
    subtitle: 'Auf der Haut kross gebraten, geschmorte Rote Bete, Belugalinsen und frischer Feldsalat.',
    imageSrc: '/dishes/dish_02_cod_fillet.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Riesling Alte Reben, Mosel',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't2-dish2',
    type: 'dish-secondary',
    tableIndex: 1,
    badgeLabel: 'Tisch 2 von 13 · Tischschwenk',
    title: 'Kohlrabisüppchen & Riesling',
    subtitle: 'Schwenk über die weiße Leinentischdecke zum feinen Vorspeisensüppchen und dem Rieslingglas.',
    imageSrc: '/dishes/dish_02_cod_fillet.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Kleines Kohlrabisüppchen mit Edelfischtatar',
    camera: { z: 80, scale: 1.32, x: 18, y: -10, rotX: 14, rotY: 16 },
  },

  // =========================================================================
  // TABLE 3 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't3-diners',
    type: 'diners',
    tableIndex: 2,
    badgeLabel: 'Tisch 3 von 13 · Die Gäste',
    title: 'Herrenrunde am Kamin',
    subtitle: 'Zwei langjährige Freunde im lebhaften Dialog über Kultur, Hansegeschichte und gutes Essen.',
    imageSrc: '/diners/diners_two_men.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't3-dish1',
    type: 'dish-primary',
    tableIndex: 2,
    badgeLabel: 'Tisch 3 von 13 · Hauptgang',
    title: 'Hüfte Vom Salzwiesenlamm',
    subtitle: 'Zartrosa gebratenes Salzwiesenlamm mit Rosmarinjus und glasierten Rübchen.',
    imageSrc: '/dishes/dish_03_lamb_hip.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Cabernet Dorsa, Pfalz',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't3-dish2',
    type: 'dish-secondary',
    tableIndex: 2,
    badgeLabel: 'Tisch 3 von 13 · Tischschwenk',
    title: 'Salbeignocchi & Rotwein',
    subtitle: 'Schwenk zum Beilagenteller mit handgemachten Kartoffelgnocchi und schwerem Rotwein.',
    imageSrc: '/dishes/dish_03_lamb_hip.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Handgemachte Kartoffelgnocchi mit Salbeibutter',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // =========================================================================
  // TABLE 4 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't4-diners',
    type: 'diners',
    tableIndex: 3,
    badgeLabel: 'Tisch 4 von 13 · Die Gäste',
    title: 'Genuss am Einzeltisch',
    subtitle: 'Ein Gast genießt mit geschlossenen Augen die ersten warmen Löffel der Vorspeise.',
    imageSrc: '/diners/diners_man_savoring.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: -5, y: 0, rotX: 0, rotY: -4 },
  },
  {
    id: 't4-dish1',
    type: 'dish-primary',
    tableIndex: 3,
    badgeLabel: 'Tisch 4 von 13 · Vorspeise',
    title: 'Kohlrabizitronensüppchen',
    subtitle: 'Samtige Suppe mit gebeiztem Edelfisch, Schnittlauchöl und essbaren Blüten.',
    imageSrc: '/dishes/dish_04_kohlrabi_soup.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Weissburgunder trocken, Baden',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't4-dish2',
    type: 'dish-secondary',
    tableIndex: 3,
    badgeLabel: 'Tisch 4 von 13 · Tischschwenk',
    title: 'Roggenkruste & Meersalz',
    subtitle: 'Schwenk zum ofenfrischen Roggenbrot mit cremiger Butter und feinem Salzschälchen.',
    imageSrc: '/dishes/dish_04_kohlrabi_soup.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Geröstetes Roggenbrot mit Meersalzflocken',
    camera: { z: 80, scale: 1.32, x: 18, y: -10, rotX: 14, rotY: 16 },
  },

  // =========================================================================
  // TABLE 5 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't5-diners',
    type: 'diners',
    tableIndex: 4,
    badgeLabel: 'Tisch 5 von 13 · Die Gäste',
    title: 'Fotomoment zu zweit',
    subtitle: 'Ein Paar hält die kunstvoll angerichtete Vorspeise mit dem Smartphone im Kerzenlicht fest.',
    imageSrc: '/diners/diners_couple_phone.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't5-dish1',
    type: 'dish-primary',
    tableIndex: 4,
    badgeLabel: 'Tisch 5 von 13 · Vorspeise',
    title: 'Hausgebeizter Bio Lachs',
    subtitle: 'Orangenzesten, marinierter Radieschenfächer, Korianderblüten und feinstes Rapskernöl.',
    imageSrc: '/dishes/dish_05_bio_salmon.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Grauburgunder, Rheinhessen',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't5-dish2',
    type: 'dish-secondary',
    tableIndex: 4,
    badgeLabel: 'Tisch 5 von 13 · Tischschwenk',
    title: 'Pumpernickel & Roséwein',
    subtitle: 'Kameraschwenk über den Steinteller zum funkelnden Glas Roséwein und dem Pumpernickel-Crumble.',
    imageSrc: '/dishes/dish_05_bio_salmon.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Pumpernickel-Crumble mit Sauerrahm',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // =========================================================================
  // TABLE 6 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't6-diners',
    type: 'diners',
    tableIndex: 5,
    badgeLabel: 'Tisch 6 von 13 · Die Gäste',
    title: 'Lachen unter Freundinnen',
    subtitle: 'Zwei Freundinnen stoßen herzlich an und teilen sich das hausgemachte Gnocchigericht.',
    imageSrc: '/diners/diners_two_women.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: -5, y: 0, rotX: 0, rotY: -4 },
  },
  {
    id: 't6-dish1',
    type: 'dish-primary',
    tableIndex: 5,
    badgeLabel: 'Tisch 6 von 13 · Hauptgang',
    title: 'Gnocchi Mit Linsen und Süßkartoffel',
    subtitle: 'Handgerollte Süßkartoffelgnocchi, geschmorte Kirschtomaten, Salbeibutter und gereifter Parmesan.',
    imageSrc: '/dishes/dish_06_gnocchi_lentils.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Silvaner trocken, Franken',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't6-dish2',
    type: 'dish-secondary',
    tableIndex: 5,
    badgeLabel: 'Tisch 6 von 13 · Tischschwenk',
    title: 'Ziegenkäse-Crostini',
    subtitle: 'Schwenk zum zweiten Teller mit karamellisiertem Ziegenkäse und Waldhonig.',
    imageSrc: '/dishes/dish_06_gnocchi_lentils.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Gebackener Ziegenkäse mit Waldhonig',
    camera: { z: 80, scale: 1.32, x: 18, y: -10, rotX: 14, rotY: 16 },
  },

  // =========================================================================
  // TABLE 7 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't7-diners',
    type: 'diners',
    tableIndex: 6,
    badgeLabel: 'Tisch 7 von 13 · Die Gäste',
    title: 'Entspannter Abend',
    subtitle: 'Ein Gast am Ecktisch genießt die feine Küche und den Blick in die historische Grube.',
    imageSrc: '/diners/diners_man_savoring.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't7-dish1',
    type: 'dish-primary',
    tableIndex: 6,
    badgeLabel: 'Tisch 7 von 13 · Hauptgang',
    title: 'Handgemachte Kartoffelgnocchi',
    subtitle: 'Zarte Oktopusarme vom Grill, cremige Rahmsauce, Gartenkräuter und frischer Dill.',
    imageSrc: '/dishes/dish_07_potato_gnocchi_octopus.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Sauvignon Blanc, Nahe',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't7-dish2',
    type: 'dish-secondary',
    tableIndex: 6,
    badgeLabel: 'Tisch 7 von 13 · Tischschwenk',
    title: 'Gurken-Fenchel-Salat & Weißwein',
    subtitle: 'Schwenk zum frischen Beilagensalat mit Zitronenöl und dem gekühlten Weißweinglas.',
    imageSrc: '/dishes/dish_07_potato_gnocchi_octopus.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Gurken-Fenchel-Salat mit Zitronenöl',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // =========================================================================
  // TABLE 8 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't8-diners',
    type: 'diners',
    tableIndex: 7,
    badgeLabel: 'Tisch 8 von 13 · Die Gäste',
    title: 'Romantisches Dinner',
    subtitle: 'Gemeinsames Anschneiden der Spezialität des Hauses bei sanfter Hintergrundmusik.',
    imageSrc: '/diners/diners_couple_candid.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: -5, y: 0, rotX: 0, rotY: -4 },
  },
  {
    id: 't8-dish1',
    type: 'dish-primary',
    tableIndex: 7,
    badgeLabel: 'Tisch 8 von 13 · Hauptgang',
    title: 'Maishuhnbrust',
    subtitle: 'Kross gebratene Maispoularde, Blattspinat, geröstete Fregola Sarda und pikanter Paprikasud.',
    imageSrc: '/dishes/dish_08_chicken_breast_fregola.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Chardonnay im Holzfass gereift, Pfalz',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't8-dish2',
    type: 'dish-secondary',
    tableIndex: 7,
    badgeLabel: 'Tisch 8 von 13 · Tischschwenk',
    title: 'Rosmarin-Focaccia & Barrique',
    subtitle: 'Schwenk zum Brotteller mit warmer Rosmarinfocaccia und dem edlen Barrique-Chardonnay.',
    imageSrc: '/dishes/dish_08_chicken_breast_fregola.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Knusprige Rosmarin-Focaccia',
    camera: { z: 80, scale: 1.32, x: 18, y: -10, rotX: 14, rotY: 16 },
  },

  // =========================================================================
  // TABLE 9 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't9-diners',
    type: 'diners',
    tableIndex: 8,
    badgeLabel: 'Tisch 9 von 13 · Die Gäste',
    title: 'Süßer Ausklang',
    subtitle: 'Jubiläumspaar teilt sich andächtig das Meister-Dessert des Küchenchefs.',
    imageSrc: '/diners/diners_couple_phone.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't9-dish1',
    type: 'dish-primary',
    tableIndex: 8,
    badgeLabel: 'Tisch 9 von 13 · Dessert',
    title: 'Postre (Nachtisch)',
    subtitle: 'Spiegelglasur-Mousse au Chocolat, Knusperboden, rote Johannisbeeren und Blattgold.',
    imageSrc: '/dishes/dish_09_postre_dessert.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Portwein Tawny 10 Jahre',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't9-dish2',
    type: 'dish-secondary',
    tableIndex: 8,
    badgeLabel: 'Tisch 9 von 13 · Tischschwenk',
    title: 'Espresso & Portwein',
    subtitle: 'Schwenk zur dampfenden Espressotasse mit knusprigem Mandelkeks und dem Portweinglas.',
    imageSrc: '/dishes/dish_09_postre_dessert.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Frisch gebrühter Espresso mit Mandelkeks',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // =========================================================================
  // TABLE 10 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't10-diners',
    type: 'diners',
    tableIndex: 9,
    badgeLabel: 'Tisch 10 von 13 · Die Gäste',
    title: 'Elegante Konzentration',
    subtitle: 'Eine Dame im Abendkleid kostet das zarte Weiderind mit geschmorten Waldpilzen.',
    imageSrc: '/diners/diners_woman_solo.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: -5, y: 0, rotX: 0, rotY: -4 },
  },
  {
    id: 't10-dish1',
    type: 'dish-primary',
    tableIndex: 9,
    badgeLabel: 'Tisch 10 von 13 · Hauptgang',
    title: 'Rücken Vom Weiderind',
    subtitle: 'Rosa gebratenes Rinderfilet, gebratene Pfifferlinge, Rispentomaten und Trüffelpüree.',
    imageSrc: '/dishes/dish_10_beef_tenderloin.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Spätburgunder GG, Ahr',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't10-dish2',
    type: 'dish-secondary',
    tableIndex: 9,
    badgeLabel: 'Tisch 10 von 13 · Tischschwenk',
    title: 'Trüffelpüree & Spätburgunder',
    subtitle: 'Schwenk zum warmen Steinguttöpfchen mit getrüffeltem Kartoffelpüree und dunklem Rotwein.',
    imageSrc: '/dishes/dish_10_beef_tenderloin.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Getrüffeltes Kartoffelpüree',
    camera: { z: 80, scale: 1.32, x: 18, y: -10, rotX: 14, rotY: 16 },
  },

  // =========================================================================
  // TABLE 11 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't11-diners',
    type: 'diners',
    tableIndex: 10,
    badgeLabel: 'Tisch 11 von 13 · Die Gäste',
    title: 'Familienrunde',
    subtitle: 'Zwei Generationen im vertrauten Austausch bei feinstem mecklenburgischen Edelfisch.',
    imageSrc: '/diners/diners_two_men.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't11-dish1',
    type: 'dish-primary',
    tableIndex: 10,
    badgeLabel: 'Tisch 11 von 13 · Hauptgang',
    title: 'Top Fisch',
    subtitle: 'Kross gebratenes Edelfischfilet, Rucolasalat, Kalamata-Oliven und Knoblauch-Röstbrot.',
    imageSrc: '/dishes/dish_11_top_fish_crispy.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Riesling feinherb, Mosel',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't11-dish2',
    type: 'dish-secondary',
    tableIndex: 10,
    badgeLabel: 'Tisch 11 von 13 · Tischschwenk',
    title: 'Röstbrot & Kapern-Vinaigrette',
    subtitle: 'Schwenk zum Röstbrotteller mit hausgemachter Zitronen-Kapern-Vinaigrette und Wildkräutern.',
    imageSrc: '/dishes/dish_11_top_fish_crispy.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Zitronen-Kapern-Vinaigrette mit Wildkräutern',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // =========================================================================
  // TABLE 12 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't12-diners',
    type: 'diners',
    tableIndex: 11,
    badgeLabel: 'Tisch 12 von 13 · Die Gäste',
    title: 'Kaffeeklatsch der Freunde',
    subtitle: 'Heiterer Plausch beim Genuss traditioneller mediterraner Patisserie und Dessertwein.',
    imageSrc: '/diners/diners_two_women.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: -5, y: 0, rotX: 0, rotY: -4 },
  },
  {
    id: 't12-dish1',
    type: 'dish-primary',
    tableIndex: 11,
    badgeLabel: 'Tisch 12 von 13 · Dessert',
    title: 'Torta Della Nonna',
    subtitle: 'Mürbeteigtorte mit Vanillecremefüllung, karamellisierten Pinienkernen und Bourbon-Vanilleeis.',
    imageSrc: '/dishes/dish_12_torta_della_nonna.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Beerenauslese, Neusiedlersee',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't12-dish2',
    type: 'dish-secondary',
    tableIndex: 11,
    badgeLabel: 'Tisch 12 von 13 · Tischschwenk',
    title: 'Bourbon-Vanilleeis & Dessertwein',
    subtitle: 'Schwenk zum handgemachten Vanilleeis mit frischer Minze und dem bernsteinfarbenen Süßwein.',
    imageSrc: '/dishes/dish_12_torta_della_nonna.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Bourbon-Vanilleeis mit Minze',
    camera: { z: 80, scale: 1.32, x: 18, y: -10, rotX: 14, rotY: 16 },
  },

  // =========================================================================
  // TABLE 13 (DINERS -> DISH 1 -> DISH 2)
  // =========================================================================
  {
    id: 't13-diners',
    type: 'diners',
    tableIndex: 12,
    badgeLabel: 'Tisch 13 von 13 · Die Gäste',
    title: 'Der letzte Löffel',
    subtitle: 'Ein junger Mann genießt andächtig den feinen Schmelz der dunklen Schokoladenmousse.',
    imageSrc: '/diners/diners_man_savoring.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -45, scale: 1.05, x: 5, y: 0, rotX: 0, rotY: 4 },
  },
  {
    id: 't13-dish1',
    type: 'dish-primary',
    tableIndex: 12,
    badgeLabel: 'Tisch 13 von 13 · Dessert',
    title: 'Mousse Au Chocolat',
    subtitle: '70% dunkle Valrhona-Mousse, Waldbeerenkompott, knusprige Vanillehippe und Portwein.',
    imageSrc: '/dishes/dish_13_mousse_chocolat.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    winePairing: 'Pedro Ximénez Sherry',
    camera: { z: 65, scale: 1.28, x: 0, y: -16, rotX: 18, rotY: 0 },
  },
  {
    id: 't13-dish2',
    type: 'dish-secondary',
    tableIndex: 12,
    badgeLabel: 'Tisch 13 von 13 · Tischschwenk',
    title: 'Waldbeeren-Sorbet & Sherry',
    subtitle: 'Schwenk zum fruchtigen Beeren-Sorbet im knusprigen Zuckerkörbchen und dem Sherryglas.',
    imageSrc: '/dishes/dish_13_mousse_chocolat.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    companionNote: 'Waldbeeren-Sorbet im Zuckerkorb',
    camera: { z: 80, scale: 1.32, x: -18, y: -10, rotX: 14, rotY: -16 },
  },

  // 15. FAREWELL PANORAMIC
  {
    id: 'hall-farewell',
    type: 'panoramic',
    tableIndex: -1,
    badgeLabel: 'Auf Wiedersehen',
    title: 'Gastfreundschaft in Wismar',
    subtitle: 'Wir freuen uns darauf, Sie bald persönlich an der Frischen Grube begrüßen zu dürfen.',
    imageSrc: '/diners/interior_hall_panoramic.jpg',
    bgSrc: '/diners/interior_hall_panoramic.jpg',
    camera: { z: -60, scale: 1.06, x: 0, y: -4, rotX: 2, rotY: 0 },
  },
];
