import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Ladebildschirm"
      aria-busy="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b] text-[#f4f1ec] transition-opacity duration-700 select-none"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? 'none' : 'auto',
      }}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Monogram or Emblem */}
        <div className="w-12 h-12 mb-6 rounded-full border border-[#f5c97a]/30 flex items-center justify-center">
          <span className="font-serif italic text-lg text-[#f5c97a]">FG</span>
        </div>

        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f5c97a] mb-2">
          Scheuerstraße 1 · Wismar
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl text-parchment tracking-wide mb-6">
          Restaurant Frische Grube
        </h2>

        {/* Minimal Gold Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative mb-4">
          <div
            className="h-full bg-[#f5c97a] transition-all duration-200 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-48 text-[10px] font-sans uppercase tracking-[0.15em] text-parchment/40">
          <span>Raumreise</span>
          <span className="font-mono text-[#f5c97a]">{progress}%</span>
        </div>
      </div>
    </aside>
  );
};
