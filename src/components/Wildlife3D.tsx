
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Wildlife3D = () => {
  const tigerRef = useRef<THREE.Group>(null);
  const elephantRef = useRef<THREE.Group>(null);
  const birdRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (tigerRef.current) {
      tigerRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      tigerRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
    
    if (elephantRef.current) {
      elephantRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
    }
    
    if (birdRef.current) {
      birdRef.current.position.y = Math.sin(time * 3) * 0.2 + 1;
      birdRef.current.rotation.z = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Tiger representation */}
      <group ref={tigerRef} position={[-2, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.8, 0.6]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
        <mesh position={[0.8, 0.3, 0]}>
          <sphereGeometry args={[0.4]} />
          <meshStandardMaterial color="#FF8C69" />
        </mesh>
        <mesh position={[-0.8, -0.5, 0.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.8, -0.5, -0.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Elephant representation */}
      <group ref={elephantRef} position={[2, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.2, 1]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        <mesh position={[1, 0.2, 0]}>
          <sphereGeometry args={[0.6]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        <mesh position={[1.5, -0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.2, 0.3, 1]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        <mesh position={[-0.8, -0.8, 0.4]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        <mesh position={[-0.8, -0.8, -0.4]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
      </group>

      {/* Bird representation */}
      <group ref={birdRef} position={[0, 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#39FF6A" />
        </mesh>
        <mesh position={[0.2, 0.1, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#39FF6A" />
        </mesh>
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[0.8, 0.1, 0.4]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[0.8, 0.1, 0.4]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
      </group>
    </group>
  );
};

export default Wildlife3D;
