import React from 'react';

interface OverlayWelcomeProps {
  scrollProgress: number;
  lang?: 'de' | 'en';
}

export const OverlayWelcome: React.FC<OverlayWelcomeProps> = ({ scrollProgress, lang = 'de' }) => {
  // Fades in when entering panoramic hall (around 6% to 12%)
  let opacity = 0;
  if (scrollProgress >= 0.06 && scrollProgress <= 0.12) {
    if (scrollProgress < 0.08) {
      opacity = (scrollProgress - 0.06) / 0.02;
    } else if (scrollProgress > 0.10) {
      opacity = (0.12 - scrollProgress) / 0.02;
    } else {
      opacity = 1.0;
    }
  }

  if (opacity <= 0.001) return null;

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center transition-opacity duration-200"
      style={{ opacity }}
    >
      <div className="text-center px-6">
        <h2 className="font-serif italic font-medium text-[clamp(20px,2.6vw,36px)] tracking-[0.02em] text-parchment drop-shadow-lg">
          {lang === 'de' ? 'Herzlich Willkommen' : 'A Warm Welcome'}
        </h2>
        <div className="w-16 h-[1px] bg-[#f5c97a]/50 mx-auto mt-3" />
      </div>
    </div>
  );
};
