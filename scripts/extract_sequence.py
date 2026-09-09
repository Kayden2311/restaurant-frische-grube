import os
import subprocess
import time
import imageio_ffmpeg

def extract_all():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    
    # 1. Desktop frames (1280x720 WebP, 240 frames @ 4fps)
    desktop_out = "public/frames/sequence/desktop"
    os.makedirs(desktop_out, exist_ok=True)
    print("=== Extracting Desktop Frames (1280x720 WebP) ===")
    t0 = time.time()
    cmd_desk = [
        ffmpeg, "-y",
        "-i", "public/videos/restaurant_journey.mp4",
        "-vf", "fps=4,scale=1280:720:flags=lanczos",
        "-c:v", "libwebp", "-q:v", "72",
        os.path.join(desktop_out, "f_%03d.webp")
    ]
    subprocess.run(cmd_desk, capture_output=True)
    desk_files = [f for f in os.listdir(desktop_out) if f.endswith(".webp")]
    desk_size = sum(os.path.getsize(os.path.join(desktop_out, f)) for f in desk_files) / (1024 * 1024)
    print(f"Desktop: {len(desk_files)} frames in {time.time() - t0:.1f}s, Total: {desk_size:.2f} MB")

    # 2. Mobile frames (540x960 WebP 9:16 portrait, 240 frames @ 4fps)
    mobile_out = "public/frames/sequence/mobile"
    os.makedirs(mobile_out, exist_ok=True)
    print("\n=== Extracting Mobile Frames (540x960 WebP) ===")
    t1 = time.time()
    cmd_mob = [
        ffmpeg, "-y",
        "-i", "public/videos/restaurant_journey_mobile.mp4",
        "-vf", "fps=4,scale=540:960:flags=lanczos",
        "-c:v", "libwebp", "-q:v", "70",
        os.path.join(mobile_out, "f_%03d.webp")
    ]
    subprocess.run(cmd_mob, capture_output=True)
    mob_files = [f for f in os.listdir(mobile_out) if f.endswith(".webp")]
    mob_size = sum(os.path.getsize(os.path.join(mobile_out, f)) for f in mob_files) / (1024 * 1024)
    print(f"Mobile: {len(mob_files)} frames in {time.time() - t1:.1f}s, Total: {mob_size:.2f} MB")

    print("\nExtraction complete! Ready for Canvas Scrubber.")

if __name__ == "__main__":
    extract_all()
