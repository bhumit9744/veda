import cv2
import os

video_path = "public/assets/images/Veda ai.mp4"
output_dir = "public/assets/images/veda_ai_frames"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

vidcap = cv2.VideoCapture(video_path)
success, image = vidcap.read()
count = 1
while success:
    # resize image to width 1280 to save space, keeping aspect ratio
    height, width, layers = image.shape
    new_width = 1280
    new_height = int(height * (new_width / width))
    image = cv2.resize(image, (new_width, new_height))
    
    cv2.imwrite(f"{output_dir}/frame_{count:04d}.jpg", image, [int(cv2.IMWRITE_JPEG_QUALITY), 60])
    success, image = vidcap.read()
    count += 1
print(f"Extracted {count-1} frames.")
