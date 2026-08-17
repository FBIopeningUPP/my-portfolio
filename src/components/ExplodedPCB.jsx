import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function ExplodedPCB({ room }) {
  const groupRef = useRef()
  const pcbRef = useRef()
  const chipRef = useRef()
  const topPinsRef = useRef()
  const bottomPinsRef = useRef()

  useFrame((state) => {
    const isSkills = room === 'skills'
    
    if (chipRef.current) {
      chipRef.current.position.y = THREE.MathUtils.lerp(chipRef.current.position.y, isSkills ? 1.5 : 0.15, 0.05)
    }
    if (pcbRef.current) {
      pcbRef.current.position.y = THREE.MathUtils.lerp(pcbRef.current.position.y, isSkills ? -1.5 : 0, 0.05)
    }
    if (topPinsRef.current) {
      topPinsRef.current.position.y = THREE.MathUtils.lerp(topPinsRef.current.position.y, isSkills ? 2.5 : 0.2, 0.05)
    }
    if (bottomPinsRef.current) {
      bottomPinsRef.current.position.y = THREE.MathUtils.lerp(bottomPinsRef.current.position.y, isSkills ? -2.5 : -0.2, 0.05)
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.pointer.y * Math.PI) / 15, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 15, 0.05)
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} rotation={[-0.5, 0.5, 0]}>
        
        <mesh ref={pcbRef} position={[0, 0, 0]}>
          <boxGeometry args={[6, 0.2, 4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          <mesh position={[0, 0.11, 0]}>
            <planeGeometry args={[5.5, 3.5]} />
            <meshStandardMaterial color="#ff5000" emissive="#ff5000" emissiveIntensity={2} toneMapped={false} wireframe />
          </mesh>
        </mesh>

        <mesh ref={chipRef} position={[0, 0.15, 0]}>
          <boxGeometry args={[1.5, 0.3, 1.5]} />
          <meshStandardMaterial color="#050505" roughness={0.4} metalness={0.8} />
        </mesh>

        <group ref={topPinsRef} position={[0, 0.2, 0]}>
          {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
            <mesh key={i} position={[x, 0, -1]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4]} />
              <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.2} />
            </mesh>
          ))}
        </group>

        <group ref={bottomPinsRef} position={[0, -0.2, 0]}>
           {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 0, 1.5]}>
              <boxGeometry args={[0.2, 0.4, 0.2]} />
              <meshStandardMaterial color="#ff5000" emissive="#ff5000" emissiveIntensity={1.5} toneMapped={false} />
            </mesh>
          ))}
        </group>

      </group>
    </Float>
  )
}
