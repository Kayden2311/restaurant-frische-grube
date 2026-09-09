import { useState, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VideoScrubber } from './components/VideoScrubber';
import { LoadingScreen } from './components/LoadingScreen';
import { OverlayExterior } from './components/OverlayExterior';
import { OverlayWelcome } from './components/OverlayWelcome';
import { OverlayDishCaption } from './components/OverlayDishCaption';
import { OverlayMenu } from './components/OverlayMenu';
import { OverlayChef } from './components/OverlayChef';
import { OverlayFooter } from './components/OverlayFooter';
import { VIDEO_BEATS, VideoBeat } from './data/videoJourneyBeats';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loadProgress] = useState<number>(100);
  const [lang, setLang] = useState<'de' | 'en'>('de');

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

      return () => {
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
    <main ref={containerRef} className="relative w-full bg-[#0a0a0b] text-[#f4f1ec] min-h-screen overflow-x-hidden">
      {/* 1. Luxury Loading Screen */}
      <LoadingScreen progress={loadProgress} />

      {/* 2. 60FPS Hardware Accelerated Video Stage (All-Intra GOP=1) */}
      <VideoScrubber
        scrollProgress={scrollProgress}
        videoSrc="/videos/restaurant_journey.mp4"
      />

      {/* 3. Top-Right Navigation & Active Stage HUD */}
      <nav aria-label="Hauptnavigation" className="fixed top-6 right-6 md:top-8 md:right-10 z-30 flex items-center gap-3 md:gap-4">
        {/* Language Switcher: DE / EN */}
        <div className="flex items-center border border-subtle bg-[#111113]/85 backdrop-blur-md rounded-sm p-0.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setLang('de')}
            className={`font-sans text-[10px] md:text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-[2px] transition-all cursor-pointer ${
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
            className={`font-sans text-[10px] md:text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-[2px] transition-all cursor-pointer ${
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
          className="font-sans text-xs uppercase tracking-[0.14em] text-parchment/60 hover:text-parchment transition-colors pointer-events-auto px-2.5 py-1.5 border border-transparent hover:border-subtle"
        >
          {lang === 'de' ? 'Menue' : 'Menu'}
        </a>
        <a
          href="#contact"
          className="font-sans text-xs uppercase tracking-[0.14em] text-parchment/60 hover:text-parchment transition-colors pointer-events-auto px-2.5 py-1.5 border border-transparent hover:border-subtle"
        >
          {lang === 'de' ? 'Kontakt' : 'Contact'}
        </a>
        <span className="hidden sm:inline-block w-[1px] h-3 bg-subtle" />
        <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#f5c97a]">
          {isPastJourney
            ? (lang === 'de' ? 'Abendkarte' : 'Evening Menu')
            : activeBeat[lang]?.badgeLabel || (lang === 'de' ? 'Scheuerstraße' : 'Historic Vaults')}
        </span>
      </nav>

      {/* 4. Narrative HTML Overlays */}
      <OverlayExterior scrollProgress={scrollProgress} />
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
