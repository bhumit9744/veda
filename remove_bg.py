from PIL import Image

def remove_black_bg(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Chroma key for pure black or very dark black
            if item[0] < 10 and item[1] < 10 and item[2] < 10:
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Processed {input_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

remove_black_bg("public/villa 1.png", "public/villa 1 cutout.png")
remove_black_bg("public/villa 2.png", "public/villa 2 cutout.png")
