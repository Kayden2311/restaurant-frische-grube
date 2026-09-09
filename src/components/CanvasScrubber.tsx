import React, { useEffect, useRef, useState } from 'react';

interface CanvasScrubberProps {
  scrollProgress: number;
  onBufferProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 240;

export const CanvasScrubber: React.FC<CanvasScrubberProps> = ({
  scrollProgress,
  onBufferProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();
  const folder = isMobile ? '/frames/sequence/mobile' : '/frames/sequence/desktop';

  // Array of loaded HTMLImageElement | null
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Buffer progress callback ref
  const onBufferProgressRef = useRef(onBufferProgress);
  onBufferProgressRef.current = onBufferProgress;

  // Progressive frame loader
  useEffect(() => {
    // Reset cache on device orientation or screen size switch
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    let loadedCount = 0;
    let isCancelled = false;

    const getFrameUrl = (idx: number) => {
      const numStr = String(idx + 1).padStart(3, '0');
      return `${folder}/f_${numStr}.webp`;
    };

    // Load individual frame helper
    const loadFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (isCancelled) return resolve();
        if (images[idx]) return resolve();

        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isCancelled) {
            images[idx] = img;
            loadedCount++;
            if (loadedCount >= 15 && onBufferProgressRef.current) {
              const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
              onBufferProgressRef.current(pct);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Phase 1: Eagerly load the first 20 frames for 0ms initial interaction
    const initialBatch = Array.from({ length: 20 }, (_, i) => i);
    Promise.all(initialBatch.map(loadFrame)).then(() => {
      if (!isCancelled && onBufferProgressRef.current) {
        onBufferProgressRef.current(100);
      }

      // Phase 2: Progressively load remaining frames in small batches
      let nextIdx = 20;
      const loadNextChunk = () => {
        if (isCancelled || nextIdx >= TOTAL_FRAMES) return;
        const chunk = Array.from(
          { length: Math.min(10, TOTAL_FRAMES - nextIdx) },
          (_, i) => nextIdx + i
        );
        nextIdx += chunk.length;
        Promise.all(chunk.map(loadFrame)).then(() => {
          if (!isCancelled) {
            setTimeout(loadNextChunk, 20);
          }
        });
      };
      loadNextChunk();
    });

    return () => {
      isCancelled = true;
    };
  }, [folder]);

  // Map scroll progress (0.0 to 0.92) to frame index (0 to 239)
  useEffect(() => {
    const journeyLimit = 0.92;
    const normalized = Math.max(0, Math.min(1, scrollProgress / journeyLimit));
    targetFrameRef.current = normalized * (TOTAL_FRAMES - 1);
  }, [scrollProgress]);

  // High-performance canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2));
    let height = (canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
      height = canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
      lastDrawnFrameRef.current = -1; // Force redraw on resize
    };
    window.addEventListener('resize', handleResize);

    const lerpFactor = 0.22;

    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = current + diff * lerpFactor;
      } else {
        currentFrameRef.current = target;
      }

      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));

      if (frameIndex !== lastDrawnFrameRef.current) {
        // Find current frame or fallback to nearest available loaded frame
        let img = imagesRef.current[frameIndex];
        if (!img) {
          // Search backwards first
          for (let i = frameIndex - 1; i >= 0; i--) {
            if (imagesRef.current[i]) {
              img = imagesRef.current[i];
              break;
            }
          }
          // If none backwards, search forwards
          if (!img) {
            for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
              if (imagesRef.current[i]) {
                img = imagesRef.current[i];
                break;
              }
            }
          }
        }

        if (img && img.complete && img.naturalWidth > 0) {
          // object-fit: cover drawing
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = width / height;

          let drawWidth = width;
          let drawHeight = height;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasRatio > imgRatio) {
            drawHeight = width / imgRatio;
            offsetY = (height - drawHeight) / 2;
          } else {
            drawWidth = height * imgRatio;
            offsetX = (width - drawWidth) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          lastDrawnFrameRef.current = frameIndex;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0a0a0b] pointer-events-none select-none">
      <div className="relative w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover will-change-transform shadow-[0_40px_100px_rgba(0,0,0,0.92)]"
          style={{
            transform: 'translateZ(0)',
          }}
        />

        {/* Ambient warm candlelight vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-45 pointer-events-none" />

        {/* Subtle cinematic 35mm grain to eliminate banding on OLED/Retina dark gradients */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Foreground warm golden atmospheric bloom */}
        <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-[#f5c97a]/10 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};

// Hook to detect mobile screens (< 768px)
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
