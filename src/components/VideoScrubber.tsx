import React, { useEffect, useRef, useState, useCallback } from 'react';

interface VideoScrubberProps {
  scrollProgress: number;
  videoSrc?: string;
  onDurationLoaded?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number, progress: number) => void;
  onBufferProgress?: (progress: number) => void;
}

export const VideoScrubber: React.FC<VideoScrubberProps> = ({
  scrollProgress,
  videoSrc,
  onDurationLoaded,
  onTimeUpdate,
  onBufferProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Default duration to 60.00 seconds so calculations work immediately
  const [duration, setDuration] = useState<number>(60.00);

  // Adaptive video source selection: Mobile Portrait (9:16) vs Desktop Widescreen (16:9)
  const isMobile = useIsMobile();
  const resolvedSrc = videoSrc || (isMobile ? '/videos/restaurant_journey_mobile.mp4' : '/videos/restaurant_journey.mp4');

  // Monotonic 1st-order lerp state
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const lastAppliedTimeRef = useRef<number>(-1);
  const lastSeekTimestampRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Buffer progress tracking
  const handleProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || !onBufferProgress) return;

    if (video.buffered.length > 0 && video.duration > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const targetInitialBuffer = isMobile ? 3 : 5;
      const pct = Math.min(100, Math.round((bufferedEnd / targetInitialBuffer) * 100));
      onBufferProgress(pct);
    }
  }, [onBufferProgress, isMobile]);

  // Video initialization and mobile decoder priming
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        if (onDurationLoaded) onDurationLoaded(video.duration);
      }
    };

    const handleCanPlay = () => {
      if (onBufferProgress) onBufferProgress(100);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('progress', handleProgress);

    // Explicitly load video
    video.load();

    // Auto-prime video decoder: Play muted then immediately pause to unfreeze WebKit decoder pipeline
    const primePromise = video.play();
    if (primePromise !== undefined) {
      primePromise.then(() => video.pause()).catch(() => {});
    }

    // Gesture fallback unlock for mobile browsers with strict autoplay policies
    const unlockDecoder = () => {
      if (video) {
        video.muted = true;
        const p = video.play();
        if (p !== undefined) {
          p.then(() => video.pause()).catch(() => {});
        }
      }
    };

    window.addEventListener('touchstart', unlockDecoder, { once: true, passive: true });
    window.addEventListener('scroll', unlockDecoder, { once: true, passive: true });
    window.addEventListener('click', unlockDecoder, { once: true, passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('progress', handleProgress);
      window.removeEventListener('touchstart', unlockDecoder);
      window.removeEventListener('scroll', unlockDecoder);
      window.removeEventListener('click', unlockDecoder);
    };
  }, [resolvedSrc, onDurationLoaded, onBufferProgress, handleProgress]);

  // Map scroll progress (0.0 to 0.92) to video duration
  useEffect(() => {
    const journeyLimit = 0.92;
    const normalizedProgress = Math.max(0, Math.min(1, scrollProgress / journeyLimit));
    targetTimeRef.current = normalizedProgress * (duration - 0.05);
  }, [scrollProgress, duration]);

  // Smooth Render Loop with Non-Blocking Time Throttling
  // Avoids asynchronous DOM event locks that freeze scrolling on mobile and desktop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const lerpFactor = 0.16;

    const renderLoop = () => {
      const target = targetTimeRef.current;
      const current = currentTimeRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        currentTimeRef.current = current + diff * lerpFactor;
      } else {
        currentTimeRef.current = target;
      }

      const clampedTime = Math.max(0, Math.min(duration - 0.05, currentTimeRef.current));

      // Throttle seek requests to at most once every 30ms (~33 seeks/sec)
      // This gives hardware decoders sufficient time to complete without backlog
      const now = performance.now();
      if (now - lastSeekTimestampRef.current > 30) {
        if (Math.abs(clampedTime - lastAppliedTimeRef.current) > 0.005) {
          video.currentTime = clampedTime;
          lastAppliedTimeRef.current = clampedTime;
          lastSeekTimestampRef.current = now;

          if (onTimeUpdate) {
            onTimeUpdate(clampedTime, clampedTime / duration);
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [duration, onTimeUpdate]);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0a0a0b] pointer-events-none select-none"
    >
      {/* GPU Hardware Accelerated Video Plane - NO poster attribute to eliminate flashes */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={resolvedSrc}
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-cover object-center shadow-[0_40px_100px_rgba(0,0,0,0.92)] will-change-transform"
          style={{
            imageRendering: '-webkit-optimize-contrast',
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
