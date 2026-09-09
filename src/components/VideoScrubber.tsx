import React, { useEffect, useRef, useState } from 'react';

interface VideoScrubberProps {
  scrollProgress: number;
  videoSrc?: string;
  onDurationLoaded?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number, progress: number) => void;
}

export const VideoScrubber: React.FC<VideoScrubberProps> = ({
  scrollProgress,
  videoSrc = '/videos/restaurant_journey.mp4',
  onDurationLoaded,
  onTimeUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  // Monotonic 1st-order lerp state (strictly non-overshooting, zero recoil)
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const lastAppliedTimeRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

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
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);

    if (video.readyState >= 2 && video.duration) {
      video.pause();
      setDuration(video.duration);
      setIsVideoReady(true);
      if (onDurationLoaded) onDurationLoaded(video.duration);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc, onDurationLoaded]);

  // Map scroll progress (0.0 to 0.92) to video duration (60.05s)
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
      className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0a0a0b] pointer-events-none select-none transition-opacity duration-500 ease-out"
      style={{
        opacity: isVideoReady ? 1 : 0,
      }}
    >
      {/* GPU Hardware Accelerated 60FPS Video Plane */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-cover object-center shadow-[0_40px_100px_rgba(0,0,0,0.92)] will-change-transform"
        />

        {/* Ambient warm candlelight vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-45 pointer-events-none" />

        {/* Foreground warm golden atmospheric bloom */}
        <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-[#f5c97a]/10 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};
