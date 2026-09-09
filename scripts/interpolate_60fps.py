import os
import glob
import subprocess
import time
import imageio_ffmpeg

def interpolate_and_stitch():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clips_dir = "public/videos/clips"
    output_file = "public/videos/restaurant_journey.mp4"
    
    clips = sorted(glob.glob(os.path.join(clips_dir, "*.mp4")))
    if not clips:
        print("No clips found in", clips_dir)
        return False
        
    print(f"Interpolating and stitching {len(clips)} clips to 60FPS All-Intra...")
    
    # Create temp list file for ffmpeg concat
    temp_60fps_clips = []
    temp_dir = "public/videos/temp_60fps"
    os.makedirs(temp_dir, exist_ok=True)
    
    for idx, clip in enumerate(clips):
        base = os.path.basename(clip)
        temp_out = os.path.join(temp_dir, f"interp_{idx:02d}.mp4")
        temp_60fps_clips.append(temp_out)
        
        print(f"Interpolating {base} (24fps -> 60fps)...", end=" ", flush=True)
        t0 = time.time()
        
        # Motion interpolation to 60fps + All-Intra GOP=1
        cmd = [
            ffmpeg, '-y',
            '-i', clip,
            '-vf', 'framerate=fps=60:interp_start=0:interp_end=255:scene=100',
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-g', '1',
            '-keyint_min', '1',
            '-tune', 'fastdecode',
            '-crf', '24',
            temp_out
        ]
        
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error: {res.stderr[:200]}")
            return False
        print(f"OK ({time.time()-t0:.1f}s)")
        
    # Create concat file
    concat_list = os.path.join(temp_dir, "concat.txt")
    with open(concat_list, "w", encoding="utf-8") as f:
        for c in temp_60fps_clips:
            # Normalize path for ffmpeg concat
            f.write(f"file '{os.path.abspath(c).replace(chr(92), '/')}'\n")
            
    print("\nConcatenating all 60fps clips into final video...")
    t0 = time.time()
    
    concat_cmd = [
        ffmpeg, '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', concat_list,
        '-c', 'copy',
        '-movflags', 'faststart',
        output_file
    ]
    
    res = subprocess.run(concat_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Concat error: {res.stderr[:200]}")
        return False
        
    # Clean up temp files
    for c in temp_60fps_clips:
        try: os.remove(c)
        except: pass
    try: os.remove(concat_list)
    except: pass
    try: os.rmdir(temp_dir)
    except: pass
    
    print(f"\nSUCCESS! Created 60FPS All-Intra video in {time.time()-t0:.1f}s: {output_file}")
    return True

if __name__ == "__main__":
    interpolate_and_stitch()
