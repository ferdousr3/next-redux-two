'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useRef, Suspense } from 'react'

function DataWave() {
  const points = useRef<THREE.Points>(null!)
  const count = 2000
  // Generate a grid of points
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 15
        const z = (Math.random() - 0.5) * 10
        const y = 0
        pos[i * 3] = x
        pos[i * 3 + 1] = y
        pos[i * 3 + 2] = z
    }
    return pos
  })

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const z = positions[i3 + 2]

      // Complex wave equation for organic "data flow" look
      positions[i3 + 1] = Math.sin(x * 0.5 + time * 0.5) * 0.5 + Math.sin(z * 0.5 + time * 0.3) * 0.5
    }
    if (points.current) {
        points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#94a3b8" // Slate-400
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </points>
  )
}

export function ThreeCanvas() {
  return (
    <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
      <Canvas camera={{ position: [0, 3, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <DataWave />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none" />
    </div>
  )
}
