import React from 'react';

interface OverlayExteriorProps {
  scrollProgress: number;
  lang?: 'de' | 'en';
}

export const OverlayExterior: React.FC<OverlayExteriorProps> = ({
  scrollProgress,
  lang = 'de',
}) => {
  // Smooth continuous fadeout from 0% to 6%
  const opacity = Math.max(0, Math.min(1, 1 - scrollProgress / 0.06));

  return (
    <header
      aria-label="Hero Willkommen"
      className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-300 select-none"
      style={{
        opacity,
        visibility: opacity <= 0.005 ? 'hidden' : 'visible',
      }}
    >
      {/* Brand Title: Top-left with comfortable clearance from top header bar */}
      <div className="absolute top-14 left-5 sm:top-16 sm:left-8 md:top-14 md:left-12">
        <h1 className="font-serif text-[clamp(26px,4.2vw,52px)] font-semibold text-parchment tracking-tight leading-none drop-shadow-md">
          Frische Grube
        </h1>
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#f5c97a] mt-2">
          {lang === 'de' ? 'Historisches Restaurant · Wismar' : 'Historic Restaurant · Wismar'}
        </p>
      </div>

      {/* Bottom Address & Animated Scroll Cue */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex flex-col items-center text-center px-4">
        <p className="font-sans text-[11px] sm:text-xs font-normal uppercase tracking-[0.16em] text-parchment/65 mb-2.5">
          Scheuerstrasse 1 · Wismar
        </p>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0b]/75 backdrop-blur-md border border-[rgba(244,241,236,0.14)] shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5c97a] animate-ping" />
          <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#f5c97a] font-medium">
            {lang === 'de' ? 'Nach unten scrollen' : 'Scroll to explore'}
          </span>
        </div>
      </div>
    </header>
  );
};
