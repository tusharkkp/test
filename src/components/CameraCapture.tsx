
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (canvas: HTMLCanvasElement) => void;
}

const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'environment' // Use back camera on mobile
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    onCapture(canvas);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-forest-navy rounded-2xl p-6 max-w-2xl w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
            Capture Wildlife Photo
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-misty-white hover:text-electric-cyan"
          >
            <X size={24} />
          </Button>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="text-red-400 mb-4">{error}</div>
            <Button onClick={startCamera} className="holographic">
              <Camera className="mr-2" size={20} />
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                autoPlay
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={capturePhoto}
                className="holographic px-6 py-3"
                disabled={!stream}
              >
                <Camera className="mr-2" size={20} />
                Capture Photo
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-misty-white text-misty-white hover:bg-misty-white hover:text-forest-navy"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CameraCapture;
