import os
import math
import numpy as np
from PIL import Image, ImageEnhance
import imageio

def ease_in_out(t):
    return t * t * (3 - 2 * t)

def transform_frame(img, scale, shift_x, shift_y, target_size=(1920, 1080)):
    w, h = target_size
    img_w, img_h = img.size
    
    # Calculate base cover dimensions
    ratio = max(w / img_w, h / img_h)
    base_w = int(img_w * ratio)
    base_h = int(img_h * ratio)
    
    # Apply camera scale
    scaled_w = int(base_w * scale)
    scaled_h = int(base_h * scale)
    
    resized = img.resize((scaled_w, scaled_h), Image.Resampling.BILINEAR)
    
    # Crop to target size with camera shift
    center_x = scaled_w // 2 + int(shift_x)
    center_y = scaled_h // 2 + int(shift_y)
    
    left = max(0, min(scaled_w - w, center_x - w // 2))
    top = max(0, min(scaled_h - h, center_y - h // 2))
    right = left + w
    bottom = top + h
    
    return resized.crop((left, top, right, bottom))

def blend_images(img1, img2, alpha):
    # Alpha 0.0 means 100% img1, 1.0 means 100% img2
    return Image.blend(img1, img2, alpha)

def build_dense_cinematic_reel(output_dir="public/sequence", video_path="public/videos/restaurant_journey.mp4"):
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(os.path.dirname(video_path), exist_ok=True)
    
    # Keyframe shot list along the linear restaurant journey
    shot_manifest = [
        # Chapter 1: Street to Entrance (30 frames)
        {"file": "public/frames/frame_00_exterior.jpg", "frames": 16, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Scheuerstraße"},
        {"file": "public/diners/exterior_door_threshold.jpg", "frames": 16, "scale": (1.0, 1.18), "shift_y": (0, -25), "label": "Eingang"},
        {"file": "public/diners/interior_hall_panoramic.jpg", "frames": 20, "scale": (1.0, 1.12), "shift_x": (-20, 20), "label": "Gastraum Panorama"},
        
        # Chapter 2: Table 1 Entenbrust Multi-Angle Orbit (36 frames!)
        {"file": "public/diners/diners_couple_candid.jpg", "frames": 14, "scale": (1.0, 1.14), "shift_y": (0, -15), "label": "Tisch 1 - Paar"},
        {"file": "public/dishes/dish_01_duck_breast.jpg", "frames": 14, "scale": (1.0, 1.15), "shift_y": (0, -25), "label": "Tisch 1 - Entenbrust (Tischperspektive)"},
        {"file": "public/dishes/dish_01_angle_low.jpg", "frames": 14, "scale": (1.0, 1.18), "shift_x": (-15, 15), "label": "Tisch 1 - Entenbrust (Nahaufnahme)"},
        {"file": "public/dishes/dish_01_angle_overhead.jpg", "frames": 14, "scale": (1.0, 1.15), "shift_y": (-20, 10), "label": "Tisch 1 - Entenbrust (Draufsicht & Brot)"},
        
        # Chapter 3: Table 2 Kabeljaufilet (24 frames)
        {"file": "public/diners/diners_woman_solo.jpg", "frames": 12, "scale": (1.0, 1.12), "shift_y": (0, -15), "label": "Tisch 2 - Dame mit Buch"},
        {"file": "public/dishes/dish_02_cod_fillet.jpg", "frames": 16, "scale": (1.0, 1.18), "shift_y": (0, -25), "label": "Tisch 2 - Kabeljaufilet"},
        
        # Chapter 4: Table 3 Salzwiesenlamm (24 frames)
        {"file": "public/diners/diners_two_men.jpg", "frames": 12, "scale": (1.0, 1.12), "shift_x": (15, -15), "label": "Tisch 3 - Herrenrunde"},
        {"file": "public/dishes/dish_03_lamb_hip.jpg", "frames": 16, "scale": (1.0, 1.18), "shift_y": (0, -25), "label": "Tisch 3 - Salzwiesenlamm"},
        
        # Chapter 5: Tables 4 to 13 (In-situ Fine Dining Plates)
        {"file": "public/dishes/dish_04_kohlrabi_soup.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 4 - Kohlrabisüppchen"},
        {"file": "public/dishes/dish_05_bio_salmon.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 5 - Bio Lachs"},
        {"file": "public/dishes/dish_06_gnocchi_lentils.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 6 - Gnocchi Linsen"},
        {"file": "public/dishes/dish_07_potato_gnocchi_octopus.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 7 - Kartoffelgnocchi Oktopus"},
        {"file": "public/dishes/dish_08_chicken_breast_fregola.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 8 - Maishuhnbrust Fregola"},
        {"file": "public/dishes/dish_09_postre_dessert.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 9 - Postre Dessert"},
        {"file": "public/dishes/dish_10_beef_tenderloin.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 10 - Rücken Vom Weiderind"},
        {"file": "public/dishes/dish_11_top_fish_crispy.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 11 - Top Fisch"},
        {"file": "public/dishes/dish_12_torta_della_nonna.jpg", "frames": 12, "scale": (1.0, 1.15), "shift_y": (0, -20), "label": "Tisch 12 - Torta Della Nonna"},
        {"file": "public/dishes/dish_13_mousse_chocolat.jpg", "frames": 14, "scale": (1.0, 1.18), "shift_y": (0, -25), "label": "Tisch 13 - Mousse Au Chocolat"},
        
        # Chapter 6: Final Grand Farewell
        {"file": "public/diners/interior_hall_panoramic.jpg", "frames": 18, "scale": (1.0, 1.10), "shift_y": (-15, 0), "label": "Auf Wiedersehen"}
    ]
    
    print("Loading source keyframe images...")
    loaded_shots = []
    for shot in shot_manifest:
        if os.path.exists(shot["file"]):
            img = Image.open(shot["file"]).convert("RGB")
            loaded_shots.append({**shot, "img": img})
        else:
            print(f"Warning: {shot['file']} not found, skipping.")
            
    if len(loaded_shots) < 2:
        print("Not enough shots to generate sequence.")
        return 0
        
    print(f"Generating dense continuous frame sequence across {len(loaded_shots)} shots...")
    
    total_generated = 0
    video_frames = []
    
    for s_idx in range(len(loaded_shots)):
        shot_a = loaded_shots[s_idx]
        has_next = s_idx < len(loaded_shots) - 1
        shot_b = loaded_shots[s_idx + 1] if has_next else shot_a
        
        num_frames = shot_a["frames"]
        scale_start, scale_end = shot_a["scale"]
        shift_x_start, shift_x_end = shot_a.get("shift_x", (0, 0))
        shift_y_start, shift_y_end = shot_a.get("shift_y", (0, 0))
        
        next_scale_start, _ = shot_b["scale"]
        next_shift_x_start, _ = shot_b.get("shift_x", (0, 0))
        next_shift_y_start, _ = shot_b.get("shift_y", (0, 0))
        
        for f in range(num_frames):
            norm_t = f / float(num_frames)
            eased_t = ease_in_out(norm_t)
            
            # Camera kinematics for shot A
            cur_scale = scale_start + (scale_end - scale_start) * eased_t
            cur_x = shift_x_start + (shift_x_end - shift_x_start) * eased_t
            cur_y = shift_y_start + (shift_y_end - shift_y_start) * eased_t
            
            frame_a = transform_frame(shot_a["img"], cur_scale, cur_x, cur_y)
            
            # Seamless cross-dissolve transition in last 35% of shot
            transition_start = 0.65
            if norm_t > transition_start and has_next:
                blend_t = (norm_t - transition_start) / (1.0 - transition_start)
                smooth_blend = ease_in_out(blend_t)
                
                # Transform next shot with incoming momentum
                next_cur_scale = 0.96 + (next_scale_start - 0.96) * smooth_blend
                next_cur_x = next_shift_x_start * (1.0 - smooth_blend)
                next_cur_y = next_shift_y_start * (1.0 - smooth_blend)
                
                frame_b = transform_frame(shot_b["img"], next_cur_scale, next_cur_x, next_cur_y)
                final_frame = blend_images(frame_a, frame_b, smooth_blend)
            else:
                final_frame = frame_a
                
            # Save frame JPEG
            frame_filename = os.path.join(output_dir, f"frame_{total_generated:04d}.jpg")
            final_frame.save(frame_filename, "JPEG", quality=86)
            
            # Add to video list (downsampled to 1280x720 for super fast, lightweight video)
            video_frame = np.array(final_frame.resize((1280, 720), Image.Resampling.BILINEAR))
            video_frames.append(video_frame)
            
            total_generated += 1

    print(f"Successfully generated {total_generated} sequential frames in {output_dir}!")
    
    print(f"Writing MP4 video to {video_path}...")
    try:
        writer = imageio.get_writer(video_path, fps=24, codec='libx264', quality=8)
        for vf in video_frames:
            writer.append_data(vf)
        writer.close()
        print(f"MP4 Video successfully written to {video_path}!")
    except Exception as e:
        print(f"Note on MP4 writer: {e}")
        
    return total_generated

if __name__ == "__main__":
    build_dense_cinematic_reel()
