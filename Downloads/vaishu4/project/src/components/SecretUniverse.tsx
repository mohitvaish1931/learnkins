import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { Lock, Unlock } from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);



// Confetti effect
function burstConfetti(count = 40) {
  const colors = ['#ff2d95', '#7c3aed', '#06b6d4', '#f97316', '#10b981'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.width = `${1 + Math.random() * 8}px`;
    el.style.height = el.style.width;
    el.style.left = `${20 + Math.random() * 60}%`;
    el.style.top = `${10 + Math.random() * 70}%`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.opacity = '0.95';
    el.style.borderRadius = `${Math.random() > 0.5 ? '2px' : '50%'}`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transform = `translateY(${-window.innerHeight * (0.1 + Math.random() * 0.6)}px) rotate(${Math.random() * 360}deg)`;
    el.style.transition = `transform ${1 + Math.random() * 1}s cubic-bezier(.2,.8,.2,1), opacity 1s ease-out`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translateY(${window.innerHeight + 200}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => document.body.removeChild(el), 2200);
  }
}

export default function SecretUniverse() {
  const [secretWord, setSecretWord] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const correctWord = 'husband';
  // Video URL state (persisted to localStorage). Falls back to VITE_SECRET_VIDEO or a placeholder path.
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('secret-universe:video') ||
        (import.meta.env.VITE_SECRET_VIDEO as string) ||
  '/video.mp4'
      );
    } catch {
      return '/video.mp4';
    }
  });
  const [editingUrl, setEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [showModalVideo, setShowModalVideo] = useState(false);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current) return;

    // Initial page load animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Floating animation for lock
    gsap.to('.lock-icon', {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  useEffect(() => {
    // create AudioContext lazily for the unlock sound
    return () => {
      try {
        if (audioRef.current) audioRef.current.close();
      } catch {
        // ignore
      }
    };
  }, []);

  // Persist the selected video URL to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('secret-universe:video', videoUrl);
    } catch {
      // ignore localStorage errors
    }
  }, [videoUrl]);

  // Ensure AudioContext is created/resumed on user gesture so sounds can play in modern browsers.
  const enableAudio = async () => {
    try {
      const win = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const AudioCtor = win.AudioContext || win.webkitAudioContext;
      if (!AudioCtor) return;
      if (!audioRef.current) {
        audioRef.current = new AudioCtor();
      } else if ((audioRef.current as any).state === 'suspended') {
        await (audioRef.current as any).resume();
      }
  // audio is now enabled/resumed
    } catch {
      // ignore
    }
  };

  // Open video in an in-app modal (keeps user in page and allows unmuted playback); pauses background video.
  const openVideoModal = async () => {
    try {
      await enableAudio();
    } catch {}
    try { backgroundVideoRef.current?.pause(); } catch {}
    setShowModalVideo(true);
  };

  const closeVideoModal = () => {
    try { backgroundVideoRef.current?.play(); } catch {}
    setShowModalVideo(false);
  };

  const playUnlockSound = () => {
    try {
      // Use existing AudioContext if available (and resumed), otherwise create one.
      const win = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const AudioCtor = win.AudioContext || win.webkitAudioContext;
      if (!AudioCtor) return;
      let ctx = audioRef.current as AudioContext | null;
      if (!ctx) {
        ctx = new AudioCtor();
        audioRef.current = ctx;
      }
      // If the context is suspended, resume it (this requires a user gesture to succeed).
      try { if ((ctx as any).state === 'suspended') { (ctx as any).resume && (ctx as any).resume(); } } catch {}

      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.value = 0.001;
      o.start();
      const now = ctx.currentTime;
      g.gain.linearRampToValueAtTime(0.08, now + 0.02);
      o.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      setTimeout(() => {
        try { o.stop(); } catch {}
      }, 1500);
    } catch {
      // If WebAudio is unavailable, silently skip
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretWord.toLowerCase() === correctWord) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsUnlocked(true);
          setShowError(false);
          burstConfetti(60);
          playUnlockSound();
        }
      });

      // Unlock animation sequence
      tl.to('.lock-icon', {
        scale: 1.5,
        duration: 0.7,
        ease: 'back.out'
      })
      .to('.lock-icon', {
        rotate: 360,
        duration: 0.9,
        ease: 'power2.inOut'
      })
      .to('.form-container', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      }, '-=0.2');
    } else {
      setShowError(true);
      gsap.to('.input-container', {
        keyframes: {
          x: [0, -10, 10, -10, 10, 0]
        },
        duration: 0.4,
        ease: 'power2.inOut'
      });
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 w-full h-screen">
        <Canvas
          gl={{ 
            powerPreference: "high-performance",
            antialias: true,
            stencil: false,
            depth: true,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            // Enable context loss handling
            const canvas = gl.domElement;
            canvas.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.log('WebGL context lost. Attempting recovery...');
            }, false);
            canvas.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored.');
            }, false);
          }}
        >
          <ambientLight intensity={0.35} />
          <pointLight intensity={0.6} position={[10, 10, 10]} />
          <Stars radius={160} depth={90} count={5200} factor={8} saturation={0} fade speed={0.6} />
          {isUnlocked && (
            <>
              <Sparkles count={200} scale={16} size={8} speed={0.4} />
              <hemisphereLight intensity={0.4} groundColor="purple" />
            </>
          )}
          <ParallaxCamera />
          <FloatingShapes />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 pb-24">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.92, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="text-center max-w-2xl form-container"
            >
              <div className="lock-icon mb-6 flex justify-center" aria-hidden>
                <Lock className="w-28 h-28 text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] filter brightness-125" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                Secret Universe
              </h2>

              <p className="text-lg md:text-xl text-purple-200 mb-8 leading-relaxed max-w-xl mx-auto">
                Mohit apka kya lagta hai💖?
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Secret word form">
                <div className="relative input-container">
                  <input
                    aria-label="Secret word"
                    type="text"
                    value={secretWord}
                    onChange={(e) => setSecretWord(e.target.value)}
                    placeholder="Enter the secret word..."
                    className="w-full px-6 py-4 text-lg bg-purple-900/30 backdrop-blur-md border-2 border-purple-500/30 rounded-full text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  />
                  {showError && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-8 left-0 right-0 text-pink-400 text-sm"
                      role="alert"
                    >
                      Not quite... try again
                    </motion.p>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    type="submit"
                    className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Unlock Portal
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setSecretWord(correctWord)}
                    title="Reveal hint (developer)"
                    className="text-sm text-purple-300/80 underline"
                  >
                    Need a push?
                  </button>
                </div>
              </form>

              <motion.p className="mt-6 text-sm text-purple-300/70 italic" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
                Pro tip: Try typing mohit jisse bhot khush hota ha jab tu usse bulati hai 
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.86, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-center max-w-4xl mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="mb-6 flex justify-center"
              >
                <Unlock className="w-28 h-28 text-green-400 drop-shadow-lg" />
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }} 
                className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 mb-6"
              >
                You Found It!
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-500/20"
              >
                <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                  In every universe, across every timeline, through every possibility—
                  my heart always finds its way to you.
                </p>

                {/* Larger video container so the whole frame is visible. object-contain prevents cropping. */}
                <div className="w-full max-w-6xl h-[70vh] md:h-[80vh] mx-auto bg-black rounded-2xl overflow-hidden mb-6 border border-purple-500/30">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain bg-black"
                    src={videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Small UI to edit/save the video path (persisted) */}
                <div className="mt-4">
                  {!editingUrl ? (
                    <>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <button
                        type="button"
                        onClick={() => { setTempUrl(videoUrl); setEditingUrl(true); }}
                        className="text-sm text-purple-300/80 underline"
                      >
                        Edit video path
                      </button>
                      <button
                        type="button"
                        onClick={openVideoModal}
                        className="text-sm text-green-300/80 underline"
                      >
                        Open video
                      </button>
                    </div>
                    {showModalVideo && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
                        <div className="relative w-full max-w-5xl h-[85vh] bg-black rounded-xl overflow-hidden">
                          <button
                            onClick={closeVideoModal}
                            className="absolute top-4 right-4 z-20 px-3 py-1 bg-purple-700 text-white rounded"
                          >
                            Back
                          </button>
                          <video
                            src={videoUrl}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain bg-black"
                          />
                        </div>
                      </div>
                    )}
                    </>
                  ) : (
                    <form
                      onSubmit={(e) => { e.preventDefault(); setVideoUrl(tempUrl || videoUrl); setEditingUrl(false); }}
                      className="mt-3 flex gap-2 justify-center items-center"
                    >
                      <input
                        value={tempUrl}
                        onChange={(e) => setTempUrl(e.target.value)}
                        placeholder="Video URL or /path.mp4"
                        className="w-80 px-3 py-2 rounded-full bg-purple-900/20 border border-purple-600 text-white"
                      />
                      <button type="submit" className="px-4 py-2 bg-green-600 rounded-full text-white">Save</button>
                      <button type="button" onClick={() => setEditingUrl(false)} className="px-3 py-2 text-sm text-purple-300/80">Cancel</button>
                    </form>
                  )}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 italic"
                >
                  Happy Birthday, my love! 💫
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 space-y-4"
              >
                <p className="text-purple-200 text-lg">
                  Thank you for traveling through these parallel universes with me.
                </p>
                <p className="text-pink-300 text-base italic">
                  Every version of me loves every version of you. ✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ParallaxCamera: subtle camera movement following the mouse
function ParallaxCamera() {
  const { camera, scene } = useThree();
  const vec = new THREE.Vector3();
  useFrame(({ mouse }) => {
    vec.set(mouse.x * 0.8, mouse.y * 0.4, 0);
    camera.position.lerp(new THREE.Vector3(vec.x * 5, vec.y * 2, 30), 0.02);
    camera.lookAt(0, 0, 0);
    if (scene && scene.rotation) scene.rotation.y += 0.0008;
  });
  return null;
}

// FloatingShapes: animated geometries that orbit and pulse
function FloatingShapes() {
  const groupRef = useRef<THREE.Group | null>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.1 + i * 0.02);
        child.rotation.y = t * (0.12 + i * 0.015);
        const s = 1 + Math.sin(t * (0.6 + i * 0.2)) * 0.12;
        child.scale.set(s, s, s);
      });
    }
  });

  const shapes = new Array(7).fill(0).map((_, i) => {
    const size = 0.8 + Math.random() * 2.6;
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 24;
    const z = (Math.random() - 0.5) * 40;
    const geom = i % 3 === 0 ? <icosahedronGeometry args={[size, 0]} /> : i % 3 === 1 ? <octahedronGeometry args={[size, 0]} /> : <boxGeometry args={[size, size, size]} />;
    const color = new THREE.Color().setHSL((i * 0.14) % 1, 0.65, 0.5).getStyle();
    return (
      <mesh key={i} position={[x, y, z]}>
        {geom}
        <meshStandardMaterial emissive={color} emissiveIntensity={0.18} metalness={0.6} roughness={0.2} color={color} transparent opacity={0.95} />
      </mesh>
    );
  });

  return (
    <group ref={groupRef}>
      {shapes}
    </group>
  );
}


