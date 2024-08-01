from flask import Flask, redirect
import random

app = Flask(__name__)

# قائمة روابط الفيديوهات
video_urls = [
    "https://example.com/video1",
    "https://example.com/video2",
    "https://example.com/video3",
    # أضف المزيد من الروابط هنا
]

@app.route('/video', methods=['GET'])
def redirect_to_random_video():
    video_url = random.choice(video_urls)
    return redirect(video_url)

if __name__ == '__main__':
    app.run(debug=True)