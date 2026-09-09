import React from 'react';

interface OverlayChefProps {
  lang?: 'de' | 'en';
}

export const OverlayChef: React.FC<OverlayChefProps> = ({ lang = 'de' }) => {
  return (
    <section
      id="chef"
      className="relative z-10 w-full min-h-[80vh] bg-[#0a0a0b]/95 backdrop-blur-[12px] py-14 px-5 sm:py-20 sm:px-12 flex items-center justify-center border-t border-[rgba(244,241,236,0.12)]"
    >
      <div className="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
        {/* Left Column: Konzept / Philosophy */}
        <div>
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(244,241,236,0.45)] mb-4">
            {lang === 'de' ? 'Konzept' : 'Philosophy'}
          </span>
          <p className="font-serif text-[clamp(20px,2vw,24px)] italic font-medium text-parchment mb-5 leading-snug">
            {lang === 'de'
              ? '\u201EKleine Karte mit viel Liebe zum Produkt.\u201C'
              : '"A focused menu crafted with deep respect for regional produce."'}
          </p>
          <p className="font-sans text-[15px] font-normal leading-[1.7] text-[rgba(244,241,236,0.75)]">
            {lang === 'de'
              ? 'Unsere Leidenschaft gilt frischen, saisonalen Zutaten aus der Region Mecklenburg und ausgewaehlten Spezialitaeten. Jeder Teller wird mit handwerklicher Praezision und tiefem Respekt vor den Erzeugern komponiert, um Ihnen einen unvergesslichen Abend in historischem Ambiente zu schenken.'
              : 'Our devotion belongs to fresh seasonal ingredients from Mecklenburg and artisanal regional purveyors. Every dish is composed with craft precision and reverence for growers to present an unforgettable dining experience in historic ambiance.'}
          </p>
        </div>

        {/* Right Column: Christian Müller */}
        <div>
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(244,241,236,0.45)] mb-4">
            Christian Mueller
          </span>
          <p className="font-serif text-[clamp(20px,2vw,24px)] font-medium text-parchment mb-5 leading-snug">
            {lang === 'de' ? 'Koch und Konditor' : 'Chef & Pastry Master'}
          </p>
          <p className="font-sans text-[15px] font-normal leading-[1.7] text-[rgba(244,241,236,0.75)]">
            {lang === 'de'
              ? 'Koch und Konditor Christian Mueller verbindet hanseatische Kuechentradition mit moderner europaeischer Gastronomie. Nach Stationen in renommierten Haeusern schuf er in der Frische Grube einen intimen Ort fuer authentischen Geschmack, handwerkliche Perfektion und ungezwungene Gastfreundschaft direkt an Wismars historischer Grube.'
              : 'Chef and pastry master Christian Mueller unites Hanseatic culinary heritage with modern European gastronomy. Following tenures in acclaimed kitchens, he established Frische Grube as an intimate destination for authentic flavor, culinary precision, and relaxed hospitality directly on Wismars historic canal.'}
          </p>
        </div>
      </div>
    </section>
  );
};
