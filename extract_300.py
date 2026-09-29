import cv2
import os
import shutil

video_path = "public/assets/images/plant animation.mp4"
output_dir = "public/plant_animation_frames"

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
target_frames = 300

print(f"Total Original Frames: {total_frames}")

frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frames.append(frame)

cap.release()
actual_original = len(frames)
print(f"Read {actual_original} frames into memory.")

if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir, exist_ok=True)

for i in range(target_frames):
    orig_idx = int(i * actual_original / target_frames)
    frame = frames[orig_idx]
    out_path = os.path.join(output_dir, f"frame_{i+1:03d}.webp")
    cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 75])

print(f"Extracted exactly {target_frames} frames to {output_dir}")
