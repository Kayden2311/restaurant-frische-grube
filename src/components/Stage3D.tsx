import React, { useEffect, useRef, useState, useMemo } from 'react';
import { NARRATIVE_BEATS, NarrativeBeat } from '../data/narrativeJourney';

interface Stage3DProps {
  scrollProgress: number;
  onBeatChange?: (beat: NarrativeBeat) => void;
  onLoadProgress?: (progress: number) => void;
}

export const Stage3D: React.FC<Stage3DProps> = ({
  scrollProgress,
  onBeatChange,
  onLoadProgress,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Mouse tilt tracking for real-time 3D parallax gyroscope
  const [mouse, setMouse] = useState<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0,
  });

  // Preload all unique images once
  useEffect(() => {
    let cancelled = false;
    const urls = new Set<string>();
    NARRATIVE_BEATS.forEach((b) => {
      if (b.imageSrc) urls.add(b.imageSrc);
      if (b.bgSrc) urls.add(b.bgSrc);
    });

    const urlList = Array.from(urls);
    let loaded = 0;
    const total = urlList.length;

    urlList.forEach((u) => {
      const img = new Image();
      img.src = u;
      const onDone = () => {
        if (cancelled) return;
        loaded += 1;
        const pct = Math.min(100, Math.round((loaded / total) * 100));
        if (onLoadProgress) onLoadProgress(pct);
        if (loaded >= total) {
          setIsLoaded(true);
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
    });

    return () => {
      cancelled = true;
    };
  }, [onLoadProgress]);

  // Smooth mouse movement for physical 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to +1
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({
        x: normX * 20,
        y: normY * 14,
        rotY: normX * 4.5,
        rotX: -normY * 3.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Compute active beats, smooth camera coordinates, and directional camera kinetics
  const {
    currentBeat,
    nextBeat,
    blendFactor,
    cameraPose,
    outgoingMotion,
    incomingMotion,
  } = useMemo(() => {
    const totalBeats = NARRATIVE_BEATS.length;
    // Map scroll progress from 0.0 to 0.78 across all beats
    const journeyLimit = 0.78;
    const normalizedP = Math.max(0, Math.min(1, scrollProgress / journeyLimit));
    const continuousIndex = normalizedP * (totalBeats - 1);
    const currIdx = Math.min(Math.floor(continuousIndex), totalBeats - 1);
    const nextIdx = Math.min(currIdx + 1, totalBeats - 1);
    const fraction = continuousIndex - currIdx; // 0.0 to 1.0 within beat

    const bA = NARRATIVE_BEATS[currIdx];
    const bB = NARRATIVE_BEATS[nextIdx];

    // Hermite smoothstep blend for smooth cross-dissolve (starts at 60% of beat)
    const transitionStart = 0.60;
    let blend = 0;
    if (fraction > transitionStart && currIdx < nextIdx) {
      const raw = (fraction - transitionStart) / (1.0 - transitionStart);
      blend = raw * raw * (3 - 2 * raw);
    }

    // Camera pose continuous interpolation
    const camA = bA.camera;
    const camB = bB.camera;

    const z = camA.z + (camB.z - camA.z) * blend;
    const scale = camA.scale + (camB.scale - camA.scale) * blend + fraction * 0.025;
    const x = camA.x + (camB.x - camA.x) * blend;
    const y = camA.y + (camB.y - camA.y) * blend;
    const rotX = camA.rotX + (camB.rotX - camA.rotX) * blend;
    const rotY = camA.rotY + (camB.rotY - camA.rotY) * blend;

    // Directional kinetic displacement for genuine camera crane/sweep movement
    let outX = 0;
    let outY = 0;
    let outScale = 1;
    let outBlur = 0;

    let inX = 0;
    let inY = 0;
    let inScale = 1;

    const isCraneDown =
      (bA.type === 'diners' && (bB.type === 'dish-primary' || bB.type === 'dish-secondary')) ||
      (bA.id === 't1-crane' && bB.type === 'dish-primary');

    const isTableSweep =
      bA.type === 'dish-primary' && bB.type === 'dish-secondary';

    const isCraneUp =
      (bA.type === 'dish-secondary' || bA.type === 'dish-primary') && bB.type === 'diners';

    if (isCraneDown) {
      // Camera dives down from diners to table
      outY = -blend * 28; // Outgoing diners rise upward
      outScale = 1 + blend * 0.12;
      outBlur = blend * 5;
      inY = (1 - blend) * 28; // Incoming dish rushes in from below
      inScale = 0.94 + blend * 0.06;
    } else if (isTableSweep) {
      // Camera pans horizontally across table
      const dir = bA.tableIndex % 2 === 0 ? -1 : 1;
      outX = dir * blend * 26;
      inX = -dir * (1 - blend) * 26;
    } else if (isCraneUp) {
      // Camera rises and pulls back to next table diners
      outY = blend * 22;
      inY = (blend - 1) * 22;
      outBlur = blend * 5;
      outScale = 1 - blend * 0.06;
      inScale = 1.04 - (1 - blend) * 0.04;
    } else {
      outScale = 1 + blend * 0.04;
      inScale = 0.96 + blend * 0.04;
    }

    return {
      currentBeat: bA,
      nextBeat: bB,
      blendFactor: blend,
      cameraPose: { z, scale, x, y, rotX, rotY },
      outgoingMotion: { x: outX, y: outY, scale: outScale, blur: outBlur },
      incomingMotion: { x: inX, y: inY, scale: inScale },
    };
  }, [scrollProgress]);

  // Report active beat to parent HUD
  useEffect(() => {
    if (onBeatChange) {
      onBeatChange(currentBeat);
    }
  }, [currentBeat, onBeatChange]);

  // Completely hide 3D canvas when scrolled past journey into menu and footer
  const isPastJourney = scrollProgress >= 0.80;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0a0a0b] pointer-events-none select-none transition-opacity duration-700 ease-out"
      style={{
        perspective: '1200px',
        opacity: isLoaded && !isPastJourney ? 1 : 0,
        visibility: isPastJourney ? 'hidden' : 'visible',
      }}
    >
      {/* =================================================================== */}
      {/* 3D CAMERA RIG WITH GYROSCOPIC TILT & SMOOTH CRANE / PITCH PHYSICS   */}
      {/* =================================================================== */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate3d(${mouse.x}px, ${mouse.y}px, ${cameraPose.z}px) rotateX(${mouse.rotX + cameraPose.rotX}deg) rotateY(${mouse.rotY + cameraPose.rotY}deg) scale(${cameraPose.scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'transform',
        }}
      >
        {/* ================================================================= */}
        {/* LAYER 0: DEEP BACKGROUND (Z = -450px) - Sảnh vòm cổ kính & Parallax */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(${cameraPose.x * 0.18}%, ${cameraPose.y * 0.18}%, -450px) scale(1.6)`,
            transformOrigin: 'center center',
            filter: 'blur(16px) brightness(0.36)',
            transition: 'transform 0.18s ease-out',
          }}
        >
          <img
            src={currentBeat.bgSrc}
            alt="Gewölbe Atmosphäre"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ================================================================= */}
        {/* LAYER 1: AMBIENT MID-PLANE (Z = -160px) - Ánh đèn chùm & Bokeh sâu */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            transform: `translate3d(${cameraPose.x * 0.45}%, ${cameraPose.y * 0.45}%, -160px) scale(1.25)`,
            transformOrigin: 'center center',
            opacity: 0.7,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div className="absolute top-[18%] left-[22%] w-64 h-64 rounded-full bg-[#f5c97a]/15 blur-[60px]" />
          <div className="absolute top-[28%] right-[25%] w-80 h-80 rounded-full bg-[#ffeed0]/10 blur-[80px]" />
          <div className="absolute bottom-[20%] left-[35%] w-72 h-72 rounded-full bg-[#d4974f]/12 blur-[70px]" />
        </div>

        {/* ================================================================= */}
        {/* LAYER 2: SHARP FOCAL SUBJECT PLANE WITH DIRECTIONAL CAMERA MOTION */}
        {/* ================================================================= */}
        <div
          key={currentBeat.id}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            transform: `translate3d(calc(${cameraPose.x}% + ${outgoingMotion.x}%), calc(${cameraPose.y}% + ${outgoingMotion.y}%), 0px) scale(${outgoingMotion.scale})`,
            transformOrigin: 'center center',
            filter: outgoingMotion.blur > 0 ? `blur(${outgoingMotion.blur}px)` : 'none',
            opacity: 1,
            willChange: 'transform, opacity, filter',
          }}
        >
          <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.92)]">
            <img
              src={currentBeat.imageSrc}
              alt={currentBeat.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* LAYER 2B: INCOMING NEXT BEAT WITH DIRECTIONAL MOMENTUM             */}
        {blendFactor > 0 && (
          <div
            key={nextBeat.id}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              transform: `translate3d(calc(${cameraPose.x}% + ${incomingMotion.x}%), calc(${cameraPose.y}% + ${incomingMotion.y}%), 15px) scale(${incomingMotion.scale})`,
              transformOrigin: 'center center',
              opacity: blendFactor,
              transition: 'opacity 0.06s linear',
              willChange: 'transform, opacity',
            }}
          >
            <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.92)]">
              <img
                src={nextBeat.imageSrc}
                alt={nextBeat.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* LAYER 3: NEAR-CAMERA FOREGROUND (Z = +220px) - Ly Rượu & Nến       */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            transform: `translate3d(${-cameraPose.x * 1.5 - mouse.x * 2.5}px, ${-cameraPose.y * 1.5 - mouse.y * 2.0}px, 220px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div className="absolute -bottom-16 -left-12 w-64 h-96 rounded-full bg-[#111113]/70 blur-xl border-r border-[#f5c97a]/20 opacity-60" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-radial-vignette bg-[#f5c97a]/15 blur-[90px] opacity-75" />

          <div className="absolute top-[35%] left-[28%] w-3 h-3 rounded-full bg-[#f5c97a]/40 blur-[2px] animate-pulse" />
          <div className="absolute top-[45%] right-[32%] w-2 h-2 rounded-full bg-[#ffeed0]/50 blur-[1px] animate-pulse" />
          <div className="absolute bottom-[40%] left-[42%] w-2.5 h-2.5 rounded-full bg-[#f5c97a]/30 blur-[2px]" />
        </div>

        {/* ================================================================= */}
        {/* LAYER 4: ATMOSPHERIC WARMTH (Z = +320px)                           */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            transform: 'translate3d(0, 0, 320px)',
          }}
        >
          <div className="absolute inset-0 bg-radial-vignette opacity-60" />
        </div>
      </div>
    </div>
  );
};
