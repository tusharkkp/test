
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Enhanced Terrain Component with multiple view modes
const EnhancedTerrain = ({ viewMode }: { viewMode: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [heightData, setHeightData] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positionAttribute = geometry.getAttribute('position');
      
      if (!heightData) {
        // Generate and store height data
        const newHeightData = new Float32Array(positionAttribute.count);
        
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);
          const y = positionAttribute.getY(i);
          
          // Create realistic Indian terrain
          let height = 0;
          
          // Base terrain with Himalayas in the north
          height += Math.sin(x * 0.05) * Math.cos(y * 0.05) * 2;
          height += Math.sin(x * 0.1) * Math.cos(y * 0.1) * 1;
          
          // Add mountain ranges (Himalayas simulation)
          if (y > 5) {
            height += Math.sin(x * 0.03) * 3 + Math.random() * 0.5;
          }
          
          // Western Ghats
          if (x < -3 && y < 2) {
            height += Math.sin(y * 0.08) * 2;
          }
          
          // Eastern Ghats
          if (x > 3 && y < 0) {
            height += Math.sin(y * 0.06) * 1.5;
          }
          
          // Add noise for realism
          height += (Math.random() - 0.5) * 0.3;
          
          newHeightData[i] = height;
          positionAttribute.setZ(i, height);
        }
        
        setHeightData(newHeightData);
      } else {
        // Apply stored height data
        for (let i = 0; i < positionAttribute.count; i++) {
          positionAttribute.setZ(i, heightData[i]);
        }
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [heightData]);

  const getTerrainMaterial = () => {
    switch (viewMode) {
      case 'satellite':
        return (
          <meshStandardMaterial 
            color="#4A5D23" 
            map={null}
            roughness={0.8}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        );
      case 'wildlife':
        return (
          <meshStandardMaterial 
            color="#2D5016" 
            wireframe={false}
            transparent
            opacity={0.7}
            emissive="#1a3008"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        );
      default: // terrain
        return (
          <meshStandardMaterial 
            color="#2D5016" 
            wireframe={false}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        );
    }
  };

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      {getTerrainMaterial()}
    </mesh>
  );
};

// Enhanced Wildlife Marker with real-time updates
const WildlifeMarker = ({ 
  position, 
  species, 
  data, 
  onClick,
  viewMode 
}: { 
  position: [number, number, number];
  species: string;
  data: any;
  onClick: () => void;
  viewMode: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [lastSeen, setLastSeen] = useState(data.lastSeen);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const timeOptions = ['Just now', '2 min ago', '5 min ago', '10 min ago', '30 min ago'];
      setLastSeen(timeOptions[Math.floor(Math.random() * timeOptions.length)]);
    }, 10000 + Math.random() * 20000); // Random updates every 10-30 seconds

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.15;
      
      // Pulse effect for wildlife view
      if (viewMode === 'wildlife') {
        const pulseIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 3) * 0.3;
        meshRef.current.scale.setScalar((hovered ? 1.5 : 1) * pulseIntensity);
      }
    }
  });

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case 'tiger': return '#FF6B35';
      case 'elephant': return '#8B5FFF';
      case 'leopard': return '#FFD700';
      case 'deer': return '#39FF6A';
      case 'bird': return '#00D4FF';
      default: return '#FFFFFF';
    }
  };

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'tiger': return '🐅';
      case 'elephant': return '🐘';
      case 'leopard': return '🐆';
      case 'deer': return '🦌';
      case 'bird': return '🐦';
      default: return '🐾';
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.15, 0.35, 0.8, 8]} />
        <meshStandardMaterial 
          color={getSpeciesColor(species)} 
          emissive={getSpeciesColor(species)} 
          emissiveIntensity={viewMode === 'wildlife' ? 0.5 : 0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Real-time pulse rings for wildlife view */}
      {viewMode === 'wildlife' && (
        <>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.7, 16]} />
            <meshBasicMaterial 
              color={getSpeciesColor(species)} 
              transparent 
              opacity={0.3}
            />
          </mesh>
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.0, 16]} />
            <meshBasicMaterial 
              color={getSpeciesColor(species)} 
              transparent 
              opacity={0.2}
            />
          </mesh>
        </>
      )}
      
      {/* Floating Icon */}
      <Html
        position={[0, 1, 0]}
        center
        transform
        occlude
        style={{
          fontSize: hovered ? '28px' : '24px',
          transition: 'font-size 0.2s',
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.8)', 
          padding: '6px 10px', 
          borderRadius: '12px',
          border: `2px solid ${getSpeciesColor(species)}`,
          boxShadow: `0 0 10px ${getSpeciesColor(species)}50`
        }}>
          {getSpeciesIcon(species)}
        </div>
      </Html>

      {hovered && (
        <Html
          position={[0, 1.5, 0]}
          center
          transform
          occlude
          style={{
            pointerEvents: 'none',
            color: 'white',
            fontSize: '12px',
            textAlign: 'center'
          }}
        >
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.9)', 
            padding: '12px', 
            borderRadius: '12px',
            minWidth: '140px',
            border: `1px solid ${getSpeciesColor(species)}`
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '6px', color: getSpeciesColor(species) }}>
              {species.toUpperCase()}
            </div>
            <div style={{ marginBottom: '2px' }}>Population: {data.population}</div>
            <div style={{ marginBottom: '2px' }}>Health: {data.health}</div>
            <div style={{ color: '#00D4FF' }}>Last Seen: {lastSeen}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Enhanced Conservation Zone with different appearances per view mode
const ConservationZone = ({ 
  center, 
  radius, 
  name, 
  type,
  viewMode 
}: { 
  center: [number, number, number];
  radius: number;
  name: string;
  type: 'national_park' | 'wildlife_sanctuary' | 'tiger_reserve';
  viewMode: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      if (viewMode === 'wildlife') {
        meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
      } else {
        meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
      }
    }
  });

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'national_park': return '#39FF6A';
      case 'wildlife_sanctuary': return '#00D4FF';
      case 'tiger_reserve': return '#FF6B35';
      default: return '#FFFFFF';
    }
  };

  const getZoneOpacity = () => {
    switch (viewMode) {
      case 'satellite': return 0.6;
      case 'wildlife': return 0.8;
      default: return 0.4;
    }
  };

  return (
    <group position={center}>
      <mesh ref={meshRef}>
        <ringGeometry args={[radius * 0.7, radius, 32]} />
        <meshBasicMaterial 
          color={getZoneColor(type)} 
          transparent 
          opacity={getZoneOpacity()}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {viewMode !== 'satellite' && (
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.4}
          color={getZoneColor(type)}
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {name}
        </Text>
      )}
    </group>
  );
};

// Enhanced Camera Controller with smooth transitions
const CameraController = ({ selectedLocation, viewMode }: { selectedLocation: any; viewMode: string }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (selectedLocation) {
      camera.position.set(
        selectedLocation.position[0] + 3,
        selectedLocation.position[1] + 4,
        selectedLocation.position[2] + 3
      );
      camera.lookAt(selectedLocation.position[0], selectedLocation.position[1], selectedLocation.position[2]);
    } else {
      // Default positions based on view mode
      switch (viewMode) {
        case 'satellite':
          camera.position.set(0, 15, 0);
          camera.lookAt(0, 0, 0);
          break;
        case 'wildlife':
          camera.position.set(8, 6, 8);
          camera.lookAt(0, 0, 0);
          break;
        default: // terrain
          camera.position.set(5, 8, 5);
          camera.lookAt(0, 0, 0);
      }
    }
  }, [selectedLocation, camera, viewMode]);

  return null;
};

// Real-time Statistics Component
const RealTimeStats = ({ wildlifeData }: { wildlifeData: any[] }) => {
  const [stats, setStats] = useState({
    totalAnimals: 0,
    activeTrackers: 0,
    alertsToday: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        totalAnimals: wildlifeData.length + Math.floor(Math.random() * 50),
        activeTrackers: 15000 + Math.floor(Math.random() * 100),
        alertsToday: Math.floor(Math.random() * 25)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [wildlifeData]);

  return stats;
};

// Main Enhanced 3D Map Component
const Interactive3DMap = () => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'satellite' | 'terrain' | 'wildlife'>('terrain');

  // Enhanced wildlife data with real-time simulation
  const [wildlifeData, setWildlifeData] = useState([
    {
      id: 1,
      position: [2, 0.5, 1] as [number, number, number],
      species: 'tiger',
      data: {
        population: 48,
        health: 'Good',
        lastSeen: '2 hours ago',
        location: 'Ranthambore National Park'
      }
    },
    {
      id: 2,
      position: [-3, 0.3, -2] as [number, number, number],
      species: 'elephant',
      data: {
        population: 156,
        health: 'Excellent',
        lastSeen: '30 minutes ago',
        location: 'Bandipur National Park'
      }
    },
    {
      id: 3,
      position: [4, 0.7, -1] as [number, number, number],
      species: 'leopard',
      data: {
        population: 23,
        health: 'Fair',
        lastSeen: '1 day ago',
        location: 'Sariska Tiger Reserve'
      }
    },
    {
      id: 4,
      position: [-1, 0.4, 3] as [number, number, number],
      species: 'deer',
      data: {
        population: 340,
        health: 'Good',
        lastSeen: '15 minutes ago',
        location: 'Kanha National Park'
      }
    },
    {
      id: 5,
      position: [0, 0.6, -4] as [number, number, number],
      species: 'bird',
      data: {
        population: 1250,
        health: 'Excellent',
        lastSeen: '5 minutes ago',
        location: 'Bharatpur Bird Sanctuary'
      }
    }
  ]);

  const conservationZones = [
    {
      center: [2, 0, 1] as [number, number, number],
      radius: 1.5,
      name: 'Ranthambore',
      type: 'tiger_reserve' as const
    },
    {
      center: [-3, 0, -2] as [number, number, number],
      radius: 2,
      name: 'Bandipur',
      type: 'national_park' as const
    },
    {
      center: [0, 0, -4] as [number, number, number],
      radius: 1.2,
      name: 'Bharatpur',
      type: 'wildlife_sanctuary' as const
    }
  ];

  const stats = RealTimeStats({ wildlifeData });

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    setSelectedLocation(marker);
  };

  const resetView = () => {
    setSelectedMarker(null);
    setSelectedLocation(null);
  };

  const handleViewModeChange = (mode: 'satellite' | 'terrain' | 'wildlife') => {
    setViewMode(mode);
    setSelectedMarker(null);
    setSelectedLocation(null);
  };

  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-sky-900 to-forest-navy">
      {/* Enhanced Control Panel */}
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <div className="glassmorphism p-6 rounded-xl">
          <h3 className="text-xl font-orbitron font-bold text-electric-cyan mb-4">
            🗺️ Interactive 3D Map
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={() => handleViewModeChange('terrain')}
              className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                viewMode === 'terrain' 
                  ? 'bg-electric-cyan text-forest-navy font-bold' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              🏔️ Terrain View
            </button>
            <button
              onClick={() => handleViewModeChange('satellite')}
              className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                viewMode === 'satellite' 
                  ? 'bg-electric-cyan text-forest-navy font-bold' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              🛰️ Satellite View
            </button>
            <button
              onClick={() => handleViewModeChange('wildlife')}
              className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                viewMode === 'wildlife' 
                  ? 'bg-electric-cyan text-forest-navy font-bold' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              🐾 Wildlife View
            </button>
          </div>
          
          <button
            onClick={resetView}
            className="w-full mt-4 px-4 py-3 bg-bio-green/20 text-bio-green rounded-lg text-sm hover:bg-bio-green/30 transition-colors duration-300"
          >
            🏠 Reset View
          </button>
        </div>

        {/* Real-time Wildlife Statistics */}
        <div className="glassmorphism p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-bio-green mb-4 flex items-center">
            📊 Live Statistics
            <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></div>
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-misty-white/70">Total Animals:</span>
              <span className="text-tiger-orange font-bold text-lg">{stats.totalAnimals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-misty-white/70">Active Trackers:</span>
              <span className="text-electric-cyan font-bold text-lg">{stats.activeTrackers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-misty-white/70">Alerts Today:</span>
              <span className="text-neural-purple font-bold text-lg">{stats.alertsToday}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-misty-white/70">Protected Areas:</span>
              <span className="text-bio-green font-bold text-lg">3</span>
            </div>
          </div>
        </div>

        {/* View Mode Information */}
        <div className="glassmorphism p-4 rounded-xl">
          <h5 className="text-md font-semibold text-misty-white mb-2">Current View: {viewMode.toUpperCase()}</h5>
          <p className="text-xs text-misty-white/60">
            {viewMode === 'terrain' && 'Showing topographical features and elevation data'}
            {viewMode === 'satellite' && 'Overhead satellite perspective with high detail'}
            {viewMode === 'wildlife' && 'Real-time animal tracking with enhanced visualization'}
          </p>
        </div>
      </div>

      {/* Enhanced Selected Marker Info */}
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute top-4 right-4 w-80 z-10"
        >
          <div className="glassmorphism p-6 rounded-xl border border-electric-cyan/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
                Wildlife Details
              </h3>
              <button
                onClick={() => setSelectedMarker(null)}
                className="text-misty-white hover:text-electric-cyan text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">
                  {selectedMarker.species === 'tiger' ? '🐅' :
                   selectedMarker.species === 'elephant' ? '🐘' :
                   selectedMarker.species === 'leopard' ? '🐆' :
                   selectedMarker.species === 'deer' ? '🦌' :
                   selectedMarker.species === 'bird' ? '🐦' : '🐾'}
                </span>
                <div>
                  <div className="font-bold text-misty-white capitalize text-xl">
                    {selectedMarker.species}
                  </div>
                  <div className="text-misty-white/70 text-sm">
                    {selectedMarker.data.location}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-forest-navy/50 rounded-lg">
                  <div className="text-bio-green font-bold text-2xl">{selectedMarker.data.population}</div>
                  <div className="text-misty-white/60 text-xs">Population</div>
                </div>
                <div className="text-center p-3 bg-forest-navy/50 rounded-lg">
                  <div className={`font-bold text-xl ${
                    selectedMarker.data.health === 'Excellent' ? 'text-green-400' :
                    selectedMarker.data.health === 'Good' ? 'text-yellow-400' : 'text-orange-400'
                  }`}>
                    {selectedMarker.data.health}
                  </div>
                  <div className="text-misty-white/60 text-xs">Health Status</div>
                </div>
              </div>
              
              <div className="p-3 bg-forest-navy/50 rounded-lg">
                <div className="text-misty-white/60 text-sm mb-1">Last Sighting:</div>
                <div className="text-electric-cyan font-mono text-lg">{selectedMarker.data.lastSeen}</div>
              </div>

              <div className="p-3 bg-forest-navy/50 rounded-lg">
                <div className="text-misty-white/60 text-sm mb-1">GPS Coordinates:</div>
                <div className="text-neural-purple font-mono text-sm">
                  {selectedMarker.position[0].toFixed(4)}, {selectedMarker.position[2].toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced 3D Scene */}
      <Canvas
        camera={{ position: [5, 8, 5], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #1e3a8a, #2D5016)' }}
      >
        {/* Enhanced Lighting based on view mode */}
        <ambientLight intensity={viewMode === 'satellite' ? 0.6 : 0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={viewMode === 'satellite' ? 1.2 : 1} 
          color="#FFE5B4"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00D4FF" />
        {viewMode === 'wildlife' && (
          <pointLight position={[0, 8, 0]} intensity={0.8} color="#39FF6A" />
        )}
        
        {/* Enhanced 3D Terrain */}
        <EnhancedTerrain viewMode={viewMode} />
        
        {/* Conservation Zones */}
        {conservationZones.map((zone, index) => (
          <ConservationZone key={index} {...zone} viewMode={viewMode} />
        ))}
        
        {/* Wildlife Markers */}
        {wildlifeData.map((marker) => (
          <WildlifeMarker
            key={marker.id}
            position={marker.position}
            species={marker.species}
            data={marker.data}
            onClick={() => handleMarkerClick(marker)}
            viewMode={viewMode}
          />
        ))}
        
        {/* Enhanced Camera Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={!selectedLocation && viewMode !== 'satellite'}
          autoRotateSpeed={viewMode === 'wildlife' ? 1 : 0.5}
          maxDistance={viewMode === 'satellite' ? 20 : 15}
          minDistance={3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
        
        <CameraController selectedLocation={selectedLocation} viewMode={viewMode} />
      </Canvas>

      {/* View Mode Status Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glassmorphism px-6 py-3 rounded-full">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-electric-cyan rounded-full animate-pulse"></div>
            <span className="text-misty-white font-semibold">
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interactive3DMap;
