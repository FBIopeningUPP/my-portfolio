import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Sparkles } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import ExplodedPCB from './ExplodedPCB'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function CameraController({ room }) {
  useFrame((state) => {
    const isMobile = window.innerWidth < 768
    const baseZ = isMobile ? 12 : 8   

    let targetPos = new THREE.Vector3(0, 0, baseZ)
    let lookAt = new THREE.Vector3(0, 0, 0)

    if (room === 'projects') {
      targetPos.set(isMobile ? 0: -4, 1, isMobile ? 10 : 6)
    } else if (room === 'skills') {
      targetPos.set(0, 6, isMobile ? 6 : 4)
    } else if (room === 'contact') {
      targetPos.set(isMobile ? 0 : 4, -2, isMobile ? 10:6)
    }

    state.camera.position.lerp(targetPos, 0.05)
    state.camera.lookAt(lookAt)
  })
  return null
}

export default function Scene({ room }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 45 }} 
      dpr={[1, 1.5]} 
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={['#f4f4f0']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff5000" />
      
      <Suspense fallback={null}>
        <CameraController room={room} />
        <ExplodedPCB room={room} />
        <Environment preset="studio" />
        
        {/* Baked shadow instead of real-time to save massive GPU cycles */}
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} frames={1} resolution={256} />
        
        <Sparkles count={50} scale={12} size={2} speed={0.04} opacity={0.1} color="#ff5000"/>
        
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.6} resolutionScale={0.5} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}