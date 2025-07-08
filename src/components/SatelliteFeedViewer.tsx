
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ActivityData } from '@/types/forestActivity';
import { generateMockForestActivity } from '@/services/mockForestActivityService';

interface SatelliteOverlayData {
  id: string;
  type: 'poaching' | 'animal-movement' | 'vehicle' | 'fire';
  coordinates: [number, number];
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  confidence: number;
}

const SatelliteFeedViewer = () => {
  const [overlayData, setOverlayData] = useState<SatelliteOverlayData[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState<'satellite' | 'drone'>('satellite');
  const refreshInterval = useRef<NodeJS.Timeout>();

  // Mock satellite/drone feeds
  const feedSources = {
    satellite: {
      name: 'ISRO Satellite Feed - Kaziranga NP',
      url: 'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Live+Satellite+Feed',
      coordinates: [26.2006, 92.9376]
    },
    drone: {
      name: 'Drone Patrol Unit 7 - Jim Corbett',
      url: 'https://via.placeholder.com/800x600/2d5aa0/ffffff?text=Live+Drone+Feed',
      coordinates: [29.5331, 78.9433]
    }
  };

  // Generate mock overlay data
  const generateOverlayData = (): SatelliteOverlayData[] => {
    const activities = generateMockForestActivity(8);
    return activities.map(activity => ({
      id: activity.id,
      type: activity.type as any,
      coordinates: [activity.longitude, activity.latitude],
      severity: activity.severity,
      timestamp: activity.timestamp,
      confidence: activity.confidence || 0.85
    }));
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (isLiveMode) {
      const refresh = () => {
        setOverlayData(generateOverlayData());
      };
      
      refresh(); // Initial load
      refreshInterval.current = setInterval(refresh, 30000);

      return () => {
        if (refreshInterval.current) {
          clearInterval(refreshInterval.current);
        }
      };
    }
  }, [isLiveMode]);

  const getMarkerColor = (type: string, severity: string) => {
    const colors = {
      'poaching': severity === 'high' ? '#FF0000' : '#FF6B6B',
      'animal-movement': '#4ADE80',
      'vehicle': '#8B5CF6',
      'fire': '#EF4444'
    };
    return colors[type as keyof typeof colors] || '#6B7280';
  };

  const currentFeed = feedSources[selectedFeed];

  return (
    <section className="py-20" id="satellite-feed">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-bio-green mb-6">
            Live Satellite & Drone Feeds
          </h2>
          <p className="text-xl text-misty-white max-w-3xl mx-auto">
            Real-time monitoring through satellite imagery and drone surveillance with AI-powered activity detection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-4">
                Feed Controls
              </h3>
              
              {/* Feed Selection */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-semibold text-bio-green">Select Feed</label>
                <div className="space-y-2">
                  {Object.entries(feedSources).map(([key, feed]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedFeed(key as any)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedFeed === key 
                          ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan' 
                          : 'bg-forest-navy/50 hover:bg-misty-white/10 text-misty-white'
                      }`}
                    >
                      <div className="text-sm font-medium">{feed.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Mode Toggle */}
              <div className="flex items-center justify-between p-3 bg-forest-navy/50 rounded-lg">
                <span className="text-misty-white font-medium">Live Updates</span>
                <button
                  onClick={() => setIsLiveMode(!isLiveMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    isLiveMode ? 'bg-bio-green' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      isLiveMode ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-4">
                Detected Activities
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  overlayData.reduce((acc, item) => {
                    acc[item.type] = (acc[item.type] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getMarkerColor(type, 'medium') }}
                      />
                      <span className="text-misty-white text-sm capitalize">
                        {type.replace('-', ' ')}
                      </span>
                    </div>
                    <span className="text-electric-cyan font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed Display */}
          <div className="lg:col-span-3">
            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
                  {currentFeed.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {isLiveMode && (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-400 text-sm font-medium">LIVE</span>
                    </>
                  )}
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-forest-navy/50">
                {/* Mock Feed Display */}
                <div className="relative w-full h-96">
                  <img 
                    src={currentFeed.url}
                    alt={currentFeed.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Activity Overlay Markers */}
                  {overlayData.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${20 + (index % 4) * 20}%`,
                        top: `${20 + Math.floor(index / 4) * 20}%`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white animate-pulse"
                        style={{ backgroundColor: getMarkerColor(activity.type, activity.severity) }}
                      />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <div className="text-sm font-semibold capitalize">
                          {activity.type.replace('-', ' ')}
                        </div>
                        <div className="text-xs text-gray-300">
                          Severity: {activity.severity}
                        </div>
                        <div className="text-xs text-gray-300">
                          Confidence: {(activity.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-300">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Feed Info Overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 text-white p-2 rounded">
                    <div className="text-xs">
                      Coordinates: {currentFeed.coordinates[0]}, {currentFeed.coordinates[1]}
                    </div>
                    <div className="text-xs">
                      Last Update: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Statistics */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-forest-navy/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-bio-green">{overlayData.length}</div>
                  <div className="text-sm text-misty-white/80">Total Detections</div>
                </div>
                <div className="bg-forest-navy/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {overlayData.filter(a => a.severity === 'high').length}
                  </div>
                  <div className="text-sm text-misty-white/80">High Priority</div>
                </div>
                <div className="bg-forest-navy/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-electric-cyan">95.2%</div>
                  <div className="text-sm text-misty-white/80">Avg Confidence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SatelliteFeedViewer;
