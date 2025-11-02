import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Universe1Props {
  onNext: () => void;
}

export default function Universe1({ onNext }: Universe1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  const [aiMessage, setAiMessage] = useState(
    "In a universe painted with stardust and whispered wishes, two souls found each other across the cosmic void. It wasn't by chance—it was written in the constellations before time began."
  );

  // small delayed tweak to the aiMessage to avoid unused setter and add life
  useEffect(() => {
    const t = setTimeout(() => {
      setAiMessage((m) => m + ' The stars seemed to hum just for us.');
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <Canvas className="fixed inset-0 w-screen h-screen">
        <Nebula />
        <Stars radius={120} depth={60} count={3800} factor={5} saturation={0} fade speed={0.6} />
        <DriftingOrbs />
      </Canvas>

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-4xl px-8 space-y-screen">
          <motion.div style={{ opacity: opacity1 }} className="text-center">
            <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-8">
              Universe I
            </h2>
            <p className="text-2xl md:text-3xl text-purple-200 leading-relaxed">
              The First Encounter
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="text-center">
            <p className="text-xl md:text-2xl text-purple-100 leading-relaxed italic">
              {aiMessage}
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity3 }} className="text-center">
            <p className="text-lg md:text-xl text-pink-200 leading-relaxed">
              From the first glance, reality shifted. The air sparkled with possibility.
              Every word exchanged was a thread weaving our fates together, tighter and brighter.
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity4 }} className="text-center">
            <p className="text-lg md:text-xl text-blue-200 leading-relaxed mb-8">
              And in that moment, across infinite parallel worlds, every version of me fell for every version of you.
            </p>
            <motion.button
              className="pointer-events-auto px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Journey Deeper →
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-purple-300 text-sm pointer-events-none">
        Scroll to explore
      </div>
    </div>
  );
}

function DriftingOrbs() {
  const group = useRef<THREE.Group | null>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.children.forEach((c, i) => {
        c.position.x += Math.sin(t * (0.2 + i * 0.03)) * 0.002;
        c.position.y += Math.cos(t * (0.21 + i * 0.02)) * 0.002;
        c.rotation.y += 0.002 + i * 0.0005;
      });
    }
  });

  return (
    <group ref={group}>
      {[...Array(12)].map((_, i) => {
        const s = 0.6 + Math.random() * 1.4;
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 24;
        const z = (Math.random() - 0.5) * 40;
        const color = `hsl(${(i * 37) % 360} 70% 60%)`;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[s, 16, 16]} />
            <meshStandardMaterial emissive={color} emissiveIntensity={0.12} metalness={0.5} roughness={0.3} color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

function Nebula() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = 1 - (e.clientY / window.innerHeight) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
}, []);

const material = useMemo(() => {
  const uniforms = {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  } as { u_time: { value: number }; u_mouse: { value: THREE.Vector2 }; u_resolution: { value: THREE.Vector2 }; };

  const vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragment = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    // simple layering of sin waves to fake nebula
    float noise(vec2 p) {
      return sin(p.x) * sin(p.y);
    }

    void main() {
      vec2 uv = vUv;
      vec2 m = u_mouse * 0.5;
      float t = u_time * 0.2;

      vec2 p = uv * 3.0 - vec2(1.5);
      p += vec2(sin(t * 0.7 + uv.y * 3.0) * 0.2, cos(t * 0.6 + uv.x * 2.0) * 0.2);
      p += (m * 0.8);

      float c = 0.0;
      c += 0.5 * smoothstep(0.2, 0.7, abs(sin(p.x * 2.0 + t)) * abs(cos(p.y * 1.5 - t)));
      c += 0.35 * smoothstep(0.1, 0.6, abs(sin(p.x * 4.0 - t*0.8)) * abs(sin(p.y * 3.0 + t*0.6)));
      c += 0.2 * noise(p * 1.3 + t*0.5);

      vec3 col = mix(vec3(0.05,0.02,0.08), vec3(0.35,0.1,0.5), c);
      col = mix(col, vec3(0.95,0.4,0.7), pow(c, 2.0) * 0.6);

      float alpha = smoothstep(0.05, 0.35, c);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = clock.getElapsedTime();
    mat.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
    mat.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]} scale={[80, 45, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* material assigned in useMemo via mesh.material */}
      <primitive object={material} attach="material" />
    </mesh>
  );
}
