'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function CyberCube({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Complex rotation
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.5;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.z += 0.005;
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={1.5}>
        <group position={position}>
            {/* Core Box */}
            <mesh ref={meshRef}>
                <boxGeometry args={[size, size, size]} />
                <meshPhysicalMaterial
                    color="#0f172a"
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.9}
                    clearcoat={1}
                />
            </mesh>
            {/* Glowing Edges */}
            <mesh ref={meshRef}> {/* Reuse ref for synced rotation */}
                <boxGeometry args={[size + 0.02, size + 0.02, size + 0.02]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
        </group>
    </Float>
  );
}

function ConnectionLines({ count = 20 }: { count?: number }) {
    const lines = useMemo(() => {
        return new Array(count).fill(0).map(() => {
             const start = [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8
             ] as [number, number, number];
             const end = [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8
             ] as [number, number, number];
             return { start, end };
        });
    }, [count]);

    return (
        <group>
            {lines.map((line, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[new Float32Array([...line.start, ...line.end]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#10b981" transparent opacity={0.15} />
                </line>
            ))}
        </group>
    )
}

function Rig() {
    // Mouse parallax logic
    useFrame((state) => {
        state.camera.position.lerp({
            x: -state.mouse.x * 2,
            y: -state.mouse.y * 2,
            z: 8
        }, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

function Scene() {
    return (
        <>
            <Rig />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.6} color="#10b981" />

            {/* Central Cluster */}
            <CyberCube position={[0, 0, 0]} color="#10b981" size={1.5} />

            {/* Satellites */}
            <CyberCube position={[-3, 1.5, -1]} color="#3b82f6" size={0.8} />
            <CyberCube position={[3, -1.5, 1]} color="#06b6d4" size={0.8} />
            <CyberCube position={[-2, -2, 2]} color="#f43f5e" size={0.5} />
            <CyberCube position={[2, 2, -2]} color="#8b5cf6" size={0.6} />

            <ConnectionLines count={25} />

            <Environment preset="city" />
        </>
    )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <Scene />
      </Canvas>
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent pointer-events-none" />
    </div>
  );
}
