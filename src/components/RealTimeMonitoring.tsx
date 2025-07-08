import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { realTimeAlertService, AlertData, PredictiveModel } from '@/services/realTimeAlerts';

const RealTimeMonitoring = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [predictionModel, setPredictionModel] = useState<PredictiveModel | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isMonitoring, setIsMonitoring] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = realTimeAlertService.subscribe((newAlerts) => {
      // Check for new critical alerts
      const newCriticalAlerts = newAlerts.filter(alert => 
        alert.severity === 'critical' && 
        !alerts.find(existing => existing.id === alert.id)
      );

      if (newCriticalAlerts.length > 0) {
        // SILENT MODE - Only show toast notifications, NO AUDIO
        newCriticalAlerts.forEach(alert => {
          toast({
            title: `🚨 CRITICAL ALERT: ${alert.type.toUpperCase()}`,
            description: `${alert.location.region} - Immediate response required`,
          });
        });
      }

      setAlerts(newAlerts);
    });

    // Update prediction model every 5 seconds
    const predictionInterval = setInterval(() => {
      setPredictionModel(realTimeAlertService.getPredictionModel());
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(predictionInterval);
    };
  }, [alerts, toast]);

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.type === filter || alert.severity === filter
  );

  const handleAlertAction = (alertId: string, action: 'investigate' | 'resolve') => {
    const status = action === 'investigate' ? 'investigating' : 'resolved';
    realTimeAlertService.updateAlertStatus(alertId, status);
    
    toast({
      title: `Alert ${action === 'investigate' ? 'under investigation' : 'resolved'}`,
      description: `Alert ${alertId.slice(-8)} has been marked as ${status}`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 border-red-500';
      case 'high': return 'text-orange-500 border-orange-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'poaching': return '🎯';
      case 'habitat_degradation': return '🌳';
      case 'wildlife_movement': return '🐾';
      case 'environmental': return '🌍';
      default: return '⚠️';
    }
  };

  const stats = realTimeAlertService.getAlertStats();

  return (
    <section className="py-20 relative" id="real-time-monitoring">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-8">
            Real-Time Threat Intelligence
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Advanced AI-powered monitoring system with predictive analytics for immediate threat detection
          </p>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'} mr-2`} />
              <span className="text-electric-cyan font-orbitron font-bold">System Status</span>
            </div>
            <div className="text-2xl font-bold text-misty-white">
              {isMonitoring ? 'ACTIVE' : 'OFFLINE'}
            </div>
          </div>

          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-3xl font-orbitron font-bold text-red-500 mb-2">
              {stats.critical}
            </div>
            <div className="text-electric-cyan">Critical Alerts</div>
            <div className="text-misty-white/60 text-sm">Last 24h</div>
          </div>

          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-3xl font-orbitron font-bold text-orange-500 mb-2">
              {stats.active}
            </div>
            <div className="text-electric-cyan">Active Threats</div>
            <div className="text-misty-white/60 text-sm">Requiring Action</div>
          </div>

          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-3xl font-orbitron font-bold text-bio-green mb-2">
              {stats.last24h}
            </div>
            <div className="text-electric-cyan">Total Alerts</div>
            <div className="text-misty-white/60 text-sm">Last 24h</div>
          </div>
        </motion.div>

        {/* Predictive Risk Matrix */}
        {predictionModel && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glassmorphism p-8 rounded-xl mb-12"
          >
            <h3 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6 text-center">
              🔮 Predictive Risk Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-forest-navy/30"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-red-500"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${predictionModel.poachingRisk * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-misty-white">
                      {Math.round(predictionModel.poachingRisk * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-red-500 font-semibold">Poaching Risk</div>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-forest-navy/30"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-orange-500"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${predictionModel.habitatDegradation * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-misty-white">
                      {Math.round(predictionModel.habitatDegradation * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-orange-500 font-semibold">Habitat Risk</div>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-forest-navy/30"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-yellow-500"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${predictionModel.wildlifeStress * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-misty-white">
                      {Math.round(predictionModel.wildlifeStress * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-yellow-500 font-semibold">Wildlife Stress</div>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-forest-navy/30"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      className="stroke-blue-500"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${predictionModel.environmentalThreats * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-misty-white">
                      {Math.round(predictionModel.environmentalThreats * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-blue-500 font-semibold">Environmental</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Alert Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          {['all', 'critical', 'poaching', 'habitat_degradation', 'wildlife_movement', 'environmental'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === filterType 
                  ? 'bg-electric-cyan text-forest-navy' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              {filterType.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Real-Time Alert Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glassmorphism p-8 rounded-xl"
        >
          <h3 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6">
            🚨 Live Alert Feed (Silent Mode)
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredAlerts.length === 0 ? (
                <div className="text-center text-misty-white/50 py-8">
                  No alerts matching current filter
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className={`p-6 rounded-lg border-l-4 glassmorphism cursor-pointer transition-all duration-300 hover:bg-misty-white/5 ${getSeverityColor(alert.severity)}`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                        <div>
                          <div className="font-semibold text-misty-white capitalize">
                            {alert.type.replace('_', ' ')} Alert
                          </div>
                          <div className="text-sm text-misty-white/60">
                            {alert.location.region} • {alert.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold uppercase ${getSeverityColor(alert.severity).split(' ')[0]}`}>
                          {alert.severity}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                          alert.status === 'active' ? 'bg-red-500/20 text-red-300' :
                          alert.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {alert.status}
                        </div>
                      </div>
                    </div>

                    {alert.prediction && (
                      <div className="bg-forest-navy/50 p-3 rounded-lg mb-4">
                        <div className="text-sm text-electric-cyan font-semibold mb-2">
                          🔮 Predictive Analysis
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-misty-white/60">Confidence:</span>
                            <span className="ml-2 text-bio-green font-mono">{alert.prediction.confidence}%</span>
                          </div>
                          <div>
                            <span className="text-misty-white/60">Time to Threat:</span>
                            <span className="ml-2 text-tiger-orange font-mono">{alert.prediction.timeToThreat}min</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      {alert.status === 'active' && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlertAction(alert.id, 'investigate');
                            }}
                            className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-semibold hover:bg-yellow-500/30 transition-colors"
                          >
                            🔍 Investigate
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlertAction(alert.id, 'resolve');
                            }}
                            className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-semibold hover:bg-green-500/30 transition-colors"
                          >
                            ✅ Resolve
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Alert Detail Modal */}
        <AnimatePresence>
          {selectedAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
              onClick={() => setSelectedAlert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glassmorphism p-8 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-orbitron font-bold text-electric-cyan">
                    Alert Details
                  </h3>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="text-misty-white hover:text-electric-cyan text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-misty-white/60">Type:</span>
                      <span className="ml-2 text-misty-white capitalize">{selectedAlert.type.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-misty-white/60">Severity:</span>
                      <span className={`ml-2 font-bold uppercase ${getSeverityColor(selectedAlert.severity).split(' ')[0]}`}>
                        {selectedAlert.severity}
                      </span>
                    </div>
                    <div>
                      <span className="text-misty-white/60">Location:</span>
                      <span className="ml-2 text-misty-white">{selectedAlert.location.region}</span>
                    </div>
                    <div>
                      <span className="text-misty-white/60">Timestamp:</span>
                      <span className="ml-2 text-misty-white font-mono">{selectedAlert.timestamp.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-forest-navy/50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-bio-green mb-2">Raw Data</h4>
                    <pre className="text-xs text-misty-white/80 whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(selectedAlert.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RealTimeMonitoring;
