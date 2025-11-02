import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState } from 'react';

function CosmicScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={3} rotationIntensity={0.8} floatIntensity={0.5}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Float>
    </>
  );
}

interface PortalProps {
  onEnter: () => void;
}

export default function Portal({ onEnter }: PortalProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <CosmicScene />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center px-4"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-8"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Parallel Universe
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-purple-200 mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Welcome to the universe where everything went right
          </motion.p>

          <motion.button
            className="pointer-events-auto px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isHovered
                ? '0 0 40px rgba(168, 85, 247, 0.6)'
                : '0 0 20px rgba(168, 85, 247, 0.3)',
            }}
          >
            Tap to Enter
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-purple-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
