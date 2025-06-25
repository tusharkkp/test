
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EnhancedWildlife3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const tigerRef = useRef<THREE.Group>(null);
  const elephantRef = useRef<THREE.Group>(null);
  const birdRefs = useRef<THREE.Group[]>([]);
  const treesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Main group gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
    }
    
    // Tiger walking animation - more realistic movement
    if (tigerRef.current) {
      tigerRef.current.position.x = Math.sin(time * 0.3) * 2;
      tigerRef.current.position.z = Math.cos(time * 0.2) * 1.5;
      tigerRef.current.rotation.y = Math.atan2(
        Math.cos(time * 0.3) * 2, 
        -Math.sin(time * 0.2) * 1.5
      );
      tigerRef.current.position.y = Math.abs(Math.sin(time * 3)) * 0.05;
    }
    
    // Elephant gentle swaying
    if (elephantRef.current) {
      elephantRef.current.rotation.z = Math.sin(time * 0.6) * 0.05;
      elephantRef.current.position.y = Math.sin(time * 0.8) * 0.03;
    }
    
    // Birds flying in more natural formation
    birdRefs.current.forEach((bird, index) => {
      if (bird) {
        const offset = index * 0.8;
        bird.position.x = Math.sin(time * 0.4 + offset) * 3 + index * 0.8;
        bird.position.y = 2.5 + Math.sin(time * 1.5 + offset) * 0.2;
        bird.position.z = Math.cos(time * 0.3 + offset) * 1.5;
        bird.rotation.z = Math.sin(time * 2 + offset) * 0.15;
      }
    });

    // Trees gentle swaying - removed fast movement
    if (treesRef.current) {
      treesRef.current.children.forEach((tree, index) => {
        tree.rotation.z = Math.sin(time * 0.3 + index * 0.2) * 0.03;
      });
    }
  });

  // Create birds with more natural behavior
  const createBird = (index: number) => (
    <group 
      key={index} 
      ref={(el) => { if (el) birdRefs.current[index] = el; }}
      position={[index * 0.8, 2.5, 0]}
    >
      {/* Bird body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color="#39FF6A" />
      </mesh>
      
      {/* Bird head */}
      <mesh position={[0.12, 0.08, 0]}>
        <sphereGeometry args={[0.08, 6, 4]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[0.3, 0.04, 0.15]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <boxGeometry args={[0.3, 0.04, 0.15]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );

  // Create more realistic grounded trees
  const createGroundedTree = (position: [number, number, number], scale: number) => (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08 * scale, 0.12 * scale, 1.2 * scale]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Base foliage - larger, more realistic */}
      <mesh position={[0, 0.9 * scale, 0]}>
        <sphereGeometry args={[0.8 * scale, 12, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      
      {/* Upper foliage */}
      <mesh position={[0, 1.4 * scale, 0]}>
        <sphereGeometry args={[0.6 * scale, 10, 6]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      
      {/* Tree crown */}
      <mesh position={[0, 1.8 * scale, 0]}>
        <sphereGeometry args={[0.4 * scale, 8, 6]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef}>
      {/* Enhanced Tiger */}
      <group ref={tigerRef} position={[-2, 0, 0]}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.8, 0.6]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0.8, 0.3, 0]}>
          <sphereGeometry args={[0.4]} />
          <meshStandardMaterial color="#FF8C69" />
        </mesh>
        
        {/* Eyes with glow */}
        <mesh position={[1.1, 0.4, 0.15]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
        <mesh position={[1.1, 0.4, -0.15]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
        
        {/* Legs */}
        {[-0.4, -0.4, 0.4, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -0.6, i < 2 ? 0.2 : -0.2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))}
        
        {/* Tail */}
        <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.05, 0.1, 0.8]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
      </group>

      {/* Enhanced Elephant */}
      <group ref={elephantRef} position={[2, 0, 0]}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.2, 1]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Head */}
        <mesh position={[1.2, 0.2, 0]}>
          <sphereGeometry args={[0.6]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Trunk */}
        <mesh position={[1.8, -0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.15, 0.25, 1.2]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Ears */}
        <mesh position={[1, 0.6, 0.4]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        <mesh position={[1, 0.6, -0.4]} rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Legs */}
        {[-0.6, -0.6, 0.6, 0.6].map((x, i) => (
          <mesh key={i} position={[x, -0.9, i < 2 ? 0.3 : -0.3]}>
            <cylinderGeometry args={[0.2, 0.2, 0.6]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
        ))}
      </group>

      {/* Fewer, more natural flying birds */}
      {[...Array(3)].map((_, index) => createBird(index))}

      {/* Grounded Forest Background - No floating trees */}
      <group ref={treesRef}>
        {createGroundedTree([-4, -0.6, -3], 1.0)}
        {createGroundedTree([4, -0.6, -4], 1.4)}
        {createGroundedTree([-3, -0.6, 3], 1.2)}
        {createGroundedTree([3, -0.6, 4], 1.1)}
        {createGroundedTree([0, -0.6, -5], 1.3)}
        {createGroundedTree([-5, -0.6, 0], 0.9)}
        {createGroundedTree([5, -0.6, -1], 1.5)}
      </group>

      {/* Ambient fireflies - reduced and more natural */}
      {[...Array(8)].map((_, index) => (
        <mesh
          key={`firefly-${index}`}
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * 2 + 0.5,
            (Math.random() - 0.5) * 8
          ]}
        >
          <sphereGeometry args={[0.015]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      ))}

      {/* Ground plane for reference */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2F4F2F" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export default EnhancedWildlife3D;
