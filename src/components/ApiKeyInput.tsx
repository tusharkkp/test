
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

const ApiKeyInput = ({ onApiKeySet, currentApiKey = '' }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <motion.div
      className="glassmorphism p-4 rounded-xl mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-2 mb-3">
        <Key className="text-neural-purple" size={20} />
        <h4 className="text-lg font-orbitron font-bold text-neural-purple">
          Hugging Face API Key (Optional)
        </h4>
      </div>
      
      <p className="text-sm text-misty-white/60 mb-4">
        Enter your free Hugging Face API key for backup classification. 
        <a 
          href="https://huggingface.co/settings/tokens" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-electric-cyan hover:underline ml-1"
        >
          Get your free API key here
        </a>
      </p>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            type={showKey ? 'text' : 'password'}
            placeholder="hf_xxxxxxxxxxxxxxxxxxxx"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="glassmorphism border-electric-cyan/30 text-misty-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-misty-white/60 hover:text-electric-cyan"
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <Button 
          type="submit" 
          className="holographic"
          disabled={!apiKey.trim()}
        >
          Set Key
        </Button>
      </form>
    </motion.div>
  );
};

export default ApiKeyInput;
