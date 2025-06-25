interface AlertData {
  id: string;
  type: 'poaching' | 'habitat_degradation' | 'wildlife_movement' | 'environmental';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    lat: number;
    lng: number;
    region: string;
  };
  timestamp: Date;
  prediction?: {
    confidence: number;
    timeToThreat: number; // minutes
    riskFactors: string[];
  };
  data: any;
  status: 'active' | 'investigating' | 'resolved';
}

interface PredictiveModel {
  poachingRisk: number;
  habitatDegradation: number;
  wildlifeStress: number;
  environmentalThreats: number;
}

class RealTimeAlertService {
  private eventSource: EventSource | null = null;
  private alerts: AlertData[] = [];
  private subscribers: ((alerts: AlertData[]) => void)[] = [];
  private predictionModel: PredictiveModel = {
    poachingRisk: 0,
    habitatDegradation: 0,
    wildlifeStress: 0,
    environmentalThreats: 0
  };

  // Simulate real-time data sources
  private sensorData = {
    acousticSensors: new Map(),
    cameraTrapData: new Map(),
    satelliteImagery: new Map(),
    weatherData: new Map(),
    wildlifeTracking: new Map()
  };

  constructor() {
    this.initializeRealTimeMonitoring();
    this.runPredictiveAnalysis();
  }

  private initializeRealTimeMonitoring() {
    // Simulate real-time sensor data streams (SILENT mode)
    setInterval(() => {
      this.processAcousticData();
      this.processCameraTrapData();
      this.processSatelliteData();
      this.processEnvironmentalData();
      this.runPredictiveAnalysis();
    }, 2000); // Process every 2 seconds

    console.log('Real-time monitoring system initialized (SILENT mode - no audio alerts)');
  }

  private processAcousticData() {
    // Simulate acoustic sensor data from forest microphones
    const locations = [
      { lat: 28.7041, lng: 77.1025, region: 'Delhi Ridge' },
      { lat: 26.9124, lng: 75.7873, region: 'Ranthambore' },
      { lat: 22.7196, lng: 75.8577, region: 'Bandhavgarh' }
    ];

    locations.forEach(location => {
      const acousticSignature = {
        gunshots: Math.random() * 10,
        chainsaws: Math.random() * 5,
        vehicles: Math.random() * 15,
        animalDistress: Math.random() * 8,
        humanActivity: Math.random() * 20
      };

      // Detect potential poaching activity
      if (acousticSignature.gunshots > 7 || acousticSignature.animalDistress > 6) {
        this.generateAlert({
          type: 'poaching',
          severity: acousticSignature.gunshots > 8 ? 'critical' : 'high',
          location,
          data: {
            source: 'acoustic_sensor',
            signatures: acousticSignature,
            threat_indicators: ['gunshot_detected', 'animal_distress']
          }
        });
      }

      // Detect habitat degradation
      if (acousticSignature.chainsaws > 3) {
        this.generateAlert({
          type: 'habitat_degradation',
          severity: 'high',
          location,
          data: {
            source: 'acoustic_sensor',
            signatures: acousticSignature,
            threat_indicators: ['illegal_logging']
          }
        });
      }
    });
  }

  private processCameraTrapData() {
    // Simulate camera trap AI analysis
    const cameraLocations = [
      { lat: 26.9124, lng: 75.7873, region: 'Ranthambore' },
      { lat: 21.1702, lng: 79.0000, region: 'Tadoba' },
      { lat: 24.4742, lng: 73.7130, region: 'Kumbhalgarh' }
    ];

    cameraLocations.forEach(location => {
      const detections = {
        tigers: Math.random() * 3,
        poachers: Math.random() * 2,
        vehicles: Math.random() * 5,
        snares: Math.random() * 1,
        unusual_activity: Math.random() * 10
      };

      // Poacher detection
      if (detections.poachers > 1.5 || detections.snares > 0.7) {
        this.generateAlert({
          type: 'poaching',
          severity: 'critical',
          location,
          data: {
            source: 'camera_trap',
            detections,
            confidence: 0.85 + Math.random() * 0.1
          }
        });
      }

      // Wildlife movement patterns
      if (detections.tigers > 2) {
        this.generateAlert({
          type: 'wildlife_movement',
          severity: 'medium',
          location,
          data: {
            source: 'camera_trap',
            species: 'tiger',
            count: Math.floor(detections.tigers),
            behavior: 'territorial_patrol'
          }
        });
      }
    });
  }

  private processSatelliteData() {
    // Simulate satellite imagery analysis
    const regions = [
      { lat: 26.2006, lng: 92.9376, region: 'Kaziranga' },
      { lat: 27.5000, lng: 77.5000, region: 'Bharatpur' },
      { lat: 15.3000, lng: 75.0000, region: 'Western Ghats' }
    ];

    regions.forEach(location => {
      const imageAnalysis = {
        deforestation_rate: Math.random() * 10,
        water_levels: 70 + Math.random() * 30,
        vegetation_health: 60 + Math.random() * 40,
        human_encroachment: Math.random() * 15
      };

      // Habitat degradation detection
      if (imageAnalysis.deforestation_rate > 7 || imageAnalysis.vegetation_health < 70) {
        this.generateAlert({
          type: 'habitat_degradation',
          severity: imageAnalysis.deforestation_rate > 8 ? 'critical' : 'high',
          location,
          data: {
            source: 'satellite_imagery',
            analysis: imageAnalysis,
            change_detection: 'rapid_deforestation'
          }
        });
      }

      // Environmental threats
      if (imageAnalysis.water_levels < 80 && imageAnalysis.vegetation_health < 75) {
        this.generateAlert({
          type: 'environmental',
          severity: 'medium',
          location,
          data: {
            source: 'satellite_imagery',
            threat_type: 'drought_stress',
            analysis: imageAnalysis
          }
        });
      }
    });
  }

  private processEnvironmentalData() {
    // Simulate weather and environmental sensor data
    const weatherStations = [
      { lat: 28.7041, lng: 77.1025, region: 'Delhi NCR' },
      { lat: 19.0760, lng: 72.8777, region: 'Mumbai' },
      { lat: 13.0827, lng: 80.2707, region: 'Chennai' }
    ];

    weatherStations.forEach(location => {
      const environmentalData = {
        temperature: 25 + Math.random() * 20,
        humidity: 40 + Math.random() * 40,
        air_quality_index: Math.random() * 300,
        noise_levels: Math.random() * 100,
        human_activity_index: Math.random() * 50
      };

      // Environmental stress detection
      if (environmentalData.air_quality_index > 200 || environmentalData.temperature > 40) {
        this.generateAlert({
          type: 'environmental',
          severity: 'medium',
          location,
          data: {
            source: 'environmental_sensors',
            measurements: environmentalData,
            threat_type: 'environmental_stress'
          }
        });
      }
    });
  }

  private runPredictiveAnalysis() {
    // Advanced predictive modeling
    const currentTime = new Date();
    const timeOfDay = currentTime.getHours();
    const dayOfWeek = currentTime.getDay();

    // Poaching risk prediction (higher at night and weekends)
    const poachingRiskFactors = {
      timeOfDay: timeOfDay < 6 || timeOfDay > 20 ? 0.8 : 0.3,
      weekend: dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 0.4,
      moonPhase: Math.random() * 0.5, // Simulate moon phase data
      recentActivity: this.getRecentPoachingActivity()
    };

    this.predictionModel.poachingRisk = 
      (poachingRiskFactors.timeOfDay + 
       poachingRiskFactors.weekend + 
       poachingRiskFactors.moonPhase + 
       poachingRiskFactors.recentActivity) / 4;

    // Habitat degradation prediction
    this.predictionModel.habitatDegradation = this.calculateHabitatRisk();

    // Generate predictive alerts for high-risk scenarios
    if (this.predictionModel.poachingRisk > 0.7) {
      this.generatePredictiveAlert('poaching', this.predictionModel.poachingRisk);
    }

    if (this.predictionModel.habitatDegradation > 0.6) {
      this.generatePredictiveAlert('habitat_degradation', this.predictionModel.habitatDegradation);
    }
  }

  private getRecentPoachingActivity(): number {
    const recentAlerts = this.alerts.filter(alert => 
      alert.type === 'poaching' && 
      new Date().getTime() - alert.timestamp.getTime() < 24 * 60 * 60 * 1000
    );
    return Math.min(recentAlerts.length * 0.2, 1);
  }

  private calculateHabitatRisk(): number {
    // Simulate complex habitat risk calculation
    return 0.3 + Math.random() * 0.5;
  }

  private generateAlert(alertData: Partial<AlertData>) {
    const alert: AlertData = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      status: 'active',
      ...alertData
    } as AlertData;

    this.alerts.unshift(alert);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts = this.alerts.slice(0, 50);
    }

    // COMPLETELY SILENT alert generation - NO SOUND EFFECTS
    console.log(`🚨 SILENT ALERT: ${alert.type.toUpperCase()} - ${alert.severity}`, alert);
    
    // Notify subscribers
    this.notifySubscribers();
  }

  private generatePredictiveAlert(type: 'poaching' | 'habitat_degradation', confidence: number) {
    const predictiveAlert: AlertData = {
      id: `predictive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity: confidence > 0.8 ? 'high' : 'medium',
      location: {
        lat: 26.9124,
        lng: 75.7873,
        region: 'High Risk Zone'
      },
      timestamp: new Date(),
      prediction: {
        confidence: Math.round(confidence * 100),
        timeToThreat: Math.round((1 - confidence) * 120), // Predicted minutes to threat
        riskFactors: this.getRiskFactors(type)
      },
      data: {
        source: 'predictive_model',
        model_version: '2.1.0',
        risk_score: confidence
      },
      status: 'active'
    };

    this.alerts.unshift(predictiveAlert);
    // COMPLETELY SILENT predictive alert - NO SOUND EFFECTS
    console.log(`🔮 SILENT PREDICTIVE ALERT: ${type.toUpperCase()} - ${Math.round(confidence * 100)}% confidence`);
    this.notifySubscribers();
  }

  private getRiskFactors(type: string): string[] {
    const riskFactors = {
      poaching: ['nighttime_activity', 'weekend_pattern', 'recent_incidents', 'remote_location'],
      habitat_degradation: ['deforestation_trend', 'human_encroachment', 'climate_stress', 'industrial_activity']
    };
    return riskFactors[type] || [];
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback([...this.alerts]));
  }

  // Public API
  public subscribe(callback: (alerts: AlertData[]) => void): () => void {
    this.subscribers.push(callback);
    
    // Immediately send current alerts
    callback([...this.alerts]);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  public getAlerts(): AlertData[] {
    return [...this.alerts];
  }

  public updateAlertStatus(alertId: string, status: AlertData['status']) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = status;
      this.notifySubscribers();
    }
  }

  public getPredictionModel(): PredictiveModel {
    return { ...this.predictionModel };
  }

  public getAlertStats() {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const recent = this.alerts.filter(a => a.timestamp > last24h);
    
    return {
      total: this.alerts.length,
      last24h: recent.length,
      critical: recent.filter(a => a.severity === 'critical').length,
      active: this.alerts.filter(a => a.status === 'active').length,
      byType: {
        poaching: recent.filter(a => a.type === 'poaching').length,
        habitat_degradation: recent.filter(a => a.type === 'habitat_degradation').length,
        wildlife_movement: recent.filter(a => a.type === 'wildlife_movement').length,
        environmental: recent.filter(a => a.type === 'environmental').length
      }
    };
  }
}

export const realTimeAlertService = new RealTimeAlertService();
export type { AlertData, PredictiveModel };
