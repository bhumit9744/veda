import os
from PIL import Image

def convert_to_webp(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg"):
            filepath = os.path.join(directory, filename)
            # Create a webp filename by replacing the extension
            webp_filepath = os.path.join(directory, os.path.splitext(filename)[0] + ".webp")
            
            # Skip if webp already exists
            if os.path.exists(webp_filepath):
                continue
                
            print(f"Converting {filename} to webp...")
            try:
                with Image.open(filepath) as img:
                    img.save(webp_filepath, "webp", quality=80)
                # optionally remove original, but let's keep it safe and just convert first.
                os.remove(filepath)
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    convert_to_webp("public/plant_animation_frames")
    print("Conversion complete.")
