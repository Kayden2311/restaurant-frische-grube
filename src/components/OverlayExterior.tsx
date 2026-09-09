import React from 'react';

interface OverlayExteriorProps {
  scrollProgress: number;
  lang?: 'de' | 'en';
}

export const OverlayExterior: React.FC<OverlayExteriorProps> = ({
  scrollProgress,
  lang = 'de',
}) => {
  // Visible between 0% and 8%, fading out smoothly
  let opacity = 1;
  if (scrollProgress > 0.04) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.04) / 0.035);
  }

  if (opacity <= 0.001) return null;

  return (
    <header
      aria-label="Hero Willkommen"
      className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-300 select-none"
      style={{ opacity }}
    >
      {/* 1. Desktop Top-Left Classic Title (Hidden on small mobile to prevent any collision) */}
      <div className="hidden md:block absolute top-8 left-8 md:top-12 md:left-12">
        <h1 className="font-serif text-[clamp(32px,3.8vw,52px)] font-semibold text-parchment tracking-tight leading-none drop-shadow-md">
          Frische Grube
        </h1>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5c97a] mt-2">
          {lang === 'de' ? 'Historisches Restaurant · Wismar' : 'Historic Restaurant · Wismar'}
        </p>
      </div>

      {/* 2. Mobile Centered Luxury Hero Presentation (Visible on mobile < 768px) */}
      <div className="md:hidden absolute inset-x-0 bottom-24 flex flex-col items-center text-center px-6">
        {/* Monogram emblem */}
        <div className="w-10 h-10 mb-3 rounded-full border border-[#f5c97a]/40 flex items-center justify-center bg-[#0a0a0b]/60 backdrop-blur-md">
          <span className="font-serif italic text-sm text-[#f5c97a]">FG</span>
        </div>

        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#f5c97a] mb-1.5">
          {lang === 'de' ? 'Gegruendet 1371 · Wismar' : 'Established 1371 · Wismar'}
        </p>

        <h1 className="font-serif text-[clamp(28px,7.5vw,38px)] font-semibold text-parchment tracking-tight leading-tight drop-shadow-lg">
          Frische Grube
        </h1>

        <p className="font-sans text-[12px] text-parchment/75 mt-2 max-w-[280px] leading-relaxed">
          {lang === 'de'
            ? 'Feine regionale Kueche in den historischen Gewoelben'
            : 'Artisanal regional dining in historic vaulted halls'}
        </p>
      </div>

      {/* 3. Bottom Animated Scroll Prompt (Both mobile and desktop) */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0a0b]/70 backdrop-blur-md border border-[rgba(244,241,236,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5c97a] animate-ping" />
          <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#f5c97a] font-medium">
            {lang === 'de' ? 'Nach unten scrollen' : 'Scroll to explore'}
          </span>
        </div>
      </div>
    </header>
  );
};
