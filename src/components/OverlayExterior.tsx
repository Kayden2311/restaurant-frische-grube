import React from 'react';

interface OverlayExteriorProps {
  scrollProgress: number;
}

export const OverlayExterior: React.FC<OverlayExteriorProps> = ({ scrollProgress }) => {
  // Visible between 0% and 8%, fading out between 5% and 8%
  let opacity = 1;
  if (scrollProgress > 0.05) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.05) / 0.03);
  }

  if (opacity <= 0.001) return null;

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-200"
      style={{ opacity }}
    >
      {/* Top Left Title */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-8 md:top-12 md:left-12">
        <h1 className="font-serif text-[clamp(24px,4vw,52px)] font-semibold text-parchment tracking-tight leading-none">
          Frische Grube
        </h1>
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted mt-1.5 sm:mt-2">
          Restaurant &bull; Wismar
        </p>
      </div>

      {/* Bottom Center Address */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4">
        <p className="font-sans text-[11px] sm:text-sm font-normal uppercase tracking-[0.14em] text-parchment/70">
          Scheuerstrasse 1, Wismar
        </p>
      </div>
    </div>
  );
};
