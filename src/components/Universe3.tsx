import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

interface Universe3Props {
  onNext: () => void;
}

export default function Universe3({ onNext }: Universe3Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 140;
    const newParticles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        size: Math.random() * 3 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      newParticles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // mouse attraction
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.max(0, 40 - dist) * 0.0008;
        particle.vx += (dx / dist) * force;
        particle.vy += (dy / dist) * force;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
        gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMove = (ev: MouseEvent) => {
      mouse.current.x = ev.clientX;
      mouse.current.y = ev.clientY;
    };

  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Universe III
          </h2>
          <p className="text-xl md:text-2xl text-purple-200">
            The Love Frequency
          </p>
        </motion.div>

        <motion.div
          className="relative"
          animate={{
              scale: [1, 1.18, 1],
            }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <Heart className="w-32 h-32 md:w-48 md:h-48 text-pink-400 fill-pink-400 relative z-10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-2xl text-center"
        >
          <p className="text-lg md:text-xl text-purple-100 leading-relaxed mb-8">
            Every heartbeat resonates across dimensions. Our love vibrates at a frequency that echoes through the cosmos,
            creating ripples in the fabric of space-time itself.
          </p>
          <p className="text-base md:text-lg text-pink-200 italic">
            In quantum entanglement, two particles remain connected regardless of distance.
            That's us—forever intertwined, no matter how far apart we may seem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-4 text-purple-300">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-purple-400 rounded-full"
                  animate={{
                    height: [20, 40, 20],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            <span className="text-sm">432 Hz - The Love Frequency</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-pink-400 rounded-full"
                  animate={{
                    height: [20, 40, 20],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1 + 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          <motion.button
            className="mt-8 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Transcend →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
