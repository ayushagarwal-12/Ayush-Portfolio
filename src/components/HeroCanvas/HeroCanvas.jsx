import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Ring, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Inner animated sphere ── */
const AnimatedSphere = () => {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.y = t * 0.18;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2;
      innerRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <group>
        {/* Main glowing sphere */}
        <Sphere ref={meshRef} args={[1.2, 128, 128]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            attach="material"
            distort={0.35}
            speed={2.5}
            roughness={0.1}
            metalness={0.8}
            emissive="#0369a1"
            emissiveIntensity={0.4}
            wireframe={false}
          />
        </Sphere>

        {/* Inner wireframe sphere */}
        <Sphere ref={innerRef} args={[0.88, 32, 32]}>
          <meshStandardMaterial
            color="#a855f7"
            wireframe={true}
            emissive="#7c3aed"
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
          />
        </Sphere>

        {/* Orbit rings */}
        <Ring args={[1.6, 1.65, 128]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </Ring>

        <Ring args={[1.85, 1.9, 128]} rotation={[Math.PI / 4, Math.PI / 8, 0]}>
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.7}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>
    </Float>
  );
};

/* ── Floating particles ── */
const Particles = ({ count = 80 }) => {
  const meshRef = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#0ea5e9'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#a855f7'),
    ];

    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
};

/* ── Main exported canvas ── */
const HeroCanvas = () => {
  return (
    <div className="hero-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={2} color="#0ea5e9" />
          <pointLight position={[-3, -3, 3]} intensity={1.5} color="#a855f7" />
          <pointLight position={[0, 0, -3]} intensity={1} color="#22d3ee" />
          <AnimatedSphere />
          <Particles count={80} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
