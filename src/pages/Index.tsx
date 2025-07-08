
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import HeroSection from '@/components/HeroSection';
import ProblemStatement from '@/components/ProblemStatement';
import SolutionOverview from '@/components/SolutionOverview';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import ConservationMetrics from '@/components/ConservationMetrics';
import ImpactMetrics from '@/components/ImpactMetrics';
import ImplementationRoadmap from '@/components/ImplementationRoadmap';
import CallToAction from '@/components/CallToAction';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import WildlifeSilhouettes from '@/components/WildlifeSilhouettes';
import PawPrintTrail from '@/components/PawPrintTrail';
import ForestCanopy from '@/components/ForestCanopy';
import BirdFlight from '@/components/BirdFlight';
import DayNightCycle from '@/components/DayNightCycle';
import VanRakshakAvatar from '@/components/VanRakshakAvatar';
import VillageParticipationDashboard from '@/components/VillageParticipationDashboard';
import ConservationRewards from '@/components/ConservationRewards';
import CommunitySuccessStories from '@/components/CommunitySuccessStories';
import WildlifeKnowledgeHub from '@/components/WildlifeKnowledgeHub';
import EmergencyReporting from '@/components/EmergencyReporting';
import AccessibilityEnhancements from '@/components/AccessibilityEnhancements';
import MobileOptimizations from '@/components/MobileOptimizations';
import AIDetectionDemo from '@/components/AIDetectionDemo';
import ParallaxForest from '@/components/ParallaxForest';
import DynamicSky from '@/components/DynamicSky';
import FloatingWildlife from '@/components/FloatingWildlife';
import FallingLeaves from '@/components/FallingLeaves';
import AISpeciesDemo from '@/components/AISpeciesDemo';
import RealTimeMonitoring from '@/components/RealTimeMonitoring';
import AcousticAnalyzer from '@/components/AcousticAnalyzer';
import Interactive3DMap from '@/components/Interactive3DMap';
import ForestActivityHeatmap from '@/components/ForestActivityHeatmap';
import SatelliteFeedViewer from '@/components/SatelliteFeedViewer';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Index component mounting...');
    // Simulate loading time for 3D assets with mobile optimization
    const isMobile = window.innerWidth <= 768;
    const loadTime = isMobile ? 1000 : 2000; // Faster loading on mobile
    
    const timer = setTimeout(() => {
      console.log('Loading complete, setting loading to false');
      setLoading(false);
    }, loadTime);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-navy flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h1
            className="text-4xl font-orbitron font-bold text-electric-cyan mb-4 text-glow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VanRakshak AI
          </motion.h1>
          <motion.p
            className="text-lg text-misty-white typing-animation"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 0.5 }}
          >
            Initializing Wildlife Conservation Environment...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-navy relative overflow-x-hidden">
      {/* Accessibility Enhancements */}
      <AccessibilityEnhancements />
      
      {/* Mobile Optimizations */}
      <MobileOptimizations />
      
      {/* KILLER BACKGROUND EFFECTS - Multi-layered atmosphere */}
      <DynamicSky />
      <ParallaxForest />
      <ParticleBackground />
      <FloatingWildlife />
      <FallingLeaves />
      <WildlifeSilhouettes />
      <PawPrintTrail />
      <ForestCanopy />
      <BirdFlight />
      <DayNightCycle />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Auth CTA Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="bg-gradient-to-r from-bio-green to-electric-cyan text-forest-navy font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          {isAuthenticated ? "Dashboard" : "Login"}
        </Link>
      </div>
      
      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <ProblemStatement />
        <SolutionOverview />
        <TechnologyShowcase />
        
        {/* Real-Time Monitoring System */}
        <RealTimeMonitoring />
        
        {/* Live Forest Activity Heatmap */}
        <ForestActivityHeatmap />
        
        {/* Satellite & Drone Feed Integration */}
        <SatelliteFeedViewer />
        
        {/* Enhanced AI-Powered Acoustic Monitoring System */}
        <section id="acoustic-monitoring" className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-purple to-tiger-orange mb-6">
                AI Acoustic Wildlife Detection
              </h2>
              <p className="text-xl text-misty-white max-w-3xl mx-auto">
                Real-time machine learning-powered sound analysis for wildlife identification and threat detection
              </p>
            </motion.div>
            
            <AcousticAnalyzer />
          </div>
        </section>
        
        {/* Enhanced 3D Conservation Map */}
        <section id="3d-conservation-map" className="py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-bio-green mb-6">
                Interactive 3D Conservation Map
              </h2>
              <p className="text-xl text-misty-white max-w-3xl mx-auto">
                Real-time 3D visualization of India's protected wildlife areas with multiple view modes and live animal tracking
              </p>
            </motion.div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Interactive3DMap />
            </div>
          </div>
        </section>
        
        {/* AI Detection Demo */}
        <AIDetectionDemo />
        
        {/* AI Species Demo Section */}
        <AISpeciesDemo />
        
        <ConservationMetrics />
        <ImpactMetrics />
        
        {/* Community Engagement Features */}
        <VanRakshakAvatar />
        <VillageParticipationDashboard />
        <ConservationRewards />
        <CommunitySuccessStories />
        <WildlifeKnowledgeHub />
        <EmergencyReporting />
        
        <ImplementationRoadmap />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
