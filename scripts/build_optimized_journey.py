import os
import glob
import subprocess
import time
import imageio_ffmpeg

def build_videos():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clips_dir = "public/videos/clips"
    clips = sorted(glob.glob(os.path.join(clips_dir, "*.mp4")))
    if not clips:
        print("No clips found in", clips_dir)
        return

    # 1. Build 1080p Desktop Crisp
    print("=== Building 1080p Full HD Video (Lanczos + Unsharp) ===")
    t0 = time.time()
    temp_dir_1080 = "public/videos/temp_1080"
    os.makedirs(temp_dir_1080, exist_ok=True)
    temp_1080 = []
    
    for idx, clip in enumerate(clips):
        out_c = os.path.join(temp_dir_1080, f"c1080_{idx:02d}.mp4")
        temp_1080.append(out_c)
        print(f"1080p Clip {idx+1}/{len(clips)}...", end=" ", flush=True)
        t_c = time.time()
        cmd = [
            ffmpeg, "-y", "-i", clip,
            "-vf", "scale=1920:1080:flags=lanczos,unsharp=5:5:0.7:5:5:0.0",
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-g", "8", "-keyint_min", "8", "-bf", "0",
            "-preset", "fast", "-tune", "fastdecode",
            "-crf", "22", "-an",
            out_c
        ]
        subprocess.run(cmd, capture_output=True)
        print(f"OK ({time.time() - t_c:.1f}s)")

    concat_1080 = os.path.join(temp_dir_1080, "concat.txt")
    with open(concat_1080, "w", encoding="utf-8") as f:
        for c in temp_1080:
            f.write(f"file '{os.path.abspath(c).replace(chr(92), '/')}'\n")

    out_1080 = "public/videos/restaurant_journey_1080p.mp4"
    subprocess.run([
        ffmpeg, "-y", "-f", "concat", "-safe", "0",
        "-i", concat_1080, "-c", "copy",
        "-movflags", "+faststart",
        out_1080
    ], capture_output=True)

    for c in temp_1080:
        try: os.remove(c)
        except: pass
    try: os.remove(concat_1080)
    except: pass
    try: os.rmdir(temp_dir_1080)
    except: pass

    size_1080 = os.path.getsize(out_1080) / (1024 * 1024)
    print(f"1080p DONE! Size: {size_1080:.2f} MB ({time.time() - t0:.1f}s)")

    # 2. Build 720p Mobile Fast
    print("\n=== Building 720p Mobile Fast Video ===")
    t1 = time.time()
    temp_dir_720 = "public/videos/temp_720"
    os.makedirs(temp_dir_720, exist_ok=True)
    temp_720 = []

    for idx, clip in enumerate(clips):
        out_c = os.path.join(temp_dir_720, f"c720_{idx:02d}.mp4")
        temp_720.append(out_c)
        print(f"720p Clip {idx+1}/{len(clips)}...", end=" ", flush=True)
        t_c = time.time()
        cmd = [
            ffmpeg, "-y", "-i", clip,
            "-vf", "scale=1280:720:flags=lanczos,unsharp=3:3:0.5:3:3:0.0",
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-g", "12", "-keyint_min", "12", "-bf", "0",
            "-preset", "fast", "-tune", "fastdecode",
            "-crf", "25", "-an",
            out_c
        ]
        subprocess.run(cmd, capture_output=True)
        print(f"OK ({time.time() - t_c:.1f}s)")

    concat_720 = os.path.join(temp_dir_720, "concat.txt")
    with open(concat_720, "w", encoding="utf-8") as f:
        for c in temp_720:
            f.write(f"file '{os.path.abspath(c).replace(chr(92), '/')}'\n")

    out_720 = "public/videos/restaurant_journey_720p.mp4"
    subprocess.run([
        ffmpeg, "-y", "-f", "concat", "-safe", "0",
        "-i", concat_720, "-c", "copy",
        "-movflags", "+faststart",
        out_720
    ], capture_output=True)

    for c in temp_720:
        try: os.remove(c)
        except: pass
    try: os.remove(concat_720)
    except: pass
    try: os.rmdir(temp_dir_720)
    except: pass

    size_720 = os.path.getsize(out_720) / (1024 * 1024)
    print(f"720p DONE! Size: {size_720:.2f} MB ({time.time() - t1:.1f}s)")

    # 3. Overwrite default restaurant_journey.mp4 with 1080p
    import shutil
    shutil.copyfile(out_1080, "public/videos/restaurant_journey.mp4")
    print("\nDefault public/videos/restaurant_journey.mp4 updated with 1080p!")

if __name__ == "__main__":
    build_videos()
