import jsPDF from 'jspdf';

interface Phase {
  phase: string;
  title: string;
  duration: string;
  icon: string;
  timeline: string;
  objectives: string[];
  deliverables: string[];
  budget: string;
  partnerships: string[];
  success_metrics: string[];
}

export const generateRoadmapPDF = (phases: Phase[]) => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 7;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Helper function to wrap text
  const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const splitText = doc.splitTextToSize(text, maxWidth);
    doc.text(splitText, x, yPosition);
    yPosition += splitText.length * lineHeight;
  };

  // Title Page
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('VanRakshak AI', 105, 40, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text('Implementation Roadmap', 105, 55, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Complete Strategic Deployment Plan', 105, 70, { align: 'center' });
  doc.text('for Nationwide Wildlife Protection', 105, 80, { align: 'center' });

  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 100, { align: 'center' });

  // Executive Summary
  yPosition = 120;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summary = `This comprehensive roadmap outlines the strategic implementation of VanRakshak AI, an advanced wildlife conservation system that leverages artificial intelligence, IoT sensors, and community engagement to protect India's biodiversity. The plan spans 4 phases over 4 years with a total investment of ₹13.5 crores, aiming to protect 50+ wildlife areas and save 10,000+ animals through cutting-edge technology and sustainable conservation practices.`;
  addWrappedText(summary, margin, 170);

  // Investment Overview
  yPosition += 10;
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Investment Framework', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('• Total Investment: ₹13.5 crores over 4 years', margin, yPosition);
  yPosition += lineHeight;
  doc.text('• Coverage: 50+ protected areas across India', margin, yPosition);
  yPosition += lineHeight;
  doc.text('• Estimated Impact: 10,000+ wildlife protected', margin, yPosition);
  yPosition += lineHeight;
  doc.text('• Technology Stack: AI, IoT, Mobile Apps, Satellite Connectivity', margin, yPosition);
  yPosition += 15;

  // Phase Details
  phases.forEach((phase, index) => {
    checkPageBreak(80);
    
    // Phase Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${phase.phase}: ${phase.title}`, margin, yPosition);
    yPosition += 10;

    // Phase Overview
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Overview', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Duration: ${phase.duration}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Budget: ${phase.budget}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Timeline: ${phase.timeline}`, margin, yPosition);
    yPosition += 10;

    // Key Objectives
    checkPageBreak(30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Objectives', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    phase.objectives.forEach((objective) => {
      checkPageBreak(15);
      addWrappedText(`• ${objective}`, margin, 170);
      yPosition += 2;
    });

    // Deliverables
    yPosition += 5;
    checkPageBreak(30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Major Deliverables', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    phase.deliverables.forEach((deliverable) => {
      checkPageBreak(15);
      addWrappedText(`• ${deliverable}`, margin, 170);
      yPosition += 2;
    });

    // Key Partnerships
    yPosition += 5;
    checkPageBreak(30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Strategic Partnerships', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    phase.partnerships.forEach((partnership) => {
      checkPageBreak(15);
      addWrappedText(`• ${partnership}`, margin, 170);
      yPosition += 2;
    });

    // Success Metrics
    yPosition += 5;
    checkPageBreak(30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Success Metrics & KPIs', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    phase.success_metrics.forEach((metric) => {
      checkPageBreak(15);
      addWrappedText(`• ${metric}`, margin, 170);
      yPosition += 2;
    });

    // Technical Specifications (Additional Details)
    yPosition += 5;
    checkPageBreak(50);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical Specifications', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    if (index === 0) {
      const techSpecs = [
        'AI Camera Resolution: 4K with night vision capability',
        'Detection Range: Up to 100 meters with 95% accuracy',
        'Battery Life: Solar-powered with 30-day backup',
        'Connectivity: 4G/5G with satellite backup',
        'Data Processing: Edge AI with cloud synchronization',
        'Mobile App: Android/iOS compatible with offline mode'
      ];
      techSpecs.forEach((spec) => {
        checkPageBreak(15);
        addWrappedText(`• ${spec}`, margin, 170);
        yPosition += 2;
      });
    } else if (index === 1) {
      const techSpecs = [
        'Acoustic Sensors: Omnidirectional with 2km range',
        'Audio Processing: Real-time ML sound classification',
        'Network Topology: Mesh network with redundancy',
        'Community Platform: Multi-language support',
        'Predictive Analytics: 90% threat prediction accuracy',
        'Integration APIs: Government systems compatibility'
      ];
      techSpecs.forEach((spec) => {
        checkPageBreak(15);
        addWrappedText(`• ${spec}`, margin, 170);
        yPosition += 2;
      });
    } else if (index === 2) {
      const techSpecs = [
        'Satellite Connectivity: ISRO partnership for coverage',
        'Edge Computing: Local processing units in each park',
        'Control Centers: 24/7 staffed monitoring facilities',
        'Network Architecture: Redundant communication paths',
        'Data Analytics: Advanced ML for pattern recognition',
        'Response Systems: Automated alert mechanisms'
      ];
      techSpecs.forEach((spec) => {
        checkPageBreak(15);
        addWrappedText(`• ${spec}`, margin, 170);
        yPosition += 2;
      });
    } else {
      const techSpecs = [
        'Global Integration: UN Environment data sharing',
        'Autonomous Systems: AI-powered patrol units',
        'Cross-border Monitoring: International cooperation',
        'API Development: Global conservation network',
        'Scalability: Cloud-native architecture',
        'Sustainability: Carbon-neutral operations'
      ];
      techSpecs.forEach((spec) => {
        checkPageBreak(15);
        addWrappedText(`• ${spec}`, margin, 170);
        yPosition += 2;
      });
    }

    yPosition += 15;
  });

  // Risk Assessment and Mitigation
  checkPageBreak(60);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Assessment & Mitigation', margin, yPosition);
  yPosition += 10;

  const risks = [
    'Technology Risk: Continuous R&D and vendor partnerships',
    'Environmental Risk: Weather-resistant equipment design',
    'Financial Risk: Phased investment and government backing',
    'Operational Risk: Comprehensive training programs',
    'Security Risk: End-to-end encryption and cybersecurity'
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  risks.forEach((risk) => {
    checkPageBreak(15);
    addWrappedText(`• ${risk}`, margin, 170);
    yPosition += 2;
  });

  // Implementation Timeline
  yPosition += 15;
  checkPageBreak(40);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Implementation Timeline', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const timeline = `The implementation follows a carefully planned timeline starting with pilot deployment in Q1 2024, followed by ecosystem expansion, national network development, and finally global integration. Each phase builds upon the previous one, ensuring sustainable growth and measurable impact.`;
  addWrappedText(timeline, margin, 170);

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`VanRakshak AI Implementation Roadmap - Page ${i} of ${totalPages}`, 105, pageHeight - 10, { align: 'center' });
  }

  // Save the PDF
  doc.save('VanRakshak-AI-Implementation-Roadmap.pdf');
};
