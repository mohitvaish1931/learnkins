# 💫 Parallel Universe - A Multiverse Birthday Gift Website

A cinematic, magical, and emotional birthday gift website built with React, featuring smooth transitions through multiple "universes" that tell a love story across parallel timelines.

## ✨ Features

- **Portal Landing** - Cosmic entrance with Three.js stars and particle effects
- **Universe I: The First Encounter** - Scroll-based animated love story
- **Universe II: The Timeline That Never Happened** - Interactive horizontal timeline with fantasy "what if" scenarios
- **Universe III: The Love Frequency** - Music-reactive particle animation with heartbeat visualizer
- **Universe IV: The Final Reality** - Typing animation love letter from the future
- **Secret Universe** - Password-locked final surprise with video reveal

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎨 Customization Guide

### 1. Personalize the Love Letter (Universe IV)

Edit the letter in `src/components/Universe4.tsx`:

```typescript
const loveLetter = `Your custom message here...`;
```

### 2. Change Timeline Events (Universe II)

Modify the events array in `src/components/Universe2.tsx`:

```typescript
const timelineEvents = [
  {
    title: 'Your Custom Title',
    description: 'Your custom story...',
    gradient: 'from-amber-400 to-orange-500',
  },
  // Add more events...
];
```

### 3. Add Your Video Surprise (Secret Universe)

In `src/components/SecretUniverse.tsx`, replace the placeholder with your video:

```tsx
<div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center">
  <video
    src="YOUR_VIDEO_URL_HERE"
    controls
    className="w-full h-full rounded-2xl"
  />
</div>
```

You can host your video on:
- Cloudinary
- Firebase Storage
- Google Drive (make sure it's public)
- Any video hosting service

### 4. Change the Secret Password

In `src/components/SecretUniverse.tsx`:

```typescript
const correctWord = 'multiverse'; // Change to your word
```

### 5. Customize AI Messages (Universe I)

In `src/components/Universe1.tsx`, modify the `aiMessage` state:

```typescript
const [aiMessage, setAiMessage] = useState(
  "Your custom romantic message here..."
);
```

### 6. Adjust Color Scheme

The site uses a purple-pink-blue gradient palette. To change colors, search and replace in the component files:

- `purple-400` → your color
- `pink-400` → your color
- `blue-400` → your color

## 🎯 Optional API Integrations

While the site works perfectly without external APIs, you can enhance it:

### OpenAI Integration (for dynamic messages)

1. Get an API key from OpenAI
2. Create a helper function in `src/api/openai.ts`
3. Call it in Universe I to generate dynamic romantic messages

### Music Integration

Add background music by including an audio element:

```tsx
<audio autoPlay loop>
  <source src="your-music-url.mp3" type="audio/mpeg" />
</audio>
```

## 📱 Responsive Design

The site is fully responsive and works beautifully on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **Three.js + React Three Fiber** - 3D graphics and particle effects
- **Lucide React** - Beautiful icons

## 🎭 Component Structure

```
src/
├── components/
│   ├── Portal.tsx           # Landing page
│   ├── Universe1.tsx        # First encounter
│   ├── Universe2.tsx        # Timeline
│   ├── Universe3.tsx        # Love frequency
│   ├── Universe4.tsx        # Final letter
│   └── SecretUniverse.tsx   # Secret reveal
├── App.tsx                  # Main navigation
└── index.css               # Global styles
```

## 💡 Tips for the Perfect Experience

1. **Use fullscreen** - Press F11 for immersive experience
2. **Use headphones** - If you add background music
3. **Dim the lights** - For maximum emotional impact
4. **Take your time** - Each universe is meant to be savored

## 🎁 Making It Extra Special

### Before Sharing:

1. ✅ Customize all text content with your personal memories
2. ✅ Add your video surprise in the Secret Universe
3. ✅ Change the secret password to something meaningful
4. ✅ Test the entire flow on mobile
5. ✅ Add background music if desired
6. ✅ Deploy to a hosting service (Vercel, Netlify, etc.)

### Deployment

Deploy for free on:

- **Vercel**: `npx vercel`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the build output

## ❤️ A Note About This Gift

This isn't just a website—it's a journey through imagination, a testament to love that transcends reality itself. Every animation, every transition, every word has been crafted to create a magical experience that captures the infinite possibilities of your love story.

May it bring as much joy to receive as it brought magic to create.

---

**Built with love, code, and a touch of cosmic magic** ✨
