export interface DishItem {
  id: number;
  name: string;
  subtitle: string;
  category: 'Vorspeise' | 'Hauptgang' | 'Dessert';
  imageSrc: string;
  companionDish: string;
  winePairing: string;
}

export const DISHES: DishItem[] = [
  {
    id: 1,
    name: "Entenbrust",
    subtitle: "Rosa gebratene Entenbrust, Beerenreduktion, Rettich und Microgreens",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_01_duck_breast.jpg",
    companionDish: "Warmes Sauerteigbrot mit geschlagener Kraeuterbutter",
    winePairing: "Spätburgunder trocken, Weingut Salwey"
  },
  {
    id: 2,
    name: "Kabeljaufilet",
    subtitle: "Auf der Haut gebraten, Rote Bete, Linsen und frischer Feldsalat",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_02_cod_fillet.jpg",
    companionDish: "Kleines Kohlrabisueppchen mit Edelfischtatar",
    winePairing: "Riesling Alte Reben, Mosel"
  },
  {
    id: 3,
    name: "Hüfte Vom Salzwiesenlamm",
    subtitle: "Rosa Lammhuefte, geschmorte Ruebe, frische Kraeuter und Rosmarinjus",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_03_lamb_hip.jpg",
    companionDish: "Handgemachte Kartoffelgnocchi mit Salbeibutter",
    winePairing: "Cabernet Dorsa, Pfalz"
  },
  {
    id: 4,
    name: "Kohlrabizitronensüppchen",
    subtitle: "Cremiges Sueppchen, gebeizter Edelfisch, Petersilie und feines Kraeuteroel",
    category: "Vorspeise",
    imageSrc: "/dishes/dish_04_kohlrabi_soup.jpg",
    companionDish: "Geroestetes Roggenbrot mit Meersalzflocken",
    winePairing: "Weissburgunder trocken, Baden"
  },
  {
    id: 5,
    name: "Hausgebeizter Bio Lachs",
    subtitle: "Zitrusaromen, Radieschen, essbare Blueten und kaltgepresstes Rapsoel",
    category: "Vorspeise",
    imageSrc: "/dishes/dish_05_bio_salmon.jpg",
    companionDish: "Pumpernickel-Crumble mit Sauerrahm",
    winePairing: "Grauburgunder, Rheinhessen"
  },
  {
    id: 6,
    name: "Gnocchi Mit Linsen und Süßkartoffel",
    subtitle: "Handgemachte Gnocchi, Kirschtomaten, Salbeibutter und gereifter Parmesan",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_06_gnocchi_lentils.jpg",
    companionDish: "Gebackener Ziegenkaese mit Waldhonig",
    winePairing: "Silvaner trocken, Franken"
  },
  {
    id: 7,
    name: "Handgemachte Kartoffelgnocchi",
    subtitle: "Frische Kraeuter, zarter Oktopus, Basilikum, Dill und leichter Rahm",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_07_potato_gnocchi_octopus.jpg",
    companionDish: "Gurken-Fenchel-Salat mit Zitronenoel",
    winePairing: "Sauvignon Blanc, Nahe"
  },
  {
    id: 8,
    name: "Maishuhnbrust",
    subtitle: "Goldbraune Maispoularde, Blattspinat, geroestete Fregola Sarda und Paprikasud",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_08_chicken_breast_fregola.jpg",
    companionDish: "Knusprige Rosmarin-Focaccia",
    winePairing: "Chardonnay im Holzfass gereift, Pfalz"
  },
  {
    id: 9,
    name: "Postre (Nachtisch)",
    subtitle: "Schokoladenmousse, Knusperboden, Puderzucker und erfrischende Fruchtperlen",
    category: "Dessert",
    imageSrc: "/dishes/dish_09_postre_dessert.jpg",
    companionDish: "Frisch gebruehter Espresso mit Mandelkeks",
    winePairing: "Portwein Tawny 10 Jahre"
  },
  {
    id: 10,
    name: "Rücken Vom Weiderind",
    subtitle: "Zartes Weiderind, geschmorte Waldpilze, Kirschtomaten und kraeftiger Natursaft",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_10_beef_tenderloin.jpg",
    companionDish: "Getrueffeltes Kartoffelpueree",
    winePairing: "Spaetburgunder GG, Ahr"
  },
  {
    id: 11,
    name: "Top Fisch",
    subtitle: "Kross gebratenes Edelfischfilet, Marktsalat, Oliven und knuspriges Roestbrot",
    category: "Hauptgang",
    imageSrc: "/dishes/dish_11_top_fish_crispy.jpg",
    companionDish: "Zitronen-Kapern-Vinaigrette mit Wildkraeutern",
    winePairing: "Riesling feinherb, Mosel"
  },
  {
    id: 12,
    name: "Torta Della Nonna",
    subtitle: "Muerbeteigtarte, karamellisierte Nuesse, frische Erdbeeren und Vanillecreme",
    category: "Dessert",
    imageSrc: "/dishes/dish_12_torta_della_nonna.jpg",
    companionDish: "Bourbon-Vanilleeis mit Minze",
    winePairing: "Beerenauslese, Neusiedlersee"
  },
  {
    id: 13,
    name: "Mousse Au Chocolat",
    subtitle: "Dunkle Mousse, Waldbeerenkompott, feines Eis und knusprige Vanillehippe",
    category: "Dessert",
    imageSrc: "/dishes/dish_13_mousse_chocolat.jpg",
    companionDish: "Waldbeeren-Sorbet im Zuckerkorb",
    winePairing: "Pedro Ximénez Sherry"
  }
];
