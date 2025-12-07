'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function BlinkingDot({ label }: { label: string }) {
    return (
        <div className="group relative">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            {/* Label is now always visible on hover, with a strong backdrop */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 text-white px-3 py-1 text-xs rounded font-mono whitespace-nowrap opacity-100 shadow-xl z-50">
                {label}
            </div>
        </div>
    )
}

function AnimatedGlobe() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.y = t * 0.1;
    });

    return (
        <Sphere args={[2, 64, 64]} ref={meshRef}>
            <MeshDistortMaterial
                color="#0f172a"
                emissive="#10b981"
                emissiveIntensity={0.1}
                attach="material"
                distort={0.25}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
            />
            {/* Wireframe Overlay */}
            <mesh scale={[1.02, 1.02, 1.02]}>
                 <sphereGeometry args={[2, 32, 32]} />
                 <meshBasicMaterial color="#334155" wireframe transparent opacity={0.3} />
            </mesh>

            {/* Markers - Removing 'occlude' to ensure visibility as requested */}
            <mesh position={[1.8, 0.5, 0.5]}>
                <Html distanceFactor={15}>
                    <BlinkingDot label="New York (US-EAST)" />
                </Html>
            </mesh>
             <mesh position={[-1.5, 0.2, 1]}>
                <Html distanceFactor={15}>
                    <BlinkingDot label="London (EU-WEST)" />
                </Html>
            </mesh>
            <mesh position={[0.5, -1, 1.5]}>
                 <Html distanceFactor={15}>
                    <BlinkingDot label="Singapore (AP-SOUTH)" />
                </Html>
            </mesh>
             <mesh position={[1, 1.5, -0.5]}>
                 <Html distanceFactor={15}>
                    <BlinkingDot label="Tokyo (AP-NORTHEAST)" />
                </Html>
            </mesh>
        </Sphere>
    )
}

export function GlobalScale() {
  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6">
                Deploy <span className="text-emerald-400">Anywhere</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-mono">
                From edge devices to the largest data centers, GenAI brings the power of high-performance object storage to every corner of the globe.
            </p>
            <div className="grid grid-cols-2 gap-8 text-white font-mono">
                <div>
                    <div className="text-3xl font-bold text-emerald-400">25+</div>
                    <div className="text-sm text-slate-500">Regions</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-emerald-400">99.99%</div>
                    <div className="text-sm text-slate-500">Uptime</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-emerald-400">100PB+</div>
                    <div className="text-sm text-slate-500">Data Managed</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-emerald-400">0ms</div>
                    <div className="text-sm text-slate-500">Latancy Goal</div>
                </div>
            </div>
        </div>

        <div className="md:w-1/2 h-[400px] w-full">
            <Canvas camera={{ position: [0, 0, 5.5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <AnimatedGlobe />
            </Canvas>
        </div>
      </div>
    </section>
  )
}
