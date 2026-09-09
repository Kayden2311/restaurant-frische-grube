import os
import sys
import imageio.v3 as iio
from PIL import Image

def extract_video_frames(video_path, output_dir, max_frames=120, target_fps=24):
    if not os.path.exists(video_path):
        print(f"Error: Video file {video_path} does not exist.")
        return 0

    os.makedirs(output_dir, exist_ok=True)
    print(f"Opening video: {video_path}")

    # Read video frames
    count = 0
    saved = 0
    
    # Iterate through frames
    for idx, frame in enumerate(iio.imiter(video_path)):
        if saved >= max_frames:
            break
        # Format filename: frame_0000.jpg
        out_filename = os.path.join(output_dir, f"frame_{saved:04d}.jpg")
        img = Image.fromarray(frame)
        # Resize to standard 1920x1080 if needed
        if img.width != 1920 or img.height != 1080:
            img = img.resize((1920, 1080), Image.Resampling.LANCZOS)
        img.save(out_filename, "JPEG", quality=88)
        saved += 1

    print(f"Extracted {saved} frames into {output_dir}")
    return saved

if __name__ == "__main__":
    v_path = sys.argv[1] if len(sys.argv) > 1 else "public/videos/restaurant_journey.mp4"
    out_dir = sys.argv[2] if len(sys.argv) > 2 else "public/frames"
    extract_video_frames(v_path, out_dir)
