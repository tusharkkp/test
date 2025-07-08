import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { audioAnalysisService } from '@/services/audioAnalysis';

const AcousticAnalyzer = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [detectedSounds, setDetectedSounds] = useState<any[]>([]);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to audio analysis results
    const unsubscribe = audioAnalysisService.subscribe((result) => {
      if (result.detected && result.results.length > 0) {
        const newDetection = result.results[0]; // Best match
        
        // Add to detection list
        setDetectedSounds(prev => [newDetection, ...prev.slice(0, 9)]); // Keep last 10
        
        // Show toast for threats
        if (newDetection.threat) {
          toast({
            title: `🚨 THREAT DETECTED: ${newDetection.species.toUpperCase()}`,
            description: `Confidence: ${newDetection.confidence}% - Immediate attention required!`,
          });
        } else {
          toast({
            title: `🐾 Wildlife Detected: ${newDetection.species}`,
            description: `Confidence: ${newDetection.confidence}%`,
          });
        }
      }
      
      // Update frequency visualization
      if (result.rawData && result.rawData.dominantFrequencies) {
        const freqData = result.rawData.dominantFrequencies.map(f => f.amplitude * 100);
        setAudioData(freqData.length > 0 ? freqData : Array(64).fill(0));
      }
    });

    return () => {
      unsubscribe();
      audioAnalysisService.cleanup();
    };
  }, [toast]);

  const initializeAudio = async () => {
    try {
      const success = await audioAnalysisService.initializeAudioContext();
      if (success) {
        setAudioInitialized(true);
        setPermissionGranted(true);
        toast({
          title: "🎙️ Audio System Ready",
          description: "Wildlife sound detection system is now active",
        });
      } else {
        throw new Error('Failed to initialize audio');
      }
    } catch (error) {
      console.error('Audio initialization failed:', error);
      toast({
        title: "❌ Audio Permission Required",
        description: "Please allow microphone access to use wildlife sound detection",
      });
    }
  };

  const startListening = async () => {
    if (!audioInitialized) {
      await initializeAudio();
      return;
    }

    const success = audioAnalysisService.startRecording();
    if (success) {
      setIsListening(true);
      setDetectedSounds([]);
      toast({
        title: "🔊 Listening Started",
        description: "AI is now analyzing sounds for wildlife detection",
      });
    }
  };

  const stopListening = () => {
    audioAnalysisService.stopRecording();
    setIsListening(false);
    toast({
      title: "⏹️ Listening Stopped",
      description: "Wildlife sound detection paused",
    });
  };

  const soundPatterns = audioAnalysisService.getSoundPatterns();

  return (
    <div className="holographic p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
          AI Wildlife Sound Detection System
        </h3>
        <p className="text-lg text-misty-white">
          Real-time ML-powered acoustic analysis for wildlife identification and threat detection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Audio Control & Visualizer */}
        <div className="space-y-6">
          {/* Permission & Control Panel */}
          <div className="glassmorphism p-6 rounded-xl text-center">
            {!permissionGranted ? (
              <div className="space-y-4">
                <div className="text-yellow-500 text-6xl mb-4">🎙️</div>
                <h4 className="text-xl font-semibold text-misty-white mb-2">
                  Microphone Access Required
                </h4>
                <p className="text-misty-white/60 mb-4">
                  Enable microphone to use AI wildlife sound detection
                </p>
                <button
                  onClick={initializeAudio}
                  className="bg-gradient-to-r from-electric-cyan to-bio-green hover:scale-110 transition-all duration-300 px-6 py-3 rounded-lg font-semibold text-forest-navy"
                >
                  🔓 Grant Permission
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <motion.button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
                    isListening 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse shadow-lg shadow-red-500/50' 
                      : 'bg-gradient-to-r from-electric-cyan to-bio-green hover:scale-110 shadow-lg shadow-cyan-500/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!audioInitialized}
                >
                  {isListening ? '⏹️' : '🎙️'}
                </motion.button>
                
                <p className="text-lg font-semibold text-misty-white">
                  {isListening ? 'AI Detection Active' : 'Click to Start AI Detection'}
                </p>
                
                {isListening && (
                  <motion.div
                    className="text-electric-cyan font-mono text-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🧠 ANALYZING AUDIO PATTERNS...
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Real-time Frequency Visualizer */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-bio-green mb-4">
              Live Frequency Analysis
            </h4>
            
            <div className="h-32 bg-forest-navy rounded-lg p-4 flex items-end justify-center space-x-1">
              {Array.from({ length: 32 }, (_, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-t from-electric-cyan via-bio-green to-neural-purple w-2 rounded-t"
                  style={{ height: `${isListening && audioData[index] ? audioData[index] : 0}%` }}
                  animate={{ 
                    height: `${isListening && audioData[index] ? audioData[index] : 0}%`,
                    opacity: isListening ? 1 : 0.3
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
            
            {/* Frequency Range Labels */}
            <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-misty-white/60">
              <div>Infrasonic (0-20Hz)</div>
              <div>Low (20-200Hz)</div>
              <div>Mid (200-2kHz)</div>
              <div>High (2-20kHz)</div>
            </div>
          </div>

          {/* Detection Statistics */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-4">
              Detection Statistics
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-bio-green">{detectedSounds.length}</div>
                <div className="text-misty-white/60">Total Detections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-tiger-orange">
                  {detectedSounds.filter(s => s.threat).length}
                </div>
                <div className="text-misty-white/60">Threats Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-electric-cyan">
                  {detectedSounds.length > 0 ? Math.round(detectedSounds.reduce((sum, s) => sum + s.confidence, 0) / detectedSounds.length) : 0}%
                </div>
                <div className="text-misty-white/60">Avg Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-misty-white">
                  {isListening ? 'LIVE' : 'IDLE'}
                </div>
                <div className="text-misty-white/60">Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Detection Results & Database */}
        <div className="space-y-6">
          {/* Real-Time Detections */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-tiger-orange mb-4">
              🧠 AI Detection Results
            </h4>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {detectedSounds.length === 0 ? (
                  <div className="text-center text-misty-white/50 py-8">
                    {isListening ? '🔍 AI is listening for wildlife sounds...' : '🎙️ Start detection to see results'}
                  </div>
                ) : (
                  detectedSounds.map((sound, index) => (
                    <motion.div
                      key={`${sound.species}-${sound.timestamp.getTime()}-${index}`}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.9 }}
                      className={`p-4 rounded-lg border-l-4 glassmorphism ${
                        sound.threat ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-green-500/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {sound.threat ? '🚨' : 
                             sound.species === 'tiger' ? '🐅' :
                             sound.species === 'elephant' ? '🐘' :
                             sound.species === 'leopard' ? '🐆' :
                             sound.species === 'deer' ? '🦌' :
                             sound.species === 'bird' ? '🐦' : '🔊'}
                          </span>
                          <div>
                            <div className="font-semibold text-misty-white capitalize">
                              {sound.species.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-misty-white/60">
                              {sound.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${
                            sound.confidence > 80 ? 'text-green-400' :
                            sound.confidence > 60 ? 'text-yellow-400' : 'text-orange-400'
                          }`}>
                            {sound.confidence}%
                          </div>
                          {sound.threat && (
                            <div className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full mt-1">
                              THREAT
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-misty-white/80">Primary Freq:</span>
                          <span className="font-mono text-electric-cyan">
                            {sound.frequencies && sound.frequencies[0] ? `${sound.frequencies[0].frequency}Hz` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-misty-white/80">Amplitude:</span>
                          <span className="font-mono text-bio-green">
                            {sound.frequencies && sound.frequencies[0] ? `${Math.round(sound.frequencies[0].amplitude * 100)}%` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Wildlife Sound Database */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-4">
              🗃️ Wildlife Sound Database
            </h4>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {Object.entries(soundPatterns).map(([species, pattern]) => (
                <motion.div
                  key={species}
                  className="flex items-center justify-between p-3 bg-forest-navy/50 rounded-lg hover:bg-forest-navy/70 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {species === 'tiger' ? '🐅' :
                       species === 'elephant' ? '🐘' :
                       species === 'leopard' ? '🐆' :
                       species === 'deer' ? '🦌' :
                       species === 'bird' ? '🐦' :
                       species === 'gunshot' ? '🔫' :
                       species === 'chainsaw' ? '🪚' : '🔊'}
                    </span>
                    <div>
                      <div className="text-misty-white font-medium capitalize">{species}</div>
                      <div className="text-xs text-misty-white/60">
                        {pattern.frequencies[0]}-{pattern.frequencies[pattern.frequencies.length - 1]}Hz
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-electric-cyan font-mono">
                      {pattern.minDuration/1000}s-{pattern.maxDuration/1000}s
                    </div>
                    {pattern.threat && (
                      <div className="text-xs font-bold text-red-400">THREAT</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 glassmorphism p-4 rounded-xl">
        <h5 className="text-lg font-semibold text-bio-green mb-2">How to Use:</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-misty-white/80">
          <div>
            <strong>1. Grant Permission:</strong> Allow microphone access for real-time audio analysis
          </div>
          <div>
            <strong>2. Start Detection:</strong> Click the microphone button to begin AI listening
          </div>
          <div>
            <strong>3. Review Results:</strong> View detected wildlife and threats in real-time
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcousticAnalyzer;
