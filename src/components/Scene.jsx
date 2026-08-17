import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import ExplodedPCB from './ExplodedPCB'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function CameraController({ room }) {
  useFrame((state) => {
    let targetPos = new THREE.Vector3(0, 0, 8)
    let lookAt = new THREE.Vector3(0, 0, 0)

    if (room === 'projects') {
      targetPos.set(-4, 1, 6)
    } else if (room === 'skills') {
      targetPos.set(0, 6, 4)
    } else if (room === 'contact') {
      targetPos.set(4, -2, 6)
    }

    state.camera.position.lerp(targetPos, 0.05)
    state.camera.lookAt(lookAt)
  })
  return null
}

export default function Scene({ room }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={['#f4f4f0']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff5000" />
      
      <Suspense fallback={null}>
        <CameraController room={room} />
        <ExplodedPCB room={room} />
        <Environment preset="studio" />
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
          <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.3}/>
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}