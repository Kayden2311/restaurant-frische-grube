import React from 'react';
import { VideoBeat } from '../data/videoJourneyBeats';

interface OverlayDishCaptionProps {
  currentBeat: VideoBeat | null;
  scrollProgress: number;
  lang?: 'de' | 'en';
}

export const OverlayDishCaption: React.FC<OverlayDishCaptionProps> = ({
  currentBeat,
  scrollProgress,
  lang = 'de',
}) => {
  // Only hide when scrolling into the evening menu past the end of the video
  const isPastJourney = scrollProgress >= 0.92;

  // Visible during the video journey
  const isVisible = !isPastJourney && !!currentBeat && currentBeat.dishIds.length > 0;

  if (!isVisible || !currentBeat) {
    return null;
  }

  const content = currentBeat[lang];

  return (
    <aside
      aria-label="Szenenbeschreibung"
      className="fixed left-6 bottom-6 md:left-12 md:bottom-12 z-20 pointer-events-none max-w-[calc(100vw-3rem)] md:max-w-md transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="dish-caption-card bg-[#0a0a0b]/85 backdrop-blur-[12px] px-5 py-4 md:px-7 md:py-5 border border-[rgba(244,241,236,0.16)] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-sans text-[11px] font-medium tracking-[0.14em] uppercase text-[#f5c97a]">
            {content.badgeLabel}
          </span>
          <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-parchment/40">
            {lang === 'de' ? 'Kulinarische Reise' : 'Culinary Journey'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[clamp(20px,2.2vw,30px)] font-semibold text-parchment mt-2 leading-snug tracking-tight">
          {content.title}
        </h3>

        <div className="w-full h-[1px] bg-[rgba(244,241,236,0.15)] my-2.5" />

        {/* Narrative Subtitle */}
        <p className="font-sans text-[13px] font-normal tracking-[0.02em] text-[rgba(244,241,236,0.72)] leading-relaxed">
          {content.subtitle}
        </p>

        {/* Wine Pairing */}
        {content.winePairing && (
          <div className="mt-3 pt-2.5 border-t border-[rgba(244,241,236,0.1)] flex items-baseline gap-2">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#f5c97a]">
              {lang === 'de' ? 'Weinempfehlung:' : 'Wine Pairing:'}
            </span>
            <span className="font-sans text-[12px] text-parchment/80">
              {content.winePairing}
            </span>
          </div>
        )}

        {/* Note / Companion plate */}
        {content.note && (
          <div className="mt-3 pt-2.5 border-t border-[rgba(244,241,236,0.1)] flex items-baseline gap-2">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#f5c97a]">
              {lang === 'de' ? 'Begleitung:' : 'Note:'}
            </span>
            <span className="font-sans text-[12px] text-parchment/80">
              {content.note}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
