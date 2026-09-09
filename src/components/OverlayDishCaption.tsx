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
      className="fixed left-4 bottom-4 right-4 sm:right-auto sm:left-12 sm:bottom-12 z-20 pointer-events-none sm:max-w-md transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="dish-caption-card bg-[#0a0a0b]/90 backdrop-blur-[14px] px-4 py-3.5 sm:px-7 sm:py-5 border border-[rgba(244,241,236,0.16)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-sm">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-[#f5c97a]">
            {content.badgeLabel}
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-parchment/40">
            {lang === 'de' ? 'Kulinarische Reise' : 'Culinary Journey'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[clamp(17px,2.2vw,30px)] font-semibold text-parchment mt-1.5 sm:mt-2 leading-snug tracking-tight">
          {content.title}
        </h3>

        <div className="w-full h-[1px] bg-[rgba(244,241,236,0.15)] my-2 sm:my-2.5" />

        {/* Narrative Subtitle - Line clamped on mobile to keep the dish in view */}
        <p className="font-sans text-[12px] sm:text-[13px] font-normal tracking-[0.01em] text-[rgba(244,241,236,0.78)] leading-relaxed line-clamp-3 sm:line-clamp-none">
          {content.subtitle}
        </p>

        {/* Wine Pairing */}
        {content.winePairing && (
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[rgba(244,241,236,0.1)] flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-sans text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] text-[#f5c97a] shrink-0">
              {lang === 'de' ? 'Wein:' : 'Wine:'}
            </span>
            <span className="font-sans text-[11px] sm:text-[12px] text-parchment/80 truncate">
              {content.winePairing}
            </span>
          </div>
        )}

        {/* Note / Companion plate */}
        {content.note && (
          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-[rgba(244,241,236,0.08)] flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-sans text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] text-[#f5c97a] shrink-0">
              {lang === 'de' ? 'Begleitung:' : 'Note:'}
            </span>
            <span className="font-sans text-[11px] sm:text-[12px] text-parchment/80 truncate">
              {content.note}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
