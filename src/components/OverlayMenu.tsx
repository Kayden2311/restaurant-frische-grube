import React from 'react';

interface OverlayMenuProps {
  lang?: 'de' | 'en';
}

export const OverlayMenu: React.FC<OverlayMenuProps> = ({ lang = 'de' }) => {
  return (
    <section
      id="menu"
      className="relative z-10 w-full min-h-screen bg-[#0a0a0b]/92 backdrop-blur-[12px] py-16 px-4 sm:py-24 sm:px-12 flex justify-center border-t border-[rgba(244,241,236,0.12)]"
    >
      <div className="w-full max-w-[680px]">
        {/* Headline */}
        <h2 className="font-serif text-[clamp(32px,4.5vw,56px)] font-semibold text-center tracking-tight text-parchment mb-6">
          {lang === 'de' ? 'Abendmenue' : 'Evening Menu'}
        </h2>

        {/* 3 Course standalone pill */}
        <div className="text-center mb-12">
          <div className="inline-block border border-[rgba(244,241,236,0.2)] px-6 py-2">
            <span className="font-serif italic font-semibold text-lg text-parchment">
              {lang === 'de' ? '3 Gaenge Menue \u2022 \u20AC54' : '3-Course Menu \u2022 \u20AC54'}
            </span>
          </div>
        </div>

        {/* 1. Hauscocktails */}
        <div className="mb-14">
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[rgba(244,241,236,0.45)] mb-5">
            {lang === 'de' ? 'Hauscocktails' : 'House Cocktails'}
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Beschwipste Moewe
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;9,00
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1 leading-relaxed">
                (Wodka oder Siegfried 0,00% | Tonic | Holundersirup | Minze | Zitrone | Blue Curacao Sirup)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Schielender Kranich
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;9,50
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1 leading-relaxed">
                (Lillet | Gin | Grapefruit | Rhabarber | Wild Berry | Sekt)
              </p>
            </div>
          </div>
        </div>

        {/* 2. Vorspeisen */}
        <div className="mb-14">
           <h3 className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[rgba(244,241,236,0.45)] mb-5">
            {lang === 'de' ? 'Vorspeisen' : 'Starters'}
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Gebratene Garnelen
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;17,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (Paprika | Blumenkohl | Oliven | Selleriepüree)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Roemersalat &amp; Rucola
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;16,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (Caesar Dressing | gehobelter Parmesan | Kapern | Roestbrot | Rohschinken)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Riesling-Kartoffelsueppchen
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;12,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (kaltgepresstes Rapsoel | Rauchlachsrilette)
              </p>
            </div>
          </div>
        </div>

        {/* 3. Hauptspeisen */}
        <div className="mb-14">
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[rgba(244,241,236,0.45)] mb-5">
            {lang === 'de' ? 'Hauptspeisen' : 'Main Courses'}
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Cremiges Blaubeerrisotto
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;25,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (Walnuesse | gebrannter Ziegenkaese | Pfifferlinge | Salatherzen | Weissweinsauce)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Kabeljaufilet auf der Haut gebraten
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;31,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (Rote Bete | Miesmuscheln | Meerrettich | Stampf | Petersilie | Wermutschaum)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Ruecken vom Landuroschwein
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;31,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (Birne | Bohnen | Speck | Petersilie | Drillinge | Jus)
              </p>
            </div>
          </div>
        </div>

        {/* 4. Dessert */}
        <div>
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[rgba(244,241,236,0.45)] mb-5">
            Dessert
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Zweierlei vom Joghurt
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;15,90
                </span>
              </div>
              <p className="font-sans text-[13px] italic font-normal text-[rgba(244,241,236,0.5)] mt-1">
                (Oreocrumble | Johannisbeeren | Wassermelone | Nektarine | Zitronengelee)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[15px] font-medium text-parchment">
                  Kaese vom Wismarer Wochenmarkt
                </span>
                <span className="font-sans text-[15px] font-medium text-parchment">
                  &euro;16,90
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
