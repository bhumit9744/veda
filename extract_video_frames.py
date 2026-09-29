import cv2
import os
from PIL import Image

def extract_and_resample(video_path, output_dir, target_frames=300):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Source video has {total_frames} frames.")

    # Read all frames into memory (it's only 240 frames of 1080p, should be fine)
    frames = []
    success, image = cap.read()
    while success:
        # Convert BGR to RGB
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        frames.append(rgb_image)
        success, image = cap.read()
    
    cap.release()
    print(f"Loaded {len(frames)} frames into memory.")

    # Resample to 300 frames
    for i in range(target_frames):
        # Calculate which source frame(s) to use
        # Map 0 -> 0, target_frames-1 -> total_frames-1
        progress = i / max(1, (target_frames - 1))
        src_idx_float = progress * (total_frames - 1)
        src_idx = int(round(src_idx_float))
        
        # Ensure bounds
        src_idx = max(0, min(total_frames - 1, src_idx))
        
        img = Image.fromarray(frames[src_idx])
        
        # Save as WebP
        filename = f"frame_{i+1:04d}.webp"
        filepath = os.path.join(output_dir, filename)
        img.save(filepath, "webp", quality=80)
        
        if (i + 1) % 50 == 0:
            print(f"Saved {i+1} / {target_frames} frames")
            
    print("Done generating 300 frames.")

if __name__ == '__main__':
    video = "public/assets/images/Green_leaf_falling_in_forest_20260930004750_gwr_video_mvp.mp4"
    output = "public/leaf-frames"
    extract_and_resample(video, output, 300)
