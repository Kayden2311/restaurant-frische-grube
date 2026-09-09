import os
import glob
import subprocess
import time
import imageio_ffmpeg

def build_mobile_portrait():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clips_dir = "public/videos/clips"
    clips = sorted(glob.glob(os.path.join(clips_dir, "*.mp4")))
    if not clips:
        print("No clips found in", clips_dir)
        return

    print("=== Building Native 9:16 Portrait Video for Mobile ===")
    t0 = time.time()
    temp_dir = "public/videos/temp_portrait"
    os.makedirs(temp_dir, exist_ok=True)
    temp_clips = []

    for idx, clip in enumerate(clips):
        base = os.path.basename(clip)
        out_c = os.path.join(temp_dir, f"mob_port_{idx:02d}.mp4")
        temp_clips.append(out_c)
        print(f"Portrait Clip {idx+1}/{len(clips)} ({base})...", end=" ", flush=True)
        t_c = time.time()

        # Native 9:16 crop from 1280x720 (405x720 -> scaled to 720x1280) with Lanczos + high-fidelity unsharp
        cmd = [
            ffmpeg, "-y", "-i", clip,
            "-vf", "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=720:1280:flags=lanczos,unsharp=5:5:0.7:5:5:0.0",
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-profile:v", "main", "-level", "3.1",
            "-g", "12", "-keyint_min", "12", "-bf", "0",
            "-preset", "fast", "-tune", "fastdecode",
            "-crf", "23", "-an",
            out_c
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print("Error:", res.stderr[:200])
            return
        print(f"OK ({time.time() - t_c:.1f}s)")

    concat_file = os.path.join(temp_dir, "concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for c in temp_clips:
            f.write(f"file '{os.path.abspath(c).replace(chr(92), '/')}'\n")

    out_file = "public/videos/restaurant_journey_mobile.mp4"
    cmd_concat = [
        ffmpeg, "-y", "-f", "concat", "-safe", "0",
        "-i", concat_file, "-c", "copy",
        "-movflags", "+faststart",
        out_file
    ]
    subprocess.run(cmd_concat, capture_output=True)

    for c in temp_clips:
        try: os.remove(c)
        except: pass
    try: os.remove(concat_file)
    except: pass
    try: os.rmdir(temp_dir)
    except: pass

    size_mb = os.path.getsize(out_file) / (1024 * 1024)
    print(f"\nALL DONE in {time.time() - t0:.1f}s!")
    print(f"Output: {out_file}")
    print(f"Size: {size_mb:.2f} MB")

    # Also extract the portrait poster frame for instant 0ms mobile render
    poster_out = "public/frames/frame_00_exterior_mobile.jpg"
    subprocess.run([
        ffmpeg, "-y", "-ss", "00:00:00.1", "-i", out_file,
        "-vframes", "1", poster_out
    ], capture_output=True)
    print(f"Created mobile poster: {poster_out}")

if __name__ == "__main__":
    build_mobile_portrait()
