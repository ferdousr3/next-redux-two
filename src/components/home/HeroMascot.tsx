'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, ContactShadows, Html, useAnimations, Sphere } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function Robot() {
  const group = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Floating Body
    group.current.position.y = Math.sin(t * 1) * 0.2;
    // Head Bobbing
    headRef.current.position.y = 1.2 + Math.sin(t * 2) * 0.05;
    headRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={group} scale={1.5}>
        {/* Head */}
        <mesh ref={headRef} position={[0, 1.2, 0]}>
            <capsuleGeometry args={[0.6, 0.5, 4, 8]} />
            <meshStandardMaterial color="#fff" roughness={0.2} metalness={0.5} />
            {/* Visor/Eyes */}
            <mesh position={[0, 0.2, 0.45]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.8, 0.3, 0.3]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            {/* Glowing Eyes */}
             <mesh position={[-0.2, 0.2, 0.61]}>
                <circleGeometry args={[0.08]} />
                <meshBasicMaterial color="#10b981" />
            </mesh>
             <mesh position={[0.2, 0.2, 0.61]}>
                <circleGeometry args={[0.08]} />
                <meshBasicMaterial color="#10b981" />
            </mesh>
        </mesh>

        {/* Body */}
        <mesh ref={bodyRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.4, 1.2, 32]} />
            <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
             {/* Chest Emblem */}
             <mesh position={[0, 0.2, 0.55]}>
                <sphereGeometry args={[0.15]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
             </mesh>
        </mesh>

        {/* Arms */}
        <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[-0.9, 0.2, 0]}>
                <sphereGeometry args={[0.2]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
        </Float>
        <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[0.9, 0.2, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.1, 0.15, 0.6]} />
                <meshStandardMaterial color="#fff" />
                {/* Hand holding a 'code' block */}
                <mesh position={[0, 0.4, 0]}>
                   <boxGeometry args={[0.3, 0.4, 0.05]} />
                   <meshBasicMaterial color="#10b981" />
                </mesh>
            </mesh>
        </Float>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
    </group>
  );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-5, 5, 5]} intensity={1} color="#10b981" />

            <Robot />

            <Environment preset="city" />
        </>
    )
}

export function HeroMascot() {
  return (
    <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 md:z-10 pointer-events-none md:pointer-events-auto opacity-30 md:opacity-100">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
