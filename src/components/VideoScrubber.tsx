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
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  // Adaptive video source selection: Mobile 720p (18.9MB) vs Desktop 1080p (56.3MB)
  const resolvedSrc = useMemoVideoSrc(videoSrc);

  // Monotonic 1st-order lerp state (strictly non-overshooting, zero recoil)
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const lastAppliedTimeRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Track video buffer progress for responsive loading feedback
  const handleProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || !onBufferProgress) return;

    if (video.buffered.length > 0 && video.duration > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      // Require initial 6-8 seconds buffered for butter-smooth scrubbing release
      const targetInitialBuffer = Math.min(8, video.duration);
      const pct = Math.min(100, Math.round((bufferedEnd / targetInitialBuffer) * 100));
      onBufferProgress(pct);

      if (pct >= 80) {
        setIsVideoReady(true);
      }
    }
  }, [onBufferProgress]);

  // Load video metadata and ensure video is permanently paused for scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        video.pause();
        setDuration(video.duration);
        if (onDurationLoaded) onDurationLoaded(video.duration);
      }
    };

    const handleCanPlay = () => {
      video.pause();
      setIsVideoReady(true);
      if (onBufferProgress) onBufferProgress(100);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('progress', handleProgress);

    if (video.readyState >= 2 && video.duration) {
      video.pause();
      setDuration(video.duration);
      setIsVideoReady(true);
      if (onDurationLoaded) onDurationLoaded(video.duration);
      if (onBufferProgress) onBufferProgress(100);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('progress', handleProgress);
    };
  }, [resolvedSrc, onDurationLoaded, onBufferProgress, handleProgress]);

  // Map scroll progress (0.0 to 0.92) to video duration (60.00s)
  useEffect(() => {
    if (!duration || duration <= 0) return;
    const journeyLimit = 0.92;
    const normalizedProgress = Math.max(0, Math.min(1, scrollProgress / journeyLimit));
    targetTimeRef.current = normalizedProgress * (duration - 0.05);
  }, [scrollProgress, duration]);

  // Monotonic 1st-Order Exponential Lerp Loop
  // Pure directional smoothing without spring overshoot - completely eliminates recoil
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Exponential smoothing factor (0.14 ensures smooth ease-out with zero bounce-back)
    const lerpFactor = 0.14;

    const renderLoop = () => {
      if (duration > 0) {
        const target = targetTimeRef.current;
        const current = currentTimeRef.current;
        const diff = target - current;

        if (Math.abs(diff) > 0.001) {
          // Strictly monotonic: diff is positive when scrolling down, negative when scrolling up
          // Zero overshoot, zero recoil, zero oscillation
          currentTimeRef.current = current + diff * lerpFactor;
        } else {
          currentTimeRef.current = target;
        }

        const clampedTime = Math.max(0, Math.min(duration - 0.05, currentTimeRef.current));

        // Update hardware video playback only when meaningful delta occurs
        if (Math.abs(clampedTime - lastAppliedTimeRef.current) > 0.005) {
          video.currentTime = clampedTime;
          lastAppliedTimeRef.current = clampedTime;

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
      {/* 1. Instant High-Res Poster Backdrop - Pre-renders at 0ms, zero black flash */}
      <img
        src="/frames/frame_00_exterior.jpg"
        alt="Restaurant Frische Grube Historic Exterior"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        decoding="async"
      />

      {/* 2. GPU Hardware Accelerated 1080p Crisp Video Plane */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={resolvedSrc}
          poster="/frames/frame_00_exterior.jpg"
          preload="auto"
          muted
          playsInline
          className={`w-full h-full object-cover object-center shadow-[0_40px_100px_rgba(0,0,0,0.92)] will-change-transform transition-opacity duration-700 ease-out ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
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

// Helper to determine mobile vs desktop optimized video URL
function useMemoVideoSrc(customSrc?: string): string {
  const [src, setSrc] = useState<string>(() => {
    if (customSrc) return customSrc;
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return '/videos/restaurant_journey_720p.mp4';
    }
    return '/videos/restaurant_journey.mp4';
  });

  useEffect(() => {
    if (customSrc) {
      setSrc(customSrc);
      return;
    }
    const isMobile = window.innerWidth < 768;
    setSrc(isMobile ? '/videos/restaurant_journey_720p.mp4' : '/videos/restaurant_journey.mp4');
  }, [customSrc]);

  return src;
}
