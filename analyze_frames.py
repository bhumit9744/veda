import os
from PIL import Image

frames_dir = r"d:\vedalife\veda-html-main\veda\veda-gsap\public\sequences\veda"
sample_frames = [1, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510, 520]

def analyze_frame(frame_num):
    filename = f"frame_{frame_num:03d}.webp"
    filepath = os.path.join(frames_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"Frame {frame_num} not found")
        return
        
    img = Image.open(filepath).convert("L") # Convert to grayscale
    width, height = img.size
    
    # Define regions
    top_rect = (0, 0, width, height // 3)
    bottom_rect = (0, height * 2 // 3, width, height)
    left_rect = (0, 0, width // 3, height)
    right_rect = (width * 2 // 3, 0, width, height)
    center_rect = (width // 3, height // 3, width * 2 // 3, height * 2 // 3)
    
    def get_avg_brightness(rect):
        region = img.crop(rect)
        # Calculate average brightness (0-255)
        pixels = list(region.getdata())
        return sum(pixels) / len(pixels)
        
    top_b = get_avg_brightness(top_rect)
    bottom_b = get_avg_brightness(bottom_rect)
    left_b = get_avg_brightness(left_rect)
    right_b = get_avg_brightness(right_rect)
    center_b = get_avg_brightness(center_rect)
    
    print(f"Frame {frame_num:03d} | Top: {top_b:6.1f} | Bottom: {bottom_b:6.1f} | Left: {left_b:6.1f} | Right: {right_b:6.1f} | Center: {center_b:6.1f}")

for num in sample_frames:
    analyze_frame(num)
