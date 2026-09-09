import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CanvasScrubber } from './components/CanvasScrubber';
import { LoadingScreen } from './components/LoadingScreen';
import { OverlayExterior } from './components/OverlayExterior';
import { OverlayWelcome } from './components/OverlayWelcome';
import { OverlayDishCaption } from './components/OverlayDishCaption';
import { OverlayMenu } from './components/OverlayMenu';
import { OverlayChef } from './components/OverlayChef';
import { OverlayFooter } from './components/OverlayFooter';
import { VIDEO_BEATS, VideoBeat } from './data/videoJourneyBeats';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loadProgress, setLoadProgress] = useState<number>(20);
  const [lang, setLang] = useState<'de' | 'en'>('de');

  // Progressive loading with graceful 2.2s fallback limit for instant responsiveness
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadProgress((p) => Math.max(p, 65)), 600);
    const timer2 = setTimeout(() => setLoadProgress((p) => Math.max(p, 90)), 1400);
    const timer3 = setTimeout(() => setLoadProgress(100), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Stable buffer progress handler
  const handleBufferProgress = useCallback((pct: number) => {
    setLoadProgress((p) => Math.max(p, pct));
  }, []);

  // GSAP ScrollTrigger setup for smooth 60FPS video scrubbing (600vh track)
  useGSAP(
    () => {
      if (!scrollTrackRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: scrollTrackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Refresh on next frame to ensure track height is registered on mobile
      const refreshId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        cancelAnimationFrame(refreshId);
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  // Derive active beat matched to the 6-clip video and dishes 1, 2, 3, 5, 6, 9, 13
  const activeBeat: VideoBeat = useMemo(() => {
    const found = VIDEO_BEATS.find(
      (b) => scrollProgress >= b.startProgress && scrollProgress < b.endProgress
    );
    return found || VIDEO_BEATS[VIDEO_BEATS.length - 1];
  }, [scrollProgress]);

  const isPastJourney = scrollProgress >= 0.92;

  return (
    <main ref={containerRef} className="relative w-full bg-[#0a0a0b] text-[#f4f1ec] min-h-screen">
      {/* 1. Luxury Loading Screen */}
      <LoadingScreen progress={loadProgress} />

      {/* 2. Apple-Style 60FPS WebP Canvas Scrubber Stage */}
      <CanvasScrubber
        scrollProgress={scrollProgress}
        onBufferProgress={handleBufferProgress}
      />

      {/* 3. Responsive Top Header Bar (Full width, zero collision between brand and nav) */}
      <header className="fixed top-0 left-0 right-0 z-30 px-4 py-3 sm:px-8 sm:py-5 flex items-center justify-between pointer-events-none select-none">
        {/* Brand Monogram */}
        <a href="#" className="flex items-center gap-2.5 pointer-events-auto group">
          <div className="w-8 h-8 rounded-full border border-[#f5c97a]/30 group-hover:border-[#f5c97a]/70 flex items-center justify-center bg-[#111113]/85 backdrop-blur-md transition-colors">
            <span className="font-serif italic font-semibold text-xs text-[#f5c97a]">FG</span>
          </div>
          <span className="hidden sm:inline-block font-serif text-sm tracking-wide text-parchment/90 font-medium">
            Frische Grube
          </span>
        </a>

        {/* Right Navigation Controls */}
        <nav aria-label="Hauptnavigation" className="flex items-center gap-2 sm:gap-3 md:gap-4 pointer-events-auto">
          {/* Language Switcher: DE / EN */}
          <div className="flex items-center border border-subtle bg-[#111113]/90 backdrop-blur-md rounded-sm p-0.5">
            <button
              type="button"
              onClick={() => setLang('de')}
              className={`font-sans text-[10px] md:text-[11px] uppercase tracking-[0.1em] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] transition-all cursor-pointer ${
                lang === 'de'
                  ? 'bg-[#f5c97a] text-[#0a0a0b] font-semibold shadow-sm'
                  : 'text-parchment/60 hover:text-parchment'
              }`}
              title="Auf Deutsch wechseln"
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`font-sans text-[10px] md:text-[11px] uppercase tracking-[0.1em] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#f5c97a] text-[#0a0a0b] font-semibold shadow-sm'
                  : 'text-parchment/60 hover:text-parchment'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          <a
            href="#menu"
            className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.12em] text-parchment/80 hover:text-parchment transition-colors px-2.5 py-1 border border-subtle/70 hover:border-subtle bg-[#111113]/70 backdrop-blur-md rounded-sm"
          >
            {lang === 'de' ? 'Menue' : 'Menu'}
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-block font-sans text-xs uppercase tracking-[0.14em] text-parchment/60 hover:text-parchment transition-colors px-2.5 py-1.5 border border-transparent hover:border-subtle"
          >
            {lang === 'de' ? 'Kontakt' : 'Contact'}
          </a>
          <span className="hidden md:inline-block w-[1px] h-3 bg-subtle" />
          <span className="hidden md:inline-block font-sans text-[11px] uppercase tracking-[0.12em] text-[#f5c97a]">
            {isPastJourney
              ? (lang === 'de' ? 'Abendkarte' : 'Evening Menu')
              : activeBeat[lang]?.badgeLabel || (lang === 'de' ? 'Scheuerstraße' : 'Historic Vaults')}
          </span>
        </nav>
      </header>

      {/* 4. Narrative HTML Overlays */}
      <OverlayExterior scrollProgress={scrollProgress} lang={lang} />
      <OverlayWelcome scrollProgress={scrollProgress} lang={lang} />
      <OverlayDishCaption
        currentBeat={activeBeat}
        scrollProgress={scrollProgress}
        lang={lang}
      />

      {/* 5. Scroll Track for scrubbing through the 60s video (600vh track for optimal pace) */}
      <div ref={scrollTrackRef} className="relative w-full h-[600vh] pointer-events-none" />

      {/* 6. Document Scroll Sections: Menu, Chef, Philosophie & Contact (Direct Continuous Flow) */}
      <div className="relative z-10 w-full bg-[#0a0a0b] shadow-[0_-40px_100px_rgba(0,0,0,0.95)]">
        <OverlayMenu lang={lang} />
        <OverlayChef lang={lang} />
        <OverlayFooter lang={lang} />
      </div>
    </main>
  );
}
