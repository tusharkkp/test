// Wildlife Sound Detection Service using Web Audio API and Machine Learning

interface SoundPattern {
  frequencies: number[];
  minDuration: number;
  maxDuration: number;
  avgAmplitude: number;
  harmonics: number[];
  threat?: boolean; // Optional threat property
}

interface SoundPatterns {
  [key: string]: SoundPattern;
}

class AudioAnalysisService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private isRecording = false;
  private subscribers: ((result: any) => void)[] = [];

  // Wildlife sound patterns database
  private soundPatterns: SoundPatterns = {
    tiger: {
      frequencies: [50, 100, 150, 200],
      minDuration: 1000, // ms
      maxDuration: 4000,
      avgAmplitude: 0.6,
      harmonics: [100, 200, 300]
    },
    elephant: {
      frequencies: [10, 20, 30, 40],
      minDuration: 2000,
      maxDuration: 8000,
      avgAmplitude: 0.8,
      harmonics: [20, 40, 60]
    },
    leopard: {
      frequencies: [80, 120, 160, 240],
      minDuration: 800,
      maxDuration: 3000,
      avgAmplitude: 0.5,
      harmonics: [160, 320, 480]
    },
    deer: {
      frequencies: [300, 500, 800, 1200],
      minDuration: 500,
      maxDuration: 2000,
      avgAmplitude: 0.4,
      harmonics: [600, 1200, 1800]
    },
    bird: {
      frequencies: [1000, 2000, 4000, 8000],
      minDuration: 200,
      maxDuration: 1500,
      avgAmplitude: 0.3,
      harmonics: [2000, 4000, 8000]
    },
    gunshot: {
      frequencies: [500, 1000, 2000, 4000],
      minDuration: 100,
      maxDuration: 500,
      avgAmplitude: 0.9,
      harmonics: [1000, 2000, 4000],
      threat: true
    },
    chainsaw: {
      frequencies: [2000, 3000, 4000, 5000],
      minDuration: 3000,
      maxDuration: 30000,
      avgAmplitude: 0.7,
      harmonics: [4000, 6000, 8000],
      threat: true
    }
  };

  async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false
        } 
      });
      
      const source = this.audioContext.createMediaStreamSource(this.stream);
      source.connect(this.analyser);
      
      console.log('Audio context initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return false;
    }
  }

  startRecording() {
    if (!this.stream || this.isRecording) return false;

    try {
      this.mediaRecorder = new MediaRecorder(this.stream);
      const audioChunks: Blob[] = [];

      this.mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        this.analyzeAudioBlob(audioBlob);
      };

      this.mediaRecorder.start(1000); // Record in 1-second chunks
      this.isRecording = true;
      
      // Start real-time frequency analysis
      this.startFrequencyAnalysis();
      
      console.log('Recording started');
      return true;
    } catch (error) {
      console.error('Failed to start recording:', error);
      return false;
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      console.log('Recording stopped');
    }
  }

  private startFrequencyAnalysis() {
    if (!this.analyser || !this.isRecording) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const analyze = () => {
      if (!this.isRecording) return;
      
      this.analyser!.getByteFrequencyData(dataArray);
      
      // Analyze frequency spectrum for wildlife patterns
      const result = this.analyzeFrequencySpectrum(dataArray);
      
      if (result.detected) {
        this.notifySubscribers(result);
      }
      
      // Continue analysis
      requestAnimationFrame(analyze);
    };
    
    analyze();
  }

  private analyzeFrequencySpectrum(dataArray: Uint8Array) {
    const sampleRate = 44100;
    const frequencyResolution = sampleRate / (2 * dataArray.length);
    
    // Calculate dominant frequencies
    const dominantFrequencies = [];
    const threshold = 100; // Minimum amplitude threshold
    
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > threshold) {
        const frequency = i * frequencyResolution;
        dominantFrequencies.push({
          frequency: Math.round(frequency),
          amplitude: dataArray[i] / 255
        });
      }
    }

    // Match against wildlife sound patterns
    const detectionResults = [];
    
    for (const [species, pattern] of Object.entries(this.soundPatterns)) {
      const confidence = this.calculateMatchConfidence(dominantFrequencies, pattern);
      
      if (confidence > 0.6) {
        detectionResults.push({
          species,
          confidence: Math.round(confidence * 100),
          frequencies: dominantFrequencies.slice(0, 5),
          pattern,
          threat: pattern.threat || false, // Safe access with fallback
          timestamp: new Date()
        });
      }
    }

    // Sort by confidence and return best match
    detectionResults.sort((a, b) => b.confidence - a.confidence);
    
    return {
      detected: detectionResults.length > 0,
      results: detectionResults,
      rawData: {
        dominantFrequencies: dominantFrequencies.slice(0, 10),
        averageAmplitude: dominantFrequencies.reduce((sum, f) => sum + f.amplitude, 0) / dominantFrequencies.length || 0,
        totalEnergy: dataArray.reduce((sum, val) => sum + val, 0)
      }
    };
  }

  private calculateMatchConfidence(frequencies: any[], pattern: SoundPattern): number {
    if (frequencies.length === 0) return 0;

    let matches = 0;
    let totalChecks = 0;

    // Check frequency range matches
    for (const patternFreq of pattern.frequencies) {
      totalChecks++;
      const tolerance = 50; // Hz tolerance
      
      const hasMatch = frequencies.some(f => 
        Math.abs(f.frequency - patternFreq) <= tolerance
      );
      
      if (hasMatch) matches++;
    }

    // Check amplitude range
    const avgAmplitude = frequencies.reduce((sum, f) => sum + f.amplitude, 0) / frequencies.length;
    const amplitudeTolerance = 0.3;
    
    if (Math.abs(avgAmplitude - pattern.avgAmplitude) <= amplitudeTolerance) {
      matches++;
    }
    totalChecks++;

    // Check harmonic presence
    for (const harmonic of pattern.harmonics || []) {
      totalChecks++;
      const hasHarmonic = frequencies.some(f => 
        Math.abs(f.frequency - harmonic) <= 30
      );
      if (hasHarmonic) matches++;
    }

    return matches / totalChecks;
  }

  private async analyzeAudioBlob(blob: Blob) {
    try {
      const audioBuffer = await blob.arrayBuffer();
      const audioData = await this.audioContext!.decodeAudioData(audioBuffer);
      
      // Perform additional analysis on the complete audio chunk
      const channelData = audioData.getChannelData(0);
      const duration = audioData.duration * 1000; // Convert to ms
      
      console.log(`Analyzed audio chunk: ${duration}ms duration`);
      
      // This could include more sophisticated ML analysis
      // For now, we rely on real-time frequency analysis
      
    } catch (error) {
      console.error('Error analyzing audio blob:', error);
    }
  }

  private notifySubscribers(result: any) {
    this.subscribers.forEach(callback => callback(result));
  }

  subscribe(callback: (result: any) => void): () => void {
    this.subscribers.push(callback);
    
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  cleanup() {
    if (this.mediaRecorder && this.isRecording) {
      this.stopRecording();
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }

    this.subscribers = [];
  }

  getIsRecording() {
    return this.isRecording;
  }

  getSoundPatterns() {
    return this.soundPatterns;
  }
}

export const audioAnalysisService = new AudioAnalysisService();
