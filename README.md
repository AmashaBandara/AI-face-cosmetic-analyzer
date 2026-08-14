# Face Score — AI Cosmetic & Skincare Recommendation System

An interactive, client-side AI face and climate cosmetic recommendation system built for the cosmetics industry.

**Academic Project by:** Amasha Bandara (2021/asp/59)

---

## 🌟 Key Features

- **In-Browser Facial AI Inference**: Uses TensorFlow.js & MobileNetV2 for fast feature extraction directly inside the browser.
- **Multi-Factor Climate Fusion**: Combines facial skin tensors with Location, Weather condition, Ambient Humidity %, and Temperature °C.
- **Tailored Skincare & Cosmetic Recommendations**:
  - Morning Routine (Cleanser, Hydrator, Weather Moisturizer, SPF 50)
  - Evening Repair Routine (Double Cleanse, Active Treatment, Night Barrier Cream)
  - Foundation Finish Matching (Soft Matte for high humidity vs Dewy Hydrating for dry air)
- **100% Client-Side & Private**: All image processing happens locally in the browser without uploading biometric data to external servers.

---

## 🛠️ Tech Stack

- **HTML5 & Vanilla CSS3**: Custom design system with soft blush pink (`#FBEDEC`) and coral red (`#D9695F`) styling.
- **Vanilla JavaScript**: Pure JS state management, camera stream handling, and DOM interactions.
- **TensorFlow.js & MobileNetV2**: Pre-trained deep neural network for computer vision feature extraction.

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser or serve via a static web server:

```bash
npx serve .
```

Or open `index.html` directly.
