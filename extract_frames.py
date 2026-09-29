import cv2
import os
from PIL import Image

video_path = 'public/assets/images/plant animation.mp4'
output_dir = 'public/assets/images/about-plant-frames'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
count = 1
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert from BGR to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    img = Image.fromarray(rgb_frame)
    output_path = os.path.join(output_dir, f'frame_{count:03d}.webp')
    img.save(output_path, 'webp', quality=85)
    
    count += 1

cap.release()
print(f'Total frames extracted: {count - 1}')
