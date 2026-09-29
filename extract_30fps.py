import cv2
import os
import shutil

video_path = "public/assets/images/plant animation.mp4"
output_dir = "public/plant_animation_frames"

if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)

print(f"Original FPS: {fps}")
print(f"Total Frames: {total_frames}")

# Calculate how many frames we'd get if we interpolate to 30fps
# or just extract all frames. If the user wants 300 frames and the video is 192 frames,
# we need to interpolate.
# Let's extract frames at 30 fps
target_fps = 30.0
ratio = target_fps / fps

frame_count = 0
extracted_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    frame_count += 1
    
    # Simple nearest neighbor frame duplication/skipping to match target FPS
    # We want to write out a frame when the mapped time crosses our target time
    expected_frames = int(frame_count * ratio)
    
    while extracted_count < expected_frames:
        extracted_count += 1
        out_path = os.path.join(output_dir, f"frame_{extracted_count:03d}.webp")
        # Save as webp with optimization
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 75])

print(f"Extracted {extracted_count} frames to {output_dir}")
cap.release()
