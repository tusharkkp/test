import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Phone, Upload, X } from 'lucide-react';

const EmergencyReporting = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [reportType, setReportType] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showHelplineCard, setShowHelplineCard] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const { toast } = useToast();

  const emergencyTypes = [
    { id: 'poaching', name: 'Illegal Hunting', icon: '🚨', color: 'text-red-500' },
    { id: 'injury', name: 'Injured Animal', icon: '🩹', color: 'text-orange-500' },
    { id: 'conflict', name: 'Human-Animal Conflict', icon: '⚠️', color: 'text-yellow-500' },
    { id: 'habitat', name: 'Habitat Damage', icon: '🌳', color: 'text-green-500' }
  ];

  const helplineNumber = '+91 9876543210';

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast({
        title: "Photo uploaded successfully",
        description: "Your photo has been attached to the report.",
      });
    }
  };

  const handleEmergencyReport = () => {
    const randomTime = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    setEstimatedTime(randomTime);
    setShowEmergencyDialog(true);
    console.log('Emergency report submitted for type:', reportType);
  };

  const handleHelplineCall = () => {
    setShowHelplineCard(true);
    setTimeout(() => {
      setShowHelplineCard(false);
    }, 10000);
    console.log('Helpline call initiated');
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(helplineNumber);
    toast({
      title: "Phone number copied",
      description: "The helpline number has been copied to your clipboard.",
    });
  };

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-8">
            Emergency Reporting System
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Report wildlife emergencies instantly for rapid response
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {emergencyTypes.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={`holographic p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                reportType === type.id ? 'ring-2 ring-electric-cyan' : ''
              }`}
              onClick={() => setReportType(type.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Report ${type.name}`}
            >
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className={`text-lg font-orbitron font-bold ${type.color} mb-2`}>
                {type.name}
              </h3>
              <p className="text-misty-white/60 text-sm">Report Immediately</p>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto holographic p-8 rounded-xl"
        >
          <h3 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6 text-center">
            Quick Report Form
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-bio-green font-semibold mb-2">Location</label>
              <input
                type="text"
                className="w-full glassmorphism p-3 rounded-lg text-misty-white placeholder-misty-white/50 border border-electric-cyan/20 focus:border-electric-cyan focus:outline-none"
                placeholder="Your current location or incident site"
                aria-label="Location"
              />
            </div>
            
            <div>
              <label className="block text-bio-green font-semibold mb-2">Incident Description</label>
              <textarea
                rows={4}
                className="w-full glassmorphism p-3 rounded-lg text-misty-white placeholder-misty-white/50 border border-electric-cyan/20 focus:border-electric-cyan focus:outline-none resize-none"
                placeholder="Please provide a brief description of the incident..."
                aria-label="Incident description"
              />
            </div>
            
            <div>
              <label className="block text-bio-green font-semibold mb-2">Upload Photo</label>
              <div className="glassmorphism p-6 rounded-lg border-2 border-dashed border-electric-cyan/30 text-center relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Upload photo"
                />
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded threat evidence"
                      className="max-w-full max-h-48 mx-auto rounded-lg"
                    />
                    <Button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1 h-auto"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-electric-cyan" />
                    <p className="text-misty-white/60">Click to upload photo or drag and drop</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleEmergencyReport}
                className="cyber-border holographic py-3 rounded-lg font-semibold text-electric-cyan hover:bg-electric-cyan hover:text-forest-navy transition-all duration-300"
              >
                🚨 Emergency Report
              </button>
              
              <button 
                onClick={handleHelplineCall}
                className="glassmorphism py-3 rounded-lg font-semibold text-misty-white hover:bg-misty-white/10 transition-all duration-300"
              >
                📞 Call Helpline
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-3xl font-orbitron font-bold text-red-500 mb-2">&lt; 5 Minutes</div>
            <div className="text-electric-cyan mb-1">Emergency Response</div>
            <div className="text-misty-white/60 text-sm">Life-threatening situations</div>
          </div>
          
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-3xl font-orbitron font-bold text-orange-500 mb-2">&lt; 30 Minutes</div>
            <div className="text-electric-cyan mb-1">General Reports</div>
            <div className="text-misty-white/60 text-sm">Non-emergency cases</div>
          </div>
          
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-3xl font-orbitron font-bold text-green-500 mb-2">24/7</div>
            <div className="text-electric-cyan mb-1">Helpline Available</div>
            <div className="text-misty-white/60 text-sm">Always at your service</div>
          </div>
        </motion.div>
      </div>

      {/* Emergency Report Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="glassmorphism border-electric-cyan/30">
          <DialogHeader>
            <DialogTitle className="text-electric-cyan text-xl font-orbitron">
              Emergency Response Activated
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🚁</div>
            <p className="text-lg text-misty-white mb-4">
              Our team will reach your location in{' '}
              <span className="text-electric-cyan font-bold text-2xl">{estimatedTime}</span>{' '}
              minutes
            </p>
            <p className="text-misty-white/60">
              Please stay at your current location and keep your phone accessible.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Helpline Card */}
      {showHelplineCard && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        >
          <div className="glassmorphism p-6 rounded-xl border border-electric-cyan/30 min-w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-electric-cyan font-orbitron font-bold">Wildlife Helpline</h3>
              <Button
                onClick={() => setShowHelplineCard(false)}
                className="p-1 h-auto bg-transparent hover:bg-misty-white/10"
                size="sm"
              >
                <X className="h-4 w-4 text-misty-white" />
              </Button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-5 w-5 text-bio-green" />
              <span className="text-misty-white font-mono text-lg">{helplineNumber}</span>
            </div>
            <Button
              onClick={copyPhoneNumber}
              className="w-full bg-electric-cyan hover:bg-electric-cyan/80 text-forest-navy font-semibold"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Number
            </Button>
            <p className="text-misty-white/60 text-xs mt-2 text-center">
              Available 24/7 • Auto-hide in 10s
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default EmergencyReporting;
