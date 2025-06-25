
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const MapPoint = ({ position, label, color }: { 
  position: [number, number, number]; 
  label: string; 
  color: string; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
      meshRef.current.rotation.y = state.clock.getElapsedTime();
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const IndiaMap = () => {
  // Major wildlife locations in India with corrected coordinates
  const wildlifeLocations = [
    { position: [0.5, 0.3, 0] as [number, number, number], label: "Jim Corbett National Park", color: "#39FF6A" },
    { position: [-0.3, 0.1, 0] as [number, number, number], label: "Ranthambore National Park", color: "#FF6B35" },
    { position: [0.2, -0.4, 0] as [number, number, number], label: "Bandipur National Park", color: "#8B5FFF" },
    { position: [-0.5, -0.2, 0] as [number, number, number], label: "Gir National Park", color: "#00D4FF" },
    { position: [0.8, 0.0, 0] as [number, number, number], label: "Kaziranga National Park", color: "#FFD700" },
  ];

  return (
    <group>
      {/* Simplified India map outline */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[2, 1.5, 0.02]} />
        <meshStandardMaterial color="#2D5016" opacity={0.7} transparent />
      </mesh>
      
      {/* Wildlife location markers */}
      {wildlifeLocations.map((location, index) => (
        <MapPoint
          key={index}
          position={location.position}
          label={location.label}
          color={location.color}
        />
      ))}
    </group>
  );
};

const InteractiveMap = () => {
  return (
    <div className="w-full h-96 bg-forest-navy rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39FF6A" />
        
        <IndiaMap />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          maxDistance={5}
          minDistance={1}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveMap;
