import os
import shutil

directory = "public/plant_animation_frames"

for i in range(1, 77):
    src = os.path.join(directory, f"frame_{i:03d}.webp")
    dst = os.path.join(directory, f"frame_{i+76:03d}.webp")
    if os.path.exists(src):
        shutil.copy(src, dst)
        
print("Double stacking complete. Total frames should now be 152.")
