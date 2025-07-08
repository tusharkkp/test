
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from './CameraCapture';
import { aiSpeciesService, SpeciesResult } from '@/services/aiSpeciesRecognition';

const AISpeciesDemo = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [results, setResults] = useState<SpeciesResult | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAIModel();
  }, []);

  const loadAIModel = async () => {
    try {
      setIsLoadingModel(true);
      await aiSpeciesService.loadMobileNetModel();
      setModelLoaded(true);
      toast({
        title: "AI Model Ready",
        description: "Wildlife species recognition is now available!",
      });
    } catch (error) {
      console.error('Failed to load AI model:', error);
      toast({
        title: "Loading AI System",
        description: "Preparing species recognition capabilities",
        variant: "destructive",
      });
    } finally {
      setIsLoadingModel(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    await analyzeImageFile(file);
  };

  const handleCameraCapture = async (canvas: HTMLCanvasElement) => {
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setSelectedImage(imageDataUrl);
    
    try {
      setIsAnalyzing(true);
      setResults(null);
      const result = await aiSpeciesService.processImageFromCanvas(canvas);
      setResults(result);
      
      toast({
        title: "Species Identified Successfully!",
        description: `Detected: ${result.species} (Confidence: ${result.confidence}%)`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to identify species. Please try a clearer image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeImageFile = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setResults(null);
      
      const result = await aiSpeciesService.processImageFile(file);
      setResults(result);
      
      toast({
        title: "Species Identified Successfully!",
        description: `Detected: ${result.species} (Confidence: ${result.confidence}%)`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to identify species. Please try a clearer image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="holographic p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
          AI Species Recognition Demo
        </h3>
        <p className="text-lg text-misty-white mb-4">
          Upload an image or use your camera to identify wildlife species
        </p>
        
        {isLoadingModel && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-electric-cyan mr-2" size={20} />
            <span className="text-electric-cyan">Loading AI system...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Upload Interface */}
        <div className="space-y-6">
          {/* Camera Button */}
          <Button
            onClick={() => setIsCameraOpen(true)}
            className="w-full holographic p-6 h-auto flex-col space-y-3"
            disabled={isLoadingModel}
          >
            <Camera size={48} className="text-electric-cyan" />
            <div>
              <div className="text-lg font-semibold">Use Camera</div>
              <div className="text-sm opacity-75">Capture wildlife photos</div>
            </div>
          </Button>

          {/* Upload Button */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full glassmorphism border-2 border-dashed border-electric-cyan/50 hover:border-electric-cyan p-6 h-auto flex-col space-y-3"
            disabled={isLoadingModel}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Upload size={48} className="text-bio-green" />
            <div>
              <div className="text-lg font-semibold text-bio-green">Upload Wildlife Image</div>
              <div className="text-sm text-misty-white/60">Click to select or drag and drop</div>
            </div>
          </Button>
        </div>

        {/* Right: Results Display */}
        <div className="space-y-6">
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Uploaded wildlife image" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isAnalyzing && (
                <motion.div
                  className="text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <Loader2 className="animate-spin text-electric-cyan mr-2" size={20} />
                    <span className="text-electric-cyan font-mono text-lg">
                      Processing image...
                    </span>
                  </div>
                  <div className="w-full bg-forest-navy rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-electric-cyan to-bio-green h-2 rounded-full"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              )}

              {results && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Species:</span>
                    <span className="text-electric-cyan font-mono">{results.species}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Confidence:</span>
                    <span className="text-neural-purple font-mono">{results.confidence}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Behavior:</span>
                    <span className="text-tiger-orange font-mono text-sm">{results.behavior}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Location:</span>
                    <span className="text-misty-white font-mono text-sm">{results.location}</span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-misty-white/60 mb-1">
                      <span>Confidence Level</span>
                      <span>{results.confidence}%</span>
                    </div>
                    <div className="w-full bg-forest-navy rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-electric-cyan to-bio-green h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.confidence}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Instructions */}
          {!selectedImage && (
            <div className="glassmorphism p-6 rounded-xl text-center">
              <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-4">
                How to Use This Tool
              </h4>
              <div className="space-y-3 text-misty-white">
                <p className="text-sm">
                  📸 Use the camera to capture wildlife photos in real-time
                </p>
                <p className="text-sm">
                  📁 Or upload an existing image from your device
                </p>
                <p className="text-sm">
                  🧠 Our AI will identify the species and provide detailed information
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

export default AISpeciesDemo;
